import { Layout, Menu, Input, Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer } = Layout;

export default function App({ children }) {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { key: "/", label: <Link to="/">{t("Home")}</Link> },
    { key: "/createrecipe", label: <Link to="/createrecipe">{t("Create Recipe")}</Link> },
    { key: "/login", label: <Link to="/login">{t("Login")}</Link> },
  ];

  const categoryItems = [
    {key:'1',
      label:'Vegan'
    },
    {
      key:'2',
      label:'Vegetarisch'
    },
    {
      key:'3',
      label:'Fleisch'
    },
    {key:'4',
      label:'Frühstück'
    },
    {
      key:'5',
      label:'Mittagessen'
    },
    {key:'6',
      label:'Abendessen'
    },
    {key:'7',
      label:'Dessert'
    },
    {key:'8',
      label:'Snack'
    },
    {key:'9',
      label:'Beilage'
    },
    {key:'10',
      label:'Getränk'
    },
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
        
        <Input.Search
          placeholder="Search recipes"
          onSearch={(value) => console.log("Search:", value)}
          style={{ width: 200 }}
          allowClear
        />
        <div style={{ marginLeft: 20 }}>
          {/* remove text for mobile view/small viewports */}
        <Dropdown
          menu={{ items:categoryItems, selectable: true, defaultSelectedKeys: ['1']}}>
            <Typography.Link>
        <Space>
        Selectable
        <DownOutlined />
      </Space>
    </Typography.Link>
          </Dropdown>
</div>
      </Header>

      <Content style={{ padding: "40px 20px", textAlign: "center" }}>{children}</Content>

      <Footer style={{ textAlign: "center", opacity: 0.6 }}>
        Recipe App © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
