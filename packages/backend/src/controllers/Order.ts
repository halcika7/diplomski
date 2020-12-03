import { OrderService } from '@service/Order';
import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Post } from '@decorator/method';
import { Body, Param, Req, Res } from '@decorator/param';
import { Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';
import { RequestUser } from '@ctypes';

@Controller('/order')
export class OrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('/', authMiddleware(['professor']))
  async postOrder(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Body() { orderedFor }: { orderedFor: string }
  ) {
    const cart = await this.orderService.makeOrder(req.user.id, orderedFor);
    return this.sendResponse(res, HTTPCodes.OK, { cart });
  }

  @Get('/:id', authMiddleware())
  async getOrder(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('id') orderId: string
  ) {
    const { message, order, status } = await this.orderService.getOrder(
      req.user,
      orderId
    );

    if (message) return this.sendResponse(res, status, { message });

    return this.sendResponse(res, status, { order });
  }

  @Get('/orders/deleted', authMiddleware(['admin']))
  async getDeletedOrders(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('order_type') orderType: string
  ) {
    const { user } = req;

    const orders = await this.orderService.getOrders(user, orderType);

    return this.sendResponse(res, 200, { orders });
  }

  @Get('/orders/:order_type', authMiddleware())
  async getOrders(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('order_type') orderType: string
  ) {
    const { user } = req;

    const orders = await this.orderService.getOrders(user, orderType);

    return this.sendResponse(res, 200, { orders });
  }
}
