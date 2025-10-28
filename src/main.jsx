import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
<<<<<<< HEAD
import Home from './pages/Home.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
=======
import Login from './pages/LoginPage.jsx'
import Registration from './pages/RegistrationPage.jsx'
>>>>>>> feature/login-reg-dummypage

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import de from './de.json';

<<<<<<< HEAD
=======
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }, 

  {
    path: "/login",
    element: <Login />
  }, 

  {
    path: "/registration",
    element: <Registration />
  },


]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

>>>>>>> feature/login-reg-dummypage
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/createrecipe", element: <CreateRecipe /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

