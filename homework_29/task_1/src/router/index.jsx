import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/Main";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Counter from "../pages/Counter";
import Todo from "../pages/Todo";
import Header from "../components/Header";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <Main />, handle: { title: "🌐 Main" } },
      { path: "/about", element: <About />, handle: { title: "ℹ️ About" } },
      {
        path: "/contacts",
        element: <Contacts />,
        handle: { title: "👥 Contacts" },
      },
      {
        path: "/counter",
        element: <Counter />,
        handle: { title: "🔢 Counter" },
      },
      {
        path: "/todo",
        element: <Todo/>,
        handle: { title: "📝 Todo" },
      },
    ],
  },
  { path: "/company", element: <Navigate to="/about" replace /> },
]);
