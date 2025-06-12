import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser'; // ✅ import manually if needed

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.use(bodyParser.json()); // ✅ optional: override JSON body size limit etc.
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3055);
  console.log(` Server running at http://localhost:3055`);
  console.log(`email sent successfully`);
}
bootstrap();
