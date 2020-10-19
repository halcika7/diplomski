import { BindingRepository } from '@repository/Binding';
import { PaperRepository } from '@repository/Paper';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';

@Injectable()
export class PricingService extends BaseService {
  constructor(
    private readonly paperRepository: PaperRepository,
    private readonly bindingRepository: BindingRepository
  ) {
    super();
  }

  getPapers() {
    return this.paperRepository.findAll();
  }

  getBindings() {
    return this.bindingRepository.findAll();
  }

  getPaperBindings() {
    return Promise.all([this.getPapers(), this.getBindings()]);
  }
}
