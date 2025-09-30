import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import BurgerMenu from './BurgerMenu';

const Header: React.FC = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 64 }}>
      <div className="desktop-menu" style={{ flex: 1 }}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">Portfolio</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="mobile-menu">
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
