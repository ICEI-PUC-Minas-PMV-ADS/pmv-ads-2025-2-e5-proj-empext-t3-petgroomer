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
        {/* Top Section */}
        <Content style={{ maxWidth: 1000, margin: '70px auto', padding: '20px' }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 50 }}
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
              SOBRE A PROFISSIONAL
            </h1>
          </motion.div>

          {/* Seção com texto e imagens */}
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
            {/* Lado esquerdo - Textos */}
            <div style={{ flex: '1 1 400px', color: '#ffffff', lineHeight: 1.6 }}>
              <h2 style={{ color: '#00ffff', fontSize: 32, marginBottom: 20 }}>
                Conheça nossa especialista
              </h2>
              <p>
                Márcia Nicole é apaixonada por animais desde a infância e possui mais de 3 anos de experiência no mercado PET.
              </p>
              <p>
                Com expertise em cuidados, estética e bem-estar animal, ela transformou sua paixão em uma carreira dedicada a proporcionar conforto e alegria para cada pet que passa pelas suas mãos.
              </p>
              <p>
                Seu amor pelos animais vai além do trabalho: cada banho, tosa e acompanhamento é feito com atenção e carinho, garantindo segurança e felicidade para os pets e tranquilidade para seus tutores.
              </p>
              <p>
                A PET-GROOMER é a concretização de um sonho: unir profissionalismo, cuidado e paixão por animais em um só lugar.
              </p>
            </div>

            {/* Lado direito - imagens */}
            <div
              style={{
                flex: '1 1 400px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
              }}
            >
              <Card
                hoverable
                style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 15px #00ffff' }}
              >
                <img
                  src="/images/pet1.jpg"
                  alt="Pet feliz"
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
              </Card>
              <Card
                hoverable
                style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 15px #00ffff' }}
              >
                <img
                  src="/images/pet2.jpg"
                  alt="Pet brincando"
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
              </Card>
              <Card
                hoverable
                style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 15px #00ffff' }}
              >
                <img
                  src="/images/pet3.jpg"
                  alt="Pet relaxando"
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
              </Card>
              <Card
                hoverable
                style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 0 15px #00ffff' }}
              >
                <img
                  src="/images/pet4.jpg"
                  alt="Pet brincando"
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
              </Card>
            </div>
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
