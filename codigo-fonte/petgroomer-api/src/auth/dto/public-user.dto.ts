import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  @ApiProperty() id: string;
  @ApiProperty() email: string;
  @ApiProperty() name: string;
  @ApiProperty({ enum: ['ADMIN','PETSHOP','CLIENTE'] }) role: 'ADMIN'|'PETSHOP'|'CLIENTE';
  @ApiProperty() createdAt: Date;
}
