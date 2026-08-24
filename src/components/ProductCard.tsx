import { useState } from "react";
import type { Product } from "../types";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  function handleTap() {
    onAdd(product);
    setPulsing(true);
    window.setTimeout(() => setPulsing(false), 220);
  }

  return (
    <button className={`product-card${pulsing ? " is-pulsing" : ""}`} onClick={handleTap}>
      <div className="product-visual" style={{ background: product.accent }}>
        {!imgFailed && (
          <img
            src={`${import.meta.env.BASE_URL}images/products/${product.id}.jpg`}
            alt=""
            onError={() => setImgFailed(true)}
            className="product-photo"
          />
        )}
        {imgFailed && <span className="product-emoji">{product.emoji}</span>}
      </div>
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <span className="product-price">{product.price.toLocaleString("tr-TR")} ₺</span>
      </div>
    </button>
  );
}
