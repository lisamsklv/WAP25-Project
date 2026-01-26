import React from 'react';
import { Form, Input, Button, Checkbox, Space } from 'antd';

export default function RegistrationForm({ onSubmit, initialValues }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (onSubmit) onSubmit(values);
  };

  // const validatePasswords = (_, value) => {
  //   const password = form.getFieldValue('password');
  //   if (!value || password === value) {
  //     return Promise.resolve();
  //   }
  //   return Promise.reject(new Error('Passwörter stimmen nicht überein'));
  // };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: 600, margin: '0 auto' }}
      onFinish={onFinish}
      initialValues={initialValues}
    >


      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Bitte Email eingeben' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">Registrieren</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
