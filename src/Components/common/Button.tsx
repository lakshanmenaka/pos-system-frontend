import {
  Button as MUIButton,
  CircularProgress,
} from "@mui/material";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  variant = "contained",
  fullWidth = false,
  startIcon,
  endIcon,
}: ButtonProps) => {
  return (
    <MUIButton
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      fullWidth={fullWidth}
      startIcon={!loading ? startIcon : undefined}
      endIcon={!loading ? endIcon : undefined}
      sx={{
        minHeight: 42,
        px: 2.5,
        borderRadius: 2,
        textTransform: "none",
        fontSize: 14,
        fontWeight: 600,

        ...(variant === "contained" && {
          bgcolor: "#111827",
          color: "#ffffff",

          "&:hover": {
            bgcolor: "#1f2937",
          },

          "&.Mui-disabled": {
            bgcolor: "#d1d5db",
            color: "#ffffff",
          },
        }),

        ...(variant === "outlined" && {
          borderColor: "#d1d5db",
          color: "#374151",

          "&:hover": {
            borderColor: "#111827",
            bgcolor: "#f9fafb",
          },
        }),

        ...(variant === "text" && {
          color: "#374151",

          "&:hover": {
            bgcolor: "#f3f4f6",
          },
        }),
      }}
    >
      {loading ? (
        <CircularProgress
          size={20}
          sx={{ color: "inherit" }}
        />
      ) : (
        children
      )}
    </MUIButton>
  );
};

export default Button;