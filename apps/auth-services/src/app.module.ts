import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerServicesModule } from 'apps/manager-services/src/manager-services.module';

@Module({
  imports: [ManagerServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
