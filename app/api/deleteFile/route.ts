import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";
export async function DELETE(request: NextRequest) {
  try {
    const { fileName } = await request.json();
    if (!fileName) {
      return NextResponse.json({ error: "No name provided" }, { status: 400 });
    }
    const response = await pinata.files.private.list().name(fileName);
    if (!response) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const deleteResponse = await pinata.files.private.delete([
      response.files[0].id,
    ]);
    if (deleteResponse[0].status !== "OK") {
      return NextResponse.json(
        { error: "Failed to delete file" },
        { status: 500 }
      );
    }
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
