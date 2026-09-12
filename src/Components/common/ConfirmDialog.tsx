import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  open,
  title = "Confirm Delete",
  message,
  onClose,
  onConfirm,
  loading = false,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#111827",
          pb: 1,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ pt: "8px !important" }}>
        <Typography
          sx={{
            fontSize: 14,
            color: "#6b7280",
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 2,
          pb: 2,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 2.5,
            color: "#374151",
            borderColor: "#d1d5db",
            "&:hover": {
              borderColor: "#9ca3af",
              bgcolor: "#f9fafb",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 2.5,
            bgcolor: "#ef4444",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#dc2626",
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;