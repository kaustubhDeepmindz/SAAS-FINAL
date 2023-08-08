import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { ServiceAccount } from '../schemas/ServiceAccount.schema';

@Injectable()
export class ServiceAccountRepository extends AbstractRepository<ServiceAccount> {
  protected readonly logger = new Logger(ServiceAccountRepository.name);

  constructor(
    @InjectModel(ServiceAccount.name) serviceAccountModel: Model<ServiceAccount>,
    @InjectConnection() connection: Connection
  ) {
    super(serviceAccountModel,connection);
  }
}
