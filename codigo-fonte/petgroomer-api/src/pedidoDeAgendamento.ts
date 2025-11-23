import { PrismaClient, Prisma } from '@prisma/client';
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

// --- ROTAS EXISTENTES (Exemplo) ---

// Rota para buscar todos os agendamentos para o calendário
router.get('/agendamentos/calendar', async (req: Request, res: Response) => {

    try {
        const agendamentos = await prisma.agendamento.findMany({
            include: {
                cliente: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });
        res.json(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Falha ao buscar agendamentos.' });
    }
});

// Rota para criar um novo agendamento
router.post('/agendamentos', async (req: Request, res: Response) => {

    // ... lógica para criar um agendamento ...
    res.status(201).json({ message: "Agendamento criado com sucesso" });
});


// --- NOVAS ROTAS QUE VOCÊ PEDIU ---

/**
 * ROTA PARA ATUALIZAR O STATUS (Aceitar Agendamento)
 * Chamada pelo front-end quando o botão "Aceitar" é clicado.
 * Recebe: PATCH /agendamentos/:id/status
 * Corpo (body): { "status": "APROVADO" }
 */
router.put('/agendamentos/:id/status', async (req: Request, res: Response) => {

   

    try {
         const { id } = req.params;
    const { status } = req.body;

    // Validação para garantir que apenas o status 'APROVADO' seja processado aqui
    if (status !== 'APROVADO') {
        return res.status(400).json({ error: 'Esta rota serve apenas para aprovar agendamentos.' });
    }
        const agendamentoAtualizado = await prisma.agendamento.update({
            where: {
                id: Number(id) // Converte o ID da URL para número
            },
            data: {
                status: 'APROVADO'
            },
        });
        res.json(agendamentoAtualizado);
    } catch (error) {
        console.error(`Erro ao atualizar status do agendamento ${req.params.id}:`, error);
        // Verifica se o erro é porque o registro não foi encontrado
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }
        res.status(500).json({ error: 'Não foi possível atualizar o status do agendamento.' });
    }
});

/**
 * ROTA PARA DELETAR UM AGENDAMENTO (Recusar Agendamento)
 * Chamada pelo front-end quando o botão "Recusar" é clicado.
 * Recebe: DELETE /agendamentos/:id
 */
router.delete('/agendamentos/:id', async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        await prisma.agendamento.delete({
            where: {
                id: Number(id) // Converte o ID da URL para número
            },
        });
        // Responde com status 204 (No Content), indicando sucesso na exclusão.
        res.status(204).send();
    } catch (error) {
        console.error(`Erro ao deletar o agendamento ${id}:`, error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({ error: 'Agendamento não encontrado.' });
        }
        res.status(500).json({ error: 'Não foi possível deletar o agendamento.' });
    }
});

export default router;