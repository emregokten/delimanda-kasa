# Delimanda Kasa

Gıda festivalinde iPad üzerinde kullanılacak kasa uygulaması. Tamamen tarayıcı
içinde çalışır (React + Vite, PWA), sunucu/internet gerektirmez — festivaldeki
zayıf/kesintili wifi bir sorun oluşturmaz.

## Geliştirme

```bash
npm install
npm run dev
```

`http://localhost:5173` adresinden önizle.

## Yayınlama (GitHub Pages)

Bu repo **public** olmalı (GitHub Pages ücretsiz planda private repoda
çalışmıyor). Tek seferlik kurulum:

1. GitHub'da bu repoyu (`delimanda-kasa`) oluştur/aç → **Settings → Pages**.
2. **Source** olarak **"GitHub Actions"**ı seç (dosyadan/branch'ten değil).
3. `main` branch'ine push yapıldığında `.github/workflows/deploy.yml` otomatik
   build alıp yayınlıyor. İlk push'tan birkaç dakika sonra adres şu şekilde
   olur: `https://<kullanıcı-adı>.github.io/delimanda-kasa/`
   (repoyu farklı bir isimle oluşturduysan, `vite.config.ts` içindeki
   `GH_PAGES_BASE` sabitini de o isimle güncellemen gerekir, yoksa dosya
   yolları/ikonlar bozuk gelir.)

## iPad'e kurulum (festivalden önce)

1. iPad'de **Safari** ile yukarıdaki GitHub Pages adresine git (Chrome ile
   olmaz — "Ana Ekrana Ekle" tam ekran modu Safari'ye özel).
2. Paylaş butonu → **Ana Ekrana Ekle**. Bu, uygulamayı tam ekran (adres çubuğu
   olmadan) bir simge gibi açar ve internet olmasa da önbellekten çalışmaya
   devam eder (PWA/offline destek `vite-plugin-pwa` ile kurulu).
3. Festival günü uçuş modu açık olsa bile kasa çalışmaya devam eder — veriler
   cihazın kendi hafızasında (localStorage) tutulur, hiçbir şey kaybolmaz.

> Not: Offline önbellek ilk ziyarette (internetteyken) bir kez indirilir.
> Festivalden önce en az bir kez iPad'de siteyi internetle açıp "Ana Ekrana
> Ekle" yapman yeterli.

## Fiyatları/ürün isimlerini güncelleme

Sağ üstteki ⚙️ (Yönetim) ikonuna dokun → **Fiyatlar** sekmesi. Buradaki
değerler `DEFAULT_PRODUCTS` (`src/data/products.ts`) içindeki
**placeholder/örnek fiyatlardır** — festivalden önce gerçek fiyatlarla
güncellenmeli. Değişiklikler cihazda kalıcı olarak saklanır (localStorage),
kod değişikliği gerekmez.

## Ürün görselleri ekleme

Şu an ürünler emoji ile gösteriliyor (gerçek fotoğraf yok). Gerçek ürün
fotoğrafı eklemek için, fotoğrafı şu isimle `public/images/products/`
klasörüne koymak yeterli — kod otomatik olarak fotoğrafı kullanır, emoji'ye
geri düşmez:

- `yogurt-1kg.jpg`
- `yogurt-200g.jpg`
- `meyveli-cilek.jpg`
- `meyveli-visne.jpg`
- `meyveli-muz.jpg`
- `meyveli-bal-ceviz.jpg`
- `meyveli-fistik.jpg`
- `sutlu-kahve.jpg`
- `su-500ml.jpg`

## Ödeme ve Excel kaydı nasıl çalışır

- Sepete ürün eklenir, adetler +/− ile değiştirilir, ürün ✕ ile çıkarılır.
- **Ödeme Alındı** butonuna basıldığında sipariş, cihazın hafızasına (o günün
  tarihine göre) kalıcı olarak kaydedilir. Hiçbir dosya indirilmez — cihaz
  kapansa/uygulama kapansa bile veri kaybolmaz, bir sonraki açılışta kaldığı
  yerden devam eder.
- Excel dosyası **istediğin an, istediğin kadar** indirilebilir: sağ üstteki
  ⬇️ ikonuyla veya Yönetim → Gün Özeti → **Excel'i İndir** ile. Her indirme,
  o ana kadarki günün TÜM siparişlerini içeren güncel bir `.xlsx` dosyasıdır
  (`Delimanda-Siparisler-YYYY-AA-GG.xlsx`).
- Dosyada 2 sekme var:
  - **Siparişler** (ana sekme): fiş fişe karşılaştırma için — her sipariş
    kendi bloğunda, kalemleri alt alta, altında "Sipariş Toplamı" satırı, en
    altta "GÜN TOPLAMI". Gün sonunda elindeki fişlerle sırayla eşleştirmen
    için bu sekmeyi kullan.
  - **Ürün Özeti**: gün boyunca hangi üründen kaç adet satıldığı, ürün bazlı
    toplamlar — stok/ciro değerlendirmesi için.
- iPad/Safari her indirmede aynı isimde yeni bir dosya oluşturabilir (ör.
  `(1)`, `(2)` gibi) — **en son indirdiğin dosya her zaman o ana kadarki TÜM
  siparişleri içerir**, eskilerini silebilirsin.
- Günü kapatınca (bir sonraki festival günü için) Yönetim → Gün Özeti →
  **Günü Sıfırla** ile temiz sayfa açabilirsin. Sıfırlamadan önce mutlaka
  Excel'i indirdiğinden emin ol.

## Neden internet/backend yok?

Festival ortamında wifi güvenilmez olabileceği için bilinçli olarak sunucu
gerektirmeyen bir mimari seçildi: tüm veri cihazda tutulur, ödeme kaydı ve
Excel üretimi tamamen cihaz üzerinde (offline) gerçekleşir. Tek gereksinim:
iPad'in kendisi.
