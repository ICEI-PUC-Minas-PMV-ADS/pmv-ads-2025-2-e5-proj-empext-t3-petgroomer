import { Controller, Post, Body, Get, Req, UnauthorizedException, BadRequestException, UseGuards } from '@nestjs/common';
import { PedidoagendamentoService } from './pedidoagendamento.service';
import type { Request } from 'express'; 
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

  // Criar novo pedido/agendamento
  @Post()
  async criarPedido(@Body() body: any, @Req() req: Request) {
    // Simulação de autenticação: req.user deve estar preenchido pelo middleware de autenticação
    // Exemplo: req.user = { id: '...', role: 'ADMIN' | 'CLIENTE' }
    const user: any = (req as any).user;

    let userId: string | undefined = undefined;
    let nomeClienteManual: string | undefined = undefined;

    // Always check authentication first and return 401 if not logged in
    if (!user || !user.role) {
      throw new UnauthorizedException('Usuário não autenticado. Faça login.');
    }


    if (user.role === 'ADMIN') {
      // Admin pode especificar cliente por nome, mas não é obrigatório
      if (body.clienteNome) {
        // Busca o cliente pelo nome
        const cliente = await this.prisma.user.findFirst({ where: { name: body.clienteNome } });
        if (cliente) {
          userId = cliente.id;
        } else {
          nomeClienteManual = body.clienteNome;
        }
      }
    } else {
      // Cliente comum: usa o próprio id
      userId = user.id;
      if (!userId) {
        throw new BadRequestException('userId é obrigatório para não-admins');
      }
    }

    if (!body.data) {
      throw new BadRequestException('Data do agendamento é obrigatória');
    }

    // Status padrão: PENDENTE
    const status: StatusAgendamento = StatusAgendamento.PENDENTE;

    if (!body.servicoId) {
      throw new BadRequestException('servicoId é obrigatório');
    }

    return this.pedidoagendamentoService.criarPedido({
      userId,
      data: new Date(body.data),
      status,
      nomeClienteManual,
      servicoId: body.servicoId,
    });
  }

  // Listar todos os agendamentos
  @Get()
  async listarPedidos() {
    return this.pedidoagendamentoService.listarPedidos();
  }
}
