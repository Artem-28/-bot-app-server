import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('API_PORT', 3000);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    Logger.log(`Server started on http://localhost:${port}`, 'Main');
  });
}
bootstrap();
