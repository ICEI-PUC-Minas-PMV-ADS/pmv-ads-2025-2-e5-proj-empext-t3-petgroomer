import { Test, TestingModule } from '@nestjs/testing';
import { PedidoagendamentoService } from './pedidoagendamento.service';

describe('PedidoagendamentoService', () => {
  let service: PedidoagendamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoagendamentoService],
    }).compile();

    service = module.get<PedidoagendamentoService>(PedidoagendamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
