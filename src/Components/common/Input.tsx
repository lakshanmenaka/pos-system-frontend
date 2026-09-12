import {
  TextField,
  type TextFieldProps,
} from "@mui/material";

interface InputProps
  extends Omit<TextFieldProps, "variant"> {
  label: string;
  errorMessage?: string;
}

const Input = ({
  label,
  errorMessage,
  helperText,
  ...props
}: InputProps) => {
  return (
    <TextField
      {...props}
      label={label}
      variant="outlined"
      fullWidth
      error={Boolean(errorMessage)}
      helperText={errorMessage || helperText}
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,

          "& fieldset": {
            borderColor: "#d1d5db",
          },

          "&:hover fieldset": {
            borderColor: "#9ca3af",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#111827",
          },
        },

        "& .MuiInputLabel-root": {
          color: "#6b7280",
        },

        "& .MuiInputLabel-root.Mui-focused": {
          color: "#111827",
        },

        "& .MuiFormHelperText-root": {
          marginLeft: 0,
        },
      }}
    />
  );
};

export default Input;