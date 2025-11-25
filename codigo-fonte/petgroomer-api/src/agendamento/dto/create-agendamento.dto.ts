import { IsISO8601, IsOptional, IsEnum, IsString, IsInt } from 'class-validator';
import { StatusAgendamento } from '@prisma/client';

export class CreateAgendamentoDto {
  @IsString()
  userId: string;

  @IsISO8601()
  data: string; // ISO date string

  @IsOptional()
  @IsEnum(StatusAgendamento)
  status?: StatusAgendamento;

  @IsInt()
  servicoId: number;
}
