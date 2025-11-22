import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Layout, Typography, Card, Button, Space, Table, Tag, message, Divider,
} from 'antd';
import { LogoutOutlined, ReloadOutlined } from '@ant-design/icons';
import { apiFetch, apiLogout } from '../lib/api';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

type User = { id: string; email: string; name: string; role: 'ADMIN'|'PETSHOP'|'CLIENTE'; createdAt: string };

type Servico = { id: string; name: string; priceCents: number; active: boolean; durationMin?: number };
type Agendamento = {
  id: string; serviceName?: string; dateStart: string; status: 'pendente'|'confirmado'|'cancelado'
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loadingServ, setLoadingServ] = useState(false);
  const [loadingAg, setLoadingAg] = useState(false);

  // carrega user do sessionStorage
  useEffect(() => {
    const raw = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;
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
      // ajuste a rota conforme seu backend (ex.: /servicos?petshopId=...)
      const data = await apiFetch<Servico[]>('/servicos');
      setServicos(data);
    } catch (e:any) {
      message.error(e.message || 'Falha ao carregar serviços');
    } finally {
      setLoadingServ(false);
    }
  }

  async function carregarAgendamentos() {
    try {
      setLoadingAg(true);
      // exemplo: busca próximos agendamentos (ajuste a rota para a sua API)
      const data = await apiFetch<Agendamento[]>('/agendamentos?proximos=true');
      setAgendamentos(data);
    } catch (e:any) {
      message.error(e.message || 'Falha ao carregar agendamentos');
    } finally {
      setLoadingAg(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([carregarServicos(), carregarAgendamentos()]).finally(() => setLoading(false));
  }, [user]);

  async function onLogout() {
    await apiLogout();
    router.replace('/login');
  }

  return (
    <>
      <Head>
        <title>Dashboard — PetGroomer</title>
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0b1020' }}>
          <Title level={4} style={{ color: '#fff', margin: 0 }}>PetGroomer</Title>
          <Space>
            {user && <Text style={{ color: '#cbd5e1' }}>{user.name} · {user.role}</Text>}
            <Button icon={<LogoutOutlined />} onClick={onLogout}>Sair</Button>
          </Space>
        </Header>

        <Content style={{ padding: 24 }}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Card bordered={false}>
              <Space direction="vertical" size={0}>
                <Title level={3} style={{ marginBottom: 0 }}>
                  {saudacao}{user ? `, ${user.name.split(' ')[0]}` : ''} 👋
                </Title>
                <Text type="secondary">Aqui estão seus serviços e próximos agendamentos.</Text>
              </Space>
            </Card>

            <Card
              title="Serviços"
              extra={
                <Space>
                  <Button icon={<ReloadOutlined />} onClick={carregarServicos} loading={loadingServ}>Atualizar</Button>
                </Space>
              }
              loading={loading}
            >
              <Table
                rowKey="id"
                dataSource={servicos}
                pagination={{ pageSize: 5 }}
                columns={[
                  { title: 'Nome', dataIndex: 'nome' },
                  { title: 'Preço', dataIndex: 'valor', render: (v:number) => (v != null ? (v/1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-') },
                ]}
              />
            </Card>

            <Card
              title="Próximos agendamentos"
              extra={
                <Space>
                  <Button icon={<ReloadOutlined />} onClick={carregarAgendamentos} loading={loadingAg}>Atualizar</Button>
                </Space>
              }
              loading={loading}
            >
              <Table
                rowKey="id"
                dataSource={agendamentos}
                pagination={{ pageSize: 5 }}
                columns={[
                  { title: 'Serviço', dataIndex: 'serviceName' },
                  { title: 'Data/Hora', dataIndex: 'data', render: (v:string) => new Date(v).toLocaleString('pt-BR') },
                  { title: 'Status', dataIndex: 'status', render: (s:Agendamento['status']) => {
                      const color = s === 'confirmado' ? 'green' : s === 'pendente' ? 'gold' : 'red';
                      return <Tag color={color}>{s.toUpperCase()}</Tag>;
                    }
                  },
                ]}
              />
            </Card>

            <Divider />
            <Card bordered={false}>
              <Text type="secondary">
                Dica: ajuste as rotas no `apiFetch` conforme sua API (ex.: filtrar serviços por petshop).
              </Text>
            </Card>
          </Space>
        </Content>
      </Layout>
    </>
  );
}
