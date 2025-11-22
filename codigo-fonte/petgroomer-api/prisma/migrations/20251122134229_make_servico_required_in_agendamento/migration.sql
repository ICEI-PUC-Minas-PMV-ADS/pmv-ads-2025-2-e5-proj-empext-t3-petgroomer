/*
  Warnings:

  - Added the required column `servicoId` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Agendamento" ADD COLUMN     "servicoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Agendamento" ADD CONSTRAINT "Agendamento_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
