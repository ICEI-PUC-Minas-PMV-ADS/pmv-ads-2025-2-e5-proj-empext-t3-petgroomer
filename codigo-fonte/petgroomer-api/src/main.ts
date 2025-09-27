import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Segurança básica
  app.use(helmet());
  app.use(cookieParser());

  // Config
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 4000;
  const corsOrigin = configService.get<string>('CORS_ORIGIN') ?? 'http://localhost:3000';

  // CORS (front separado)
  app.enableCors({
    origin: corsOrigin,
    credentials: true, // permitirá cookies httpOnly no futuro
  });

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
