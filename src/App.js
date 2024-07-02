import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/home";
import HTML from "./pages/About/About";


import { useContext, useState } from "react";
import context from "../src/pages/context/context"
import Signuser from "./pages/signup/Signuser";
import Signin from "./pages/signin/Signin";
import Porfile from "./pages/Porfile/Porfile";
import Error404 from "./pages/Error/Error404";
import EditTask from "./pages/edit-task/Edit-task";
import { Helmet } from "react-helmet-async";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404/>,
  },
  {
    path: "/signup",
    element: <Signuser/>,
    errorElement: <Error404/>,
  },
  {
    path: "/edit-task/:stringid",
    element: <EditTask/>,
    errorElement: <Error404/>,
  },
  {
    path: "/signin",
    element: <Signin/>,
    errorElement: <Error404/>,
  },


  {
    path: "/about",
    element: <HTML />,
  },


  {
    path: "/porfile",
    element: <Porfile/>,
  },
]);

function App() {
  const { theme } = useContext(context); 

  return (
    <>
    <Helmet>
      <style>
        {`
        ::-webkit-scrollbar-thumb{
  background: ${theme=== "Dark" ? "#ca1271" : "#16cccc"} ;
  border-radius:20px;
 }
        
        `}
      </style>
    </Helmet>
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
    </>
  );
}

export default App;
