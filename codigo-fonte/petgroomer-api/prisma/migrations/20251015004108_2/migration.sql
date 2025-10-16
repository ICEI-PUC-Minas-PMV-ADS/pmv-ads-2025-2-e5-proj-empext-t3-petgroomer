-- CreateEnum
CREATE TYPE "public"."StatusAgendamento" AS ENUM ('PENDENTE', 'APROVADO', 'NEGADO');

-- CreateTable
CREATE TABLE "public"."Agendamento" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "status" "public"."StatusAgendamento" NOT NULL DEFAULT 'PENDENTE',

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Agendamento" ADD CONSTRAINT "Agendamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
