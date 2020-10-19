import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get } from '@decorator/method';
import { Res } from '@decorator/param';
import { Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';
import { PricingService } from '@service/Pricing';

@Controller('/pricing')
export class PricingController extends BaseController {
  constructor(private readonly pricingService: PricingService) {
    super();
  }

  @Get('/', authMiddleware(['professor']))
  async getPaperBindings(@Res() res: Response) {
    const [papers, bindings] = await this.pricingService.getPaperBindings();
    return this.sendResponse(res, HTTPCodes.OK, { papers, bindings });
  }

  @Get('/papers', authMiddleware(['admin', 'worker']))
  async getPapers(@Res() res: Response) {
    const papers = await this.pricingService.getPapers();
    return this.sendResponse(res, HTTPCodes.OK, { papers });
  }

  @Get('/bindings', authMiddleware(['admin', 'worker']))
  async getBindings(@Res() res: Response) {
    const bindings = await this.pricingService.getBindings();
    return this.sendResponse(res, HTTPCodes.OK, { bindings });
  }
}
