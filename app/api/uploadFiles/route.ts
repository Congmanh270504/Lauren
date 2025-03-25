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

    const uploadData = await pinata.upload.private.file(file);
    console.log("Upload data:", uploadData);

    const url = await pinata.upload.private.createSignedURL({
      expires: 3600,
    });

    console.log("Signed URL:", url, uploadData.cid);
    console.table(uploadData);

    return NextResponse.json(
      { url, id: uploadData.id, cid: uploadData.cid },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error during file upload:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
