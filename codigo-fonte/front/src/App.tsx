import React from 'react';
// Removed react-router-dom imports for Next.js migration
import { ConfigProvider, Layout } from 'antd';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import theme from './theme'; // Import the custom theme
import './App.css';

const { Footer } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider theme={theme}>
      <Layout className="layout">
        <Header />
        {/* Next.js handles routing via pages */}
        <Footer style={{ textAlign: 'center' }}>
          My Portfolio ©{new Date().getFullYear()} Created with Ant Design
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;