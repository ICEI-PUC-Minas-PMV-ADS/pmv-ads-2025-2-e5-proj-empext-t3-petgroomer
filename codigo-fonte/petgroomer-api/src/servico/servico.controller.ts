import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Servicos')
@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo serviço' })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso.' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      nome: { type: 'string' }, 
      valor: { type: 'number' } 
    } 
  }})
  create(@Body() data: { nome: string; valor: number }) {
    return this.servicoService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os serviços' })
  @ApiResponse({ status: 200, description: 'Lista de serviços.' })
  findAll() {
    return this.servicoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um serviço pelo ID' })
  @ApiResponse({ status: 200, description: 'Serviço encontrado.' })
  findOne(@Param('id') id: string) {
    return this.servicoService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um serviço pelo ID' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado.' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      nome: { type: 'string' }, 
      valor: { type: 'number' } 
    } 
  }})
  update(@Param('id') id: string, @Body() data: { nome?: string; valor?: number }) {
    return this.servicoService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um serviço pelo ID' })
  @ApiResponse({ status: 200, description: 'Serviço deletado.' })
  remove(@Param('id') id: string) {
    return this.servicoService.remove(Number(id));
  }
}
