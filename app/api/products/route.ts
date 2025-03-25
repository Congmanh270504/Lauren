import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/utils/config";

export async function GET(req: NextRequest) {
  try {
    const imageURLs = req.nextUrl.searchParams.getAll("imageURL"); // Get the imageURL as an array of strings
    console.log("imageUrls", imageURLs);
    const urls = await Promise.all(
      imageURLs.map(async (cid) => {
        const url = await pinata.gateways.private.createAccessLink({
          cid: cid,
          expires: 30,
        });
        return url;
      })
    );
    console.log("urls", urls);
    return NextResponse.json(urls, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
