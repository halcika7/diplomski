import { StorageService } from '@service/Storage';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { CartRepository } from '@repository/Cart';
import { Types } from 'mongoose';
import { FileService } from './File';
import { CartData } from '@model/Cart/Cart';

interface FileDocument {
  path: string;
  pages: number;
  copies: number;
  price: number;
  print: 'Color' | 'Black/White';
  paper: string;
  binding: string;
  name: string;
}

@Injectable()
export class CartService extends BaseService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly storageService: StorageService
  ) {
    super();
  }

  private getTotal(documents: FileDocument[]) {
    const totalCost = documents.reduce((start, next) => start + next.price, 0);
    return Number(
      `${Math.round(
        totalCost + totalCost * 0.17 + (('e+2' as unknown) as number)
      )}e-2`
    );
  }

  async getOrCreateCart(id: string) {
    let cart = await this.cartRepository.findById(id);

    if (!cart) {
      cart = this.cartRepository.createCart({
        userId: new Types.ObjectId(id),
        documents: [],
        totalCost: 0,
      });

      await cart.save();
    }

    return cart;
  }

  async updateCart(updateData: FileDocument, userId: string) {
    const cart = await this.cartRepository.findById(userId);
    cart!.documents.push(updateData);
    cart!.totalCost = this.getTotal(cart!.documents);

    return cart?.save();
  }

  async removeDocumentFromCart(id: string, userId: string) {
    const cart = await this.cartRepository.findById(userId);
    const cartObject = cart?.toObject() as CartData;
    const currentDocuments = cartObject.documents.map(doc => doc);
    const document = currentDocuments.find(
      doc => doc._id?.toHexString() === id
    );
    const paths = currentDocuments.filter(doc => doc.path === document?.path);

    if (paths.length <= 1) {
      this.storageService.delete(document!.path);
    }

    cart!.documents = currentDocuments.filter(
      doc => doc._id?.toHexString() !== id
    );
    cart!.totalCost = this.getTotal(cart!.documents);

    return cart?.save();
  }

  async clearCart(userId: string) {
    const cart = await this.cartRepository.findById(userId);
    const paths = [...new Set(cart!.documents.map(doc => doc.path))];
    paths.forEach(path => this.storageService.delete(path));
    cart!.documents = [];
    cart!.totalCost = 0;
    return cart?.save();
  }
}
