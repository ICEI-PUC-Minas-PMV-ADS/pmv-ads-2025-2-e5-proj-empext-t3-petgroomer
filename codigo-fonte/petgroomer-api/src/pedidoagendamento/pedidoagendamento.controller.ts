import { Controller, Post, Body, Get } from '@nestjs/common';
import { PedidoagendamentoService } from './pedidoagendamento.service';

@Controller('pedidoagendamento')
export class PedidoagendamentoController {
  constructor(private readonly pedidoagendamentoService: PedidoagendamentoService) {}

  // Criar novo pedido
  @Post()
  async criarPedido(@Body() body: any) {
    return this.pedidoagendamentoService.criarPedido(body);
  }

  // Listar todos os pedidos
  @Get()
  async listarPedidos() {
    return this.pedidoagendamentoService.listarPedidos();
  }
}
