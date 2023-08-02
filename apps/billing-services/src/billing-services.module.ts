import { Module } from '@nestjs/common';
import { BillingServicesController } from './billing-services.controller';
import { BillingServicesService } from './billing-services.service';

@Module({
  imports: [],
  controllers: [BillingServicesController],
  providers: [BillingServicesService],
})
export class BillingServicesModule {}
