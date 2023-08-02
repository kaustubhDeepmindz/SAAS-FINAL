import { Module } from '@nestjs/common';
import { ManagerServicesController } from './manager-services.controller';
import { ManagerServicesService } from './manager-services.service';

@Module({
  imports: [],
  controllers: [ManagerServicesController],
  providers: [ManagerServicesService],
})
export class ManagerServicesModule {}
