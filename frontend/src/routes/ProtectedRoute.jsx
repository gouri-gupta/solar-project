import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../context/AdminAuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useContext(AdminContext);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;