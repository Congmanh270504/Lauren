// filepath: e:\byMyOwn\React\MiniApp\app\api\auth\register\route.ts
import clientPromise from "@/lib/mongodbClient";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Use bcryptjs instead of bcrypt
export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const client = await clientPromise;
    const db = client.db();
    const createAccount = await db.collection("Users").insertOne({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });
    return NextResponse.json(
      { success: "Account created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
