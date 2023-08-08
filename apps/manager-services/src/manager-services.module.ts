import { Module } from '@nestjs/common';
import { RepositoryModule } from '@app/repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AccountService } from './services/accounts.service';
import { ManagerController } from './controllers/servicemanager.controller';
import { ServiceManagerService } from './services/servicemanager.service';
import { ServiceManager } from './utils/serviceManager';
import { KafkaModule } from '@app/common';
import {
  ApiUsageConsumer,
  ActivateService,
  ReactivateService,
  ActivateServiceKeys,
  DeactivateServiceKeys
} from "./events";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/manager-services/.env',
    }),
    RepositoryModule,
    KafkaModule
  ],
  controllers: [ManagerController],
  providers: [
    AccountService, 
    ServiceManagerService, 

    // UTILS
    ServiceManager,

    // Consumers
    ApiUsageConsumer,
    ActivateService,
    ReactivateService,
    ActivateServiceKeys,
    DeactivateServiceKeys
  ],
})
export class ManagerServicesModule { }
