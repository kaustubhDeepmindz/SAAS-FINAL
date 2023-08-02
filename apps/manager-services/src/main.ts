import { NestFactory } from '@nestjs/core';
import { ManagerServicesModule } from './manager-services.module';

async function bootstrap() {
  const app = await NestFactory.create(ManagerServicesModule);
  await app.listen(3000);
}
bootstrap();
