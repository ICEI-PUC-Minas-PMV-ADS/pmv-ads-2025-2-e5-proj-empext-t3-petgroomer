import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(dto: { email: string; password: string; name: string; role?: 'ADMIN'|'PETSHOP'|'CLIENTE' }) {
    const hash = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.create({
      data: { email: dto.email, hash, name: dto.name, role: dto.role ?? 'CLIENTE' },
    });
  }
}
