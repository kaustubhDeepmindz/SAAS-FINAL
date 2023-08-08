import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { PaymentServicesController } from './payment-services.controller';
import { PaymentsService } from './payment-services.service';
import { ConfigModule } from '@nestjs/config';
import {PaymentDetailsRepository } from '../../../libs/repository/src/repositories/paymentDetails.repository';
import { RazorpayModule } from 'nestjs-razorpay';
import { MongooseModule } from '@nestjs/mongoose';
import {PaymentDetailsSchema,PaymentDetails} from '@app/repository/schemas/Payment/PaymentDetails.schema'
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost:27017/your_db'),
    MongooseModule.forFeature([{ name: PaymentDetails.name, schema: PaymentDetailsSchema }]),
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
  ],
  controllers: [PaymentServicesController],
  providers: [PaymentsService,PaymentDetailsRepository],
})
export class PaymentServicesModule { }
