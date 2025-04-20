import React from "react";
import  { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/Main";
import About from "../pages/About";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import UserDetails from "../pages/UserDetails";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
    { 
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Main />, handle: { title: "🌐 Main" } },
            { path: "/about", element: <About />, handle: { title: "ℹ️ About" } },
            { path: "/users", element: <Users />, handle: { title: "👥 Users" } },
            { path: "/users/:id", element: <UserDetails />, handle: { title: "👤 User Details" } },
            { path: "*", element: <NotFound /> , handle: { title: "❌ Not Found" } },
        ],
    },
    { path: "/company", element: <Navigate to="/about" replace />  },
]);
