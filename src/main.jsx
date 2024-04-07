import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import CommunicationPage from "./pages/CommunicationPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CalmPage from "./pages/CalmPage.jsx";
import App from "./App.jsx";
import "./index.css";

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.classList.add(savedTheme);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CommunicationPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "calm",
        element: <CalmPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
