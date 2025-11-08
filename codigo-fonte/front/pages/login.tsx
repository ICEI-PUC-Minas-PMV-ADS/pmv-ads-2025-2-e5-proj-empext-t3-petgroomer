import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Alert,
  Space,
  Divider,
} from 'antd';
import {
  LockOutlined,
  MailOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import getConfig from 'next/config'; 


const { Content } = Layout;
const { Title, Text } = Typography;

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig?.API_URL || 'http://localhost:4000';

export default function Login() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onFinish(values: { email: string; password: string; remember?: boolean }) {
    setErrorMsg(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // IMPORTANTE: para receber o cookie httpOnly (refresh_token)
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = Array.isArray(data?.message) ? data.message[0] : data?.message || 'Falha ao autenticar';
        throw new Error(msg);
      }

      sessionStorage.setItem('access_token', data.access);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      // 🔔 AVISA O APP QUE O AUTH MUDOU (atualiza Header/Burger sem refresh)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth:changed'));      // mesma aba
          try { new BroadcastChannel('auth').postMessage('ok'); } catch {} // outras abas (opcional)
        }

        // redireciona para o dashboard
        router.push('/dashboard');

    } catch (err: any) {
      setErrorMsg(err.message || 'Erro inesperado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login — PetGroomer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout style={{ minHeight: '100vh' }}>
        <Content className="content">
          <div className="bg" />
          <Card className="card" bordered={false}>
            <Space direction="vertical" size={6} style={{ width: '100%', textAlign: 'center' }}>
              <Title level={2} style={{ marginBottom: 0 }}>Bem-vindo ao PetGroomer</Title>
              <Text type="secondary">Acesse sua conta para continuar</Text>
            </Space>

            <Divider />

            {errorMsg && (
              <Alert
                type="error"
                message="Não foi possível entrar"
                description={errorMsg}
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              name="login"
              onFinish={onFinish}
              initialValues={{ remember: true }}
              requiredMark={false}
            >
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: 'Informe seu e-mail' },
                  { type: 'email', message: 'E-mail inválido' },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="voce@exemplo.com"
                  autoComplete="email"
                />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[
                  { required: true, message: 'Informe sua senha' },
                  { min: 6, message: 'Mínimo de 6 caracteres' },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                />
              </Form.Item>

              <div className="row">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Lembrar de mim</Checkbox>
                </Form.Item>
                <Button type="link" href="/recuperar-senha" style={{ padding: 0 }}>
                  Esqueci minha senha
                </Button>
              </div>

              <Form.Item style={{ marginTop: 8 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={submitting}
                  block
                  icon={<ArrowRightOutlined />}
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>

            <Divider plain>
              <Text type="secondary">ou</Text>
            </Divider>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">
                Não tem conta? <a href="/cadastro">Crie agora</a>
              </Text>
            </Space>
          </Card>
        </Content>
      </Layout>

      <style>{`
        .content {
          display: grid;
          place-items: center;
          position: relative;
          padding: 24px;
          min-height: 100vh;
          overflow: hidden;
        }
        .bg {
          position: absolute;
          inset: -20%;
          background: radial-gradient(60% 60% at 20% 20%, #7c3aed22, transparent 60%),
                      radial-gradient(50% 50% at 80% 30%, #06b6d422, transparent 60%),
                      radial-gradient(40% 40% at 50% 80%, #22c55e22, transparent 60%),
                      linear-gradient(180deg, #0b1020 0%, #0f172a 100%);
          filter: blur(30px);
          z-index: 0;
        }
        .card {
          width: 100%;
          max-width: 420px;
          z-index: 1;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          backdrop-filter: blur(4px);
        }
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: -8px;
        }
      `}</style>
    </>
  );
}
