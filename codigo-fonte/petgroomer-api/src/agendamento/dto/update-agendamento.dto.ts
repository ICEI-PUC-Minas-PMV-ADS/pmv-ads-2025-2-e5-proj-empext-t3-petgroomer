import { IsISO8601, IsNumber, IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
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
  @IsString()
  status: string;

  
}