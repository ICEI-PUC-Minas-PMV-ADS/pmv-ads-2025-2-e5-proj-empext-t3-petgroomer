import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = parseInt(process.env.PORT || '4000', 10);
    const corsOrigin = [
    'http://localhost:3000',
    'https://pmv-ads-2025-2-e5-proj-empext-t3-petgroomer-production.up.railway.app',
    'https://front-production-5b76.up.railway.app', // URL do seu frontend
    process.env.FRONTEND_URL, // Variável de ambiente
  ].filter(Boolean);


    app.enableCors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PetGroomer API')
    .setDescription('Documentação da API do PetGroomer')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('refresh_token')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, '0.0.0.0');
  console.log(`API rodando em http://localhost:${port} (docs em /docs)`);
}
bootstrap();
