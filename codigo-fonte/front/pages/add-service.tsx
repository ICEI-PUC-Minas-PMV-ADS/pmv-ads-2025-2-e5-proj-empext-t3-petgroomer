import React, { useEffect, useState, FormEvent } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Card } from "antd";
import getConfig from "next/config";

interface Servico {
  id: number;
  nome: string;
  valor: number;
}

const { publicRuntimeConfig } = getConfig();
const API_URL = publicRuntimeConfig?.API_URL || "http://localhost:4000";

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
    <>
      <Head>
        <title>Admin - Serviços | PetGroomer</title>
      </Head>

      <div
        style={{
          minHeight: "100vh",
          padding: "40px 20px",
          background: "linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%)",
        }}
      >
        {/* HEADER ANIMADO */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <span style={{ fontSize: 50, display: "block" }}>🐾</span>

          <h1
            style={{
              color: "#ffffff",
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            
            Administração de Serviços
          </h1>
        </motion.div>

        {/* FORMULÁRIO COM DESIGN NOVO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: 600,
            margin: "0 auto 50px auto",
            padding: 30,
            background: "#11162b",
            borderRadius: 15,
            boxShadow: "0 0 20px #00ffff",
            color: "white",
          }}
        >
          <h2 style={{ color: "#00ffff", marginBottom: 20 }}>Cadastrar Serviço</h2>

          {error && (
            <div
              style={{
                background: "rgba(255,0,0,0.2)",
                padding: 10,
                borderRadius: 8,
                marginBottom: 15,
                color: "#ff8080",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <label style={{ color: "#00ffff" }}>Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Banho Completo"
              style={{
                padding: 12,
                borderRadius: 8,
                border: "1px solid #00ffff",
                background: "#0a1025",
                color: "white",
              }}
            />

            <label style={{ color: "#00ffff" }}>Valor (R$)</label>
            <input
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Ex: 80.00"
              style={{
                padding: 12,
                borderRadius: 8,
                border: "1px solid #00ffff",
                background: "#0a1025",
                color: "white",
              }}
            />

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: 10,
                padding: 12,
                background: submitting ? "#004c4c" : "#00ffff",
                color: "#000",
                fontWeight: 700,
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              {submitting ? "Salvando..." : "Cadastrar Serviço"}
            </button>
          </form>
        </motion.div>

        {/* LISTA DE SERVIÇOS COM CARDS IGUAIS AO DELE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 30,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {loading ? (
            <p style={{ color: "white", textAlign: "center" }}>Carregando serviços...</p>
          ) : (
            servicos.map((s) => (
              <Card
                key={s.id}
                hoverable
                style={{
                  background: "#11162b",
                  borderRadius: 15,
                  padding: 10,
                  textAlign: "center",
                  color: "white",
                  boxShadow: "0 0 15px #00ffff",
                }}
              >
                <h3 style={{ fontSize: 24, color: "#00ffff", marginBottom: 10 }}>
                  {s.nome}
                </h3>
                <p style={{ fontSize: 20 }}>R$ {s.valor.toFixed(2)}</p>

                <button
                  onClick={() => handleDelete(s.id, s.nome)}
                  style={{
                    marginTop: 15,
                    padding: "8px 15px",
                    background: "red",
                    border: "none",
                    borderRadius: 8,
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Deletar
                </button>
              </Card>
            ))
          )}
        </motion.div>
      </div>

      <style>{`
        body {
          background: linear-gradient(160deg, #0a0f24 0%, #1b1f3b 100%) !important;
        }
      `}</style>
    </>
  );
}
