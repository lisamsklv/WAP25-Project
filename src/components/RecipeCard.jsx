import { useNavigate } from "react-router-dom";
import { Card } from 'antd';
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: "none" }}>
    <Card
      hoverable
      style={{ width: 240, margin: 16, textAlign: 'left' }}
      title={recipe.title}
      onClick={() => navigate(`/recipe/${recipe._id}`)}
    >
      <Card.Meta description={recipe.description} />
    </Card>
    </Link>
  );
}
