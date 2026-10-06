import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// The dashboard calls this after every save so the home page updates immediately.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ revalidated: true });
}