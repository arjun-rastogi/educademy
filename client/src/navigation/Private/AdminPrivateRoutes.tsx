import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AdminPrivateRoutesProps {
  Component: React.ComponentType<any>;
  department: string;
  user: any; // Replace 'any' with the actual type of 'user' if possible
  funcNav?: React.Dispatch<React.SetStateAction<boolean>>;
  funcFooter?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPrivateRoutes: React.FC<AdminPrivateRoutesProps> = (props) => {
  const { Component, department, user, funcNav, funcFooter } = props;
  const location = useLocation();

  if (department === "Admin" && user) {
    return <Component funcNav={funcNav} funcFooter={funcFooter} />;
  } else {
    return (
      <Navigate to="/admin_login" state={{ history: location?.pathname }} />
    );
  }
};

export default AdminPrivateRoutes;
