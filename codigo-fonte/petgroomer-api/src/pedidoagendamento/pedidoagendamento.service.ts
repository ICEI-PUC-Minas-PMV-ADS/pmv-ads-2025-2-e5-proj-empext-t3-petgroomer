
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusAgendamento } from '@prisma/client';

@Injectable()
export class PedidoagendamentoService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria um novo agendamento (pedido)

  async criarPedido(data: { userId?: string; data: Date; status?: StatusAgendamento; nomeClienteManual?: string; servicoId: number }) {
    return this.prisma.agendamento.create({ data: { ...data } });
  }

  // Lista todos os agendamentos
  async listarPedidos() {
    // Inclui cliente (se houver) e também retorna nomeClienteManual
    return this.prisma.agendamento.findMany({ include: { cliente: true } });
  }
}
