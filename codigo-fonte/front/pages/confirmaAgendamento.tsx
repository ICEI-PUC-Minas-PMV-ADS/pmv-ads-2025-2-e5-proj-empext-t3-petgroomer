import React, { useState } from 'react';
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

// --- Dados de Exemplo ---
// Em uma aplicação real, estes dados viriam do seu banco de dados.
const pendingAppointments = [
  {
    id: 'AGD12345',
    petName: 'Bolinha',
    clientName: 'João da Silva',
    service: 'Banho e Tosa Completa',
    date: '25 de Novembro de 2025',
    time: '14:30',
  },
  {
    id: 'AGD12346',
    petName: 'Rex',
    clientName: 'Maria Oliveira',
    service: 'Banho',
    date: '25 de Novembro de 2025',
    time: '15:00',
  },
  {
    id: 'AGD12347',
    petName: 'Luna',
    clientName: 'Carlos Pereira',
    service: 'Tosa Higiênica',
    date: '26 de Novembro de 2025',
    time: '10:00',
  },
];

export default function ConfirmaAgendamento() {
  // Estado para guardar qual agendamento está selecionado
  const [selectedAppointment, setSelectedAppointment] = useState(
    pendingAppointments[0]
  );

  const handleAccept = () => {
    // Lógica para chamar a API e confirmar o agendamento
    console.log(`Agendamento ${selectedAppointment.id} ACEITO.`);
    message.success(`Agendamento de ${selectedAppointment.petName} aceito!`);
    // Aqui você também removeria o item da lista de pendentes
  };

  const handleDecline = () => {
    // Lógica para chamar a API e recusar o agendamento
    console.log(`Agendamento ${selectedAppointment.id} RECUSADO.`);
    message.error(`Agendamento de ${selectedAppointment.petName} recusado.`);
    // Aqui você também removeria o item da lista de pendentes
  };

  return (
    <>
      <Head>
        <title>Confirmar Agendamento - MN Groomer</title>
        <meta
          name="description"
          content="Página para confirmação de agendamentos de serviços."
        />
      </Head>
      <Layout
        style={{
          minHeight: 'calc(100vh - 134px)', // Ajuste conforme a altura do seu Header/Footer
        }}
      >
        <Sider
          width={350}
          theme="light"
          style={{ borderRight: '1px solid #f0f0f0' }}
        >
          <div style={{ padding: '16px' }}>
            <Title level={4}>Agendamentos Pendentes</Title>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={pendingAppointments}
            renderItem={(item) => (
              <List.Item
                onClick={() => setSelectedAppointment(item)}
                style={{
                  cursor: 'pointer',
                  padding: '12px 24px',
                  backgroundColor:
                    selectedAppointment?.id === item.id ? '#e6f7ff' : 'transparent',
                }}
              >
                <List.Item.Meta
                  title={<a>{`${item.petName} - ${item.clientName}`}</a>}
                  description={`${item.service} - ${item.date}`}
                />
              </List.Item>
            )}
          />
        </Sider>
        <Content style={{ padding: '24px 50px' }}>
          {selectedAppointment ? (
            <motion.div
              key={selectedAppointment.id} // Garante a re-renderização da animação
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Title level={2}>Detalhes do Agendamento</Title>
                <Divider />
                <Descriptions bordered column={1} style={{ textAlign: 'left' }}>
                  <Descriptions.Item label="Cliente">{selectedAppointment.clientName}</Descriptions.Item>
                  <Descriptions.Item label="Pet">{selectedAppointment.petName}</Descriptions.Item>
                  <Descriptions.Item label="Serviço">{selectedAppointment.service}</Descriptions.Item>
                  <Descriptions.Item label="Data">{selectedAppointment.date}</Descriptions.Item>
                  <Descriptions.Item label="Hora">{selectedAppointment.time}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Space size="large">
                  <Button type="primary" icon={<CheckOutlined />} onClick={handleAccept}>Aceitar</Button>
                  <Button type="primary" danger icon={<CloseOutlined />} onClick={handleDecline}>Recusar</Button>
                </Space>
              </Card>
            </motion.div>
          ) : (
            <div style={{textAlign: 'center', paddingTop: '100px'}}><Title level={3}>Selecione um agendamento para ver os detalhes</Title></div>
          )}
        </Content>
      </Layout>
    </>
  );
}