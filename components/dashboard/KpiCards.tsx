"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatCurrency = (value: number) => (value || 0).toLocaleString() + " جنيه";
const formatNumber = (value: number) => (value || 0).toLocaleString();

export function KpiCards({ kpis }: { kpis: any }) {
  if (!kpis) return <div>جاري التحميل...</div>;
  
  const cards = [
    { title: "المبيعات", value: kpis.salesAmount, target: kpis.targetSales, ach: kpis.salesAch, format: formatCurrency },
    { title: "الكمية", value: kpis.quantity, target: kpis.targetQuantity, ach: kpis.qtyAch, format: formatNumber },
    { title: "الفواتير", value: kpis.invoices, target: kpis.targetInvoices, ach: kpis.invoicesAch, format: formatNumber },
    { title: "متوسط الفاتورة", value: kpis.atv, target: kpis.targetATV, ach: kpis.atvAch, format: formatCurrency },
    { title: "العملاء", value: kpis.customers, format: formatNumber },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
      {cards.map((card, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.format(card.value)}</div>
            {card.target && (
              <p className="text-xs text-gray-500 mt-1">الهدف: {card.format(card.target)}</p>
            )}
            {card.ach !== undefined && (
              <p className={`text-xs mt-2 ${card.ach >= 70 ? "text-green-600" : "text-red-600"}`}>
                الإنجاز: {card.ach.toFixed(1)}%
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}