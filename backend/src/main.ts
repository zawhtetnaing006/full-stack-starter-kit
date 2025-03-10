import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MyLoggerService } from './my-logger/my-logger.service';
import {
  NestApplicationOptions,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ApiResponseInterceptor } from './api-response/api-response.interceptor';
import { ApiExceptionFilter } from './api-response/api-exception-filter';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const applicationOptions: NestApplicationOptions = {
    logger: new MyLoggerService(),
    cors: true,
  };
  const app = await NestFactory.create(AppModule, applicationOptions);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    }),
  );
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ApiExceptionFilter());
  app.use(
    '/doc',
    expressBasicAuth({
      users: { admin: 'admin' },
      challenge: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Chat Engine')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  await app.listen(3000);
}
bootstrap();
