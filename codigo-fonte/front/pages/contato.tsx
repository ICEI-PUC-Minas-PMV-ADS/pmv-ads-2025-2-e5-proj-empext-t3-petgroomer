import React from 'react';
import { Row, Col, Card, Typography, List, Divider } from 'antd';
import Head from 'next/head'; 
import { PhoneOutlined, MailOutlined, InstagramOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const informacoesContato = {
  nome: "Márcia Groomer", 
  telefone: "+55 (99) 99999-9999",
  email: "email@exemplo.com",
  instagramUser: "marcia.estetica_animal", // Apenas o usuário, sem o "@"
  endereco: "Belo Horizonte, Minas Gerais, Brasil",
};

const PaginaContato = () => {
  return (
    <>
      
      <Head>
        <title>Contato - {informacoesContato.nome}</title>
        <meta name="description" content="Entre em contato conosco." />
      </Head>
      <Row justify="center" align="middle" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Card style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Title level={2} style={{ color: '#fff', margin: 0 }}>{informacoesContato.nome}</Title>
            </div>
            <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.1)', margin: '0 0 16px' }} />
            <List 
              itemLayout="horizontal"
              split={false} 
              dataSource={[
                {
                  icon: <PhoneOutlined />,
                  title: 'Telefone',
                  description: <Link href={`tel:${informacoesContato.telefone}`}>{informacoesContato.telefone}</Link>,
                  href: `tel:${informacoesContato.telefone}`
                },
                {
                  icon: <MailOutlined />,
                  title: 'Email',
                  description: <Link href={`mailto:${informacoesContato.email}`}>{informacoesContato.email}</Link>,
                  href: `mailto:${informacoesContato.email}`
                },
                {
                  icon: <InstagramOutlined />,
                  title: 'Instagram',
                  description: <Link href={`https://www.instagram.com/${informacoesContato.instagramUser}`} target="_blank" rel="noopener noreferrer">@{informacoesContato.instagramUser}</Link>,
                  href: `https://www.instagram.com/${informacoesContato.instagramUser}`
                },
                {
                  icon: <EnvironmentOutlined />,
                  title: 'Endereço',
                  description: <Text style={{ color: '#aaa' }}>{informacoesContato.endereco}</Text>,
                  href: null 
                }
              ]}
              renderItem={(item) => (
                <List.Item
                  style={{ 
                    padding: '16px 8px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: item.href ? 'pointer' : 'default',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => item.href && window.open(item.href, item.href.startsWith('http') ? '_blank' : '_self')}
                  onMouseEnter={(e) => { if (item.href) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'; }}
                  onMouseLeave={(e) => { if (item.href) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <List.Item.Meta
                    avatar={React.cloneElement(item.icon, { style: { color: '#8b5cf6', fontSize: '22px' } })}
                    title={<Text style={{ color: '#fff' }}>{item.title}</Text>}
                    description={React.cloneElement(item.description, { 
                      style: { color: item.href ? '#a78bfa' : '#aaa', pointerEvents: 'none' } 
                    })}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PaginaContato;
