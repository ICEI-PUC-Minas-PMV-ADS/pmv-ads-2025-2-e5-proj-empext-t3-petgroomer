import React, { useState } from 'react';
// import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Alert,
  Space,
  Divider,
} from 'antd';
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import getConfig from 'next/config'; 

const { Content } = Layout;
const { Title, Text } = Typography;

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig?.API_URL || 'http://localhost:4000';

export default function Cadastro() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onFinish = async (values: { email: string; password: string; name: string }) => {
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, role: 'CLIENTE' }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = Array.isArray(data?.message) ? data.message[0] : data?.message || 'Falha ao cadastrar';
        throw new Error(msg);
      }

      // Armazenar dados no sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('access_token', data.access);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        // Avise outros tabs sobre mudança de auth
        window.dispatchEvent(new Event('auth:changed'));
        try { new BroadcastChannel('auth').postMessage('ok'); } catch {}
      }

      router.push('/'); // redireciona após cadastro
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro inesperado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro — PetGroomer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <Content className="content">
          <div className="bg" />

          <Card className="card" bordered={false}>
            <Space direction="vertical" size={6} style={{ width: '100%', textAlign: 'center' }}>
              <Title level={2} style={{ marginBottom: 0 }}>Crie sua conta</Title>
              <Text type="secondary">e agende o banho e tosa do seu pet</Text>
            </Space>

            <Divider />

            {errorMsg && (
              <Alert
                type="error"
                message="Erro no cadastro"
                description={errorMsg}
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              name="cadastro"
              onFinish={onFinish}
              requiredMark={false}
            >
              <Form.Item
                label="Nome completo"
                name="name"
                rules={[
                  { required: true, message: 'Informe seu nome completo' },
                  { min: 3, message: 'Mínimo de 3 caracteres' },
                ]}
              >
                <Input size="large" prefix={<UserOutlined />} placeholder="Ex: João Silva" />
              </Form.Item>

              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: 'Informe seu e-mail' },
                  { type: 'email', message: 'E-mail inválido' },
                ]}
              >
                <Input size="large" prefix={<MailOutlined />} placeholder="voce@exemplo.com" autoComplete="email" />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  { required: true, message: 'Crie uma senha' },
                  { min: 6, message: 'Mínimo de 6 caracteres' },
                ]}
              >
                <Input.Password size="large" prefix={<LockOutlined />} placeholder="Digite sua senha" autoComplete="new-password" />
              </Form.Item>

              <Form.Item style={{ marginTop: 8 }}>
                <Button type="primary" htmlType="submit" size="large" loading={submitting} block icon={<ArrowRightOutlined />}>
                  Criar conta
                </Button>
              </Form.Item>
            </Form>

            <Divider plain>
              <Text type="secondary">ou</Text>
            </Divider>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">
                Já possui conta? <a href="/login">Entre agora</a>
              </Text>
            </Space>
          </Card>
        </Content>
      </Layout>

      {/* CSS Global corrigido */}
      
    </>
  );
}
