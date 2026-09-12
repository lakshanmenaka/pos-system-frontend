import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
}

const PageHeader = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}: PageHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: 21,
              sm: 24,
            },
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.2,
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
          {subtitle}
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onButtonClick}
        sx={{
          minHeight: 42,
          px: 2.5,
          borderRadius: 2,
          textTransform: "none",
          fontSize: 14,
          fontWeight: 600,

          bgcolor: "#2563eb",

          boxShadow: "none",

          "&:hover": {
            bgcolor: "#1d4ed8",
            boxShadow: "none",
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default PageHeader;