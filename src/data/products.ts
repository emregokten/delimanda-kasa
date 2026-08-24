import type { Product } from "../types";

// Fiyatlar ve meyveli çeşit isimleri PLACEHOLDER'dır — festivalden önce
// Yönetim panelinden (⚙️) güncellenmelidir.
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "yogurt-1kg",
    name: "Manda Yoğurdu 1 kg",
    price: 350,
    category: "yogurt",
    emoji: "🥣",
    accent: "#EFE7DA",
  },
  {
    id: "yogurt-200g",
    name: "Manda Yoğurdu 200 g",
    price: 90,
    category: "yogurt",
    emoji: "🥣",
    accent: "#EFE7DA",
  },
  {
    id: "meyveli-cilek",
    name: "Meyveli Yoğurt - Çilek",
    price: 5,
    category: "meyveli",
    emoji: "🍓",
    accent: "#FBD9DD",
  },
  {
    id: "meyveli-visne",
    name: "Meyveli Yoğurt - Vişne",
    price: 5,
    category: "meyveli",
    emoji: "🍒",
    accent: "#F6D3D9",
  },
  {
    id: "meyveli-muz",
    name: "Meyveli Yoğurt - Muz",
    price: 5,
    category: "meyveli",
    emoji: "🍌",
    accent: "#FBEBB5",
  },
  {
    id: "meyveli-bal-ceviz",
    name: "Meyveli Yoğurt - Bal Cevizli",
    price: 5,
    category: "meyveli",
    emoji: "🌰",
    accent: "#E8D6C0",
  },
  {
    id: "meyveli-fistik",
    name: "Meyveli Yoğurt - Fıstık",
    price: 7,
    category: "meyveli",
    emoji: "🥜",
    accent: "#DCE8C8",
  },
  {
    id: "sutlu-kahve",
    name: "Manda Sütlü Kahve",
    price: 60,
    category: "icecek",
    emoji: "☕️",
    accent: "#E3D2C3",
  },
  {
    id: "su-500ml",
    name: "Su 500 ml",
    price: 20,
    category: "icecek",
    emoji: "💧",
    accent: "#D9EAF5",
  },
];
