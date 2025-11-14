import React from 'react';
import Head from 'next/head';
import { Layout, Button, Row, Col, Card, Typography } from 'antd';
import {
  ArrowRightOutlined,
  ScissorOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>MN Groomer - Banho e Tosa de Pets</title>
        <meta
          name="description"
          content="MN Groomer oferece os melhores serviços de banho e tosa para o seu pet. Agende agora!"
        />
      </Head>
      <Content>
        {/* Hero Section */}
        <div className="hero-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title
              level={1}
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                textAlign: 'center',
              }}
            >
              Bem-vindo à <span className="highlight-text">MN Groomer</span>
            </Title>
            <Paragraph
              style={{
                color: '#e2e8f0',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                maxWidth: '600px',
                textAlign: 'center',
                margin: '0 auto 24px auto',
              }}
            >
              O melhor cuidado para o seu melhor amigo. Oferecemos serviços de
              banho, tosa e muito mais com carinho e profissionalismo.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              href="/cadastro"
              icon={<ArrowRightOutlined />}
            >
              Agende um Horário
            </Button>
          </motion.div>
        </div>

        {/* Features/Services Section */}
        <div className="services-section">
          <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
            Nossos Diferenciais
          </Title>
          <Row gutter={[32, 32]} justify="center" align="stretch">
            <Col xs={24} sm={12} md={8}>
              <Card hoverable className="feature-card">
                <ScissorOutlined className="feature-icon" />
                <Title level={4}>Tosa Profissional</Title>
                <Paragraph>
                  Nossos tosadores são experientes em todos os tipos de pelagem,
                  garantindo o visual perfeito para seu pet.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable className="feature-card">
                <i className="fas fa-bath feature-icon"></i>
                <Title level={4}>Banho Relaxante</Title>
                <Paragraph>
                  Utilizamos produtos de alta qualidade e hipoalergênicos para
                  um banho seguro e relaxante.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable className="feature-card">
                <SmileOutlined className="feature-icon" />
                <Title level={4}>Ambiente Acolhedor</Title>
                <Paragraph>
                  Um espaço pensado para o bem-estar do seu pet, com muito
                  carinho e atenção em cada detalhe.
                </Paragraph>
              </Card>
            </Col>
          </Row>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Button size="large" href="/public-service">
              Ver todos os serviços
            </Button>
          </div>
        </div>
      </Content>
    </>
  );
}
