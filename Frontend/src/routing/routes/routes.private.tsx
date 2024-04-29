import { Navigate } from "react-router-dom";
import { useAuth } from "../../authStore/AuthStore";
import React, { ReactElement } from "react";

export const PrivateRoute: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  // const isAuthenticated = auth.data && auth.data.authToken && auth.data.authToken.token

  return isAuthenticated ? (
    children
  ) : (
    <>
      <Navigate to="/login" replace />
    </>
  );
};
