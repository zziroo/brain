---
type: session
project: tussle
date: 2026-10-22
status: active
tags: [tussle, oturum, denge, oyun, animasyon]
source: oturum 2026-10-22 (mobil-playus: Yusuf'un denge geri bildirimi)
---

# Oturum: Chain tek süre, Four Arrows süreye bağlı, Double Tap kalktı

## Yapılanlar
- **Chain v7:** Sıradaki sayı amber + parlama ile gösteriliyordu, aramanın anlamı kalmamıştı. Basılmamış her şeker kendi şeker renginde (7 renk, adım 3, tahtaya göre başlangıç; nane basılanlara ayrıldı), "Sıra: N" hapı nötr (amber hap amber şekeri gösteriyordu). Tahta başına süre + devir yerine Target gibi tek `BonusClock`: taban 12 sn (`baseSec`), doğru sayı +0,75 sn (90 sn'de yarıya iner), yanlış −2 sn, tavan 90 sn. Bot ortancaları: yavaş 21, insan 31, hızlı 52 sn. 20 sn taban önerilmişti; yavaş oyuncu 30 sn altına inemediği için 12'ye çekildi (Yusuf'a söylendi, isterse 20).
- **Four Arrows v5:** canlı ortanca 17 sn'ydi (Target ~43). Sebep: rampa kaydırma sayısına bağlıydı, hızlı oynayan erken boğuluyordu. Rampa artık oyun süresine bağlı (smoothstep 4,0 → 2,0 sn @38 sn → 1,4 sn @55 sn), kısa dolumlar 15. sn'den. 0,5 sn/kaydırma ortanca 32 sn. Yan etki: aynı hızda skor ~2 kat, eski rekorlarla kıyas bozuk.
- **Double Tap kaldırıldı** (Target'a çok benziyordu), swing gibi: registry, kapak, ikon, i18n, galeri, tanıtım satırı (→ lights), testler; `cift → double-tap` eski kimlik eşlemesi duruyor.
- **Oyuncu kartında avatar büyümesi kalktı** (üst üste sayfa geri çekilmesiyle birlikte fazla animasyon). Ana ekran avatarı → kendi profil büyümesi Yusuf'un isteğiyle kaldı ("oraya özel").
- İnceleme: bulgu yok. Yayın e9d5922 (OTA 0.20261021.2320), sağlık ok.

## Doğrulanmayanlar
- Telefonda denenmedi: Chain yeni süre hissi ve renkler, Four Arrows yeni uzunluk, oyuncu kartı açılışı.
- Gerçek oyuncu süreleri: birkaç gün sonra `feedback-cli practice --game chain` / `four-arrows` ile v7 / v5 ortancasına bak (hedef 25–40 sn).

## Kararlar
- [[2026-10-22-chain-tek-sure-renkli-sayilar]]
- [[2026-10-22-four-arrows-rampa-oyun-suresine-bagli]]
- [[2026-10-22-double-tap-kaldirildi]]
- [[2026-10-22-oyuncu-kartinda-avatar-buyumesi-yok]]
