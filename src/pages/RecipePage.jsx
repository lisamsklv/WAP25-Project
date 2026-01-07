import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout, Row, Col, Typography, Divider, Card, Space } from "antd";

const { Title, Paragraph } = Typography;

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();

  const categoryLabels = {
  vegan: "Vegan",
  vegetarian: "Vegetarisch",
  meat: "Fleisch",
  breakfast: "Frühstück",
  lunch: "Mittagessen",
  dinner: "Abendessen",
  dessert: "Dessert",
  snack: "Snack",
  salad: "Salat",
  drink: "Getränk",
  };

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipe/${id}`);
        if (!response.ok) throw new Error("Recipe not found");

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <Layout style={{ textAlign: "left" }}>
      <Title level={2}>{recipe.title}</Title>
      <Paragraph>
        {categoryLabels[recipe.category] } · {recipe.description}
      </Paragraph>

      <Divider />

      <Row gutter={[20, 20]}>
        <Col xs={24} md={6}>
          <Card title="Zutaten" bordered={false}>
            {recipe.ingredients?.map((item, index) => (
              <div key={index}>
                <strong>{item.amount}</strong> {item.name}
              </div>
            ))}
          </Card>
        </Col>

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
  );
}
