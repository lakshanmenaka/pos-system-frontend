import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { storage } from "../../utils/storage";

const SIDEBAR_WIDTH = 232;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

 

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      label: "Customers",
      path: "/dashboard/customers",
      icon: <GroupOutlinedIcon />,
    },
    {
      label: "Products",
      path: "/dashboard/products",
      icon: <Inventory2OutlinedIcon />,
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: <ReceiptLongOutlinedIcon />,
    },
  ];

  const handleLogout = () => {
    storage.clearAuth();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bgcolor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
        zIndex: 1200,
      }}
    >
      
      <Box
        sx={{
          height: 68,
          px: 2.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 800,
            color: "#2563eb",
            lineHeight: 1,
          }}
        >
          POSZ
        </Typography>

        <Typography
          sx={{
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: 2,
            color: "#94a3b8",
            mt: 0.5,
          }}
        >
          POINT OF SALE
        </Typography>
      </Box>

   
      <Box
        sx={{
          px: 1.5,
          pt: 2.5,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 1.5,
            color: "#94a3b8",
          }}
        >
          MENU
        </Typography>

        <List disablePadding>
          {menuItems.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  minHeight: 42,
                  mb: 0.5,
                  borderRadius: 2,
                  px: 1.3,

                  color: active
                    ? "#2563eb"
                    : "#64748b",

                  bgcolor: active
                    ? "#eff6ff"
                    : "transparent",

                  "&:hover": {
                    bgcolor: "#f8fafc",
                    color: "#2563eb",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 30,
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: 14,
                      fontWeight: active ? 600 : 500,
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

    
      <Box>
        <Divider />

        <Box
          sx={{
            px: 2,
            py: 1.8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              mb: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#2563eb",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              
            </Avatar>

            <Box
              sx={{
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#111827",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
              
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#94a3b8",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                
              </Typography>
            </Box>
          </Box>

          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 40,
              px: 1,
              borderRadius: 2,
              color: "#64748b",

              "&:hover": {
                bgcolor: "#fef2f2",
                color: "#dc2626",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 30,
                color: "inherit",
              }}
            >
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Logout"
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: 13,
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;