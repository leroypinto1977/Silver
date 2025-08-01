"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { budgetOptions, insertUserSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";

interface UserFormProps {
  onBudgetChange: (budget: number | null) => void;
  selectedBudget: number | null;
}

export function UserForm({ onBudgetChange, selectedBudget }: UserFormProps) {
  const form = useForm<z.infer<typeof insertUserSchema>>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budget: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof insertUserSchema>) => {
    console.log("Form submitted:", values);
    // You would typically send this data to your API here
  };

  const handleBudgetChange = (value: string) => {
    const budgetValue = parseInt(value);
    form.setValue("budget", budgetValue);
    onBudgetChange(budgetValue || null);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Your Details
      </h2>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-gray-900 placeholder-gray-500"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-gray-900 placeholder-gray-500"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-gray-900 placeholder-gray-500"
            {...form.register("phone")}
          />
          {form.formState.errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Budget *
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-gray-900"
            value={selectedBudget || ""}
            onChange={(e) => handleBudgetChange(e.target.value)}
            required
          >
            <option value="">Select your budget</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {form.formState.errors.budget && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.budget.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Product Assortment
          </Button>
        </div>
      </form>
    </div>
  );
}
