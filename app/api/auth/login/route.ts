import { NextResponse } from "next/server";
import { authenticateUser, setSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await authenticateUser(email, password);
    if (!user) {
      return NextResponse.json({ message: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }
    await setSession(user);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "حدث خطأ" }, { status: 500 });
  }
}