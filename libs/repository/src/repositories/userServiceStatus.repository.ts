import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { UserServiceStatus } from '../schemas/Billing/UserServiceStatus.schema';

@Injectable()
export class UserServiceStatusRepository extends AbstractRepository<UserServiceStatus> {
  protected readonly logger = new Logger(UserServiceStatusRepository.name);

  constructor(
    @InjectModel(UserServiceStatus.name) userServiceStatusModel: Model<UserServiceStatus>,
    @InjectConnection() connection: Connection
  ) {
    super(userServiceStatusModel,connection);
  }
}
