import { NestFactory } from '@nestjs/core';
import { BillingServicesModule } from './billing-services.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BillingServicesModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
