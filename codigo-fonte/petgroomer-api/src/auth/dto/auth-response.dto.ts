import { ApiProperty } from '@nestjs/swagger';
import { PublicUserDto } from './public-user.dto';

export class AuthResponseDto {
  @ApiProperty() access: string;
  @ApiProperty({ type: PublicUserDto }) user: PublicUserDto;
}
