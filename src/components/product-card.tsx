"use client";

import { cn } from "@/lib/utils";

interface Product {
  id?: string;
  name: string;
  imageUrl: string;
  quantity: string;
  minBudget: number;
}

interface ProductCardProps {
  product: Product;
  isVisible: boolean;
  className?: string;
}

export function ProductCard({
  product,
  isVisible,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "bg-gray-50 rounded-xl overflow-hidden shadow-md transition-all duration-300 relative",
        isVisible
          ? "hover:shadow-lg transform hover:scale-105"
          : "blur-sm opacity-75 cursor-not-allowed",
        className
      )}
    >
      {!isVisible && (
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10 flex items-center justify-center">
          <div className="bg-white px-3 py-1 rounded-lg shadow-md">
            <span className="text-xs font-medium text-blue-700">
              Select Budget
            </span>
          </div>
        </div>
      )}

      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <h3 className="font-medium text-blue-900 mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-600">Quantity:</span>
          <span className="font-semibold text-blue-700">
            {product.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
