/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
// import * as multer from 'multer';
// import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure multer middleware for file uploads

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // Swagger UI Implement

  const config = new DocumentBuilder()
    .setTitle('PMS API Endpoint')
    .setDescription('The PMS API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        // testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header'
      },
      'access-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Configure Class Validator as global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // Enable cors
  app.enableCors();
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000, () => {
    console.log(
      `App running on port ${
        process.env.PORT ? parseInt(process.env.PORT) : 3000
      }`,
    );
  });
}
bootstrap();
