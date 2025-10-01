import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

export default function Home() {
  return (
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
        <h1>My Portfolio</h1>
        <p>Welcome to my portfolio website. Here you can find my projects and learn more about me.</p>
      </div>
    </Content>
  );
}
