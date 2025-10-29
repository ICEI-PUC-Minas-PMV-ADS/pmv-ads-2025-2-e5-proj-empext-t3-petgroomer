/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PedidoAgendamento` table. All the data in the column will be lost.
  - Added the required column `servico` to the `PedidoAgendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PedidoAgendamento" DROP COLUMN "createdAt",
ADD COLUMN     "servico" TEXT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;
