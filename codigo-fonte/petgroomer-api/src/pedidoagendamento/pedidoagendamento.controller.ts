import { Controller, Post, Body, Get, Req, UnauthorizedException, BadRequestException, UseGuards, InternalServerErrorException, Logger } from '@nestjs/common';
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
      this.logger.log('Recebendo requisição POST /pedidoagendamento');
      this.logger.log('Body:', JSON.stringify(body));

      const user: any = (req as any).user;
      this.logger.log('User:', JSON.stringify(user));

      if (!user || !user.role) {
        throw new UnauthorizedException('Usuário não autenticado. Faça login.');
      }

      let userId: string | undefined = undefined;
      let nomeClienteManual: string | undefined = undefined;

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

      const servicoId = parseInt(body.servicoId, 10);
      if (isNaN(servicoId)) {
        throw new BadRequestException('servicoId deve ser um número válido');
      }

      // VERIFICAR SE O SERVIÇO EXISTE
      const servico = await this.prisma.servico.findUnique({
        where: { id: servicoId }
      });

      if (!servico) {
        throw new BadRequestException(`Serviço com ID ${servicoId} não encontrado`);
      }

      const status: StatusAgendamento = StatusAgendamento.PENDENTE;

      this.logger.log('Criando agendamento com:', {
        userId,
        data: body.data,
        servicoId,
        status
      });

      const resultado = await this.pedidoagendamentoService.criarPedido({
        userId,
        data: new Date(body.data),
        status,
        nomeClienteManual,
        servicoId,
      });

      this.logger.log('Agendamento criado com sucesso:', resultado.id);
      return resultado;

    } catch (error) {
      this.logger.error('Erro ao criar agendamento:', error);
      
      if (error instanceof UnauthorizedException || 
          error instanceof BadRequestException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  @Get()
  async listarPedidos() {
    return this.pedidoagendamentoService.listarPedidos();
  }
}