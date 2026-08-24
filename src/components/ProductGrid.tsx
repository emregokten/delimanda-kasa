import { useMemo, useState } from "react";
import type { Product } from "../types";
import { CATEGORY_LABELS } from "../types";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

interface ProductGridProps {
  products: Product[];
  onAdd: (product: Product) => void;
}

const CATEGORY_ORDER: Product["category"][] = ["yogurt", "meyveli", "icecek"];

export default function ProductGrid({ products, onAdd }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<Product["category"] | "all">("all");

  const categories = useMemo(
    () => CATEGORY_ORDER.filter((c) => products.some((p) => p.category === c)),
    [products]
  );

  const visible = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="product-grid-wrap">
      <div className="category-tabs">
        <button
          className={`category-tab${activeCategory === "all" ? " is-active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          Tümü
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`category-tab${activeCategory === c ? " is-active" : ""}`}
            onClick={() => setActiveCategory(c)}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
