import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BillingServicesService } from '../services/billing-services.service';

@Controller('/billing')
export class BillingServicesController {
  constructor(private readonly billingService: BillingServicesService) { }

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @Get('/usage')
  getUsage(@Req() req:Request, @Res() res:Response) {
    return this.billingService.getUsage(req, res);
  }

  @Post('/usage')
  recordUsage(@Req() req:Request, @Res() res:Response) {
    return this.billingService.recordUsage(req, res);
  }

  @Get('/usage/:serviceName')
  getServiceUsage(@Req() req:Request, @Res() res:Response) {
    return this.billingService.getServiceUsage(req, res);
  }

  @Post('/user-service/usage/:api_key/:service_name')
  getUserServiceUsage(@Req() req:Request, @Res() res:Response) {
    return this.billingService.getUserServiceUsage(req, res);
  }

  @Post('/rechargeCredits')
  postRechargeCredits(@Req() req:Request, @Res() res:Response) {
    return this.billingService.postRechargeCredits(req, res);
  }
}
