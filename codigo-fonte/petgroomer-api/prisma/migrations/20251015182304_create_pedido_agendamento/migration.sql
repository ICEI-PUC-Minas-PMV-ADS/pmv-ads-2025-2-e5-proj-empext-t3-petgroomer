-- CreateTable
CREATE TABLE "PedidoAgendamento" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PedidoAgendamento_pkey" PRIMARY KEY ("id")
);
