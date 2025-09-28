import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async signup(dto: { email: string; password: string; name: string; role?: 'ADMIN'|'PETSHOP'|'CLIENTE' }) {
    const exists = await this.users.findByEmail(dto.email);
    if (exists) throw new UnauthorizedException('Email já cadastrado');
    const user = await this.users.create(dto);
    return this.issueTokens(user.id, user.role);
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    const ok = await bcrypt.compare(dto.password, user.hash);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');
    return this.issueTokens(user.id, user.role);
  }

  private async issueTokens(sub: string, role: string) {
    const access = await this.jwt.signAsync(
      { sub, role },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: process.env.ACCESS_TOKEN_TTL || '15m' },
    );
    const refresh = await this.jwt.signAsync(
      { sub, role, type: 'refresh' },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.REFRESH_TOKEN_TTL || '7d' },
    );
    const refreshHash = await bcrypt.hash(refresh, 12);
    await this.prisma.user.update({ where: { id: sub }, data: { refreshTokenHash: refreshHash }});
    return { access, refresh };
  }

  async rotate(refreshToken: string | undefined) {
    if (!refreshToken) throw new UnauthorizedException();
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub }});
      if (!user || !user.refreshTokenHash) throw new UnauthorizedException();
      const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
      if (!ok) throw new UnauthorizedException();
      return this.issueTokens(user.id, user.role);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
