import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateAgendamentoDto {
  @IsOptional()
  @IsISO8601()
  data?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
