import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common';
import { ServiceAccount, ServiceAccountSchema } from './schemas/ServiceAccount.schema';
import { ServiceAccountRepository } from './repositories/serviceAccount.repository';
import { ProjectRepository } from './repositories/project.repository';
import { Project, ProjectSchema } from './schemas/Project/Project.schema';


@Module({
  imports: [
    
    DatabaseModule,
    MongooseModule.forFeature([
      { name: ServiceAccount.name, schema: ServiceAccountSchema },
      { name: Project.name, schema: ProjectSchema }
    ]),
  ],
  providers: [ServiceAccountRepository, ProjectRepository],
  exports: [ServiceAccountRepository, ProjectRepository],
})
export class RepositoryModule { }
