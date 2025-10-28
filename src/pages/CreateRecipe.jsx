import RecipeForm from "../components/RecipeForm";
import App from "../App.jsx";

function CreateRecipe() {
  const handleSubmit = (values) => {
    console.log("Neues Rezept:", values);
    //datenbank request hier einfügen
  };

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
