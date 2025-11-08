import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Segurança básica
  app.use(helmet());
  app.use(cookieParser());

  // Config
  const configService = app.get(ConfigService);
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
  await app.listen(port, '0.0.0.0');

  const corsOrigin = configService.get<string>('CORS_ORIGIN') ?? 'http://localhost:3000';

  // CORS (front separado)
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3000'],
    credentials: true, // permitirá cookies httpOnly no futuro
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PetGroomer API')
    .setDescription('Documentação da API do PetGroomer')
    .setVersion('1.0')
    .addBearerAuth()        // auth por access token (header)
    .addCookieAuth('refresh_token') // refresh token via cookie httpOnly (futuro)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`API rodando em http://localhost:${port} (docs em /docs)`);
}
bootstrap();
