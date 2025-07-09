import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Pages/Home.jsx";
import Biodatas from "./Pages/Biodatas.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Login from "./Pages/Login.jsx";
import AuthLayout from "./Layouts/AuthLayout.jsx";
import Signup from "./Pages/Signup.jsx";
import AuthProvidor from "./Contexts/AuthProvidor";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./Layouts/DashboardLayout";
import Overview from "./Dashboard Pages/Overview";
import ManageUsers from "./Dashboard Pages/ManageUsers";
import ApprovedPremium from "./Dashboard Pages/ApprovedPremium";
import ApprovedContactRequest from "./Dashboard Pages/ApprovedContactRequest";
import FavouriteBiodata from "./Dashboard Pages/FavouriteBiodata";
import EditBiodata from "./Dashboard Pages/EditBiodata";
import AdminDashboard from "./Dashboard Pages/AdminDashboard";
import ViewBiodata from "./Dashboard Pages/ViewBiodata";
import MyContactRequest from "./Dashboard Pages/MyContactRequest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/biodatas",
        element: <Biodatas />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <Overview />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/approved-premium",
        element: <ApprovedPremium />,
      },
      {
        path: "/dashboard/approved-contact-requests",
        element: <ApprovedContactRequest />,
      },
      {
        path: "/dashboard/favourite-biodata",
        element: <FavouriteBiodata />,
      },
      {
        path: "/dashboard/edit-biodata",
        element: <EditBiodata />,
      },
      {
        path: "/dashboard/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/view-biodata",
        element: <ViewBiodata />,
      },
      {
        path: "/dashboard/my-contact-request",
        element: <MyContactRequest />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvidor>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={true} />
      </AuthProvidor>
    </QueryClientProvider>
  </StrictMode>
);
