import {
  Box,
  Drawer,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import Sidebar from "./Sidebar";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu = ({
  open,
  onClose,
}: MobileMenuProps) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: {
          xs: "block",
          md: "none",
        },
        "& .MuiDrawer-paper": {
          width: 260,
          bgcolor: "#111827",
          color: "#ffffff",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            color: "#ffffff",
            "&:hover": {
              bgcolor: "#1f2937",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Sidebar
      />
    </Drawer>
  );
};

export default MobileMenu;