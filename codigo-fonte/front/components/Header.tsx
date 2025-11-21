import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout, Menu, Button, Dropdown, Avatar, Space, Grid } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  PlusOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import BurgerMenu from './BurgerMenu';
import { apiLogout } from '../lib/api';

const { Header: AntdHeader } = Layout;
const { useBreakpoint } = Grid;

type Role = 'ADMIN' | 'PETSHOP' | 'CLIENTE';
type User = { id: string; email: string; name: string; role: Role; createdAt: string };

export default function Header() {
  const screens = useBreakpoint();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const isAuth = !!user;

  useEffect(() => {
    function read() {
      try {
        const raw = sessionStorage.getItem('user');
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    }

    read();

    const onAuthChanged = () => read();
    window.addEventListener('auth:changed', onAuthChanged);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('auth');
      bc.onmessage = onAuthChanged;
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'access_token') read();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('auth:changed', onAuthChanged);
      window.removeEventListener('storage', onStorage);
      if (bc) bc.close();
    };
  }, []);

  const selectedKey = useMemo(() => {
    const p = router.pathname;
    if (p === '/') return 'home';
    if (p.startsWith('/calendar')) return 'calendar';
    if (p.startsWith('/add-service')) return 'add-service';
    if (p.startsWith('/pedidoagendamento')) return 'pedido';
    if (p.startsWith('/sobre')) return 'sobre';
    if (p.startsWith('/me')) return 'me';
    if (p.startsWith('/login')) return 'login';
    if (p.startsWith('/contato')) return 'contato';
    return '';
  }, [router.pathname]);

  const canManageServices = user?.role === 'ADMIN' || user?.role === 'PETSHOP';

  // Menu principal (esquerda/centro)
  const mainItems = [
    { key: 'home', icon: <AppstoreOutlined />, label: <Link href="/">Portfolio</Link> },
    { key: 'sobre', icon: <AppstoreOutlined />, label: <Link href="/sobre">Sobre</Link> },
    { key: 'calendar', icon: <CalendarOutlined />, label: <Link href="/calendar">Calendário</Link> },
    { key: 'pedido', icon: <PlusOutlined />, label: <Link href="/pedidoagendamento">Pedido Agendamento</Link> },
    { key: 'contato', icon: <PhoneOutlined />, label: <Link href="/contato">Contato</Link> },
    ...(canManageServices ? [{ key: 'add-service', icon: <PlusOutlined />, label: <Link href="/add-service">Adicionar Serviço</Link> }] : []),
  ];

  // Ações do usuário (direita)
  const rightSideItems = isAuth
    ? [
        ...(canManageServices
          ? [{ key: 'add-service', icon: <PlusOutlined />, label: <Link href="/add-service">Adicionar Serviço</Link> }]
          : []),
        { key: 'me', icon: <UserOutlined />, label: <Link href="/dashboard">Meu Perfil</Link> },
      ]
    : [{ key: 'login', label: <Link href="/login">Login</Link> }];

  const menuItems = [...mainItems];

  const userMenu = (
    <Menu
      items={[
        { key: 'me', icon: <UserOutlined />, label: <Link href="/dashboard">Meu Perfil</Link> },
        { type: 'divider' as const },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Sair',
          onClick: async () => {
            await apiLogout();
            router.replace('/login');
          },
        },
      ]}
    />
  );

  return (
    <AntdHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        padding: '0 16px',
        background: '#0b1020',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        {/* Branding */}
        <Link href="/" style={{ color: 'white', fontWeight: 700, letterSpacing: 0.3 }}>
          PetGroomer
        </Link>

        {/* Desktop menu */}
        {screens.md && (
          <>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[selectedKey]}
              style={{ flex: 1, background: 'transparent' }}
              items={menuItems}
            />

            {/* Login ou Avatar no canto direito */}
            <div>
              {isAuth ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white', fontWeight: 500, textDecoration: 'none' }}>
                    <Avatar style={{ backgroundColor: '#6366f1', verticalAlign: 'middle' }}>
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                    Meu Perfil
                  </Link>
                  <button
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: 'white', fontWeight: 500, cursor: 'pointer', fontSize: 16 }}
                    onClick={async () => {
                      await apiLogout();
                      router.replace('/login');
                    }}
                  >
                    <LogoutOutlined style={{ marginRight: 6 }} />
                    Sair
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <Button type="primary">Login</Button>
                </Link>
              )}
            </div>
          </>
        )}

        {/* Mobile: burger com menu principal + login/avatar */}
        {!screens.md && (
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', minHeight: 64 }}>
            <BurgerMenu />
          </div>
        )}
      </div>
    </AntdHeader>
  );
}
