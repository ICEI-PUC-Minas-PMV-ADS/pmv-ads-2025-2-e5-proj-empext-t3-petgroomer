import { IsISO8601, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateAgendamentoDto {
  @IsString()
  userId: string;

  @IsISO8601()
  data: string; // ISO date string

  @IsOptional()
  @IsString()
  status?: string;

  @IsInt()
  servicoId: number;
}
