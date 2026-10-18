---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, oturum, yayin, parti, magaza]
source: oturum "tussle: durum ve sıradaki işler" (2026-10-18 akşam, mobil-playus)
---

# Oturum: Basket v3 birleşti, işaretler çizim oldu, lobi turu, parti kilidi düzeldi, Android 1.6 + iOS build 7

## Yapılanlar
- **Basket v3** (`basket-pull-range`) inceleme sonrası main'e (`1e2852d`, düzeltmeler `c05e072`); orta bulgu: bot puan tablosu iyimser, telefonda his testi bekliyor ([[2026-10-18-basket-v3-cekme-gucu-artti]]).
- **✓ ✗ ✕ çizim** (`381eb4f`): [[2026-10-18-oyunlarda-fontta-olmayan-isaret-cizilir]].
- **Parti lobisi / host paneli** (`231eb7d`): panelde yatay kayma, tek kişide pasif Başlat + gerekçe, katılan varken iptal onayı, hediye düğmesi, "UTC+3 · TR"; süre sınırında partide podyum üstüne oyun açılması düzeldi. Pasif Başlat bilerek sade (tasarım kuralı: yarı saydam ana düğme kirli görünür).
- **Global gece gözcüsü** yan oturumda kuruldu: [[2026-10-18-global-gece-gozcusu]]. İlk rapor: sunucu yedeğinin iCloud kopyası 18 Eki 12:30'da HATA.
- **Parti kilidi olayı** (20:16, parti 9): [[2026-10-18-canli-macta-yalniz-dogrulanmis-sonuc-surum-zorunlu]] (`624c6e0`); teşhis yolu [[2026-10-18-canli-db-okuma-docker-exec-node-sqlite]].
- **Yayın** `624c6e0`, OTA 0.20261018.1746 (oyun kodu `mini/games.js` OTA paketinde, iki platform da oyunları aktif paketten yükler; mağaza derlemesi gerekmez).
- **Mağaza:** Android 1.6 (vc 10) iç + kapalı test; iOS 1.1 build 7 dış test, beta incelemesi onaylandı (aynı sürüm adında yeni build hızlı geçti). Gömülü paket 0.20261018.1808.

## Yusuf'un kararları
- Geri uyum yok; eski tekrarlar/kayıtlar oynatılamaz olabilir, tutarsız eski satırlar bozuk sayılır.
- Doğrulanmamış skor sayılmaz.
- Basket dahil hepsi birlikte yayınlansın.

## Doğrulanmayanlar
- Parti düzeltmesi iPhone'da gerçek partide denenmedi; parti kartının yeni satırı ekran görüntüsüyle kontrol edilmedi.
- Mini motor paritesi emülatörde yeniden ölçülmedi.
- Play kapalı test incelemesinin bitip bitmediği API'den görünmüyor.

## Açık kalanlar
- Lobi önerileri Yusuf'ta: koltuk adları listesi (n/32 rozetine dokununca), dolu slotta geri bildirim, oyun havuzu özet satırı.
- `live.mismatch` / `live.invalid` reddi hâlâ süre sınırına kadar bekliyor.
- Tussle'da okunmamış 2 geri bildirim (#1 test, #2 "Denge kolay").
