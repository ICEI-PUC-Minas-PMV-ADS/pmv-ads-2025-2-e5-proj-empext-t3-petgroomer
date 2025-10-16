import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import BurgerMenu from './BurgerMenu';

const Header: React.FC = () => {
  const items = [
    { key: 'home', label: <Link href="/">Portfolio</Link> },
    { key: 'add-service', label: <Link href="/add-service">Adicionar Serviço</Link> },
    { key: 'pedido', label: <Link href="/pedido-agendamento">Pedido de Agendamento</Link> }, // ✅ corrigido
    { key: 'login', label: <Link href="/login">Login</Link> },
  ];

  return (
    <header className="app-header">
      <div className="desktop-menu" style={{ flex: 1 }}>
        <Menu mode="horizontal" items={items} />
      </div>
      <div className="mobile-menu">
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
