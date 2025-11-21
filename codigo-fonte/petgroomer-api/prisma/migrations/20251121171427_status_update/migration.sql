/*
  Warnings:

  - The values [NEGADO] on the enum `StatusAgendamento` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusAgendamento_new" AS ENUM ('PENDENTE', 'APROVADO', 'RECUSADO', 'CANCELADO');
ALTER TABLE "public"."Agendamento" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Agendamento" ALTER COLUMN "status" TYPE "public"."StatusAgendamento_new" USING ("status"::text::"public"."StatusAgendamento_new");
ALTER TYPE "public"."StatusAgendamento" RENAME TO "StatusAgendamento_old";
ALTER TYPE "public"."StatusAgendamento_new" RENAME TO "StatusAgendamento";
DROP TYPE "public"."StatusAgendamento_old";
ALTER TABLE "public"."Agendamento" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
COMMIT;
