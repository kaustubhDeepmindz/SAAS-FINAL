import { User, UserSchema } from './../../../libs/repository/src/schemas/userSchema';
// import { UserRepository } from './../../../libs/repository/src/repositories/userRepository';
import { AppService } from './app.service';
// import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
import {  DatabaseModule } from '@app/common';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './../../../libs/repository/src/repositories/userRepository';
// import { JwtStrategy } from '../jwt.strategy';
// import { LocalStrategy } from '../local.strategy';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forRoot('mongodb://localhost:27017/your_db'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/auth-services/.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/your_db'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // JwtModule.registerAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService,UserRepository,],
})
export class AuthModule {}
