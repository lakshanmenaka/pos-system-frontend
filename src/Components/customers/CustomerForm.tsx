import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export interface CustomerFormData {
  name: string;
  address: string;
  salary: number;
  contact: string;
}

interface Customer {
  _id: string;
  name: string;
  address: string;
  salary: number;
  contact: string;
}

interface CustomerFormProps {
  open: boolean;
  customer?: Customer | null;
  onClose: () => void;
  onSubmit: (data: CustomerFormData) => Promise<void>;
}

const CustomerForm = ({
  open,
  customer,
  onClose,
  onSubmit,
}: CustomerFormProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const [contact, setContact] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    salary: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(customer);

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setAddress(customer.address);
      setSalary(String(customer.salary));
      setContact(customer.contact);
    } else {
      setName("");
      setAddress("");
      setSalary("");
      setContact("");
    }

    setErrors({
      name: "",
      address: "",
      salary: "",
      contact: "",
    });
  }, [customer, open]);

  const validate = () => {
    const newErrors = {
      name: "",
      address: "",
      salary: "",
      contact: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!salary.trim()) {
      newErrors.salary = "Salary is required";
    } else if (Number(salary) < 0) {
      newErrors.salary = "Salary cannot be negative";
    }

    if (!contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^[0-9]{10}$/.test(contact.trim())) {
      newErrors.contact = "Contact must contain 10 digits";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await onSubmit({
        name: name.trim(),
        address: address.trim(),
        salary: Number(salary),
        contact: contact.trim(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: "#111827",
        }}
      >
        {isEdit ? "Edit Customer" : "Add Customer"}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 1,
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />

          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={Boolean(errors.address)}
            helperText={errors.address}
            multiline
            rows={2}
            fullWidth
          />

          <TextField
            label="Salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            error={Boolean(errors.salary)}
            helperText={errors.salary}
            fullWidth
          />

          <TextField
            label="Contact"
            value={contact}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

              setContact(value);
            }}
            error={Boolean(errors.contact)}
            helperText={errors.contact || "Example: 0712345678"}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            color: "#6b7280",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            bgcolor: "#111827",
            textTransform: "none",
            px: 3,
            "&:hover": {
              bgcolor: "#1f2937",
            },
          }}
        >
          {loading
            ? "Saving..."
            : isEdit
              ? "Update Customer"
              : "Save Customer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerForm;