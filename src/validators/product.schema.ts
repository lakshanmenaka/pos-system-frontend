import { z } from "zod";

export const productSchema = z.object({
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters"),

  unitPrice: z
    .number()
    .min(0, "Unit price cannot be negative"),

  qtyOnHand: z
    .number()
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative"),
});

export type ProductFormData =
  z.infer<typeof productSchema>;