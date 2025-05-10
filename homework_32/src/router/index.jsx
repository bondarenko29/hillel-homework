import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/Main";
import Swapi from "../pages/Swapi";
import Todo from "../pages/Todo";
import Header from "../components/Header";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <Main />, handle: { title: "🌐 Main" } },
      { path: "/swapi", element: <Swapi />, handle: { title: "👤 Swapi" } },
      { path: "/todo", element: <Todo />, handle: { title: "📝 Todo" }, },
    ],
  },
  
]);
