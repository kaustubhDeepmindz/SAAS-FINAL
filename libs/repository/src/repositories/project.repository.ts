import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Project } from '../schemas/Project/Project.schema';



@Injectable()
export class ProjectRepository extends AbstractRepository<Project> {
  protected readonly logger = new Logger(ProjectRepository.name);

  constructor(
    @InjectModel(Project.name) serviceAccountModel: Model<Project>,
    @InjectConnection() connection: Connection
  ) {
    super(serviceAccountModel,connection);
  }
}
