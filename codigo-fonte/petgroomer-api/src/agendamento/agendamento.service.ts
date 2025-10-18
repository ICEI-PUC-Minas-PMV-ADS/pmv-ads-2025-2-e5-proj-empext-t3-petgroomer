import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusAgendamento } from '@prisma/client';

@Injectable()
export class AgendamentoService {
	constructor(private prisma: PrismaService) {}

	// Get agendamentos for calendar (PENDENTE and APROVADO)
	async findForCalendar() {
		return this.prisma.agendamento.findMany({
			where: { status: { in: [StatusAgendamento.PENDENTE, StatusAgendamento.APROVADO] } },
			include: { cliente: { select: { id: true, name: true, email: true } } },
			orderBy: { data: 'asc' },
		});
	}

	async findAll() {
		return this.prisma.agendamento.findMany({ include: { cliente: true } });
	}

	async findById(id: number) {
		const item = await this.prisma.agendamento.findUnique({ where: { id }, include: { cliente: true } });
		if (!item) throw new NotFoundException('Agendamento não encontrado');
		return item;
	}

	async create(data: { userId: string; data: Date; status?: StatusAgendamento }) {
		return this.prisma.agendamento.create({ data });
	}

	async update(id: number, patch: Partial<{ data: Date; status: StatusAgendamento }>) {
		await this.findById(id);
		return this.prisma.agendamento.update({ where: { id }, data: patch });
	}

	async remove(id: number) {
		await this.findById(id);
		return this.prisma.agendamento.delete({ where: { id } });
	}
}
