import clientPromise from "@/lib/mongodbClient";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Use bcryptjs instead of bcrypt

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Check if the user already exists
    const client = await clientPromise;
    const db = client.db();

    // Check for existing user by name
    const existingName = await db.collection("Users").findOne({ name });
    if (existingName) {
      return NextResponse.json(
        { error: "A user with this name already exists" },
        { status: 400 }
      );
    }

    // Check for existing user by email
    const existingEmail = await db.collection("Users").findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    // Check for existing user by phone
    const existingPhone = await db.collection("Users").findOne({ phone });
    if (existingPhone) {
      return NextResponse.json(
        { error: "A user with this phone number already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const createAccount = await db.collection("Users").insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { success: "Account created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
