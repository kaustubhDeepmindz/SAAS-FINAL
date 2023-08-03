import { Module } from '@nestjs/common';
import { ManagerServicesController } from './manager-services.controller';
import { ManagerServicesService } from './manager-services.service';
import { RepositoryModule } from '@app/repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

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
    RepositoryModule
  ],
  controllers: [ManagerServicesController],
  providers: [ManagerServicesService],
})
export class ManagerServicesModule { }
