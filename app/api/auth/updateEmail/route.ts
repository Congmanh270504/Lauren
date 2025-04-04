import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/mongodbClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// update still needs to be done in the database
export async function POST(request: Request) {
  const { email } = await request.json();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: "Unauthorized" }, { status: 401 });
    }
    const client = await clientPromise;
    const db = client.db();
    const doesUserExit = await db.collection("Users").findOne({ email });
    if (doesUserExit) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }
    const updateEmail = await db
      .collection("Users")
      .updateOne({ email: session?.user?.email }, { $set: { email } });
    if (updateEmail) {
      return NextResponse.json(
        { success: "Email updated successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to update email" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
