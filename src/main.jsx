import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'
import Login from './pages/LoginPage.jsx'
import Registration from './pages/RegistrationPage.jsx'
import RecipePage from './pages/RecipePage.jsx'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import de from './de.json';

import { cyan } from '@ant-design/colors';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },

  {
    path: "/login",
    element: <Login />
  }, 

  {
    path: "/registration",
    element: <Registration />
  },

  {
    path: "/createrecipe",
    element: <CreateRecipe />
  },

  {
    path: "/recipe",
    element: <RecipePage />
  }



]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

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

