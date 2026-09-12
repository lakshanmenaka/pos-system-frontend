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

import type { Product } from "../../Pages/Products";

interface ProductFormProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (
    data: Omit<Product, "_id">
  ) => Promise<void>;
}

interface FormData {
  description: string;
  unitPrice: string;
  qtyOnHand: string;
}

interface FormErrors {
  description?: string;
  unitPrice?: string;
  qtyOnHand?: string;
}

const ProductForm = ({
  open,
  product,
  onClose,
  onSubmit,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    unitPrice: "",
    qtyOnHand: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        description: product.description,
        unitPrice: String(product.unitPrice),
        qtyOnHand: String(product.qtyOnHand),
      });
    } else {
      setFormData({
        description: "",
        unitPrice: "",
        qtyOnHand: "",
      });
    }

    setErrors({});
  }, [product, open]);

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.description.trim()) {
      newErrors.description =
        "Product description is required";
    } else if (formData.description.trim().length < 2) {
      newErrors.description =
        "Description must be at least 2 characters";
    }

    if (!formData.unitPrice.trim()) {
      newErrors.unitPrice =
        "Unit price is required";
    } else if (
      Number.isNaN(Number(formData.unitPrice))
    ) {
      newErrors.unitPrice =
        "Enter a valid unit price";
    } else if (Number(formData.unitPrice) < 0) {
      newErrors.unitPrice =
        "Unit price cannot be negative";
    }

    if (!formData.qtyOnHand.trim()) {
      newErrors.qtyOnHand =
        "Quantity is required";
    } else if (
      Number.isNaN(Number(formData.qtyOnHand))
    ) {
      newErrors.qtyOnHand =
        "Enter a valid quantity";
    } else if (Number(formData.qtyOnHand) < 0) {
      newErrors.qtyOnHand =
        "Quantity cannot be negative";
    } else if (
      !Number.isInteger(Number(formData.qtyOnHand))
    ) {
      newErrors.qtyOnHand =
        "Quantity must be a whole number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      await onSubmit({
        description: formData.description.trim(),
        unitPrice: Number(formData.unitPrice),
        qtyOnHand: Number(formData.qtyOnHand),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          pb: 1,
        }}
      >
        {product ? "Edit Product" : "Add Product"}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            pt: 1,
          }}
        >
          <TextField
            label="Product Description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) =>
              handleChange(
                "description",
                e.target.value
              )
            }
            error={Boolean(errors.description)}
            helperText={errors.description}
            fullWidth
            autoFocus
          />

          <TextField
            label="Unit Price"
            placeholder="Enter unit price"
            type="number"
            value={formData.unitPrice}
            onChange={(e) =>
              handleChange(
                "unitPrice",
                e.target.value
              )
            }
            error={Boolean(errors.unitPrice)}
            helperText={errors.unitPrice}
            fullWidth
            slotProps={{
              htmlInput: {
                min: 0,
                step: "0.01",
              },
            }}
          />

          <TextField
            label="Quantity On Hand"
            placeholder="Enter quantity"
            type="number"
            value={formData.qtyOnHand}
            onChange={(e) =>
              handleChange(
                "qtyOnHand",
                e.target.value
              )
            }
            error={Boolean(errors.qtyOnHand)}
            helperText={errors.qtyOnHand}
            fullWidth
            slotProps={{
              htmlInput: {
                min: 0,
                step: 1,
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={submitting}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting
            ? "Saving..."
            : product
              ? "Update Product"
              : "Save Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;