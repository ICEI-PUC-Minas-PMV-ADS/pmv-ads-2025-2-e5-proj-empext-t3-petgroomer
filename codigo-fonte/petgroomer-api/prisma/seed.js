const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const password = await bcrypt.hash('password123', 10);

  // upsert three users (including admin)
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { email: 'alice@example.com', hash: password, name: 'Alice', role: 'CLIENTE' },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { email: 'bob@example.com', hash: password, name: 'Bob', role: 'CLIENTE' },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@petgroomer.com' },
    update: {},
    create: { email: 'admin@petgroomer.com', hash: password, name: 'Admin', role: 'ADMIN' },
  });


  // Seed serviços
  // Create serviços (no upsert, since nome is not unique)
  const [banho, tosa, consulta] = await Promise.all([
    prisma.servico.create({ data: { nome: 'Banho', valor: 50.0 } }),
    prisma.servico.create({ data: { nome: 'Tosa', valor: 70.0 } }),
    prisma.servico.create({ data: { nome: 'Consulta Veterinária', valor: 120.0 } })
  ]);

  // date helper
  function toDateOnly(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  // Remove old agendamentos to avoid conflicts
  await prisma.agendamento.deleteMany({});

  // date helper
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Seed agendamentos 
  await prisma.agendamento.createMany({
    data: [
      { userId: alice.id, servicoId: banho.id, data: toDateOnly(today), status: 'PENDENTE' },
      { userId: bob.id, servicoId: tosa.id, data: toDateOnly(tomorrow), status: 'APROVADO' },
      { userId: bob.id, servicoId: consulta.id, data: toDateOnly(tomorrow), status: 'RECUSADO' },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
