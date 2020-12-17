import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Patch, Post } from '@decorator/method';
import { Body, Param, Res } from '@decorator/param';
import { Response } from 'express';
import { authMiddleware } from '@middleware/auth';
import { PricingService } from '@service/Pricing';
import { BindingService } from '@service/Binding';
import { PaperService } from '@service/Paper';
import {
  HTTPCodes,
  AddBindingBody,
  AddPaperBody,
  PaperBinding,
  UpdatePriceBindingPaper,
} from '@job/common';

@Controller('/pricing')
export class PricingController extends BaseController {
  constructor(
    private readonly pricingService: PricingService,
    private readonly bindingService: BindingService,
    private readonly paperService: PaperService
  ) {
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

  @Patch('/:type', authMiddleware(['admin', 'worker']))
  async updatePaperBinding(
    @Res() res: Response,
    @Param('type') type: PaperBinding,
    @Body() body: UpdatePriceBindingPaper
  ) {
    const { status, message } =
      type === 'paper'
        ? await this.paperService.updatePaperPrice(body)
        : await this.bindingService.updateBindingPrice(body);

    return this.sendResponse(res, status, { message });
  }

  @Patch('/:type/:available/:id')
  async changePaperBidingAvailability(
    @Res() res: Response,
    @Param('type') type: PaperBinding,
    @Param('available') available: string,
    @Param('id') id: string
  ) {
    const data = { id, available: available === 'true' };

    const { status, message } =
      type === 'paper'
        ? await this.paperService.updateAvailability(data)
        : await this.bindingService.updateAvailability(data);

    return this.sendResponse(res, status, { message });
  }

  @Post('/binding', authMiddleware(['admin', 'worker']))
  async addBinding(@Res() res: Response, @Body() body: AddBindingBody) {
    const { status, ...rest } = await this.bindingService.addBinding(body);

    return this.sendResponse(res, status, { ...rest });
  }

  @Post('/paper', authMiddleware(['admin', 'worker']))
  async addPaper(@Res() res: Response, @Body() body: AddPaperBody) {
    const { status, ...rest } = await this.paperService.addPaper(body);

    return this.sendResponse(res, status, { ...rest });
  }
}
