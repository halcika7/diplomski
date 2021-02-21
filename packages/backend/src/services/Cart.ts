import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { CartRepository } from '@repository/Cart';
import { Types } from 'mongoose';
import { CartData } from '@model/Cart/Cart';
import { Document, NumberHelper } from '@job/common';
import { FileService } from './File';

@Injectable()
export class CartService extends BaseService {
  private readonly number: NumberHelper;

  constructor(
    private readonly cartRepository: CartRepository,
    private readonly fileService: FileService
  ) {
    super();
    this.number = new NumberHelper();
  }

  private getTotal(documents: Document[]) {
    const totalCost = documents.reduce((start, next) => start + next.price, 0);
    return this.number.number(totalCost + totalCost * 0.17);
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

    return { documents: cart.documents, totalCost: cart.totalCost };
  }

  async updateCart(updateData: Document, userId: string) {
    const cart = await this.cartRepository.findById(userId);
    cart!.documents.push(updateData as any);
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
      this.fileService.removeFile(document!.path);
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
    paths.forEach(path => this.fileService.removeFile(path));
    cart!.documents = [];
    cart!.totalCost = 0;
    return cart?.save();
  }
}
