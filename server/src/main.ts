import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


const PORT = 5000;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  })
  await app.listen(PORT, () => {
    console.log('serve starten on', PORT);
  });
}
bootstrap();
