import { NestFactory } from '@nestjs/core';
import { ManagerServicesModule } from './manager-services.module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(ManagerServicesModule);
  const configService = app.get(ConfigService);
  // await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
