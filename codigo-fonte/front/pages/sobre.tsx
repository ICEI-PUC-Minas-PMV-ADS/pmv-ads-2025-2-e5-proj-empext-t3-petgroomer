import React from 'react';
import Head from 'next/head';
import { Layout, Card } from 'antd';
import { motion } from 'framer-motion';

const { Content } = Layout;

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre - PET-GROOMER</title>
      </Head>

      <Layout
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%)',
        }}
      >
        <Content
          style={{
            maxWidth: 1000,
            margin: '70px auto',
            padding: '20px',
          }}
        >
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 50 }}
          >
            <span style={{ fontSize: 42, display: 'block' }}>🐾</span>

            <h1
              style={{
                color: '#ffffff',
                fontSize: 36,
                fontWeight: 900,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              SOBRE A PROFISSIONAL
            </h1>
          </motion.div>

          {/* TEXTO + FOTO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* TEXTOS */}
            <div
              style={{
                flex: '1 1 400px',
                color: '#ffffff',
                lineHeight: 1.7,
                fontSize: 17,
              }}
            >
              <h2
                style={{
                  color: '#00ffff',
                  fontSize: 26,
                  marginBottom: 20,
                  fontWeight: 700,
                }}
              >
                Conheça nossa especialista
              </h2>

              <p>
                Márcia Nicole é apaixonada por animais desde a infância e possui
                mais de 3 anos de experiência no mercado PET.
              </p>
              <p>
                Com expertise em cuidados, estética e bem-estar animal, ela
                transformou sua paixão em uma carreira dedicada a proporcionar
                conforto e alegria para cada pet que passa pelas suas mãos.
              </p>
              <p>
                Seu amor pelos animais vai além do trabalho: cada banho, tosa e
                acompanhamento é feito com atenção e carinho, garantindo
                segurança e felicidade para os pets e tranquilidade para seus
                tutores.
              </p>
              <p>
                A PET-GROOMER é a concretização de um sonho: unir
                profissionalismo, cuidado e paixão por animais em um só lugar.
              </p>
            </div>

            {/* FOTO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                flex: '1 1 400px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: 'transparent',
                  border: '1px solid #00ffff25',
                  boxShadow: '0 0 18px #00ffff55',
                  maxWidth: 360,
                  padding: 0,
                }}
                bodyStyle={{ padding: 0 }}
              >
                <img
                  src="/Marcia1.jpeg"
                  alt="Profissional Márcia"
                  style={{
                    width: '100%',
                    height: 380,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Card>
            </motion.div>
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
