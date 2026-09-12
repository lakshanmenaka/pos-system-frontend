import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import type { Order, OrderItem } from "../../Pages/Orders";
import type { Customer } from "../../Pages/Customers";
import type { Product } from "../../Pages/Products";

interface OrderFormProps {
  open: boolean;
  order: Order | null;
  customers: Customer[];
  products: Product[];
  onClose: () => void;
  onSubmit: (
    data: Omit<Order, "_id">
  ) => Promise<void>;
}

interface FormItem {
  product: string;
  qty: string;
}

interface FormErrors {
  date?: string;
  customer?: string;
  products?: string;
}

const OrderForm = ({
  open,
  order,
  customers,
  products,
  onClose,
  onSubmit,
}: OrderFormProps) => {
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState<FormItem[]>([
    {
      product: "",
      qty: "1",
    },
  ]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (order) {
      setDate(
        order.date
          ? new Date(order.date)
              .toISOString()
              .split("T")[0]
          : ""
      );

      setCustomer(
        typeof order.customer === "string"
          ? order.customer
          : ""
      );

      setItems(
        order.products?.length
          ? order.products.map((item) => ({
              product:
                typeof item.product === "string"
                  ? item.product
                  : "",
              qty: String(item.qty),
            }))
          : [
              {
                product: "",
                qty: "1",
              },
            ]
      );
    } else {
      setDate(
        new Date()
          .toISOString()
          .split("T")[0]
      );

      setCustomer("");

      setItems([
        {
          product: "",
          qty: "1",
        },
      ]);
    }

    setErrors({});
  }, [order, open]);

  const totalCost = useMemo(() => {
    return items.reduce((total, item) => {
      const product = products.find(
        (p) => p._id === item.product
      );

      const qty = Number(item.qty);

      if (!product || !Number.isFinite(qty)) {
        return total;
      }

      return (
        total +
        Number(product.unitPrice) * qty
      );
    }, 0);
  }, [items, products]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        product: "",
        qty: "1",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleProductChange = (
    index: number,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              product: value,
            }
          : item
      )
    );

    setErrors((prev) => ({
      ...prev,
      products: "",
    }));
  };

  const handleQtyChange = (
    index: number,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              qty: value,
            }
          : item
      )
    );

    setErrors((prev) => ({
      ...prev,
      products: "",
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!date) {
      newErrors.date = "Date is required";
    }

    if (!customer) {
      newErrors.customer =
        "Customer is required";
    }

    if (items.length === 0) {
      newErrors.products =
        "At least one product is required";
    }

    const invalidItem = items.some((item) => {
      const qty = Number(item.qty);

      return (
        !item.product ||
        !item.qty ||
        !Number.isFinite(qty) ||
        qty <= 0 ||
        !Number.isInteger(qty)
      );
    });

    if (invalidItem) {
      newErrors.products =
        "Select a product and enter a valid quantity";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    const orderProducts: OrderItem[] =
      items.map((item) => ({
        product: item.product,
        qty: Number(item.qty),
      }));

    try {
      setSubmitting(true);

      await onSubmit({
        date,
        totalCost,
        customer,
        products: orderProducts,
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
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
        }}
      >
        {order
          ? "Edit Order"
          : "Create Order"}
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
            label="Order Date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);

              setErrors((prev) => ({
                ...prev,
                date: "",
              }));
            }}
            error={Boolean(errors.date)}
            helperText={errors.date}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <FormControl
            fullWidth
            error={Boolean(errors.customer)}
          >
            <InputLabel>
              Customer
            </InputLabel>

            <Select
              value={customer}
              label="Customer"
              onChange={(e) => {
                setCustomer(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  customer: "",
                }));
              }}
            >
              {customers.length === 0 ? (
                <MenuItem disabled>
                  No customers available
                </MenuItem>
              ) : (
                customers.map((item) => (
                  <MenuItem
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </MenuItem>
                ))
              )}
            </Select>

            {errors.customer && (
              <FormHelperText>
                {errors.customer}
              </FormHelperText>
            )}
          </FormControl>

        
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                sx={{ fontWeight: 700 }}
              >
                Products
              </Typography>

              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddItem}
              >
                Add Product
              </Button>
            </Box>

            {errors.products && (
              <Typography
                color="error"
                sx={{ mb: 1, fontSize: 13 }}
              >
                {errors.products}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <FormControl
                    fullWidth
                    size="small"
                  >
                    <InputLabel>
                      Product
                    </InputLabel>

                    <Select
                      value={item.product}
                      label="Product"
                      onChange={(e) =>
                        handleProductChange(
                          index,
                          e.target.value
                        )
                      }
                    >
                      {products.length ===
                      0 ? (
                        <MenuItem disabled>
                          No products available
                        </MenuItem>
                      ) : (
                        products.map(
                          (product) => (
                            <MenuItem
                              key={
                                product._id
                              }
                              value={
                                product._id
                              }
                            >
                              {
                                product.description
                              }{" "}
                              — Rs.{" "}
                              {Number(
                                product.unitPrice
                              ).toLocaleString(
                                "en-LK",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}
                            </MenuItem>
                          )
                        )
                      )}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Qty"
                    type="number"
                    size="small"
                    value={item.qty}
                    onChange={(e) =>
                      handleQtyChange(
                        index,
                        e.target.value
                      )
                    }
                    sx={{
                      width: 120,
                    }}
                    slotProps={{
                      htmlInput: {
                        min: 1,
                        step: 1,
                      },
                    }}
                  />

                  <IconButton
                    color="error"
                    disabled={
                      items.length === 1
                    }
                    onClick={() =>
                      handleRemoveItem(
                        index
                      )
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM8 9h8v10H8V9Zm7.5-5-1-1h-5l-1 1H5v2h14V4z"
                        fill="currentColor"
                      />
                    </svg>
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

        
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              borderTop:
                "1px solid #e5e7eb",
              pt: 2,
            }}
          >
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Total Cost
              </Typography>

              <Typography
                variant="h5"
                sx={{ fontWeight: 800 }}
              >
                Rs.{" "}
                {totalCost.toLocaleString(
                  "en-LK",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
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
            : order
              ? "Update Order"
              : "Create Order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderForm;