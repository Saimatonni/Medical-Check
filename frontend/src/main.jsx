import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Welcome from './pages/Welcome/Welcome.jsx';
import Registration from './pages/Registration/Registration.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import Diabetes from './pages/Diabetes/Diabetes.jsx';
import DiabetesResult from './pages/DiabetesResult/DiabetesResult.jsx';
import HDis from './pages/HDis/HDis.jsx';
import HDisRes from './pages/HDisRes/HDisRes.jsx';
import Malaria from './pages/Malaria/Malaria.jsx';
import MalariaResult from './pages/MalariaResult/MalariaResult.jsx';
import ContactUs from './pages/ContactUs/ContactUs.jsx';
import Information from './pages/Information/Information.jsx';
import Reports from './pages/Reports/Reports.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/reports",
    element: <Reports/>,
  },
  {
    path: "/diabetes",
    element: <Diabetes/>,
  },
  {
    path: "/diabetesRes",
    element: <DiabetesResult/>,
  },
  {
    path: "/hdis",
    element: <HDis/>,
  },
  {
    path: "/hdisres",
    element: <HDisRes/>,
  },
  {
    path: "/malaria",
    element: <Malaria/>,
  },
  {
    path: "/malariares",
    element: <MalariaResult/>,
  },
  {
    path: "/contactus",
    element: <ContactUs/>,
  },
  {
    path: "/information",
    element: <Information/>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
