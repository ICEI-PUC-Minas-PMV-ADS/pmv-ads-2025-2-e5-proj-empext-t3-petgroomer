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
  @ApiOperation({ summary: 'Lista agendamentos para calendário (PENDENTE, APROVADO, RECUSADO para admin)' })
  calendar(@Param() params: any) {
    // Get user role from query parameter
    const role = params?.role || null;
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
    // Accept either `userId` or `cliente` (frontend uses `cliente` in some places)
    const body: any = dto as any;
    const userId = body.userId ?? body.cliente;
    if (!userId) {
      throw new Error('userId (or cliente) is required');
    }
    const payload = { userId, data: new Date(dto.data), status: dto.status, servicoId: dto.servicoId };
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
    this.svc.updateStatus(params.id, params.status as any);
  }

  

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
