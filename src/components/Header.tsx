import "./Header.css";

interface HeaderProps {
  onOpenAdmin: () => void;
  onExport: () => void;
  orderCount: number;
  dayTotal: number;
}

export default function Header({ onOpenAdmin, onExport, orderCount, dayTotal }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-mark">Delimanda</span>
        <span className="header-sub">Kasa</span>
      </div>
      <div className="header-stats">
        <div className="header-stat">
          <span className="header-stat-value">{orderCount}</span>
          <span className="header-stat-label">sipariş</span>
        </div>
        <div className="header-stat">
          <span className="header-stat-value">{dayTotal.toLocaleString("tr-TR")} ₺</span>
          <span className="header-stat-label">gün toplamı</span>
        </div>
      </div>
      <button className="header-admin-btn" onClick={onExport} aria-label="Excel indir" title="Excel indir">
        ⬇️
      </button>
      <button className="header-admin-btn" onClick={onOpenAdmin} aria-label="Yönetim paneli">
        ⚙️
      </button>
    </header>
  );
}
