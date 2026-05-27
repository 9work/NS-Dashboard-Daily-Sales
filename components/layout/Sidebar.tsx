"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { href: "/dashboard", label: "الرئيسية" },
  { href: "/settings", label: "الإعدادات" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "256px",
      height: "100vh",
      backgroundColor: "#0f172a",
      borderLeft: "1px solid #334155",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ padding: "24px", borderBottom: "1px solid #334155" }}>
        <h2 style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>NS Textile</h2>
        <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "4px" }}>Dashboard</p>
      </div>
      
      <nav style={{ flex: 1, padding: "16px" }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div style={{
                padding: "10px 16px",
                borderRadius: "8px",
                marginBottom: "8px",
                backgroundColor: isActive ? "#7c3aed" : "transparent",
                color: isActive ? "white" : "#cbd5e1",
                cursor: "pointer"
              }}>
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div style={{ padding: "16px", borderTop: "1px solid #334155" }}>
        <button onClick={handleLogout} style={{
          width: "100%",
          padding: "10px 16px",
          textAlign: "left",
          color: "#f87171",
          background: "transparent",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}