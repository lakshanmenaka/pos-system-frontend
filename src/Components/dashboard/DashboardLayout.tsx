import { useLocation } from "react-router-dom";

import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { Outlet } from "react-router-dom";

const SIDEBAR_WIDTH = 232;

          const DashboardLayout = () => {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes("/customers")) {
      return "Customers";
    }

    if (location.pathname.includes("/products")) {
      return "Products";
    }

    if (location.pathname.includes("/orders")) {
      return "Orders";
    }

    return "Dashboard";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#f8fafc",
      }}
    >

      <Sidebar />

  
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          ml: {
            xs: 0,
            md: `${SIDEBAR_WIDTH}px`,
          },
        }}
      >
    
        <Header title={getPageTitle()} />

    
        <Box
          component="main"
          sx={{
            pt: {
              xs: 10,
              md: 10,
            },

            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            pb: 4,

            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;