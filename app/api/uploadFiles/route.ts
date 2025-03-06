import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      console.error("No file received");
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    console.log("File received:", file);

    const uploadData = await pinata.upload.file(file);
    console.log("Upload data:", uploadData);

    const url = await pinata.gateways.createSignedURL({
      cid: uploadData.cid,
      expires: 3600,
    });
    console.log("Signed URL:", url);

    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.error("Error during file upload:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
