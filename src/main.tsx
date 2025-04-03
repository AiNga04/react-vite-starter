import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import UserPage from "./screens/UsersPage.tsx";
import NotFound404 from "./pages/NotFound404/NotFound404.tsx";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Auth/Login.tsx";
import RegisterPage from "./pages/Auth/RegisterPage.tsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.tsx";
import Admin from "./layout/Admin.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },

  // Authentication
  {
    path: "/Auth/login",
    element: <Login />,
  },
  {
    path: "/Auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/Auth/forgot-password",
    element: <ForgotPassword />,
  },

  // Default route (404)
  {
    path: "/*",
    element: <NotFound404 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
