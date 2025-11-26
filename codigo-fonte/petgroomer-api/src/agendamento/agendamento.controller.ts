import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import {
  UpdateAgendamentoDto,
  UpdateAgendamentoStatusDto,
} from './dto/update-agendamento.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StatusAgendamento } from '@prisma/client';

@ApiTags('Agendamentos')
@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly svc: AgendamentoService) {}

  @Get('calendar')
  @ApiOperation({
    summary:
      'Lista agendamentos para calendário (PENDENTE, APROVADO, RECUSADO para admin)',
  })
  calendar() {
    return this.svc.findForCalendar();
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findById(id);
  }

  @Post()
  create(@Body() dto: CreateAgendamentoDto) {
    const body: any = dto as any;

    const userId = body.userId ?? body.cliente;
    if (!userId) {
      throw new Error('userId (or cliente) is required');
    }

    return this.svc.create({
      userId,
      data: new Date(dto.data),
      status: dto.status,
      servicoId: dto.servicoId,
    });
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAgendamentoDto,
  ) {
    const patch: any = {};

    if (dto.data) patch.data = new Date(dto.data);
    if (dto.status) patch.status = dto.status;

    return this.svc.update(id, patch);
  }

  @Put(':id/alterar-status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAgendamentoStatusDto,
  ) {
    return this.svc.updateStatus(id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
