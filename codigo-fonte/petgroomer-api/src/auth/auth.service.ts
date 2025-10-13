import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN'|'PETSHOP'|'CLIENTE';
  createdAt: Date;
};


function toPublicUser(u: any): PublicUser {
  return { id: u.id, email: u.email, name: u.name, role: u.role, createdAt: u.createdAt };
}

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

    const user = await this.users.create(dto); // contém id/role/etc
    const tokens = await this.issueTokens(user.id, user.role);
    return { ...tokens, user: toPublicUser(user) };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const ok = await bcrypt.compare(dto.password, user.hash);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');

    const tokens = await this.issueTokens(user.id, user.role);
    return { ...tokens, user: toPublicUser(user) };
  }

  async rotate(refreshToken: string | undefined) {
    if (!refreshToken) throw new UnauthorizedException();
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub }});
      if (!user || !user.refreshTokenHash) throw new UnauthorizedException();

      const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
      if (!ok) throw new UnauthorizedException();

      const tokens = await this.issueTokens(user.id, user.role);
      return { ...tokens, user: toPublicUser(user) };
    } catch {
      throw new UnauthorizedException();
    }
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
}
