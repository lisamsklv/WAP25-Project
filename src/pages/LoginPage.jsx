import { Button, Checkbox, Form, Input, List, Space, Typography } from 'antd';
import App from '../App';



const onFinish = (values) => {
    console.log('success:', values);
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