import React, { useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import { Layout } from "antd";
const { Content } = Layout;
import getConfig from 'next/config';
interface Servico {
  id: number;
  nome: string;
  valor: number;
}

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig?.API_URL || 'http://localhost:4000';

export default function AdminServicePage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchServicos();
  }, []);

  async function fetchServicos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/servicos`);
      if (!res.ok) throw new Error(`Erro ao buscar serviços: ${res.status}`);
      const data: Servico[] = await res.json();
      setServicos(data);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os serviços.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nome.trim()) return setError("Informe o nome do serviço.");
    const parsedValor = Number(String(valor).replace(",", "."));
    if (!parsedValor || parsedValor <= 0)
      return setError("Informe um valor válido.");

    setSubmitting(true);
    try {
      const payload = { nome: nome.trim(), valor: parsedValor };
      const res = await fetch(`${API_URL}/servicos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Erro ao cadastrar serviço: ${res.status}`);

      const created: Servico = await res.json();
      setServicos((prev) => [created, ...prev]);
      setNome("");
      setValor("");
    } catch (err) {
      console.error(err);
      setError("Falha ao cadastrar serviço. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number, nome: string) {
    if (!confirm(`Deseja realmente deletar o serviço "${nome}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/servicos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Erro ao deletar: ${res.status}`);
      setServicos((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Falha ao deletar serviço. Tente novamente.");
    }
  }

  return (
    <div className="page-container">
      <Head>
        <title>Admin - Serviços | PetGroomer</title>
      </Head>

      <header className="page-header">
        <h1 className="page-title">Serviços - Administração</h1>
      </header>

      {/* Formulário de cadastro */}
      <section className="form-container">
        <h2>Novo Serviço</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Banho Completo"
          />

          <label htmlFor="valor">Valor (R$)</label>
          <input
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Ex: 80.00"
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Salvando..." : "Cadastrar Serviço"}
          </button>
        </form>
      </section>

      {/* Lista de serviços */}
      {loading ? (
        <p>Carregando serviços...</p>
      ) : (
        <div className="cards-grid">
          {servicos.map((s) => (
            <div key={s.id} className="card">
              <h3 className="card-title">{s.nome}</h3>
              <p className="card-value">R$ {s.valor.toFixed(2)}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(s.id, s.nome)}
              >
                Deletar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}