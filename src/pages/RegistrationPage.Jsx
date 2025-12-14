import RecipeForm from "../components/RecipeForm.jsx";
import App from "../App.jsx";
import { message } from "antd";
import RegistrationForm from "../components/RegistrationForm.jsx";

export default function RegistrationPage() {
    const handleSubmit = async (values) => {

    console.log(values);
    const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    }); 
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
                message.error(data.error || "Registration failed.");
                return;
            }
    message.success("Registration successful! You can now log in.");
    }
    return (
    
      <div>
        <h2>Registrierung</h2>
        <RegistrationForm onSubmit={handleSubmit} />
      </div>
    
  );
}