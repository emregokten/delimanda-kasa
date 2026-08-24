import { useMemo, useState } from "react";
import type { Order, Product } from "../types";
import "./AdminPanel.css";

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  dateKey: string;
  onClose: () => void;
  onProductsChange: (products: Product[]) => void;
  onResetDay: () => void;
  onExportNow: () => void;
}

type Tab = "fiyatlar" | "ozet";

export default function AdminPanel({
  products,
  orders,
  dateKey,
  onClose,
  onProductsChange,
  onResetDay,
  onExportNow,
}: AdminPanelProps) {
  const [tab, setTab] = useState<Tab>("fiyatlar");
  const [confirmingReset, setConfirmingReset] = useState(false);

  function updateProduct(id: string, patch: Partial<Product>) {
    onProductsChange(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  const summary = useMemo(() => {
    const perProduct = new Map<string, { qty: number; total: number }>();
    let grandTotal = 0;
    orders.forEach((order) => {
      grandTotal += order.total;
      order.lines.forEach((line) => {
        const existing = perProduct.get(line.name) ?? { qty: 0, total: 0 };
        existing.qty += line.quantity;
        existing.total += line.unitPrice * line.quantity;
        perProduct.set(line.name, existing);
      });
    });
    return {
      grandTotal,
      orderCount: orders.length,
      rows: Array.from(perProduct.entries())
        .map(([name, v]) => ({ name, ...v }))
        .sort((a, b) => b.total - a.total),
    };
  }, [orders]);

  function handleResetClick() {
    if (!confirmingReset) {
      setConfirmingReset(true);
      window.setTimeout(() => setConfirmingReset(false), 3000);
      return;
    }
    onResetDay();
    setConfirmingReset(false);
  }

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="admin-head">
          <h2>Yönetim</h2>
          <button className="admin-close" onClick={onClose} aria-label="Kapat">
            ✕
          </button>
        </div>

        <div className="admin-tabs">
          <button className={`admin-tab${tab === "fiyatlar" ? " is-active" : ""}`} onClick={() => setTab("fiyatlar")}>
            Fiyatlar
          </button>
          <button className={`admin-tab${tab === "ozet" ? " is-active" : ""}`} onClick={() => setTab("ozet")}>
            Gün Özeti
          </button>
        </div>

        {tab === "fiyatlar" && (
          <div className="admin-content">
            <p className="admin-hint">Ürün adı ve fiyatını değiştirmek için alanlara dokun.</p>
            <div className="price-list">
              {products.map((p) => (
                <div className="price-row" key={p.id}>
                  <span className="price-row-emoji">{p.emoji}</span>
                  <input
                    className="price-row-name"
                    value={p.name}
                    onChange={(e) => updateProduct(p.id, { name: e.target.value })}
                  />
                  <div className="price-row-price">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={p.price}
                      onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) || 0 })}
                    />
                    <span>₺</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "ozet" && (
          <div className="admin-content">
            <div className="summary-cards">
              <div className="summary-card">
                <span className="summary-card-value">{summary.orderCount}</span>
                <span className="summary-card-label">sipariş — {dateKey}</span>
              </div>
              <div className="summary-card">
                <span className="summary-card-value">{summary.grandTotal.toLocaleString("tr-TR")} ₺</span>
                <span className="summary-card-label">gün toplamı</span>
              </div>
            </div>

            <div className="summary-table">
              <div className="summary-table-head">
                <span>Ürün</span>
                <span>Adet</span>
                <span>Tutar</span>
              </div>
              {summary.rows.length === 0 && <p className="admin-hint">Henüz sipariş yok.</p>}
              {summary.rows.map((row) => (
                <div className="summary-table-row" key={row.name}>
                  <span>{row.name}</span>
                  <span>{row.qty}</span>
                  <span>{row.total.toLocaleString("tr-TR")} ₺</span>
                </div>
              ))}
            </div>

            <div className="admin-actions">
              <button className="admin-action-btn" onClick={onExportNow}>
                Excel'i İndir
              </button>
              <button
                className={`admin-action-btn is-danger${confirmingReset ? " is-confirming" : ""}`}
                onClick={handleResetClick}
              >
                {confirmingReset ? "Emin misin? Tekrar dokun" : "Günü Sıfırla"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
