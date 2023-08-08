import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Usage } from '../schemas/Billing/Usage.schema';

@Injectable()
export class UsageRepository extends AbstractRepository<Usage> {
  protected readonly logger = new Logger(UsageRepository.name);

  constructor(
    @InjectModel(Usage.name) usageModel: Model<Usage>,
    @InjectConnection() connection: Connection
  ) {
    super(usageModel,connection);
  }
}
