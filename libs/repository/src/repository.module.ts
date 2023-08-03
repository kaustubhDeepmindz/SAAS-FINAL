import { User, UserSchema } from './schemas/userSchema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common';


@Module({
  imports: [DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [],
  exports: [],
})
export class RepositoryModule { }
