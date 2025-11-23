// prisma/seed.js
const { PrismaClient, Role, StatusAgendamento } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  const password = await bcrypt.hash('password123', 10);

  // Criar usuários
  console.log('👥 Criando usuários...');
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@petgroomer.com' },
    update: {},
    create: {
      email: 'admin@petgroomer.com',
      hash: password,
      name: 'Administrador',
      role: Role.ADMIN,
    },
  });

  const petshop = await prisma.user.upsert({
    where: { email: 'petshop@example.com' },
    update: {},
    create: {
      email: 'petshop@example.com',
      hash: password,
      name: 'PetShop Central',
      role: Role.PETSHOP,
    },
  });

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      hash: password,
      name: 'Alice Silva',
      role: Role.CLIENTE,
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      hash: password,
      name: 'Bob Santos',
      role: Role.CLIENTE,
    },
  });

  // Criar serviços oferecidos
  console.log('✂️ Criando serviços...');
  
  const servicosData = [
    { nome: 'Banho Completo', valor: 35.00 },
    { nome: 'Banho e Tosa Higiênica', valor: 45.00 },
    { nome: 'Tosa Completa', valor: 55.00 },
    { nome: 'Tosa na Máquina', valor: 40.00 },
    { nome: 'Tosa na Tesoura', valor: 65.00 },
    { nome: 'Hidratação', valor: 25.00 },
    { nome: 'Limpeza de Ouvidos', valor: 15.00 },
    { nome: 'Corte de Unhas', valor: 12.00 },
    { nome: 'Escovação Dental', valor: 20.00 },
    { nome: 'Pacote Completo (Banho + Tosa + Hidratação)', valor: 85.00 },
  ];

  // Primeiro, limpe serviços existentes para evitar duplicatas
  await prisma.servico.deleteMany({});

  // Crie todos os serviços
  for (const servico of servicosData) {
    await prisma.servico.create({
      data: servico,
    });
  }

  const servicos = await prisma.servico.findMany();

  // Helper para datas (apenas data, sem hora)
  function toDateOnly(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Criar agendamentos de exemplo
  console.log('📅 Criando agendamentos de exemplo...');
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  // Limpar agendamentos existentes
  await prisma.agendamento.deleteMany({});

  const agendamentosData = [
    {
      userId: alice.id,
      servicoId: servicos[0].id, // Banho Completo
      data: toDateOnly(today),
      status: StatusAgendamento.APROVADO,
    },
    {
      userId: bob.id,
      servicoId: servicos[2].id, // Tosa Completa
      data: toDateOnly(today),
      status: StatusAgendamento.PENDENTE,
    },
    {
      userId: alice.id,
      servicoId: servicos[9].id, // Pacote Completo
      data: toDateOnly(tomorrow),
      status: StatusAgendamento.APROVADO,
    },
    {
      userId: bob.id,
      servicoId: servicos[5].id, // Hidratação
      data: toDateOnly(nextWeek),
      status: StatusAgendamento.PENDENTE,
    },
  ];

  for (const agendamento of agendamentosData) {
    await prisma.agendamento.create({
      data: agendamento,
    });
  }

  console.log('✅ Seed completado com sucesso!');
  console.log(`📊 4 usuários criados`);
  console.log(`✂️ ${servicos.length} serviços criados`);
  console.log(`📅 ${agendamentosData.length} agendamentos criados`);
  
  console.log('\n🔑 Credenciais para teste:');
  console.log('Admin: admin@petgroomer.com / password123');
  console.log('PetShop: petshop@example.com / password123');
  console.log('Cliente 1: alice@example.com / password123');
  console.log('Cliente 2: bob@example.com / password123');
  console.log('\n📋 IDs dos serviços criados:');
  servicos.forEach((servico, index) => {
    console.log(`  ${index + 1}. ${servico.nome} (ID: ${servico.id}) - R$ ${servico.valor}`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });