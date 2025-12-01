import { Button, Checkbox, Form, Input, List, Space, Typography } from 'antd';
import App from '../App';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';


const onFinish = async (values) => {
        const { username, password } = values;

        const body = new URLSearchParams();
        body.append("grant_type", "password");
        body.append("username", username);
        body.append("password", password);
        body.append("client_id", "client");

        const response = await fetch("http://localhost:3000/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });

        const data = await response.json();

        if (!response.ok) {
            message.error(data.error || "Login failed");
            return;
        }

        // Save OAuth tokens
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        message.success("Login successful!");

        // Redirect to saved recipes page
        navigate("/savedrecipes");
    };

const onFinishFailed = (errorInfo) => {
    console.log('failed:', errorInfo);
};




function LoginPage() {
    	return (
            <App>
		<div >
            <Form
                name="basic"
                layout="vertical"
                style={{ maxWidth: 400, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
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

                <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Space>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                    <Typography.Link href="./registration">already registered?</Typography.Link>
                    </Space>
                </Form.Item>
                    
                

            </Form>
		</div>
        </App>
	);
}



export default LoginPage;