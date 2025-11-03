import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidoagendamentoService {
  constructor(private readonly prisma: PrismaService) {}

  async criarPedido(data: any) {
    const { cliente, servico, data: dataAgendamento } = data;

    return await this.prisma.pedidoAgendamento.create({
      data: {
        cliente,
        servico, // ✅ Incluído aqui
        data: new Date(dataAgendamento),
        status: 'pendente',
      },
    });
  }

  async listarPedidos() {
    return await this.prisma.pedidoAgendamento.findMany();
  }
}
