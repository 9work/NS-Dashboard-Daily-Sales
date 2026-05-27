"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "بيانات الدخول غير صحيحة");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1e1b4b, #4c1d95, #1e1b4b)"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "32px",
        width: "400px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>تسجيل الدخول</h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>مرحباً بك في نظام المبيعات</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            style={{ padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            style={{ padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "#ef4444", fontSize: "14px", textAlign: "center" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#7c3aed",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {loading ? "جاري التسجيل..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}