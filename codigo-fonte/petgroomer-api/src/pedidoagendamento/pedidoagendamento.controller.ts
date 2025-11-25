import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Put,
  Param,
  UnauthorizedException,
  BadRequestException,
  UseGuards,
  InternalServerErrorException,
  Logger
} from '@nestjs/common';
import { PedidoagendamentoService } from './pedidoagendamento.service';
import { PrismaService } from '../prisma/prisma.service';
import { StatusAgendamento } from '@prisma/client';
import { AccessTokenGuard } from '../auth/access-token.guard';
import type { Request } from 'express';

@UseGuards(AccessTokenGuard)
@Controller('pedidoagendamento')
export class PedidoagendamentoController {
  private readonly logger = new Logger(PedidoagendamentoController.name);

  constructor(
    private readonly pedidoagendamentoService: PedidoagendamentoService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  async criarPedido(@Body() body: any, @Req() req: Request) {
    try {
      const user: any = (req as any).user;

      if (!user || !user.role) {
        throw new UnauthorizedException('Usuário não autenticado.');
      }

      let userId: string | undefined = undefined;
      let nomeClienteManual: string | undefined = undefined;

      if (user.role === 'ADMIN') {
        if (body.clienteNome) {
          const cliente = await this.prisma.user.findFirst({
            where: { name: body.clienteNome }
          });
          userId = cliente?.id;
          if (!cliente) nomeClienteManual = body.clienteNome;
        }
      } else {
        userId = user.id;
      }

      if (!body.data) throw new BadRequestException('Data é obrigatória.');
      if (!body.servicoId) throw new BadRequestException('servicoId é obrigatório.');

      const servicoId = Number(body.servicoId);

      return await this.pedidoagendamentoService.criarPedido({
        userId,
        data: new Date(body.data),
        status: StatusAgendamento.PENDENTE,
        nomeClienteManual,
        servicoId
      });

    } catch (error) {
      throw new InternalServerErrorException('Erro interno ao criar agendamento');
    }
  }

  @Get()
  async listarPedidos() {
    return this.pedidoagendamentoService.listarPedidos();
  }

  // ================================
  //           PUT STATUS
  // ================================
  @Put(':id/status')
  async atualizarStatus(
    @Param('id') id: string,
    @Body('status') status: StatusAgendamento
  ) {
    if (!status) {
      throw new BadRequestException('status é obrigatório');
    }

    return this.pedidoagendamentoService.atualizarStatus(Number(id), status);
  }
}
