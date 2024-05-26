import { Navigate } from "react-router-dom";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/configureStore";

export const PrivateRoute: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? (
    children
  ) : (
    <>
      <Navigate to="/login" replace />
    </>
  );
};
