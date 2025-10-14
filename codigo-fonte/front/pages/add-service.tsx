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
      <Content className="content">
        <div className="page-container">
          <h1>Adicionar Serviço</h1>
          <p>Esta página é para adicionar um novo serviço.</p>
        </div>
      </Content>
    </>
  );
}
