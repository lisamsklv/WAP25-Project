import { Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{ width: 240, margin: 16 }}
      cover={<img alt={recipe.title} src={recipe.image} />}
      onClick={() => navigate(`/recipe/${recipe.id}`)} // navigate on click
    >
      <Card.Meta title={recipe.title} description={recipe.description} />
    </Card>
  );
}