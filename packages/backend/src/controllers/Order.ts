import { OrderService } from '@service/Order';
import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Post } from '@decorator/method';
import { Body, Req, Res } from '@decorator/param';
import { Request, Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';

@Controller('/order')
export class OrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('/', authMiddleware(['professor']))
  async postOrder(
    @Res() res: Response,
    @Req() req: Request,
    @Body() { orderedFor }: { orderedFor: string }
  ) {
    const cart = await this.orderService.makeOrder(
      req.user as string,
      orderedFor
    );
    return this.sendResponse(res, HTTPCodes.OK, { cart });
  }
}
