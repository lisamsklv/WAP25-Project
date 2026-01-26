import { useState } from "react";
import SuccessPopup from "../components/SuccessPopUp";
import RecipeForm from "../components/RecipeForm";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (values) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Sending recipe failed.");
      return;
    }

    // Show popup
    setShowSuccess(true);

    // Hide popup + redirect
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div>
      {showSuccess && <SuccessPopup message="Recipe created!" />}

      <h2>Neues Rezept erstellen</h2>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateRecipe;