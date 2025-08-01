import { z } from "zod";

// User schema
export const insertUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  budget: z.number().min(1, "Budget is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = InsertUser & {
  id: string;
};

// Product schema
export const insertProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Please enter a valid URL"),
  quantity: z.string().min(1, "Quantity is required"),
  minBudget: z.number().min(1, "Minimum budget is required"),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Product = InsertProduct & {
  id: string;
};

// Budget options schema
export const budgetOptions = [
  { value: 100000, label: "₹1 Lakh" },
  { value: 125000, label: "₹1.25 Lakh" },
  { value: 150000, label: "₹1.5 Lakh" },
  { value: 175000, label: "₹1.75 Lakh" },
  { value: 200000, label: "₹2 Lakh" },
  { value: 225000, label: "₹2.25 Lakh" },
  { value: 250000, label: "₹2.5 Lakh" },
] as const;