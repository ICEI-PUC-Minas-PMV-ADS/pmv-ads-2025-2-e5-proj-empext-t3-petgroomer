import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import BurgerMenu from './BurgerMenu';

const Header: React.FC = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 64 }}>
      <div className="desktop-menu" style={{ flex: 1 }}>
        <Menu
          mode="horizontal"
          items={[
            {
              key: 'home',
              label: <Link href="/">Portfolio</Link>,
            },
            {
              key: 'login',
              label: <Link href="/login">Login</Link>,
            },
          ]}
        />
      </div>
      <div className="mobile-menu">
        <BurgerMenu />
      </div>
    </header>
  );
};

export default Header;
