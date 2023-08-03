import { NestFactory } from '@nestjs/core';
import { BillingServicesModule } from './billing-services.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingServicesModule);
  await app.listen(3100);
}
bootstrap();
