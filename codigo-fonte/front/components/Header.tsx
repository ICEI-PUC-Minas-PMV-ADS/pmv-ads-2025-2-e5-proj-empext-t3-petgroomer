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
import BurgerMenu from './BurgerMenu'; // veremos abaixo como passar os itens
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

  // carga inicial
  read();

  // mesma aba
  const onAuthChanged = () => read();
  window.addEventListener('auth:changed', onAuthChanged);

  // multi-abas via BroadcastChannel (opcional)
  let bc: BroadcastChannel | null = null;
  try {
    bc = new BroadcastChannel('auth');
    bc.onmessage = onAuthChanged;
  } catch {}

  // fallback: storage (outras abas)
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

  // item ativo
  const selectedKey = useMemo(() => {
    const p = router.pathname;
    if (p === '/') return 'home';
    if (p.startsWith('/calendar')) return 'calendar';
    if (p.startsWith('/add-service')) return 'add-service';
    if (p.startsWith('/login')) return 'login';
    if (p.startsWith('/contato')) return 'contato';
    if (p.startsWith('/me')) return 'me';
    return '';
  }, [router.pathname]);

  const canManageServices = user?.role === 'ADMIN' || user?.role === 'PETSHOP'; // (bônus)

  // Itens comuns (sempre)
  const commonItems = [
    { key: 'home', icon: <AppstoreOutlined />, label: <Link href="/">Portfolio</Link> },
    { key: 'calendar', icon: <CalendarOutlined />, label: <Link href="/calendar">Calendário</Link> },
    { key: 'pedido', icon: <PlusOutlined />, label: <Link href="/pedidoagendamento">Pedido Agendamento</Link> },
    { key: 'contato', icon: <PhoneOutlined />, label: <Link href="/contato">Contato</Link> },
  ];

  // Itens condicionais por auth/role
  const rightSide = isAuth
    ? [
        // (bônus) Somente PETSHOP/ADMIN
        ...(canManageServices
          ? [{ key: 'add-service', icon: <PlusOutlined />, label: <Link href="/add-service">Adicionar Serviço</Link> }]
          : []),
        { key: 'me', icon: <UserOutlined />, label: <Link href="/me">Meu Perfil</Link> },
      ]
    : [
        { key: 'login', label: <Link href="/login">Login</Link> },
      ];

  // Menu completo para desktop
  const menuItems = [...commonItems, ...rightSide];

  // Dropdown do usuário (avatar) para ações rápidas
  const userMenu = (
    <Menu
      items={[
        { key: 'me', icon: <UserOutlined />, label: <Link href="/me">Meu Perfil</Link> },
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
      <div style={{
        maxWidth: 1200, margin: '0 auto', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', gap: 12
      }}>
        {/* Branding */}
        <Link href="/" style={{ color: 'white', fontWeight: 700, letterSpacing: 0.3 }}>
          PetGroomer
        </Link>

        {/* Desktop menu */}
        {screens.md && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[selectedKey]}
              style={{ flex: 1, background: 'transparent' }}
              items={menuItems}
            />
            {/* Ações à direita (avatar/logout) quando logado */}
            {isAuth && (
              <Space>
                <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
                  <Avatar style={{ backgroundColor: '#6366f1', cursor: 'pointer' }}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </Dropdown>
                <Button
                  icon={<LogoutOutlined />}
                  onClick={async () => { await apiLogout(); router.replace('/login'); }}
                >
                  Sair
                </Button>
              </Space>
            )}
          </div>
        )}

        {/* Mobile: burger com os mesmos itens + ações */}
        {!screens.md && (
         <BurgerMenu selectedKey={selectedKey} />
        )}
      </div>
    </AntdHeader>
  );
}
