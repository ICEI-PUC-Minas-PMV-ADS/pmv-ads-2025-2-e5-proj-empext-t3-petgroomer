import React from 'react';
import { Menu } from 'antd';
import BurgerMenu from './BurgerMenu';

const Header: React.FC = () => {
  const items = [
    { key: 'home', label: <a href="/">Portfolio</a> },
    { key: 'calendar', label: <a href="/calendar">Calendário</a> },
    { key: 'add-service', label: <a href="/add-service">Adicionar Serviço</a> },
    { key: 'login', label: <a href="/login">Login</a> },
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
