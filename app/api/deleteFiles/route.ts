import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.formData();
    console.log(data);
    const file: string | null = data.get("id") as unknown as string;

    if (!file) {
      console.error("No file received");
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    console.log("File received:", file);

    const deleteData = await pinata.files.private.delete([file]);
    console.log("Upload data:", deleteData);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("Error during file upload:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
