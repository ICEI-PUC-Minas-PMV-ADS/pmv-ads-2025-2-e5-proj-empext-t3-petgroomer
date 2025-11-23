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
    servicoId: number; // ADICIONE ESTA LINHA
  }) {
    // Verifique se o serviço existe
    const servico = await this.prisma.servico.findUnique({
      where: { id: data.servicoId }
    });

    if (!servico) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return this.prisma.agendamento.create({
      data: {
        userId: data.userId, // Não force string vazia, deixe como undefined se não houver
        data: data.data,
        status: data.status,
        nomeClienteManual: data.nomeClienteManual,
        servicoId: data.servicoId, // ADICIONE ESTA LINHA
      },
      include: {
        servico: true,
        cliente: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async listarPedidos() {
    return this.prisma.agendamento.findMany({ 
      include: { 
        servico: true,
        cliente: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        data: 'asc',
      },
    });
  }
}