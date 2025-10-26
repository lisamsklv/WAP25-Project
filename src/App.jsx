import { Layout, Menu, Button, Input } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer } = Layout;

export default function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { key: "/", label: <Link to="/">{t("Home")}</Link> },
    { key: "/createrecipe", label: <Link to="/createrecipe">{t("Create Recipe")}</Link> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Header
        style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          borderBottom: "1px solid #eee",
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            flex: 1,
            border: "none",
          }}
        />

        <Input.Search
          placeholder="Search recipes"
          onSearch={(value) => console.log("Search:", value)}
          style={{ width: 200 }}
          allowClear
        />
      </Header>

      <Content style={{ flex: 1,padding: "40px 20px" }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center", opacity: 0.6 }}>
        Recipe App © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
