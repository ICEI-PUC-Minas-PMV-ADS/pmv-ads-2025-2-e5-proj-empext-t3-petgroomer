import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusAgendamento } from '@prisma/client';

export class UpdateAgendamentoDto {
  @IsOptional()
  @IsISO8601()
  data?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

export class UpdateAgendamentoStatusDto {
  status: StatusAgendamento;

  @IsNumber()
  id: number;
}