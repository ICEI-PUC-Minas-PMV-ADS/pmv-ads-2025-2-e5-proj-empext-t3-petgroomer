import type { AppProps } from 'next/app';
import '../src/theme.css';
import '../src/index.css';
import { ConfigProvider, Layout } from 'antd';
import theme from '../src/theme';
import Header from '../src/components/Header';

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
