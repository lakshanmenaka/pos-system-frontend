import { z } from "zod";

export const orderSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required"),

  totalCost: z
    .number()
    .min(0, "Total cost cannot be negative"),

  customer: z
    .string()
    .min(1, "Customer is required"),

  products: z
    .array(
      z.object({
        product: z.string().min(1, "Product is required"),
        qty: z
          .number()
          .int()
          .min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one product is required"),
});

export type OrderFormData =
  z.infer<typeof orderSchema>;