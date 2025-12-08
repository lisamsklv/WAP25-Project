import RecipeForm from "../components/RecipeForm";
import App from "../App.jsx";
import { message } from "antd";


function CreateRecipe() {
  const handleSubmit = async (values) => {

    console.log(values);
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch("http://localhost:3000/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(values)
  }); 
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
              message.error(data.error || "Sending recipe failed.");
              return;
          }}


  return (
    <App>
      <div>
        <h2>Neues Rezept erstellen</h2>
        <RecipeForm onSubmit={handleSubmit} />
      </div>
    </App>
  );
}

export default CreateRecipe;
