import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Layout,
  Card,
  Typography,
  Button,
  Space,
  Descriptions,
  Divider,
  List,
  message,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Content, Sider } = Layout;
const { Title } = Typography;

// ----------- TIPO DO AGENDAMENTO (baseado no Prisma) -----------

type Appointment = {
  id: number;
  data: string;
  status: string;
  nomeClienteManual?: string;
  cliente?: {
    id: string;
    name: string;
    email: string;
  } | null;
  servico: {
    id: number;
    nome: string;
    valor: number;
  } | null;
};

export default function ConfirmaAgendamento() {
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tk = localStorage.getItem("token");
    setToken(tk);
  }, []);

  // Carrega os agendamentos pendentes
  const loadAppointments = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        "https://pmv-ads-2025-2-e5-proj-empext-t3-petgroomer-production.up.railway.app/agendamentos",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Erro ao buscar agendamentos");

      const data: Appointment[] = await res.json();

      const pendentes = data.filter(a => a.status === "PENDENTE");

      setPendingAppointments(pendentes);
      setSelectedAppointment(pendentes[0] || null);

    } catch (e) {
      console.error(e);
      message.error("Erro ao carregar agendamentos");
    }
  };

  useEffect(() => {
    if (token) loadAppointments();
  }, [token]);

  // Altera status
  const alterarStatus = async (status: string) => {
    if (!selectedAppointment) return;

    try {
      const res = await fetch(
        `https://pmv-ads-2025-2-e5-proj-empext-t3-petgroomer-production.up.railway.app/agendamentos/${selectedAppointment.id}/alterar-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Falha ao atualizar");

      message.success(
        status === "APROVADO"
          ? "Agendamento aprovado!"
          : "Agendamento recusado!"
      );

      await loadAppointments();

    } catch (err) {
      console.error(err);
      message.error("Erro ao atualizar o agendamento");
    }
  };

  const handleAccept = () => alterarStatus("APROVADO");
  const handleDecline = () => alterarStatus("RECUSADO");

  return (
    <>
      <Head>
        <title>Confirmar Agendamento - MN Groomer</title>
      </Head>

      <Layout style={{ minHeight: "calc(100vh - 134px)" }}>
        <Sider width={350} theme="light" style={{ borderRight: "1px solid #f0f0f0" }}>
          <div style={{ padding: "16px" }}>
            <Title level={4}>Agendamentos Pendentes</Title>
          </div>

          <List
            itemLayout="horizontal"
            dataSource={pendingAppointments}
            locale={{ emptyText: "Nenhum agendamento pendente" }}
            renderItem={(item) => (
              <List.Item
                onClick={() => setSelectedAppointment(item)}
                style={{
                  cursor: "pointer",
                  padding: "12px 24px",
                  backgroundColor:
                    selectedAppointment?.id === item.id ? "#e6f7ff" : "transparent",
                }}
              >
                <List.Item.Meta
                  title={`${item.cliente?.name ?? item.nomeClienteManual ?? "Sem nome"}`}
                  description={`${item.servico?.nome ?? "Serviço"} - ${new Date(item.data).toLocaleDateString()}`}
                />
              </List.Item>
            )}
          />
        </Sider>

        <Content style={{ padding: "24px 50px" }}>
          {selectedAppointment ? (
            <motion.div
              key={selectedAppointment.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card style={{ width: "100%", textAlign: "center" }}>
                <Title level={2}>Detalhes do Agendamento</Title>
                <Divider />

                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Cliente">
                    {selectedAppointment.cliente?.name ??
                      selectedAppointment.nomeClienteManual ??
                      "Não informado"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Serviço">
                    {selectedAppointment.servico?.nome ?? "Serviço não informado"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Data">
                    {new Date(selectedAppointment.data).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Space size="large">
                  <Button type="primary" icon={<CheckOutlined />} onClick={handleAccept}>
                    Aceitar
                  </Button>
                  <Button type="primary" danger icon={<CloseOutlined />} onClick={handleDecline}>
                    Recusar
                  </Button>
                </Space>
              </Card>
            </motion.div>
          ) : (
            <Title level={3} style={{ textAlign: "center", paddingTop: 100 }}>
              Nenhum agendamento selecionado
            </Title>
          )}
        </Content>
      </Layout>
    </>
  );
}
