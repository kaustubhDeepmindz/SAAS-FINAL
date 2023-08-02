import { Module } from '@nestjs/common';
import { Order, OrderSchema } from './schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common';


@Module({
  imports: [DatabaseModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [],
  exports: [],
})
export class RepositoryModule { }
