import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout, Form, Input, Button, DatePicker, Select, Card, message, Modal } from 'antd';
import Head from 'next/head';
import getConfig from 'next/config';
import { motion } from 'framer-motion';

const { Content } = Layout;

export default function PedidoAgendamento() {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [servicos, setServicos] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string|undefined>(undefined);

  // Get user role from sessionStorage
  useEffect(() => {
    function updateUserRole() {
      try {
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserRole(user.role);
        } else {
          setUserRole(undefined);
        }
      } catch {
        setUserRole(undefined);
      }
    }
    updateUserRole();
    window.addEventListener('auth:changed', updateUserRole);
    return () => window.removeEventListener('auth:changed', updateUserRole);
  }, []);

  const { publicRuntimeConfig } = getConfig();
  const API_URL = publicRuntimeConfig?.API_URL || 'http://localhost:4000';

  // Buscar serviços
  useEffect(() => {
    async function fetchServicos() {
      try {
        const res = await fetch(`${API_URL}/servicos`);
        const data = await res.json();
        setServicos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Erro ao buscar serviços:', err);
      }
    }
    fetchServicos();
  }, [API_URL]);

  const servicosOptions = servicos.map((s: any) => ({
    label: s.nome ?? `Serviço ${s.id}`,
    value: s.id ?? s.nome,
  }));

  const handleSubmit = async (values: any) => {
    if (!userRole) {
      router.push('/login');
      return;
    }
    setLoading(true);
    try {
      const payload: any = {
        data: values?.data?.format?.('YYYY-MM-DD') ?? null,
      };
      // Only send clienteNome if admin
      if (userRole === 'ADMIN' && values.clienteNome) {
        payload.clienteNome = values.clienteNome;
      }
      if (values.servico) {
        payload.servicoId = values.servico;
      }

      let token = null;
      try {
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          token = user.token || user.accessToken || user.jwt;
        }
        if (!token) {
          token = sessionStorage.getItem('access_token');
        }
        console.log('Token used for Authorization:', token);
      } catch (e) {
        console.log('Error reading token from sessionStorage', e);
      }

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Authorization header set:', headers['Authorization']);
      } else {
        console.log('No token found, Authorization header not set');
      }

      const res = await fetch(`${API_URL}/pedidoagendamento`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setConfirmationOpen(true);
      } else if (res.status === 401) {
        message.warning('Você precisa estar logado para agendar.');
      } else {
        message.error('Erro ao criar agendamento.');
      }
    } catch (err) {
      console.error(err);
      message.error('Erro ao criar agendamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Agendamento PET-GROOMER</title>
      </Head>

      <Modal
        open={confirmationOpen}
        onCancel={() => setConfirmationOpen(false)}
        footer={[
          <Button key="calendar" type="primary" onClick={() => router.push('/calendar')}>
            Ver calendário
          </Button>,
          <Button key="close" onClick={() => setConfirmationOpen(false)}>
            Fechar
          </Button>,
        ]}
        centered
        title="Agendamento realizado!"
      >
        <p>Seu agendamento foi registrado com sucesso.</p>
        <p>Você pode visualizar seus agendamentos no calendário.</p>
      </Modal>

      <Layout
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%)',
        }}
      >
        {/* Top Section - Agendamento */}
        <Content style={{ maxWidth: 520, margin: '70px auto', padding: '20px' }}>
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: 40 }}
          >
            <span style={{ fontSize: 50, display: 'block' }}>🐾</span>
            <h1
              style={{
                color: '#ffffff',
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              AGENDAMENTO PET-GROOMER
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              style={{
                background: '#12203a',
                border: '1px solid #00ffff',
                borderRadius: 12,
                padding: 35,
                boxShadow: '0 0 35px rgba(0, 255, 255, 0.3)',
              }}
              hoverable
            >

              <Form layout="vertical" onFinish={handleSubmit}>
                {userRole === 'ADMIN' && (
                  <Form.Item
                    label={<span style={{ color: '#ffffff', fontWeight: 600 }}>Nome do Cliente (opcional)</span>}
                    name="clienteNome"
                    rules={[]}
                  >
                    <Input placeholder="Nome do cliente (opcional)" style={{ background: '#ffffff', borderRadius: 8, height: 45 }} />
                  </Form.Item>
                )}

                <Form.Item
                  label={<span style={{ color: '#ffffff', fontWeight: 600 }}>Serviço</span>}
                  name="servico"
                  rules={[{ required: true, message: 'Escolha um serviço' }]}
                >
                  <Select
                    options={servicosOptions}
                    placeholder="Selecione um serviço"
                    style={{ background: '#ffffff', borderRadius: 8, height: 45 }}
                    dropdownStyle={{ background: '#ffffff', border: '1px solid #ccc' }}
                  />
                </Form.Item>

                <Form.Item
                  label={<span style={{ color: '#ffffff', fontWeight: 600 }}>Data</span>}
                  name="data"
                  rules={[{ required: true, message: 'Escolha a data' }]}
                >
                  <DatePicker style={{ width: '100%', background: '#ffffff', borderRadius: 8, height: 45 }} format="YYYY-MM-DD" />
                </Form.Item>

                {userRole && (
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: '0 0 15px #00ffff' }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      type="primary"
                      loading={loading}
                      htmlType="submit"
                      style={{
                        width: '100%',
                        marginTop: 25,
                        height: 48,
                        fontSize: 16,
                        fontWeight: 700,
                        letterSpacing: 1,
                        background: '#00ffff',
                        borderColor: '#00ffff',
                        borderRadius: 8,
                        color: '#0a0f24',
                        cursor: 'pointer',
                      }}
                    >
                      Confirmar
                    </Button>
                  </motion.div>
                )}
              </Form>
              {!userRole && (
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: '0 0 15px #00ffff' }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    type="primary"
                    onClick={() => router.push('/login')}
                    style={{
                      width: '100%',
                      marginTop: 25,
                      height: 48,
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: 1,
                      background: '#00ffff',
                      borderColor: '#00ffff',
                      borderRadius: 8,
                      color: '#0a0f24',
                      cursor: 'pointer',
                    }}
                  >
                    Fazer login
                  </Button>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </Content>

        {/* Section - Sobre cuidados com pets */}
        <Content style={{ maxWidth: 960, margin: '80px auto', padding: '20px' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ color: '#00ffff', fontSize: 36, marginBottom: 20 }}>A importância dos cuidados com seu PET</h2>
            <p style={{ color: '#ffffff', fontSize: 18, lineHeight: 1.6 }}>
              Manter seu pet saudável vai além do amor – é responsabilidade. Um banho regular, tosa adequada e atenção à higiene fazem toda a diferença para o bem-estar físico e emocional do seu animal.
            </p>
            <p style={{ color: '#ffffff', fontSize: 18, lineHeight: 1.6 }}>
              Um pet limpo e cuidado é mais feliz e previne doenças, garantindo uma vida longa e cheia de energia. Nossa equipe PET-GROOMER está pronta para proporcionar uma experiência segura e agradável para o seu amigo de quatro patas.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30, gap: 20 }}>
              <img src="/images/pet1.jpg" alt="Pet feliz" style={{ flex: '1 1 300px', borderRadius: 12, objectFit: 'cover', height: 220 }} />
              <img src="/images/pet2.jpg" alt="Cuidados pet" style={{ flex: '1 1 300px', borderRadius: 12, objectFit: 'cover', height: 220 }} />
            </div>
          </motion.div>
        </Content>

        {/* Section - Vídeo demonstrativo PET */}
        <Content style={{ maxWidth: 960, margin: '80px auto', padding: '20px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ color: '#00ffff', fontSize: 36, marginBottom: 20 }}>Veja nosso trabalho</h2>
            <iframe
              width="100%"
              height="480"
              src="https://www.youtube.com/embed/7C2b3wq9tXQ"
              title="Vídeo demonstrativo PET-GROOMER"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: 12 }}
            ></iframe>
          </motion.div>
        </Content>
      </Layout>

      <style>{`
        body {
          background: linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%) !important;
        }
      `}</style>
    </>
  );
}
