import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import getConfig from 'next/config';

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
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Nossos Serviços</h1>
        <p className="page-subtitle">Confira os serviços que oferecemos para seu pet!</p>
      </header>

      {loading ? (
        <p>Carregando serviços...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="cards-grid">
          {servicos.map((s: any) => (
            <motion.div
              key={s.id}
              className="card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="card-title">{s.nome}</h3>
              <p className="card-value">{formatCurrency(s.valor)}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}