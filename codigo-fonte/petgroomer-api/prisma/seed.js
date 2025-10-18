const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const password = await bcrypt.hash('password123', 10);

  // upsert two users
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { email: 'alice@example.com', hash: password, name: 'Alice' },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { email: 'bob@example.com', hash: password, name: 'Bob' },
  });

  // examples
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // date only helper
  function toDateOnly(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  await prisma.agendamento.createMany({
    data: [
      { userId: alice.id, data: toDateOnly(today), status: 'PENDENTE' },
      { userId: bob.id, data: toDateOnly(tomorrow), status: 'APROVADO' },
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
