import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard.jsx";

export default function RecipeList({ category }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        let url = "http://localhost:3000/api/recipe";

        if (category && category !== "all") {
          url = "http://localhost:3000/api/recipe/category/" + category;
        }

        const response = await fetch(url);

        if (response.status === 404) {
          setRecipes([]); // no recipes found
          return;
        }

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to load recipes:", err);
        setRecipes([]); // clear old recipes on error
      }
    };

    loadRecipes();
  }, [category]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {recipes.length === 0 && (
          <p style={{ fontSize: "18px", opacity: 0.7 }}>
            Keine Rezepte in dieser Kategorie gefunden.
          </p>
        )}

        {recipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} />
        ))}
      </div>
    </div>
  );
}