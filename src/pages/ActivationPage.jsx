import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ActivationForm from "../components/ActivationForm.jsx";

export default function ActivationPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    first_name: location.state?.first_name || "",
    last_name: "",
    password: "",
    passwordConfirm: ""
  };

  async function handleActivation(values) {
    const res = await fetch(`http://localhost:3000/register/${token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (res.ok) {
      // 👉 Weiterleitung zur Login-Seite
      navigate("/login");
    }
  }

  return (
    <ActivationForm
      onSubmit={handleActivation}
      initialValues={initialValues}
    />
  );
}