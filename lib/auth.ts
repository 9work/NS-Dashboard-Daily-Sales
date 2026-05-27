import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = "your-secret-key";

// مؤقتاً بدون تشفير - للتجربة
const USERS: Record<string, any> = {
  "mahmoud.bayoumi@nstextile-eg.com": { 
    password: "123456",  // نص عادي بدون تشفير
    permission_type: "super_admin" 
  }
};

export async function authenticateUser(email: string, password: string) {
  console.log("🔐 محاولة تسجيل دخول:", email);
  
  const user = USERS[email];
  if (!user) {
    console.log("❌ المستخدم غير موجود");
    return null;
  }
  
  // مقارنة نص عادي
  if (password !== user.password) {
    console.log("❌ كلمة المرور خاطئة");
    return null;
  }
  
  console.log("✅ تم تسجيل الدخول بنجاح");
  return { email, permission_type: user.permission_type };
}

export async function signJWT(user: any) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export async function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function setSession(user: any) {
  const token = await signJWT(user);
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 604800,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
