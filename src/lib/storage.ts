import { DEFAULT_PRODUCTS } from "../data/products";
import type { Order, Product } from "../types";

const PRODUCTS_KEY = "delimanda-kasa-products";
const ORDERS_PREFIX = "delimanda-kasa-orders-";

function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getTodayDateKey(): string {
  return todayKey();
}

export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) return DEFAULT_PRODUCTS;
    const parsed = JSON.parse(raw) as Product[];
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_PRODUCTS;
    return parsed;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function loadOrders(dateKey: string = todayKey()): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_PREFIX + dateKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendOrder(order: Order, dateKey: string = todayKey()): Order[] {
  const orders = loadOrders(dateKey);
  const updated = [...orders, order];
  localStorage.setItem(ORDERS_PREFIX + dateKey, JSON.stringify(updated));
  return updated;
}

export function clearOrders(dateKey: string = todayKey()): void {
  localStorage.removeItem(ORDERS_PREFIX + dateKey);
}

export function listOrderDateKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(ORDERS_PREFIX)) {
      keys.push(key.slice(ORDERS_PREFIX.length));
    }
  }
  return keys.sort();
}
