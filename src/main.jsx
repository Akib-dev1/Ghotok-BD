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
import Unauthorized from "./PrivateRoutes/Unauthorized";
import AdminRoute from "./PrivateRoutes/AdminRoute";
import UserRoute from "./PrivateRoutes/UserRoute";
import BioDataDetails from "./Pages/BioDataDetails";
import Checkout from "./Pages/Checkout";

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
        path: "/biodatas/:id",
        element: (
          <PrivateRoute>
            <BioDataDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/biodatas/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
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
    path: "/unauthorized",
    element: <Unauthorized />,
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
        path: "/dashboard/overview",
        element: (
          <PrivateRoute>
            <UserRoute>
              <Overview />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/approvedPremium",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ApprovedPremium />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/approvedContactRequests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ApprovedContactRequest />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/favourite-biodata",
        element: (
          <PrivateRoute>
            <UserRoute>
              <FavouriteBiodata />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/edit-biodata",
        element: (
          <PrivateRoute>
            <UserRoute>
              <EditBiodata />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        index: true,
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/view-biodata",
        element: (
          <PrivateRoute>
            <UserRoute>
              <ViewBiodata />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-contact-request",
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyContactRequest />
            </UserRoute>
          </PrivateRoute>
        ),
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
