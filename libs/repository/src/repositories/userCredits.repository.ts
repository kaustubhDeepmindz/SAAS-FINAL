import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { UserCredits } from '../schemas/userCredits.schema';

@Injectable()
export class UserCreditsRepository extends AbstractRepository<UserCredits> {
  protected readonly logger = new Logger(UserCreditsRepository.name);

  constructor(
    @InjectModel(UserCredits.name) userCreditsModel: Model<UserCredits>,
    @InjectConnection() connection: Connection
  ) {
    super(userCreditsModel,connection);
  }
}
