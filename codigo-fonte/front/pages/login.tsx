import React from 'react';
import Head from 'next/head';
import { Form, Input, Button, Layout } from 'antd';
const { Content } = Layout;

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
    <Content className="content">
      <div className="page-container">
        <h1>Login</h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={(values) => console.log('Form values:', values)}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
    </>
  );
}
