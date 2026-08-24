export interface Product {
  id: string;
  name: string;
  price: number;
  category: "yogurt" | "meyveli" | "icecek";
  emoji: string;
  accent: string;
}

export interface CartLine {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  timestamp: string;
  lines: CartLine[];
  total: number;
}

export const CATEGORY_LABELS: Record<Product["category"], string> = {
  yogurt: "Manda Yoğurdu",
  meyveli: "Meyveli Yoğurt",
  icecek: "İçecek",
};
