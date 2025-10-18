const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const all = await prisma.agendamento.findMany({ include: { cliente: true }, orderBy: { data: 'asc' } });
  console.log(`Found ${all.length} agendamento(s):`);
  all.forEach(a => {
    console.log(`- id=${a.id} userId=${a.userId} cliente=${a.cliente?.email ?? a.cliente?.name} data=${a.data.toISOString().slice(0,10)} status=${a.status}`);
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
