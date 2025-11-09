import RecipeCard from "../components/RecipeCard";
import App from "../App.jsx"; 

    const recipes = [
  {
    id: 1,
    title: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish.",
  },
  {
    id: 2,
    title: "Schokokuchen",
    ingredients: [
      { amount: "200g", name: "Flour" },
      { amount: "100g", name: "Sugar" },
    ],
    category: "dessert",
    description: "Rich and moist chocolate cake.",
  },
];
export default function Home() {
  return (
    <App>
      <h1 >Willkommen in der Rezeptenwelt!</h1>
      <p>Hier kannst du deine Lieblingsrezepte speichern und teilen.</p>
  
      <div style={{ display: "flex", flexWrap: "wrap", align: "center", justifyContent: "center", gap: "20px" }}>
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
      </div>
    </App>
  );
}
