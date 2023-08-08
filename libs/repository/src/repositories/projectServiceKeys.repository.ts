import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { ProjectServiceKeys } from '../schemas/Project/ProjectServiceKeys.schema';


@Injectable()
export class ProjectServiceKeysRepository extends AbstractRepository<ProjectServiceKeys> {
  protected readonly logger = new Logger(ProjectServiceKeysRepository.name);

  constructor(
    @InjectModel(ProjectServiceKeys.name) projectServiceKeysModel: Model<ProjectServiceKeys>,
    @InjectConnection() connection: Connection
  ) {
    super(projectServiceKeysModel,connection);
  }
}
