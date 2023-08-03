import { NestFactory } from '@nestjs/core';
import { PaymentServicesModule } from './payment-services.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentServicesModule);
  await app.listen(3300);
}
bootstrap();
