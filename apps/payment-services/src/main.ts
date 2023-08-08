import { NestFactory } from '@nestjs/core';
import { PaymentServicesModule } from './payment-services.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentServicesModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') || 5500);
}
bootstrap();
