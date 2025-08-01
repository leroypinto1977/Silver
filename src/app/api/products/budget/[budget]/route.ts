import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ budget: string }> }
) {
  try {
    const { budget: budgetParam } = await params;
    const budget = parseInt(budgetParam);
    if (isNaN(budget)) {
      return NextResponse.json({ message: "Invalid budget parameter" }, { status: 400 });
    }

    const filteredProducts = products.filter(product => product.minBudget <= budget);
    return NextResponse.json(filteredProducts);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: "Internal server error", error: errorMessage }, { status: 500 });
  }
}