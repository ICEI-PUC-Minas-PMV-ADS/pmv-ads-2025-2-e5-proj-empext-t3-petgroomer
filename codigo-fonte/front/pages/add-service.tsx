import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
const { Content } = Layout;

export default function AddService() {
  return (
    <>
      <Head>
        <title>Adicionar Serviço</title>
      </Head>
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
        <h1>Adicionar Serviço</h1>
        <p>Esta página é para adicionar um novo serviço.</p>
      </div>
    </Content>
    </>
  );
}
