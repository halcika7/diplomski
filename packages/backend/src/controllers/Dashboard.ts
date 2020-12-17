import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get } from '@decorator/method';
import { Param, Query, Req, Res } from '@decorator/param';
import { Response } from 'express';
import { authMiddleware } from '@middleware/auth';
import { DashboardService } from '@service/Dashboard';
import { RequestUser, FindByBody } from '@ctypes';
import { HTTPCodes } from '@job/common';

@Controller('/dashboard')
export class DashboardController extends BaseController {
  constructor(private readonly dashboardService: DashboardService) {
    super();
  }

  @Get('/administration', authMiddleware(['administration']))
  async getAdministrationDashboard(@Res() res: Response) {
    const {
      total,
      totalDebt,
      orders,
      completedOrders,
      rejectedOrders,
      unpaid,
      earningsByMonth,
      earningsForMonth,
      ordersByMonths,
      ordersByMonth,
    } = await this.dashboardService.getEarningsAdministration();
    return this.sendResponse(res, HTTPCodes.OK, {
      total,
      totalDebt,
      orders,
      completedOrders,
      rejectedOrders,
      unpaid,
      earningsByMonth,
      earningsForMonth,
      ordersByMonths,
      ordersByMonth,
    });
  }

  @Get('/professor', authMiddleware(['professor']))
  async getProfessorsDashboard(@Res() res: Response, @Req() req: RequestUser) {
    const data = await this.dashboardService.getEarningsProfessor(req.user);
    return this.sendResponse(res, 200, { ...data });
  }

  // eslint-disable-next-line max-params
  @Get('/chart/earning/day/:year/:month', authMiddleware())
  async getChartMonth(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('year') year: string,
    @Param('month') month: string,
    @Query() findBy: FindByBody
  ) {
    const earningsForMonth = await this.dashboardService.chartHelper({
      findBy,
      Data: {
        type: '$totalCost',
        date: { year: parseInt(year, 10), month: parseInt(month, 10) },
      },
      user: req.user,
    });

    return this.sendResponse(res, HTTPCodes.OK, { earningsForMonth });
  }

  // eslint-disable-next-line max-params
  @Get('/chart/order/day/:year/:month', authMiddleware())
  async getChartMonthOrders(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('year') year: string,
    @Param('month') month: string,
    @Query() findBy: FindByBody
  ) {
    const ordersByMonth = await this.dashboardService.chartHelper({
      findBy,
      Data: {
        type: 1,
        date: { year: parseInt(year, 10), month: parseInt(month, 10) },
      },
      user: req.user,
    });

    return this.sendResponse(res, HTTPCodes.OK, { ordersByMonth });
  }

  @Get('/chart/earning/:year', authMiddleware())
  async getChart(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('year') year: string,
    @Query() findBy: FindByBody
  ) {
    const earningsByMonth = await this.dashboardService.chartHelper({
      findBy,
      year: parseInt(year, 10),
      user: req.user,
    });

    return this.sendResponse(res, HTTPCodes.OK, { earningsByMonth });
  }

  @Get('/chart/order/:year', authMiddleware())
  async getChartOrders(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Param('year') year: string,
    @Query() findBy: FindByBody
  ) {
    const ordersByMonths = await this.dashboardService.getNumberOfOrdersByMonths(
      parseInt(year, 10),
      findBy,
      req.user
    );

    return this.sendResponse(res, HTTPCodes.OK, { ordersByMonths });
  }

  @Get('/:role', authMiddleware(['admin', 'worker']))
  async getAdminDashboard(@Res() res: Response) {
    const data = await this.dashboardService.getEarningsAdmin();
    return this.sendResponse(res, HTTPCodes.OK, { ...data });
  }
}
