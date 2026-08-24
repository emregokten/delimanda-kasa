import type { CartLine } from "../types";
import "./Cart.css";

interface CartProps {
  lines: CartLine[];
  total: number;
  onChangeQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  onPay: () => void;
  justPaid: boolean;
}

export default function Cart({ lines, total, onChangeQuantity, onRemove, onClear, onPay, justPaid }: CartProps) {
  const isEmpty = lines.length === 0;

  return (
    <aside className="cart">
      <div className="cart-head">
        <h2>Sepet</h2>
        {!isEmpty && (
          <button className="cart-clear-btn" onClick={onClear}>
            Temizle
          </button>
        )}
      </div>

      <div className="cart-lines">
        {isEmpty && <p className="cart-empty">Ürün eklemek için soldaki karta dokun.</p>}
        {lines.map((line) => (
          <div className="cart-line" key={line.productId}>
            <div className="cart-line-info">
              <span className="cart-line-name">{line.name}</span>
              <span className="cart-line-unit">{line.unitPrice.toLocaleString("tr-TR")} ₺ / adet</span>
            </div>
            <div className="cart-line-controls">
              <button className="qty-btn" onClick={() => onChangeQuantity(line.productId, -1)} aria-label="Azalt">
                −
              </button>
              <span className="qty-value">{line.quantity}</span>
              <button className="qty-btn" onClick={() => onChangeQuantity(line.productId, 1)} aria-label="Artır">
                +
              </button>
            </div>
            <span className="cart-line-total">{(line.unitPrice * line.quantity).toLocaleString("tr-TR")} ₺</span>
            <button className="cart-line-remove" onClick={() => onRemove(line.productId)} aria-label="Kaldır">
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total-row">
          <span>Toplam</span>
          <span className="cart-total-value">{total.toLocaleString("tr-TR")} ₺</span>
        </div>
        <button className={`pay-btn${justPaid ? " is-paid" : ""}`} disabled={isEmpty} onClick={onPay}>
          {justPaid ? "✓ Kaydedildi" : "Ödeme Alındı"}
        </button>
      </div>
    </aside>
  );
}
