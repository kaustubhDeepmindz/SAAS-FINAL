import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { UserCreditRecharge } from '../schemas/userCreditRecharge.schema';


@Injectable()
export class UserCreditRechargeRepository extends AbstractRepository<UserCreditRecharge> {
  protected readonly logger = new Logger(UserCreditRechargeRepository.name);

  constructor(
    @InjectModel(UserCreditRecharge.name) UserCreditRechargeModel: Model<UserCreditRecharge>,
    @InjectConnection() connection: Connection
  ) {
    super(UserCreditRechargeModel,connection);
  }
}
