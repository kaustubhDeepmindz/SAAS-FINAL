import { Module } from '@nestjs/common';
import { BillingServicesController } from './controllers/billing-services.controller';
import { BillingServicesService } from './services/billing-services.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { RepositoryModule } from '@app/repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/billing-services/.env',
    }),
    RepositoryModule
  ],
  controllers: [BillingServicesController],
  providers: [BillingServicesService],
})
export class BillingServicesModule {}
