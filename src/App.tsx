import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";
import { appendOrder, clearOrders, getTodayDateKey, loadOrders, loadProducts, saveProducts } from "./lib/storage";
import { downloadDayExcel } from "./lib/excel";
import type { CartLine, Order, Product } from "./types";

export default function App() {
  const dateKey = getTodayDateKey();
  const [products, setProducts] = useState<Product[]>(() => loadProducts());
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => loadOrders(dateKey));
  const [adminOpen, setAdminOpen] = useState(false);
  const [justPaid, setJustPaid] = useState(false);

  const total = useMemo(() => cart.reduce((s, l) => s + l.unitPrice * l.quantity, 0), [cart]);
  const dayTotal = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders]);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((l) => l.productId === product.id);
      if (existing) {
        return prev.map((l) => (l.productId === product.id ? { ...l, quantity: l.quantity + 1 } : l));
      }
      return [...prev, { productId: product.id, name: product.name, unitPrice: product.price, quantity: 1 }];
    });
  }

  function changeQuantity(productId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.productId === productId ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0)
    );
  }

  function removeLine(productId: string) {
    setCart((prev) => prev.filter((l) => l.productId !== productId));
  }

  function handlePayment() {
    if (cart.length === 0) return;
    const order: Order = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      lines: cart,
      total,
    };
    const updated = appendOrder(order, dateKey);
    setOrders(updated);
    setCart([]);
    setJustPaid(true);
    window.setTimeout(() => setJustPaid(false), 1500);
  }

  function handleProductsChange(next: Product[]) {
    setProducts(next);
    saveProducts(next);
  }

  function handleResetDay() {
    clearOrders(dateKey);
    setOrders([]);
  }

  function handleExportNow() {
    downloadDayExcel(dateKey, orders);
  }

  return (
    <div className="app">
      <Header
        onOpenAdmin={() => setAdminOpen(true)}
        onExport={handleExportNow}
        orderCount={orders.length}
        dayTotal={dayTotal}
      />
      <div className="app-body">
        <ProductGrid products={products} onAdd={addToCart} />
        <Cart
          lines={cart}
          total={total}
          onChangeQuantity={changeQuantity}
          onRemove={removeLine}
          onClear={() => setCart([])}
          onPay={handlePayment}
          justPaid={justPaid}
        />
      </div>
      {adminOpen && (
        <AdminPanel
          products={products}
          orders={orders}
          dateKey={dateKey}
          onClose={() => setAdminOpen(false)}
          onProductsChange={handleProductsChange}
          onResetDay={handleResetDay}
          onExportNow={handleExportNow}
        />
      )}
    </div>
  );
}
