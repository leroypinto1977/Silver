import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(
  request: Request,
  { params }: { params: { budget: string } }
) {
  try {
    const budget = parseInt(params.budget);
    if (isNaN(budget)) {
      return NextResponse.json({ message: "Invalid budget parameter" }, { status: 400 });
    }

    const filteredProducts = products.filter(product => product.minBudget <= budget);
    return NextResponse.json(filteredProducts);
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}