import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServicoModule } from './servico/servico.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { PedidoagendamentoModule } from './pedidoagendamento/pedidoagendamento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    ServicoModule,
    AgendamentoModule,
    PedidoagendamentoModule,
  ],
})
export class AppModule {}
