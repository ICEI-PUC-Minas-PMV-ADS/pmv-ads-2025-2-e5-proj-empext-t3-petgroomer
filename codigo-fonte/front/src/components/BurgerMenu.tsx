import React, { useState } from 'react';
import { Drawer, Button, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
        <Menu mode="vertical" onClick={() => setOpen(false)}>
          <Menu.Item key="home">
            <Link to="/">Portfolio</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
