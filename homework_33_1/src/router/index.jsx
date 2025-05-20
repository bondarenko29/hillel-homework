// import React from "react";
// import  { createBrowserRouter, Navigate } from "react-router-dom";
// import Main from "../pages/Main";
// import About from "../pages/About";
// import Contacts from "../pages/Contacts";
// import Header from "../components/Header";

// export const router = createBrowserRouter([
//     { 
//         path: "/",
//         element: <Header />,
//         children: [
//             { index: true, element: <Main />, handle: { title: "🌐 Main" } },
//             { path: "/about", element: <About />, handle: { title: "ℹ️ About" } },
//             { path: "/contacts", element: <Contacts />, handle: { title: "👥 Contacts" } },
         
//         ],
//     },
//     { path: "/company", element: <Navigate to="/about" replace />  },
// ]);



import  { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/Main";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Header from "../components/Header";
// Імпортуйте ваш компонент TodoList. Переконайтеся, що шлях правильний!
import TodoList from "../components/TodoList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            { index: true, element: <Main />, handle: { title: "🌐 Main" } },
            { path: "/about", element: <About />, handle: { title: "ℹ️ About" } },
            { path: "/contacts", element: <Contacts />, handle: { title: "👥 Contacts" } },
           // { path: "/todos", element: <TodoList />, handle: { title: "📝 Todos" } },
        ],
    },
    { path: "/company", element: <Navigate to="/about" replace />  },
]);