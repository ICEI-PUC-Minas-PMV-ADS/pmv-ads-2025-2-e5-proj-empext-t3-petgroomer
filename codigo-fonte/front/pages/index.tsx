import React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
const { Content } = Layout;

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
    <Content className="content">
      <div className="page-container">
        <h1>Portfolio</h1>
        <p>Layout pendente, conectar o backend do portfolio aqui.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
      </div>
    </Content>
    </>
  );
}
