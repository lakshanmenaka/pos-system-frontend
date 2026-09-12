import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../utils/storage";

function ProtectedRoute() {
  const token = storage.getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;