import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AccessTokenGuard } from './access-token.guard';

@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => UsersModule), // 👈 evita ciclo
    PrismaModule,
  ],
  providers: [AuthService, AccessTokenGuard],
  controllers: [AuthController],
  exports: [AccessTokenGuard, JwtModule],
})
export class AuthModule {}
