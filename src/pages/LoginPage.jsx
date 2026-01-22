import { Button, Checkbox, Form, Input, Space, Typography, message } from "antd";
import App from "../App";
import { useNavigate } from "react-router-dom";

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values;

    const body = new URLSearchParams();
    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password);
    body.append("client_id", "client");

    const response = await fetch("http://localhost:3000/api/token", {
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

    console.log("TOKEN RESPONSE:", data);

    // Save OAuth tokens
localStorage.setItem("accessToken", data.access_token);
localStorage.setItem("refreshToken", data.refresh_token);

// Update navbar state
setIsLoggedIn(true);


    message.success("Login successful!");

    // Redirect to saved recipes page
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("failed:", errorInfo);
  };

  return (
    
      <div>
        <Form
          name="basic"
          layout="vertical"
          style={{ maxWidth: 400, margin: "0 auto" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
    
  );
}

export default LoginPage;
