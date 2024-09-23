import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnv } from './utils/env.validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const { PORT } = validateEnv();

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Railway Backend API Documentation')
    .setDescription(' API description')
    .setVersion('1.0')
    .addServer('http://localhost:5000/', 'Local environment')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  // app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(PORT);
}
bootstrap();
