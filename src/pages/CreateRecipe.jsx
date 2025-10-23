import RecipeForm from "../components/RecipeForm";

function CreateRecipe() {
  const handleSubmit = (values) => {
    console.log("Neues Rezept:", values);
    //datenbank request hier einfügen
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Neues Rezept erstellen</h2>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateRecipe;
