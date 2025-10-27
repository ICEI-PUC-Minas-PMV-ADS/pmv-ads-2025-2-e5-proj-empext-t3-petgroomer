import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiBody, ApiOkResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SignupDto })
  @ApiOkResponse({ type: AuthResponseDto })
  async signup(@Body() dto: any, @Res({ passthrough: true }) res: Response) {
    const { access, refresh, user } = await this.auth.signup(dto);
    this.setRefreshCookie(res, refresh);
    return { access, user };
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthResponseDto })
  async login(@Body() dto: any, @Res({ passthrough: true }) res: Response) {
    const { access, refresh, user } = await this.auth.login(dto);
    this.setRefreshCookie(res, refresh);
    return { access, user };
  }

  @Post('refresh')
  @ApiCookieAuth('refresh_token')
  @ApiOkResponse({ type: AuthResponseDto })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = (req as any).cookies?.refresh_token;
    const { access, refresh, user } = await this.auth.rotate(token);
    this.setRefreshCookie(res, refresh);
    return { access, user };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', { path: '/' });
    return { ok: true };
  }

  private setRefreshCookie(res: Response, token: string) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: false, // true em produção com HTTPS
      sameSite: 'lax',
      domain: process.env.COOKIE_DOMAIN,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }
}
