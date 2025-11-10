import React from 'react';
import { Layout, Row, Col, Typography, Divider, Card, Space } from "antd";
import App from '../App';


const { Title, Paragraph } = Typography;
const { Content } = Layout;


export default function RecipePage() {
const recipe = {
  id: 2,
  title: "Schokokuchen",
  ingredients: [
    { amount: "200g", name: "Flour" },
    { amount: "100g", name: "Sugar" },
  ],
  category: "Dessert",
  description: "Rich and moist chocolate cake.",
  instructions: "Mix, bake, and enjoy!"
};

    return (
    <App>
        <Layout style={{textAlign: 'left'}}>
            <Title level={2} style={{ margin: '5px 0'}}>
                {recipe.title}
            </Title>
            <Paragraph>{recipe.category} {recipe.description}</Paragraph>
            {/*desert anders dartellenv vltt als button*/}
            <Divider />
            <Row gutter={[20, 20]}>
          {/* Left column: Zubereitung */}
          <Col xs={24} md={6}>
            <Card title="Zutaten" bordered={false}>
              
              {recipe.ingredients?.map((item, index) => (
                  <div key={index}>
                    <strong>{item.amount}</strong> {item.name}
                  </div>
                ))}
            </Card>
          </Col>

          {/* Right column: Zutaten */}
          <Col xs={24} md={18}>
            <Card title="Zubereitung" bordered={false}>
              <Space direction="vertical">
                <Paragraph
                style={{
                  whiteSpace: "pre-line",
                  lineHeight: 1.6,
                  fontSize: "16px",
                }}
              >
                {recipe.instructions}
                
              </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>

        <Divider />
        </Layout>
  
    </App>
    )
    
    
}