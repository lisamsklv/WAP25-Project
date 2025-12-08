import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import App from "../App.jsx";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  const loadRecipes = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch("http://localhost:3000/api/recipe", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // don't try to parse JSON if unauthorized
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      console.error("Failed to load recipes:", err);
    }
  };

  loadRecipes();
}, []);


  return (
    <App>
      <h1>Willkommen in der Rezeptenwelt!</h1>
      <p>Hier kannst du deine Lieblingsrezepte speichern und teilen.</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {recipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </div>
    </App>
  );
}
