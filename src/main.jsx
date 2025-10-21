import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import './index.css';
import User from './User.jsx';

// Beispiel-Funktion zum Erstellen eines Users
function createUser(name, email) {
  return <User name={name} email={email} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "c",
    element: <h1>This is possible, too</h1>,
  },  
  {
    path: "user/:userId",
    element: createUser("Max Mustermann", "max@beispiel.de"),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);