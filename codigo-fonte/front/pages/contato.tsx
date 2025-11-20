import React from 'react';
import Head from 'next/head';
import { Layout, Card, Typography } from 'antd';
import { motion } from 'framer-motion';
import {
  PhoneOutlined,
  MailOutlined,
  InstagramOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { Title, Text, Link } = Typography;
const { Content } = Layout;

const informacoesContato = {
  nome: "Márcia Groomer",
  telefone: "+55 (31) 99143-4690",
  email: "nicolemarciasilvanunes@gmail.com",
  instagramUser: "marcia.estetica_animal",
  endereco: "Belo Horizonte, Minas Gerais, Brasil",
};

export default function PaginaContato() {
  return (
    <>
      <Head>
        <title>Contato - {informacoesContato.nome}</title>
      </Head>

      <Layout
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%)',
        }}
      >
        <Content style={{ maxWidth: 900, margin: "70px auto", padding: "20px" }}>
          
          {/* Título com animação */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: 50 }}
          >
            <span style={{ fontSize: 50, display: "block" }}>🐾</span>

            {/* Espaço de uma linha */}
            <div style={{ height: 10 }} />

            <h1
              style={{
                color: "#ffffff",
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Contato
            </h1>
          </motion.div>

          {/* Card principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: 20,
                borderRadius: 16,
                boxShadow: "0 0 15px #00ffff",
              }}
            >
              <Title
                level={3}
                style={{
                  color: "#00ffff",
                  textAlign: "center",
                  marginBottom: 30,
                }}
              >
                Informações de Contato
              </Title>

              {/* Lista estilizada */}
              <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>

                {/* Telefone */}
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <PhoneOutlined style={{ color: "#8b5cf6", fontSize: 26 }} />
                  <Link href={`tel:${informacoesContato.telefone}`} style={{ color: "#a78bfa" }}>
                    {informacoesContato.telefone}
                  </Link>
                </div>

                {/* Email */}
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <MailOutlined style={{ color: "#8b5cf6", fontSize: 26 }} />
                  <Link href={`mailto:${informacoesContato.email}`} style={{ color: "#a78bfa" }}>
                    {informacoesContato.email}
                  </Link>
                </div>

                {/* Instagram */}
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <InstagramOutlined style={{ color: "#8b5cf6", fontSize: 26 }} />
                  <Link
                    href={`https://www.instagram.com/${informacoesContato.instagramUser}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#a78bfa" }}
                  >
                    @{informacoesContato.instagramUser}
                  </Link>
                </div>

                {/* Endereço */}
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <EnvironmentOutlined style={{ color: "#8b5cf6", fontSize: 26 }} />
                  <Text style={{ color: "#ddd" }}>{informacoesContato.endereco}</Text>
                </div>
              </div>
            </Card>
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
