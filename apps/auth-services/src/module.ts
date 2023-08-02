import { Module } from '@nestjs/common';
import { UserController } from './controllers/userController';
import { UserService } from './services/userService';
import {ConfigModule} from  '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@PharynxAI/database/database.module';
import { KafkaModule } from 'kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { SampleModule } from '@app/sample';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/saas/.env',
    }),
    DatabaseModule,
    KafkaModule,
    SampleModule
  ],
  controllers: [UserController],
  providers: [UserService, TestConsumer],
})
export class AppModule {}
