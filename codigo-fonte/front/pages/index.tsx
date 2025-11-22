import React from 'react';
import Head from 'next/head';
import { Layout, Button, Row, Col, Card, Typography } from 'antd';
import { ArrowRightOutlined, ScissorOutlined, SmileOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { FaBath } from 'react-icons/fa6';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>MN Groomer - Banho e Tosa de Pets</title>
        <meta name="description" content="MN Groomer oferece os melhores serviços de banho e tosa para o seu pet. Agende agora!" />
      </Head>

      <Layout
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%)',
          padding: '40px 0'
        }}
      >
        <Content style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>

          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <span style={{ fontSize: 55, display: 'block' }}>🐾</span>
            <Title
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: 'uppercase'
              }}
            >
              Bem-vindo à <span style={{ color: '#00ffff' }}>MN Groomer</span>
            </Title>

            {/* ICONE/LOGO */}
            <img
              src="/IconeSemFundo2.png"
              alt="MN Groomer Logo"
              style={{ width: 300, height: 300, margin: '20px 0' }}
            />

            <Paragraph
              style={{
                color: '#e2e8f0',
                fontSize: '1.2rem',
                maxWidth: 650,
                margin: '20px auto'
              }}
            >
              O melhor cuidado para o seu melhor amigo. Oferecemos serviços de banho, tosa e muito mais com carinho e profissionalismo.
            </Paragraph>

            <Button
              type="primary"
              size="large"
              href="/cadastro"
              icon={<ArrowRightOutlined />}
              style={{
                background: '#00ffff',
                borderColor: '#00ffff',
                color: '#000',
                fontWeight: 'bold',
                padding: '0 25px'
              }}
            >
              Agende um Horário
            </Button>
          </motion.div>

          {/* SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title
              level={2}
              style={{ color: '#ffffff', textAlign: 'center', marginBottom: 50 }}
            >
              Nossos Diferenciais
            </Title>

            <Row gutter={[32, 32]} justify="center" align="top">
              <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
                <Card
                  hoverable
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: 15,
                    padding: '20px',
                    textAlign: 'center',
                    color: '#fff'
                  }}
                >
                  <ScissorOutlined style={{ fontSize: 45, color: '#00ffff', marginBottom: 20 }} />
                  <Title level={4} style={{ color: '#ffffff' }}>Tosa Profissional</Title>
                  <Paragraph style={{ color: '#e2e8f0' }}>
                    Tosadora experiente em todos os tipos de pelagem, garantindo o visual perfeito para seu pet.
                  </Paragraph>
                </Card>
                <img src="/Cachorro1.jpeg" alt="Cachorro Tosa" style={{ width: '100%', borderRadius: 12, marginTop: 15 }} />
              </Col>

              <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
                <Card
                  hoverable
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: 15,
                    padding: '20px',
                    textAlign: 'center',
                    color: '#fff'
                  }}
                >
                  <FaBath style={{ fontSize: 45, color: '#00ffff', marginBottom: 20 }} />
                  <Title level={4} style={{ color: '#ffffff' }}>Banho Relaxante</Title>
                  <Paragraph style={{ color: '#e2e8f0' }}>
                    Utilizamos produtos de alta qualidade e hipoalergênicos para um banho seguro e relaxante.
                  </Paragraph>
                </Card>
                <img src="/Cachorro2.jpeg" alt="Cachorro Banho" style={{ width: '100%', borderRadius: 12, marginTop: 15 }} />
              </Col>

              <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
                <Card
                  hoverable
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: 15,
                    padding: '20px',
                    textAlign: 'center',
                    color: '#fff'
                  }}
                >
                  <SmileOutlined style={{ fontSize: 45, color: '#00ffff', marginBottom: 20 }} />
                  <Title level={4} style={{ color: '#ffffff' }}>Ambiente Acolhedor</Title>
                  <Paragraph style={{ color: '#e2e8f0' }}>
                    Um espaço pensado para o bem-estar do seu pet, com muito carinho e atenção em cada detalhe.
                  </Paragraph>
                </Card>
                <img src="/Cachorro3.jpeg" alt="Cachorro Ambiente" style={{ width: '100%', borderRadius: 12, marginTop: 15 }} />
              </Col>
            </Row>

            <div style={{ textAlign: 'center', marginTop: 50 }}>
              <Button
                size="large"
                href="/public-service"
                style={{
                  background: '#00ffff',
                  borderColor: '#00ffff',
                  color: '#000',
                  fontWeight: 'bold'
                }}
              >
                Ver todos os serviços
              </Button>
            </div>
          </motion.div>
        </Content>

        <style>{`
          body {
            background: linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%) !important;
          }
        `}</style>
      </Layout>
    </>
  );
}
