import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { ProjectService } from '../schemas/Project/ProjectService.schema';


@Injectable()
export class ProjectServiceRepository extends AbstractRepository<ProjectService> {
  protected readonly logger = new Logger(ProjectServiceRepository.name);

  constructor(
    @InjectModel(ProjectService.name) projectServiceModel: Model<ProjectService>,
    @InjectConnection() connection: Connection
  ) {
    super(projectServiceModel,connection);
  }
}
