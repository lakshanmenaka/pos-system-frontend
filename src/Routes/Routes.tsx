import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import Customers from "../Pages/Customers";
import Products from "../Pages/Products";
import Orders from "../Pages/Orders";
import Notfound from "../Pages/Notfound";


import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../Components/dashboard/DashboardLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/dashboard/customers"
              element={<Customers />}
            />

            <Route
              path="/dashboard/products"
              element={<Products />}
            />

            <Route
              path="/dashboard/orders"
              element={<Orders />}
            />

          </Route>
        </Route>

        <Route
          path="*"
          element={<Notfound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;