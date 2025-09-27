import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,        // disponível em toda a app
      envFilePath: '.env',   // default, mas explícito
    }),
    UsersModule,
    AuthModule,
  ],
})

export class AppModule {}
