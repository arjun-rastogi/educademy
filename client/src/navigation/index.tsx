import React, { useState, useEffect } from "react";
import { ToastContainer, ToastContent, toast } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";

// Style CSS
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.css";
import "../assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";

// Authentication
import auth from "../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../types/userTypes";
import { setUser } from "../actions";

// Public Pages
import { Home, Signin, Signup, Error, Admin } from "./../pages/";

// Admin Pages
import { Panel as AdminPanel } from "../dashboard/AdminDashboard/pages";

// Dashboard Pages
import { AdminDashboard } from "../dashboard";

import { Footer, Navbar } from "./../components/";
import Logout from "../common/logout";
import AdminPrivateRoutes from "./Private/AdminPrivateRoutes";
import UserPrivateRoutes from "./Private/UserPrivateRoutes";

function RootNavigation(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: UserState) => state.userReducer);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await auth.getCurrentUser(); // Assuming auth.getCurrentUser() is an asynchronous function that returns the current user
      dispatch(setUser(currentUser));
      setIsLoading(false); // Set loading to false once user data is fetched
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Navbar user={user} />

      <Routes>
        {/* Authenication Pages */}
        <Route path="/admin_login" element={<Admin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        {/* Public Routes Started */}
        <Route path="/" element={<Home />} />

        {/* Admin Routes Started*/}
        <Route
          path="/admin_panel"
          element={
            <AdminPrivateRoutes
              user={user}
              department={user?.department_name}
              Component={AdminDashboard} // Pass the reference to the component, not the JSX element
            />
          }
        >
          {" "}
          <Route index element={<AdminPanel />} />
        </Route>

        {/* Error Pages */}
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </>
  );
}

export default RootNavigation;
