import { Inject, Module } from '@nestjs/common';
import * as Joi from 'joi';
import { PaymentServicesController } from './payment-services.controller';
import { PaymentsService } from './payment-services.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from '@app/repository';
import { RazorpayModule } from 'nestjs-razorpay';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/payment-services/.env',
    }),
    RazorpayModule.forRoot({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET
      // Other Razorpay options can be fetched from the .env file using ConfigService
    }),
    RepositoryModule,
  ],
  controllers: [PaymentServicesController],
  providers: [PaymentsService],
})
export class PaymentServicesModule { }
