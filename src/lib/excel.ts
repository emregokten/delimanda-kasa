import * as XLSX from "xlsx";
import type { Order } from "../types";

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

const ORDERS_HEADER = ["Sipariş No", "Saat", "Ürün", "Adet", "Birim Fiyat (₺)", "Tutar (₺)"];

function buildOrdersSheet(orders: Order[]): XLSX.WorkSheet {
  const rows: (string | number)[][] = [ORDERS_HEADER];

  orders.forEach((order, idx) => {
    const orderNo = idx + 1;
    const time = formatTime(order.timestamp);
    order.lines.forEach((line) => {
      rows.push([orderNo, time, line.name, line.quantity, line.unitPrice, line.unitPrice * line.quantity]);
    });
    rows.push(["", "", "Sipariş Toplamı", "", "", order.total]);
    rows.push([]);
  });

  const grandTotal = orders.reduce((sum, o) => sum + o.total, 0);
  rows.push(["", "", "GÜN TOPLAMI", "", "", grandTotal]);

  const sheet = XLSX.utils.aoa_to_sheet(rows);
  sheet["!cols"] = [{ wch: 10 }, { wch: 10 }, { wch: 32 }, { wch: 8 }, { wch: 14 }, { wch: 12 }];
  return sheet;
}

interface SummaryRow {
  Ürün: string;
  "Satılan Adet": number;
  "Toplam Tutar (₺)": number;
}

function buildProductSummarySheet(orders: Order[]): XLSX.WorkSheet {
  const productTotals = new Map<string, { qty: number; total: number }>();
  orders.forEach((order) => {
    order.lines.forEach((line) => {
      const existing = productTotals.get(line.name) ?? { qty: 0, total: 0 };
      existing.qty += line.quantity;
      existing.total += line.unitPrice * line.quantity;
      productTotals.set(line.name, existing);
    });
  });

  const rows: SummaryRow[] = Array.from(productTotals.entries())
    .map(([name, { qty, total }]) => ({
      Ürün: name,
      "Satılan Adet": qty,
      "Toplam Tutar (₺)": total,
    }))
    .sort((a, b) => b["Toplam Tutar (₺)"] - a["Toplam Tutar (₺)"]);

  const grandTotal = orders.reduce((sum, o) => sum + o.total, 0);
  rows.push({
    Ürün: "TOPLAM",
    "Satılan Adet": rows.reduce((s, r) => s + r["Satılan Adet"], 0),
    "Toplam Tutar (₺)": grandTotal,
  });

  const sheet = XLSX.utils.json_to_sheet(rows);
  sheet["!cols"] = [{ wch: 32 }, { wch: 14 }, { wch: 16 }];
  return sheet;
}

export function buildDayWorkbook(orders: Order[]): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, buildOrdersSheet(orders), "Siparişler");
  XLSX.utils.book_append_sheet(wb, buildProductSummarySheet(orders), "Ürün Özeti");
  return wb;
}

export function downloadDayExcel(dateKey: string, orders: Order[]): void {
  const wb = buildDayWorkbook(orders);
  XLSX.writeFile(wb, `Delimanda-Siparisler-${dateKey}.xlsx`);
}
