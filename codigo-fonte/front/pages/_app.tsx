import 'antd/dist/reset.css';
import React from 'react';
import type { AppProps } from 'next/app';
import '../theme.css';
import { ConfigProvider, Layout } from 'antd';
import theme from '../theme';
import Header from '../components/Header';


const { Footer } = Layout;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Layout
        className="layout"
        style={{
          minHeight: '100vh',
          background: '#0b1020', // fundo escuro uniforme
        }}
      >
        <Header />
        <div
          className="site-content"
          style={{
            flex: 1,
            background: 'transparent',
            margin: 0,
            padding: 0,
          }}
        >
          <Component {...pageProps} />
        </div>
        <Footer
          className="site-footer"
          style={{
            background: 'transparent',
            color: '#aaa',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          PetGroomer ©{new Date().getFullYear()}
        </Footer>
      </Layout>

      {/* Estilos globais para eliminar margens e faixas claras */}
      
    </ConfigProvider>
  );
}
