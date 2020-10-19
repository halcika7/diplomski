import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Delete, Get } from '@decorator/method';
import { Res, Req, Param } from '@decorator/param';
import { Request, Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';
import { CartService } from '@service/Cart';

@Controller('/cart')
export class CartController extends BaseController {
  constructor(private readonly cartService: CartService) {
    super();
  }

  @Get('/', authMiddleware(['professor']))
  async fetCart(@Res() res: Response, @Req() req: Request) {
    const cart = await this.cartService.getOrCreateCart(req.user as string);

    return this.sendResponse(res, HTTPCodes.OK, { cart });
  }

  @Delete('/:id', authMiddleware(['professor']))
  async removeDocumentFromCart(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string
  ) {
    const cart = await this.cartService.removeDocumentFromCart(
      id,
      req.user as string
    );

    return this.sendResponse(res, HTTPCodes.OK, { cart });
  }

  @Delete('/', authMiddleware(['professor']))
  async clearCart(@Res() res: Response, @Req() req: Request) {
    const cart = await this.cartService.clearCart(req.user as string);

    return this.sendResponse(res, HTTPCodes.OK, { cart });
  }
}
