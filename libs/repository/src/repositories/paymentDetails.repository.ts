import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { PaymentDetails } from '../schemas/Payment/PaymentDetails.schema';

@Injectable()
export class PaymentDetailsRepository extends AbstractRepository<PaymentDetails> {
  protected readonly logger = new Logger(PaymentDetailsRepository.name);

  constructor(
    @InjectModel(PaymentDetails.name) paymentDetailsAccountModel: Model<PaymentDetails>,
    @InjectConnection() connection: Connection
  ) {
    super(paymentDetailsAccountModel,connection);
  }
}
