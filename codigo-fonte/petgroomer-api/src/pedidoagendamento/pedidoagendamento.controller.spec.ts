import { Test, TestingModule } from '@nestjs/testing';
import { PedidoagendamentoController } from './pedidoagendamento.controller';

describe('PedidoagendamentoController', () => {
  let controller: PedidoagendamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoagendamentoController],
    }).compile();

    controller = module.get<PedidoagendamentoController>(PedidoagendamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
