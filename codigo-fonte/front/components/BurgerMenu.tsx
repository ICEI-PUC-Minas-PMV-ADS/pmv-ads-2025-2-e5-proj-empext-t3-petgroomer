import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Drawer, Button, Menu } from 'antd';
import { MenuOutlined, UserOutlined, LogoutOutlined, PlusOutlined, CalendarOutlined, AppstoreOutlined } from '@ant-design/icons';
import { apiLogout } from '../lib/api';

type Role = 'ADMIN' | 'PETSHOP' | 'CLIENTE';
type User = { id: string; email: string; name: string; role: Role; createdAt: string };

type Props = {
  selectedKey?: string; 
  title?: string;
};

const BurgerMenu: React.FC<Props> = ({ selectedKey, title = 'Menu' }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isAuth = !!user;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem('user');
    if (!raw) { setUser(null); return; }
    try { setUser(JSON.parse(raw)); } catch { setUser(null); }
  }, []);

  const canManageServices = user?.role === 'ADMIN' || user?.role === 'PETSHOP';

  const items = useMemo(() => {
    const base = [
      { key: 'home', icon: <AppstoreOutlined />, label: <Link href="/">Portfolio</Link> },
      { key: 'calendar', icon: <CalendarOutlined />, label: <Link href="/calendar">Calendário</Link> },
    ];

    const authPart = isAuth
      ? [
          ...(canManageServices ? [{ key: 'add-service', icon: <PlusOutlined />, label: <Link href="/add-service">Adicionar Serviço</Link> }] : []),
          { key: 'me', icon: <UserOutlined />, label: <Link href="/me">Meu Perfil</Link> },
          { type: 'divider' as const },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Sair',
            onClick: async () => {
              await apiLogout();
              setOpen(false);
              router.replace('/login');
            },
          },
        ]
      : [{ key: 'login', label: <Link href="/login">Login</Link> }];

    return [...base, ...authPart];
  }, [isAuth, canManageServices, router]);

  return (
    <>
      <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: 24 }} />}
        onClick={() => setOpen(true)}
        style={{ display: 'inline-block', marginLeft: 8, color: '#fff' }}
        className="burger-menu-btn"
      />
      <Drawer title={title} placement="left" onClose={() => setOpen(false)} open={open}>
        <Menu
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          onClick={() => setOpen(false)}
          items={items}
        />
      </Drawer>
    </>
  );
};

export default BurgerMenu;
