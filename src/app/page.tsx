"use client";

import { useState } from "react";
import { budgetOptions } from "@/lib/schema";
import { silverProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { UserForm } from "@/components/user-form";
import { ContactPopup } from "@/components/contact-popup";

export default function Home() {
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const [showContactPopup, setShowContactPopup] = useState(false);

  // Show only first 10 products
  const visibleProducts = silverProducts.slice(0, 10);
  // Rest of the products will be blurred
  const lockedProducts = silverProducts.slice(10);

  const selectedBudgetLabel =
    budgetOptions.find((option) => option.value === selectedBudget)?.label ||
    "Not Selected";

  const handleGetQuote = () => {
    if (selectedBudget) {
      setShowContactPopup(true);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Silver Product Assortment
          </h1>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Enter your details and budget to discover curated silver products
            tailored to your preferences.
          </p>
        </div>

        {/* User Form - Placed at the top */}
        <div className="mb-12">
          <UserForm
            onBudgetChange={setSelectedBudget}
            selectedBudget={selectedBudget}
          />
        </div>

        {/* Product Assortment */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-12">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-900">
                Curated Silver Collection
              </h2>
              <div
                className={`text-lg font-medium px-4 py-2 rounded-lg ${
                  selectedBudget
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                Budget: {selectedBudgetLabel}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {/* Visible Products - First 10 */}
              {visibleProducts.map((product, index) => (
                <ProductCard key={index} product={product} isVisible={true} />
              ))}

              {/* Locked Products - Rest are blurred */}
              {lockedProducts.map((product, index) => (
                <ProductCard
                  key={`locked-${index}`}
                  product={product}
                  isVisible={false}
                />
              ))}
            </div>

            {/* Reveal Items Button */}
            <div className="text-center mt-8">
              <p className="text-blue-600 mb-4">
                Showing{" "}
                <span className="font-semibold">
                  10 of {silverProducts.length}
                </span>{" "}
                products.{" "}
                <span className="text-blue-700 font-medium">
                  Reveal all items
                </span>{" "}
                to get exact quotes for all products.
              </p>
              <Button
                onClick={handleGetQuote}
                disabled={!selectedBudget}
                className={`px-6 py-3 font-medium rounded-lg ${
                  selectedBudget
                    ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              >
                Reveal Items
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Popup - Shows contact details of 2 people */}
      <ContactPopup
        isOpen={showContactPopup}
        onClose={() => setShowContactPopup(false)}
        selectedBudget={selectedBudget}
      />
    </div>
  );
}
