import { Controller, Get } from '@nestjs/common';
import { BillingServicesService } from './billing-services.service';

@Controller()
export class BillingServicesController {
  constructor(private readonly billingServicesService: BillingServicesService) {}

  @Get()
  getHello(): string {
    return this.billingServicesService.getHello();
  }
}
