import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Layout,
  Typography,
  Card,
  Button,
  Space,
  Table,
  Tag,
  message,
  Divider,
} from 'antd';
import {
  LogoutOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { apiFetch, apiLogout } from '../lib/api';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

type Role = 'ADMIN' | 'PETSHOP' | 'CLIENTE';

type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
};

type Servico = {
  id: number;
  nome: string;
  valor: number;
};

type StatusAgendamento = 'PENDENTE' | 'APROVADO' | 'NEGADO';

type Agendamento = {
  id: number;
  data: string;              // Date ISO string
  status: StatusAgendamento;
  servicoNome?: string;      // se a API já trouxer o nome do serviço
  serviceName?: string;      // fallback para diferentes nomes
  userId?: string;           // id do usuário (campo userId no banco)
  clienteNome?: string;      // nome do cliente (se vier populado)
  userName?: string;         // outro possível nome vindo da API
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const [loadingServ, setLoadingServ] = useState(false);
  const [loadingAg, setLoadingAg] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null);

  // flags de role
  const isCliente = user?.role === 'CLIENTE';
  const isAdminLike = user?.role === 'ADMIN' || user?.role === 'PETSHOP';

  // carrega user do sessionStorage
  useEffect(() => {
    const raw =
      typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;
    if (!raw) {
      router.replace('/login');
      return;
    }
    try {
      setUser(JSON.parse(raw));
    } catch {
      router.replace('/login');
    }
  }, [router]);

  const saudacao = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }, []);

  async function carregarServicos() {
    try {
      setLoadingServ(true);
      // Ajuste a rota conforme seu backend
      const data = await apiFetch<Servico[]>('/servicos');
      setServicos(data);
    } catch (e: any) {
      message.error(e.message || 'Falha ao carregar serviços');
    } finally {
      setLoadingServ(false);
    }
  }

  async function carregarAgendamentos() {
    if (!user) return;
    try {
      setLoadingAg(true);

      // Para CLIENTE, a API pode ter uma rota específica (ex.: /agendamentos/me)
      // ou filtro por querystring. Ajuste conforme sua implementação.
      const path = isCliente
        ? '/agendamentos?me=true'
        : '/agendamentos';

      const data = await apiFetch<Agendamento[]>(path);
      setAgendamentos(data);
    } catch (e: any) {
      message.error(e.message || 'Falha ao carregar agendamentos');
    } finally {
      setLoadingAg(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([carregarServicos(), carregarAgendamentos()]).finally(() =>
      setLoading(false),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function onLogout() {
    await apiLogout();
    router.replace('/login');
  }

  // filtra agendamentos do cliente caso a API retorne tudo
  const agendamentosFiltrados = useMemo(() => {
    if (!user) return agendamentos;
    if (!isCliente) return agendamentos;

    return agendamentos.filter((a) => {
      // tenta vários campos possíveis pra não quebrar se o backend mudar nome
      return a.userId === user.id;
    });
  }, [agendamentos, isCliente, user]);

  const statusColorMap: Record<StatusAgendamento, string> = {
    PENDENTE: 'gold',
    APROVADO: 'green',
    NEGADO: 'red',
  };

  const statusLabelMap: Record<StatusAgendamento, string> = {
    PENDENTE: 'Pendente',
    APROVADO: 'Aprovado',
    NEGADO: 'Recusado',
  };

  async function alterarStatus(
    agendamentoId: number,
    novoStatus: StatusAgendamento,
  ) {
    try {
      setUpdatingStatusId(agendamentoId);
      await apiFetch('/agendamentos/alterar-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: agendamentoId,
          status: novoStatus,
        }),
      });
      message.success('Status atualizado com sucesso');
      await carregarAgendamentos();
    } catch (e: any) {
      message.error(e.message || 'Falha ao atualizar status');
    } finally {
      setUpdatingStatusId(null);
    }
  }

  function irParaPedidoAgendamento(servicoId: number) {
    router.push(`/pedidoagendamento?servicoId=${servicoId}`);
  }

  return (
    <>
      <Head>
        <title>Dashboard — PetGroomer</title>
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0b1020',
          }}
        >
          <Title level={4} style={{ color: '#fff', margin: 0 }}>
            PetGroomer
          </Title>
          <Space>
            {user && (
              <Text style={{ color: '#cbd5e1' }}>
                {user.name} · {user.role}
              </Text>
            )}
            <Button icon={<LogoutOutlined />} onClick={onLogout}>
              Sair
            </Button>
          </Space>
        </Header>

        <Content style={{ padding: 24 }}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Card bordered={false}>
              <Space direction="vertical" size={0}>
                <Title level={3} style={{ marginBottom: 0 }}>
                  {saudacao}
                  {user ? `, ${user.name.split(' ')[0]}` : ''} 👋
                </Title>
                <Text type="secondary">
                  {isCliente
                    ? 'Veja seus agendamentos e escolha novos serviços para seu pet.'
                    : 'Visão geral dos serviços e agendamentos do petshop.'}
                </Text>
              </Space>
            </Card>

            {/* SERVIÇOS */}
            <Card
              title="Serviços disponíveis"
              extra={
                <Space>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={carregarServicos}
                    loading={loadingServ}
                  >
                    Atualizar
                  </Button>
                </Space>
              }
              loading={loading}
            >
              <Table<Servico>
                rowKey="id"
                dataSource={servicos}
                pagination={{ pageSize: 5 }}
                columns={[
                  { title: 'Nome', dataIndex: 'nome' },
                  {
                    title: 'Preço',
                    dataIndex: 'valor',
                    render: (v: number) =>
                      v != null
                        ? v.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })
                        : '-',
                  },
                  ...(isCliente
                    ? [
                        {
                          title: 'Ações',
                          key: 'acoes',
                          render: (_: any, record: Servico) => (
                            <Button
                              type="primary"
                              onClick={() =>
                                irParaPedidoAgendamento(record.id)
                              }
                            >
                              Agendar
                            </Button>
                          ),
                        },
                      ]
                    : []),
                ]}
              />
            </Card>

            {/* AGENDAMENTOS */}
            <Card
              title={isCliente ? 'Meus agendamentos' : 'Agendamentos dos clientes'}
              extra={
                <Space>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={carregarAgendamentos}
                    loading={loadingAg}
                  >
                    Atualizar
                  </Button>
                </Space>
              }
              loading={loading}
            >
              <Table<Agendamento>
                rowKey="id"
                dataSource={agendamentosFiltrados}
                pagination={{ pageSize: 5 }}
                columns={[
                  ...(isAdminLike
                    ? [
                        {
                          title: 'Cliente',
                          dataIndex: 'clienteNome',
                          render: (_: any, record: Agendamento) =>
                            record.clienteNome ||
                            record.userName ||
                            '—',
                        },
                      ]
                    : []),
                  {
                    title: 'Serviço',
                    dataIndex: 'servicoId',
                    render: (_: any, record: Agendamento) =>
                      record.servicoNome || record.serviceName || '—',
                  },
                  {
                    title: 'Data',
                    dataIndex: 'data',
                    render: (v: string) =>
                      v ? new Date(v).toLocaleString('pt-BR') : '—',
                  },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    render: (s: StatusAgendamento) => (
                      <Tag color={statusColorMap[s]}>
                        {statusLabelMap[s]}
                      </Tag>
                    ),
                  },
                  ...(isAdminLike
                    ? [
                        {
                          title: 'Ações',
                          key: 'acoes',
                          render: (_: any, record: Agendamento) => (
                            <Space>
                              {(['PENDENTE', 'APROVADO', 'NEGADO'] as StatusAgendamento[]).map(
                                (status) => (
                                  <Button
                                    key={status}
                                    size="small"
                                    type={
                                      record.status === status
                                        ? 'primary'
                                        : 'default'
                                    }
                                    loading={updatingStatusId === record.id}
                                    onClick={() =>
                                      alterarStatus(record.id, status)
                                    }
                                  >
                                    {statusLabelMap[status]}
                                  </Button>
                                ),
                              )}
                            </Space>
                          ),
                        },
                      ]
                    : []),
                ]}
              />
            </Card>

            <Divider />
            <Card bordered={false}>
              <Text type="secondary">
                Se as rotas da API forem diferentes, é só ajustar os paths em
                <code> carregarServicos()</code>,{' '}
                <code>carregarAgendamentos()</code> e{' '}
                <code>alterarStatus()</code>.
              </Text>
            </Card>
          </Space>
        </Content>
      </Layout>
    </>
  );
}
