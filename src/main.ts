import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from '@/app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = await app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('API_PORT', 3000);

  await app.listen(port, () => {
    Logger.log(`Server started on http://localhost:${port}`, 'Main');
  });
}
bootstrap();
