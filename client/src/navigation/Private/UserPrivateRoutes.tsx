import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface UserPrivateRoutesProps {
  Component: React.ComponentType<any>;
  department: string;
  user: any; // Replace 'any' with the actual type of 'user' if possible
  funcNav: React.Dispatch<React.SetStateAction<boolean>>;
  funcFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserPrivateRoutes: React.FC<UserPrivateRoutesProps> = (props) => {
  const { Component, department, user, funcNav, funcFooter } = props;
  const location = useLocation();

  if (department !== "Admin" && user) {
    return <Component funcNav={funcNav} funcFooter={funcFooter} />;
  } else if (department !== "Admin") {
    return <Navigate to="/signin" state={{ history: location?.pathname }} />;
  } else {
    return (
      <Navigate to="/admin_panel" state={{ history: location?.pathname }} />
    );
  }
};

export default UserPrivateRoutes;
