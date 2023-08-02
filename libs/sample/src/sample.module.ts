import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { User, UserSchema } from './schemas/userSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './user.repository';

@Module({
  imports:[
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
