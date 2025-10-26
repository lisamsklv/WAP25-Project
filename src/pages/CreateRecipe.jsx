import RecipeForm from "../components/RecipeForm";

function CreateRecipe() {
  const handleSubmit = (values) => {
    console.log("Neues Rezept:", values);
    //datenbank request hier einfügen
  };

  return (
    <div style={{ 
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "60px",
    }}>
      <h2>Neues Rezept erstellen</h2>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateRecipe;
