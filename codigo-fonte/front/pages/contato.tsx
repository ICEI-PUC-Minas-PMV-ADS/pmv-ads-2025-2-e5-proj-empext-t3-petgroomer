import React from 'react';
import { Row, Col, Card, Typography, List } from 'antd';
import Head from 'next/head'; 
import { PhoneOutlined, MailOutlined, InstagramOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const informacoesContato = {
  nome: "Márcia Groomer",
  telefone: "+55 (99) 99999-9999",
  email: "email@exemplo.com",
  instagramUser: "marcia.estetica_animal", // Apenas o nome de usuário, sem o "@"
  endereco: "Belo Horizonte, Minas Gerais, Brasil"
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
              <Title level={2} style={{ color: '#fff' }}>{informacoesContato.nome}</Title>
              <Text style={{ color: '#aaa' }}>Entre em contato através dos canais abaixo:</Text>
            </div>
            <List itemLayout="horizontal">
              <List.Item>
                <List.Item.Meta
                  avatar={<PhoneOutlined style={{ color: '#1890ff', fontSize: '20px' }} />}
                  title={<Text style={{ color: '#fff' }}>Telefone</Text>}
                  description={<Link href={`tel:${informacoesContato.telefone}`} style={{ color: '#1890ff' }}>{informacoesContato.telefone}</Link>}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<MailOutlined style={{ color: '#1890ff', fontSize: '20px' }} />}
                  title={<Text style={{ color: '#fff' }}>Email</Text>}
                  description={<Link href={`mailto:${informacoesContato.email}`} style={{ color: '#1890ff' }}>{informacoesContato.email}</Link>}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<InstagramOutlined style={{ color: '#1890ff', fontSize: '20px' }} />}
                  title={<Text style={{ color: '#fff' }}>Instagram</Text>}
                  description={<Link href={`https://www.instagram.com/${informacoesContato.instagramUser}`} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>@{informacoesContato.instagramUser}</Link>}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<EnvironmentOutlined style={{ color: '#1890ff', fontSize: '20px' }} />}
                  title={<Text style={{ color: '#fff' }}>Endereço</Text>}
                  description={<Text style={{ color: '#aaa' }}>{informacoesContato.endereco}</Text>}
                />
              </List.Item>
            </List>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PaginaContato;
