import { Controller, Get, Post , Req, Res} from '@nestjs/common';
import { PaymentsService } from './payment-services.service';
import { Request, Response } from 'express';

@Controller("/payment")
export class PaymentServicesController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getHello(): string {
    return this.paymentsService.getHello();
  }

  @Get('/:id')
  async fetchPaymentDetails(@Req() req:Request, @Res() res:Response){
    return this.paymentsService.fetchPaymentDetails(req, res);
  }

  @Get('/fetch')
  async fetchPayment(@Req() req:Request, @Res() res:Response){
    return this.paymentsService.fetchPayment(req, res);
  }

  @Post('/createOrder')
  async createOrder(@Req() req:Request, @Res() res:Response){
    return this.paymentsService.createOrder(req, res);
  }
  
  @Post('/success')
  async captureSuccessfulPayment(@Req() req:Request){
    return this.paymentsService.captureSuccessfulPayment(req);
  }

}
