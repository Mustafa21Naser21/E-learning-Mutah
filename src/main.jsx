import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './main.css'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  
  </StrictMode>
)


/*
import {
  createBrowserRouter,
  RouterProvider,
} 
from "react-router-dom";
import Login from './Components/Login.jsx';
import CategoryViwer from './Components/CategoryViwer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },
  {
    path: "login",
    element:<Login />,
  },
  {
    path: "categoryViewer",
    element:<CategoryViwer />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
*/