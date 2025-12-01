import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from 'antd';

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{ width: 240, margin: 16, textAlign: 'left' }}
      title={recipe.title} 
      onClick={() => navigate(`/recipe/${recipe.id}`)} // navigate on click
    >
      <Card.Meta description={recipe.description} />
    </Card>
  );
}