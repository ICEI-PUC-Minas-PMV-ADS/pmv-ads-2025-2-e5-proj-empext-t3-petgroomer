import { Controller, Post, Body, Get, Req, UnauthorizedException, BadRequestException, UseGuards } from '@nestjs/common';
import { PedidoagendamentoService } from './pedidoagendamento.service';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { StatusAgendamento } from '@prisma/client';
import { AccessTokenGuard } from '../auth/access-token.guard';

@UseGuards(AccessTokenGuard)
@Controller('pedidoagendamento')
export class PedidoagendamentoController {
  constructor(
    private readonly pedidoagendamentoService: PedidoagendamentoService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  async criarPedido(@Body() body: any, @Req() req: Request) {
    const user: any = (req as any).user;
    let userId: string | undefined = undefined;
    let nomeClienteManual: string | undefined = undefined;

    if (!user || !user.role) {
      throw new UnauthorizedException('Usuário não autenticado. Faça login.');
    }

    if (user.role === 'ADMIN') {
      if (body.clienteNome) {
        const cliente = await this.prisma.user.findFirst({
          where: { name: body.clienteNome }
        });
        if (cliente) {
          userId = cliente.id;
        } else {
          nomeClienteManual = body.clienteNome;
        }
      }
    } else {
      userId = user.id;
      if (!userId) {
        throw new BadRequestException('userId é obrigatório para não-admins');
      }
    }

    if (!body.data) {
      throw new BadRequestException('Data do agendamento é obrigatória');
    }

    if (!body.servicoId) {
      throw new BadRequestException('servicoId é obrigatório');
    }

    const status: StatusAgendamento = StatusAgendamento.PENDENTE;

    // Converta servicoId para number
    const servicoId = parseInt(body.servicoId, 10);
    if (isNaN(servicoId)) {
      throw new BadRequestException('servicoId deve ser um número válido');
    }

    return this.pedidoagendamentoService.criarPedido({
      userId,
      data: new Date(body.data),
      status,
      nomeClienteManual,
      servicoId, // Agora é number
    });
  }

  @Get()
  async listarPedidos() {
    return this.pedidoagendamentoService.listarPedidos();
  }
}