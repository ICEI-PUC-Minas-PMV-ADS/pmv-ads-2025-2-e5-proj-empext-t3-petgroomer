import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusAgendamento } from '@prisma/client';

@Injectable()
export class PedidoagendamentoService {
  constructor(private readonly prisma: PrismaService) {}

  async criarPedido(data: {
    userId?: string;
    data: Date;
    status: StatusAgendamento;
    nomeClienteManual?: string;
    servicoId: number;
  }) {
    return this.prisma.agendamento.create({
      data: {
        userId: data.userId,
        data: data.data,
        status: data.status,
        nomeClienteManual: data.nomeClienteManual,
        servicoId: data.servicoId,
      },
      include: {
        servico: true,
        cliente: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async listarPedidos() {
    return this.prisma.agendamento.findMany({
      include: {
        servico: true,
        cliente: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { data: 'asc' }
    });
  }

  // ================================
  //       NOVO MÉTODO STATUS
  // ================================
  async atualizarStatus(id: number, status: StatusAgendamento) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id }
    });

    if (!agendamento) throw new NotFoundException('Agendamento não encontrado');

    return this.prisma.agendamento.update({
      where: { id },
      data: { status },
      include: {
        servico: true,
        cliente: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }
}
