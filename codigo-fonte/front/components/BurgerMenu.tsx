import React, { useState } from 'react';
import { Drawer, Button, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: 24 }} />}
        onClick={() => setOpen(true)}
            style={{ display: 'inline-block', marginLeft: 8 }}
        className="burger-menu-btn"
      />
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu
          mode="vertical"
          onClick={() => setOpen(false)}
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
      </Drawer>
    </>
  );
};

export default BurgerMenu;
