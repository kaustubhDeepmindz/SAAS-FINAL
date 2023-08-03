// import { AuthModule } from './module';
import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { AuthModule } from './module';
// import { AuthModule, AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(3000);
}
bootstrap();
