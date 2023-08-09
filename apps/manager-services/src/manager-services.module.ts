import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager'
import { RepositoryModule } from '@app/repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from "cache-manager-redis-store";
import type { RedisClientOptions } from 'redis';
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
    CacheModule.register<RedisClientOptions>({ 
      store: redisStore, 
      host: 'localhost', //default host
      port: 6379 //default port
    }),
    // CacheModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     ttl: configService.get('CACHE_TTL'),
    //     store: redisStore,
    //     socket: {
    //       host: configService.get('REDIS_HOST'),
    //       port: configService.get('REDIS_PORT'),
    //     }
    //   }),
    //   inject: [ConfigService],
    // }),
   
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
