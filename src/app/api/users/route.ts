import { NextResponse } from "next/server";
import { insertUserSchema } from "@/lib/schema";

// In-memory storage for users
let users: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userData = insertUserSchema.parse(body);
    
    // Check if phone already exists
    const existingUser = users.find(user => user.phone === userData.phone);
    if (existingUser) {
      return NextResponse.json({ message: "Phone number already exists" }, { status: 400 });
    }

    const newUser = {
      ...userData,
      id: `user-${users.length + 1}`
    };
    
    users.push(newUser);
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Invalid user data", error: error.message }, { status: 400 });
  }
}