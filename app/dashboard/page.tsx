"use client";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCards } from "@/components/dashboard/KpiCards";

export default function DashboardPage() {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(data => setKpis(data.kpis));
  }, []);

  return (
    <AppLayout>
      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>لوحة التحكم</h1>
        <KpiCards kpis={kpis} />
        <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", marginTop: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>مرحباً بك</h2>
          <p>نظام متابعة مبيعات الفروع والبياعين</p>
        </div>
      </div>
    </AppLayout>
  );
}