import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  address: z
    .string()
    .trim()
    .min(3, "Address is required"),

  salary: z
    .number()
    .min(0, "Salary cannot be negative"),

  contact: z
    .string()
    .trim()
    .min(10, "Contact number must be at least 10 characters"),
});

export type CustomerFormData =
  z.infer<typeof customerSchema>;