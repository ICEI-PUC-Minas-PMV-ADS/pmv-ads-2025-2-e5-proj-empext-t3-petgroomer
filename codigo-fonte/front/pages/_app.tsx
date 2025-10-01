
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
      <Layout className="layout">
        <Header />
        <Component {...pageProps} />
        <Footer style={{ textAlign: 'center' }}>
          My Portfolio ©{new Date().getFullYear()} Created with Ant Design
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
