import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, DatePicker, Select, Card } from 'antd';
import Head from 'next/head';
import getConfig from 'next/config';
import { motion } from 'framer-motion';

const { Content } = Layout;

export default function PedidoAgendamento() {
  const [loading, setLoading] = useState(false);
  const [servicos, setServicos] = useState<any[]>([]);

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
    setLoading(true);
    try {
      const payload = {
        ...values,
        data: values?.data?.toISOString?.() ?? null,
      };

      await fetch(`${API_URL}/pedidoagendamento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Agendamento PET-GROOMER</title>
      </Head>

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
                <Form.Item
                  label={<span style={{ color: '#ffffff', fontWeight: 600 }}>Nome</span>}
                  name="cliente"
                  rules={[{ required: true, message: 'Informe o nome' }]}
                >
                  <Input placeholder="Seu nome" style={{ background: '#ffffff', borderRadius: 8, height: 45 }} />
                </Form.Item>

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
                  <DatePicker style={{ width: '100%', background: '#ffffff', borderRadius: 8, height: 45 }} showTime />
                </Form.Item>

                <motion.div whileHover={{ scale: 1.03, boxShadow: '0 0 15px #00ffff' }} transition={{ duration: 0.3 }}>
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
                    }}
                  >
                    Confirmar
                  </Button>
                </motion.div>
              </Form>
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
