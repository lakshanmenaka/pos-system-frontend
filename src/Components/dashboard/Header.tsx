import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
  import { storage } from "../../utils/storage";

interface HeaderProps {
  title?: string;
      onMenuClick?: () => void;
}

   const SIDEBAR_WIDTH = 230;

    const Header = ({
  title = "Dashboard",
}: HeaderProps) => {
  const navigate = useNavigate();

    const user = storage.getUser();

    const fullName = user?.fullName?.trim() || "User";
    const email = user?.email?.trim() || "";

    const initial = fullName.charAt(0).toUpperCase() || "U";

     const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    storage.clearAuth();
    handleMenuClose();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#111827",
        borderBottom: "1px solid #e5e7eb",

        width: {
          xs: "100%",
          md: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        },

        ml: {
          xs: 0,
          md: `${SIDEBAR_WIDTH}px`,
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: "54px !important",
          px: {
            xs: 2,
            sm: 3,
            md: 3,
          },

          display: "flex",
          justifyContent: "space-between",
        }}
      >
      
        <Box>
            <Typography
            sx={{
                fontSize: {
                 xs: 20,
                 sm: 22,
                md: 23,
              },
                fontWeight: 700,
              lineHeight: 1.1,
                 color: "#111827",
        }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#94a3b8",
              mt: 0.3,
            }}
          >
            Manage your business easily
          </Typography>
        </Box>

        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "right",
              mr: 1.2,
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: "#111827",
                maxWidth: 180,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              
            </Typography>

            {email && (
              <Typography
                sx={{
                  fontSize: 10,
                  color: "#94a3b8",
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {email}
              </Typography>
            )}
          </Box>

          <IconButton
            onClick={handleMenuOpen}
            sx={{
              p: 0,
              borderRadius: "50%",
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#2563eb",
                color: "#ffffff",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {initial}
            </Avatar>
          </IconButton>

          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={{
              ml: 0.3,
              color: "#94a3b8",
            }}
          >
            <KeyboardArrowDownIcon
              sx={{ fontSize: 18 }}
            />
          </IconButton>
        </Box>
      </Toolbar>

    
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        elevation={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 240,
              borderRadius: 2,
              border: "1px solid #f1f5f9",
            },
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#2563eb",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {initial}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {fullName}
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
                {email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.2,
            px: 2,
            gap: 1,
            color: "#dc2626",
            fontSize: 14,
          }}
        >
          <LogoutIcon fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;