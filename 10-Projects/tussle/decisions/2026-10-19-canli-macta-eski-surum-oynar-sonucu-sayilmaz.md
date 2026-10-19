---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, canli-mac, parti, surum]
source: oturum "tussle: kalan işler, tema ve canlı maç" (2026-10-19 öğle), commit `705c4a2`
---

# Karar: Canlı maçta eski sürüm / doğrulanamayan sonuç oyuncuyu atmaz, yalnız o sonuç sayılmaz

## Bağlam
[[2026-10-18-canli-macta-yalniz-dogrulanmis-sonuc-surum-zorunlu]] eski sürümlü istemciyi koşudan önce durduruyor, sunucu da eski sürümlü sonucu gönderen oyuncuyu hemen düşürüyordu (`forfeitOut`). `live.mismatch` / `live.invalid` ise süre sınırına kadar bekletiyordu.

## Karar
Yusuf (19 Eki): "canlı maçtan atılmasın, oynasın, sonra sonucu sayılmasın".
- Eski sürüm, `live.mismatch`, `live.invalid`: slot hemen NOT_COUNTED (`match_players.forfeit = 2`); puan yok, sıra yok, 0 parti puanı, asla kazanamaz. Maç süre sınırını beklemeden biter, partide oyuncu sonraki oyunlara devam eder; sonraki doğrulanan oyunu normal sayılır.
- Çok denemeli parti oyununda daha önce doğrulanmış koşu varsa o en iyi sayılır (canlı bellekte olmasa da).
- İstemci sürüm farkında koşuyu engellemez: koşu öncesi kısa uyarı ("sonucun sayılmayacak"), sonuç kartında "Sonucun sayılmadı". Oyun uygulamada hiç yoksa güncelleme ekranı kalır.
- Maç sırasında sunucu sürümü değişirse `live.server_version`, kimse suçlanmaz.
- Sabit oyunlu kapışma aç/katıl hâlâ güncel `gameVersion` ister: oynasa da sayılmayacağı kesin olan bire bire baştan girmesin.

## Neden
OTA yeni paketi yalnız soğuk açılışta devreye alır; yayından sonraki partide eski paketli arkadaşı atmak partiyi bozuyordu. Güvenlik özelliği (doğrulanmamış skor sıralanmaz) korunuyor.

## Reddedilen alternatifler
- Eski hâl (hemen düşme): partiden kopma, kötü his.
- Süre sınırına kadar bekletmek: herkes boşuna bekliyordu.
- Sabit kapışmada da girişe izin vermek: kesin kaybedilen 1v1, sade değil.

## İlgili
[[2026-10-18-canli-macta-yalniz-dogrulanmis-sonuc-surum-zorunlu]] (kısmen yerine geçer)
