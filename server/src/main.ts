import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import Helmet from 'helmet';
import * as session from 'express-session';
import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
const xss = require('xss-clean');

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Helmet());
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.use(csurf());
  app.use(xss());
  app.use(
    session({
      secret: 'process.env.SESSION_KEY',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(PORT, () => {
    console.log(`runing on port ${PORT}`);
  });
}

bootstrap();
