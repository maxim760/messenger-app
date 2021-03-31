import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );
  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, '0.0.0.0', () => {
    console.log('serve starten on', PORT);
  });
}
bootstrap();
