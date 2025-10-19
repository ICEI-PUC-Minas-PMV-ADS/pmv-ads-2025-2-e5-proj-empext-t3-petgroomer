const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

function toDateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

async function main() {
  console.log('Clearing existing agendamentos...');
  await prisma.agendamento.deleteMany();

  const password = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: { hash: password, name: 'Alice' },
    create: { email: 'alice@example.com', hash: password, name: 'Alice' },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: { hash: password, name: 'Bob' },
    create: { email: 'bob@example.com', hash: password, name: 'Bob' },
  });

  const today = toDateOnly(new Date());
  const day2 = toDateOnly(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
  const day5 = toDateOnly(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));
  const day6 = toDateOnly(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000));

  console.log('Seeding 4 agendamentos on separate days...');
  await prisma.agendamento.createMany({
    data: [
      { userId: alice.id, data: today, status: 'PENDENTE' },
      { userId: alice.id, data: day2, status: 'APROVADO' },
      { userId: bob.id, data: day5, status: 'PENDENTE' },
      { userId: bob.id, data: day6, status: 'NEGADO' },
    ],
  });

  console.log('Reset and seed complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
