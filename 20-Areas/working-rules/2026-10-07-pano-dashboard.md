---
type: decision
project: genel
date: 2026-10-07
status: active
tags: [arac, rapor, pano, token]
source: ZZ oturumu 9f1a0281 (pano aracı yazımı)
---

# Konuşma ve token panosu tek dosyalık yerel HTML olarak, ham tablolardan tarayıcıda hesaplanarak üretilir

Yusuf "istediğimde token raporu, konuşmalar, akışlar, oturumların ilerleyişi; her detay, güzel animasyon" istedi. Sonuç: `~/.claude/orchestration-report/pano.mjs` + `pano/sablon.html`, `/pano` komutu. Kullanım [[araclar-ve-raporlar]]'da.

## Kararlar ve neden
- **Toplayıcı ham tablolar üretir, grafikleri arayüz hesaplar.** Saat × oturum × model kovaları (`kovalar`, `aracKovalari`) ve oturum/ajan listeleri gömülür. Böylece tarih, kaynak, proje, model ve zamanlanmış görev filtreleri bütün bölümlerde aynı anda çalışır. Oturum düzeyinde gelen sayaçlar (aktif süre, dosyalar, komutlar, efor) aralığa bölünemez; arayüz bunu kartta yazar.
- **Tek dosya, dış bağımlılık yok, CSP'li.** `file://` ile çevrimdışı açılır. İçeriği transkriptten geldiği için her metin `textContent` ile basılır.
- **Toplamlar `usage.mjs` ile birebir eşit olmalı.** Bu, SEMA.md'deki doğrulama kuralıdır. Çatallanan/devam ettirilen oturumlarda kopyalanan kayıtlar tek oturuma atanır; toplam yine aynı kalır.
- **Önbellek** (`out/.pano-onbellek.json`, dosya boyutu + mtime) ilk taramayı ~5 sn'den sonrakilerde <1 sn'ye indirir. `redact` değişince kendiliğinden geçersizleşir.
- **Zamanlanmış görevler ayrı işaretlenir** (`zamanli`). Neden: 283 oturumun 186'sı Diskort gözcü/geri bildirim görevleriydi (neredeyse istemsiz, $59). İşaretlenmeseydi oturum sayılarını boğardı.
- **Yerel kalır.** İstem metinleri içerdiği için Artifact olarak yayınlanmaz. Paylaşılacaksa `--metinsiz` ile üretilip HTML'in tamamı okunur.

## Reddedilen alternatifler
- **Artifact olarak yayınlamak:** özel veri içerir, her güncellemede yeniden yayın gerekir.
- **CDN grafik kütüphanesi (Chart.js, D3):** çevrimdışı açılmaz, CSP gevşer. Animasyonlar elle yazılmış SVG/Canvas ile yeterli oldu.
- **Grafikleri toplayıcıda önceden hesaplamak:** her filtre için yeniden üretim gerekirdi.
- **`usage.mjs`/`report.mjs`'i hemen `ortak.mjs`'e taşımak:** yerinde bırakıldı, risk azaltıldı. `ortak.mjs` şimdilik kopya; fiyat tablosu değişirse üçü elle eşitlenir. Sonra birleştirilebilir.

## Açık noktalar
- `ortak.mjs` ile `usage.mjs` ve `report.mjs` arasında fiyat tablosu ve yardımcılar kopya halinde.
- `report.mjs`'teki `PRICES` tablosu eski (yalnız iki model).
