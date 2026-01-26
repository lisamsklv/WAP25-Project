import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm.jsx";
import { message } from "antd";

export default function RegisterPage() {
  const navigate = useNavigate();
  

  async function handleRegister(values) {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const data = await res.json();
    if (!res.ok) {
    message.error(data.error || "Registrierung fehlgeschlagen");
    return;
  }

    // Weiterleitung auf /activate/<token>
    navigate(`/activate/${data.token}`, {
  state: {
    first_name: values.first_name,
    email: values.email
  }
});
  }

  return <RegistrationForm onSubmit={handleRegister} />;
}