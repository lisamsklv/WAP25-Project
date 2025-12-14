// App.jsx
import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer } = Layout;

export default function App({ children }) {
  const { t } = useTranslation();
  const location = useLocation();

  // simple auth state (replace with real token check later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  const menuItems = [
    { key: "/", label: <Link to="/">{t("Home")}</Link> },
    { key: "/createrecipe", label: <Link to="/createrecipe">{t("Rezept erstellen")}</Link> },
    isLoggedIn
      ? { key: "/logout", label: <span onClick={handleLogout}>{t("Logout")}</span> }
      : { key: "/login", label: <Link to="/login">{t("Login")}</Link> },
  ];

  const categoryItems = [
    { key: "1", label: "Vegan" },
    { key: "2", label: "Vegetarisch" },
    { key: "3", label: "Fleisch" },
    { key: "4", label: "Frühstück" },
    { key: "5", label: "Mittagessen" },
    { key: "6", label: "Abendessen" },
    { key: "7", label: "Dessert" },
    { key: "8", label: "Snack" },
    { key: "9", label: "Beilage" },
    { key: "10", label: "Getränk" },
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
          style={{ flex: 1, border: "none" }}
        />

        {/* Only show search + categories on home page */}
        {location.pathname === "/" && (
          <>
            <Input.Search
              placeholder="Rezepte suchen"
              onSearch={(value) => console.log("Search:", value)}
              style={{ width: 200 }}
              allowClear
            />
            <div style={{ marginLeft: 20 }}>
              <Dropdown
                menu={{ items: categoryItems, selectable: true, defaultSelectedKeys: ["1"] }}
              >
                <Typography.Link>
                  <Space>
                    {t("Kategorien")}
                    <DownOutlined />
                  </Space>
                </Typography.Link>
              </Dropdown>
            </div>
          </>
        )}
      </Header>

      <Content style={{ padding: "40px 20px", textAlign: "center" }}>
        {children}
      </Content>

      <Footer style={{ textAlign: "center", opacity: 0.6 }}>
        Recipe App © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
