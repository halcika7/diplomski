import { OrderService } from '@service/Order';
import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Patch, Post } from '@decorator/method';
import { Body, Param, Req, Res } from '@decorator/param';
import { Response } from 'express';
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
    @Body() { orderedFor }: { orderedFor: 'Personal' | 'University' }
  ) {
    const { status, ...rest } = await this.orderService.makeOrder(
      req.user.id,
      orderedFor
    );

    return this.sendResponse(res, status, { ...rest });
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

  @Get('/orders/:order_type', authMiddleware())
  async getOrders(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('order_type') orderType: string
  ) {
    const orders = await this.orderService.getOrders(req.user, orderType);

    return this.sendResponse(res, 200, { orders });
  }

  private updateStatus(res: Response) {
    return async (
      id: string,
      type: 'finished' | 'rejected' | 'approved',
      role: 'administration' | 'worker' | 'professor',
      rejectedBy?: string
    ) => {
      const { status, message } = await this.orderService.updateOrderStatus(
        id,
        type,
        role,
        rejectedBy
      );
      return this.sendResponse(res, status, { message });
    };
  }

  @Patch('/rejected/:id', authMiddleware(['worker', 'administration']))
  async rejectOrder(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('id') id: string
  ) {
    return this.updateStatus(res)(id, 'rejected', 'professor', req.user.role);
  }

  @Patch('/finished/:id', authMiddleware(['worker']))
  async finishOrder(@Res() res: Response, @Param('id') id: string) {
    return this.updateStatus(res)(id, 'finished', 'professor');
  }

  @Patch('/approved/:id', authMiddleware(['administration']))
  async approveOrder(@Res() res: Response, @Param('id') id: string) {
    return this.updateStatus(res)(id, 'approved', 'worker');
  }

  @Patch('/pay/:id', authMiddleware(['worker']))
  async payOrder(@Res() res: Response, @Param('id') id: string) {
    const { status, message } = await this.orderService.payOrder(id);

    return this.sendResponse(res, status, { message });
  }
}
