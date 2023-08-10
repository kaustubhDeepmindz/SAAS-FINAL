import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common';
import { ServiceAccount, ServiceAccountSchema } from './schemas/ServiceAccount.schema';
import { ServiceAccountRepository } from './repositories/serviceAccount.repository';
import { ProjectRepository } from './repositories/project.repository';
import { Project, ProjectSchema } from './schemas/Project/Project.schema';
import { ProjectService, ProjectServiceSchema } from './schemas/Project/ProjectService.schema';
import { ProjectServiceRepository } from './repositories/projectService.repository';
import { ProjectServiceKeys, ProjectServiceKeysSchema } from './schemas/Project/ProjectServiceKeys.schema';
import { ProjectServiceKeysRepository } from './repositories/projectServiceKeys.repository';
import { PaymentDetailsRepository } from './repositories/paymentDetails.repository';
import { PaymentDetails, PaymentDetailsSchema } from './schemas/Payment/PaymentDetails.schema';
import { Usage, UsageSchema } from './schemas/Billing/Usage.schema';
import { UserServiceStatus, UserServiceStatusSchema } from './schemas/Billing/UserServiceStatus.schema';
import { UsageRepository } from './repositories/usage.repository';
import { UserServiceStatusRepository } from './repositories/userServiceStatus.repository';
import { UserCreditsRepository } from './repositories/userCredits.repository';
import { UserCredits, UserCreditsSchema } from './schemas/userCredits.schema';
import { UserCreditRechargeRepository } from './repositories/userCreditRecharge.repository';
import { UserCreditRechargeSchema, UserCreditRecharge } from './schemas/userCreditRecharge.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './repositories/user.respository';

@Module({
  imports: [
    
    DatabaseModule,
    MongooseModule.forFeature([
      { name: ServiceAccount.name, schema: ServiceAccountSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: ProjectService.name, schema: ProjectServiceSchema },
      { name: ProjectServiceKeys.name, schema: ProjectServiceKeysSchema },
      { name: PaymentDetails.name, schema: PaymentDetailsSchema },
      { name: User.name, schema: UserSchema },
      { name: Usage.name, schema: UsageSchema },
      { name: UserServiceStatus.name, schema: UserServiceStatusSchema },
      { name: UserCredits.name, schema: UserCreditsSchema },
      { name: UserCreditRecharge.name, schema: UserCreditRechargeSchema }
    ]),
  ],
  providers: [ServiceAccountRepository, ProjectRepository, ProjectServiceRepository, ProjectServiceKeysRepository, PaymentDetailsRepository, UsageRepository, UserServiceStatusRepository, UserCreditsRepository, UserCreditRechargeRepository, UserRepository],
  exports: [ServiceAccountRepository, ProjectRepository, ProjectServiceRepository, ProjectServiceKeysRepository, PaymentDetailsRepository,  UsageRepository, UserServiceStatusRepository, UserCreditsRepository, UserCreditRechargeRepository, UserRepository],
})
export class RepositoryModule { }
