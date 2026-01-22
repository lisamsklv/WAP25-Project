import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import SavedRecipes from "./pages/SavedRecipes.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ActivationPage from "./pages/ActivationPage.jsx";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import de from "./de.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function Main() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("accessToken")
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* App ist jetzt ein Layout-Wrapper */}
        <Route
          path="/"
          element={<App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        >
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="activate/:token" element={<ActivationPage />} />
          <Route path="createrecipe" element={<CreateRecipe />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="savedrecipes" element={<SavedRecipes />} />
          <Route path="category/:category" element={<Home />} />
          <Route path="/search/:query" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);