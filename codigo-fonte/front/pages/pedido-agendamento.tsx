import React, { useState } from 'react';
import { Layout, Form, Input, Button, message, DatePicker, Select } from 'antd';
const { Content } = Layout;
const { Option } = Select;
import { useEffect } from 'react';
import Head from 'next/head';

export default function PedidoAgendamento() {
  const [loading, setLoading] = useState(false);

  const [pedidoCriado, setPedidoCriado] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setPedidoCriado(false);

    // Converte Moment do DatePicker para string ISO
    const payload = {
      ...values,
      data: values.data.toISOString(),
    };

    try {
      const res = await fetch('http://localhost:4000/pedidoagendamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Erro ao criar pedido');
      }

      const data = await res.json();
      message.success('Pedido criado com sucesso!');
      console.log('Resposta do backend:', data);
    } catch (err: any) {
      console.error(err);
      message.error(err.message || 'Erro ao criar pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ padding: '2rem' }}>
      <Content style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1>Pedido de Agendamento</h1>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Cliente" name="cliente" rules={[{ required: true }]}>
            <Input placeholder="Nome do cliente" />
          </Form.Item>
          <Form.Item label="Serviço" name="servico" rules={[{ required: true }]}>
            <Input placeholder="Ex: Banho e Tosa" />
          </Form.Item>
          <Form.Item label="Data" name="data" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} showTime />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Criar Pedido
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );

  const [servicos, setServicos] = useState<string[]>([]);
}
