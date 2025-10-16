// src/servico/servico.module.ts
import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], 
  controllers: [ServicoController],
  providers: [ServicoService],
})
export class ServicoModule {}
