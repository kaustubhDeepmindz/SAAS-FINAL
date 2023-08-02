import { Controller, Get } from '@nestjs/common';
import { ManagerServicesService } from './manager-services.service';

@Controller()
export class ManagerServicesController {
  constructor(private readonly managerServicesService: ManagerServicesService) {}

  @Get()
  getHello(): string {
    return this.managerServicesService.getHello();
  }
}
