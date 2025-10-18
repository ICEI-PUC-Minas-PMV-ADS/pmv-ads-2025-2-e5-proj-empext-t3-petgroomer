import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto, UpdateAgendamentoStatusDto } from './dto/update-agendamento.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Agendamentos')
@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly svc: AgendamentoService) {}

  @Get('calendar')
  @ApiOperation({ summary: 'Lista agendamentos para calendário (PENDENTE, APROVADO)' })
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
    const payload = { userId: dto.userId, data: new Date(dto.data), status: dto.status };
    return this.svc.create(payload as any);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAgendamentoDto) {
    const patch: any = {};
    if (dto.data) patch.data = new Date(dto.data);
    if (dto.status) patch.status = dto.status;
    return this.svc.update(id, patch);
  }

  @Put("alterar-status")
  alterarStatus(@Body() params: UpdateAgendamentoStatusDto){
    this.svc.updateStatus(params.id,params.status)
    
    
    
  }

  

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
