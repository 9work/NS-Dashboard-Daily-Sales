import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = "your-secret-key";

const USERS: Record<string, any> = {
  "admin@example.com": { password: bcrypt.hashSync("admin123", 10), permission_type: "admin" }
};

export async function authenticateUser(email: string, password: string) {
  const user = USERS[email];
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
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