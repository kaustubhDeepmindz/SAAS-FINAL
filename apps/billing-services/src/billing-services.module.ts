import { Module } from '@nestjs/common';
import { KafkaModule } from '@app/common';
import { CacheModule } from '@nestjs/cache-manager';
import { BillingServicesController } from './controllers/billing-services.controller';
import { BillingServicesService } from './services/billing-services.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RepositoryModule } from '@app/repository';

import {
  ActivateServiceKeys, 
  DeactivateServiceKeys,
  ActivateService,
  ReactivateService,
  ApiUsageConsumer

} from  "./events";

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
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          // store: redisStore,
          host:configService.get('REDIS_STORE'),
          port:configService.get('REDIS_URL')
      }),
      inject: [ConfigService],
    }),
    RepositoryModule,
    KafkaModule
  ],
  controllers: [BillingServicesController],
  providers: [
    BillingServicesService,
  
  
    // Consumers
    ActivateServiceKeys, 
    DeactivateServiceKeys,
    ActivateService,
    ReactivateService,
    ApiUsageConsumer
  ],
})
export class BillingServicesModule {}
