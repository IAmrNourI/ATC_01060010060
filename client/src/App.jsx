import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Layout from './Components/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import Home from './Components/Home/Home';
import MyEvents from './Components/MyEvents/MyEvents';
import { LanguageProvider } from './Context/Language';
import Card from './Components/Card/Card';
import AllEvents from './Components/AllEvents/AllEvents';
import CardDetails from './Components/CardDetails/CardDetails';
import Admin from './Components/Admin/Admin';
import AddEvent from './Components/AddEvents/AddEvent';
import EditEvent from './Components/EditEvent/EditEvent';


function App() {


  let route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "myevents", element: <MyEvents /> },
      { path: "card", element: <Card /> },
      { path: "allevents", element: <AllEvents /> },
      { path: "card-details/:id", element: <CardDetails /> },      
      { path: "admin", element: <Admin/> },
      { path: "addevent", element: <AddEvent /> },
      { path: "editevent", element: <EditEvent /> },

      //auth
      { path: "auth/register", element: <Register /> },
      { path: "auth/login", element: <Login /> },
      // { path: "auth/verifyemail", element: <VerifyEmail /> },
      // { path: "auth/sendotp", element: <SendOtp /> },
      // { path: "auth/newpassword", element: <NewPassword /> },
      // { path: "upload", element: <ForSlide /> },
      // { path: "*", element: <Notfound /> },
    ],
  },

  // {
  //   path: "/admin", element: <Admin />,
  //   children: [
  //     { path: "product-admin", element: <ProductsAdmin /> },
  //     { path: "portfolio-admin", element: <PortfolioAdmin /> },
  //     { path: "about-admin", element: <AboutAdmin /> },
  //     { path: "details-admin", element: <DetailsAdmin /> },
  //     { path: "slide-admin", element: <SlideAdmin /> },
  //     { path: "keyword-admin", element: <KeywordAdmin /> },
  //     { path: "addproduct", element: <AddProdcut /> },
  //     { path: "editcard", element: <EditCart /> },
  //     { path: "addslide", element: <AddSlide /> },
  //     { path: "editslide", element: <EditSlide /> },
  //   ],
  // },

]);

  return (
    <>
    <LanguageProvider>
      <Toaster />
      <RouterProvider router={route} />
    </LanguageProvider>
    </>
  )
}

export default App
