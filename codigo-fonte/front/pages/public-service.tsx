import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import getConfig from 'next/config';
import { Card } from 'antd';

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig?.API_URL || 'http://localhost:4000';

export default function ServicesPagePublic() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServicos();
  }, []);

  async function fetchServicos() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/servicos`);
      if (!res.ok) throw new Error(`Erro ao buscar serviços: ${res.status}`);
      const data = await res.json();
      setServicos(data);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar os serviços.');
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(v: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(v);
  }

  return (
    <>
      <Head>
        <title>Serviços - PET-GROOMER</title>
      </Head>

      <div
        style={{
          minHeight: '100vh',
          padding: '40px 20px',
          background: 'linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%)',
        }}
      >
        {/* HEADER COM MOTION IGUAL AO DELE */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
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
            Nossos Serviços
          </h1>
          <p style={{ color: '#00ffff', fontSize: 20, marginTop: 10 }}>
            Confira os serviços que oferecemos para seu pet!
          </p>
        </motion.div>

        {/* LOADING OU ERRO */}
        {loading ? (
          <p style={{ color: 'white', textAlign: 'center' }}>Carregando serviços...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 30,
              maxWidth: 1100,
              margin: '0 auto',
            }}
          >
            {servicos.map((s: any) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  hoverable
                  style={{
                    background: '#11162b',
                    borderRadius: 15,
                    padding: 10,
                    textAlign: 'center',
                    color: 'white',
                    boxShadow: '0 0 15px #00ffff',
                  }}
                >
                  <h3
                    style={{
                      fontSize: 24,
                      color: '#00ffff',
                      marginBottom: 10,
                      fontWeight: 700,
                    }}
                  >
                    {s.nome}
                  </h3>
                  <p style={{ fontSize: 20 }}>{formatCurrency(s.valor)}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        body {
          background: linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%) !important;
        }
      `}</style>
    </>
  );
}
