import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ message: "غير مصرح" }, { status: 401 });
  
  return NextResponse.json({
    kpis: {
      salesAmount: 1250000,
      targetSales: 1500000,
      salesAch: 83.3,
      quantity: 4500,
      targetQuantity: 5000,
      qtyAch: 90,
      invoices: 320,
      targetInvoices: 350,
      invoicesAch: 91.4,
      atv: 3906,
      targetATV: 4286,
      atvAch: 91.1,
      customers: 280,
    }
  });
}