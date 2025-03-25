import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/utils/config";

export async function GET(
  req: NextRequest,
  { params }: { params: { cid: string } }
) {
  const { cid } = await params;
  try {
    const url = await pinata.gateways.private.createAccessLink({
      cid: cid,
      expires: 30,
    });
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
