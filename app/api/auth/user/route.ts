import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  return NextResponse.json({ success: session }, { status: 200 });
}
