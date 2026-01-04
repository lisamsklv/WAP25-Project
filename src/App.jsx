// App.jsx
import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default function App({ children }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

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

const { category } = useParams();
  const categoryItems = [
    { key: "all", label: "Alle" },
    { key: "vegan", label: "Vegan" },
    { key: "vegetarian", label: "Vegetarisch" },
    { key: "meat", label: "Fleisch" },
    { key: "breakfast", label: "Frühstück" },
    { key: "lunch", label: "Mittagessen" },
    { key: "dinner", label: "Abendessen" },
    { key: "dessert", label: "Dessert" },
    { key: "snack", label: "Snack" },
    { key: "salad", label: "Salat" },
    { key: "drink", label: "Getränk" },
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
        {location.pathname.startsWith("/category") || location.pathname === "/" ? (
          <>
            <Input.Search
              placeholder="Rezepte suchen"
              onSearch={(value) => console.log("Search:", value)}
              style={{ width: 200 }}
              allowClear
            />
            <div style={{ marginLeft: 20 }}>
              <Dropdown
                menu={{
                  items: categoryItems,
                  selectable: true,
                  selectedKeys: [category],
                  onClick: (info) => navigate("/category/" + info.key)
                }}
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
        ) : null}
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
