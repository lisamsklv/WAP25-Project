import RecipeCard from "../components/RecipeCard";
import App from "../App.jsx"; 

    const recipes = [
  {
    id: 1,
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish.",
    image: "/images/spaghetti.jpg",
  },
  {
    id: 2,
    title: "Chocolate Cake",
    description: "Rich and moist chocolate cake.",
    image: "/images/chocolate_cake.jpg",
  },
];
export default function Home() {
  return (
    <App>
      <h1 >Willkommen bei meinen Rezepten</h1>
      <p>Hier kannst du deine Lieblingsrezepte speichern und teilen.</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
      </div>
    </App>
  );
}
