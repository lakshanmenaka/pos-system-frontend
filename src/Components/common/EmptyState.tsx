import { Box, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
}

const EmptyState = ({
  title = "No data found",
  message = "There is no data available to display.",
  icon,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        minHeight: 220,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          color: "#9ca3af",
        }}
      >
        {icon || <InboxOutlinedIcon sx={{ fontSize: 28 }} />}
      </Box>

      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 600,
          color: "#374151",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: 13,
          color: "#9ca3af",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;