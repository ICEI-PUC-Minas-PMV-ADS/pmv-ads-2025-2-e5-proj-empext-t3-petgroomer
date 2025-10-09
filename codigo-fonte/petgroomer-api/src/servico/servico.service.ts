// src/servico/servico.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicoService {
  constructor(private prisma: PrismaService) {}

  create(data: { nome: string; valor: number }) {
    return this.prisma.servico.create({
      data,
    });
  }

  findAll() {
    return this.prisma.servico.findMany();
  }

  findOne(id: number) {
    return this.prisma.servico.findUnique({
      where: { id },
    });
  }

  update(id: number, data: { nome?: string; valor?: number }) {
    return this.prisma.servico.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.servico.delete({
      where: { id },
    });
  }
}
