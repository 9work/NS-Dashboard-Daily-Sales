"use client";
import { AppLayout } from "@/components/layout/AppLayout";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>الإعدادات</h1>
        <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>إعدادات النظام</h2>
          <p>صفحة الإعدادات قيد التطوير</p>
        </div>
      </div>
    </AppLayout>
  );
}