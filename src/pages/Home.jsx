import { useParams } from "react-router-dom";
import RecipeList from "../components/RecipeList.jsx";

export default function Home() {
  const { category } = useParams();
  const { query } = useParams();

  const categoryLabels = {
  vegan: "Vegane Rezepte",
  vegetarian: "Vegetarische Rezepte",
  meat: "Fleischrezepte",
  breakfast: "Frühstücksrezepte",
  lunch: "Mittagessenrezepte",
  dinner: "Abendessenrezepte",
  dessert: "Dessertrezepte",
  snack: "Snackrezepte",
  salad: "Salatrezepte",
  drink: "Getränke",
  all: "Alle Rezepte"
};

  return (
    <div>
      <h1>
        Willkommen in der Rezeptewelt!
      </h1>

      <h2>{categoryLabels[category] || category}</h2>

      <RecipeList category={category} search={query} />
    </div>
  );
}