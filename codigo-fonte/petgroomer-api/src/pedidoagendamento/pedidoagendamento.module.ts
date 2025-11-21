import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PedidoagendamentoController } from './pedidoagendamento.controller';
import { PedidoagendamentoService } from './pedidoagendamento.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [PedidoagendamentoController],
  providers: [PedidoagendamentoService],
})
export class PedidoagendamentoModule {}
