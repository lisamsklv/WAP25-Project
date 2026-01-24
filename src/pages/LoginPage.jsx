import { Button, Checkbox, Form, Input, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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

    let data = {};
    try {
  data = await response.json();
} catch (e) {
  console.error("JSON parse failed:", e);
}

    if (!response.ok) {
      setErrorMessage("Email or password is incorrect.");
      return;
    }

    // success
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 400, margin: "0 auto" }}
        onFinish={onFinish}
      >
        {errorMessage && (
          <Typography.Text style={{ color: "red" }}>
            {errorMessage}
          </Typography.Text>
        )}

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


        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Typography.Link href="./registration">
              already registered?
            </Typography.Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;