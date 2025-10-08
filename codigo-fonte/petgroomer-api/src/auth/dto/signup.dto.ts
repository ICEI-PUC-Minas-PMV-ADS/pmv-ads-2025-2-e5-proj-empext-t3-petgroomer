import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'cliente@pg.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Fulano' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ['ADMIN','PETSHOP','CLIENTE'], required: false })
  @IsOptional()
  @IsIn(['ADMIN','PETSHOP','CLIENTE'])
  role?: 'ADMIN'|'PETSHOP'|'CLIENTE';
}
