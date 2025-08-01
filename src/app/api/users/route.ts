import { NextResponse } from "next/server";
import { insertUserSchema } from "@/lib/schema";
import { User } from "@/lib/schema";

// In-memory storage for users
const users: User[] = [];

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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: "Invalid user data", error: errorMessage }, { status: 400 });
  }
}