import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import MainLayout from "../layouts/MainLayout";
import ChatDashboard from "../pages/ChatDashboard";
import UserProfile from "../pages/UserProfile";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: <ChatDashboard /> },
      { path: "profile", element: <UserProfile /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
