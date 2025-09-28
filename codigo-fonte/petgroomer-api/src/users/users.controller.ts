import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '../auth/access-token.guard';


@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}
  @Get('by-email')
  byEmail(@Query('email') email: string) {
    return this.users.findByEmail(email);
  }
  @UseGuards(AccessTokenGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return req.user; // payload do JWT
  }
}
