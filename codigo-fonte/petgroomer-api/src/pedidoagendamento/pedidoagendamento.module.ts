import { Module } from '@nestjs/common';
import { PedidoagendamentoController } from './pedidoagendamento.controller';
import { PedidoagendamentoService } from './pedidoagendamento.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PedidoagendamentoController],
  providers: [PedidoagendamentoService],
})
export class PedidoagendamentoModule {}
