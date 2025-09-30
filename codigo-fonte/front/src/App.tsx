import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      <Router>
        <Layout className="layout">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer style={{ textAlign: 'center' }}>
            My Portfolio ©{new Date().getFullYear()} Created with Ant Design
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;