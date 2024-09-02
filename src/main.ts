import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}));
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
