---
type: decision
project: tussle
date: 2026-10-22
status: active
tags: [tussle, oyun-tasarimi, chain, denge]
source: "oturum 2026-10-22 (mobil-playus: denge geri bildirimi); oturum notu [[2026-10-22-tussle-chain-tek-sure-four-arrows-double-tap-kalkti]]"
---

# Karar: Chain v7 tek toplam süre, her sayı ayrı renk, sıra hapı nötr

## Bağlam
Yusuf: sıradaki sayı ayrı renk (amber + parlama) aldığı için aramanın anlamı kalmamış; Target gibi tek süre olsun, doğru süre kazandırsın, yanlış süre yesin.

## Karar
- Tahta başına pencere + devir (v6) kalktı; Target'taki gibi tek `BonusClock`: taban 12 sn (`baseSec`), doğru sayı +0,75 sn (oyunun 90. sn'sinde yarıya iner), yanlış −2 sn, tavan 90 sn. Tahtalar 6, 8 … 22 büyümeye devam.
- Basılmamış her şeker kendi şeker renginde: 7 renk (nane basılanlara ayrıldı), adım 3, tahtaya göre başlangıç; renk sırayı ele vermez. "Sıra: N" hapı nötr.

## Neden
- Arama oyunun özü; tek parlayan şeker onu öldürüyordu. Renkler görsel turdan önce de vardı, Yusuf canlılığı istedi.
- Amber hap, amber gelen şekeri işaret ediyordu (tarayıcıda görüldü).
- Bot ortancaları: yavaş 21, insan 31, hızlı 52 sn (hedef bant 25–40).

## Reddedilen alternatifler
- Taban 20 sn: en yavaş oyuncu bile ~30 sn oynuyordu; 12 seçildi (Yusuf isterse `baseSec` ile 20).
- Hepsi aynı krem renk (ilk deneme): Yusuf renkleri geri istedi.
- Hash ile rastgele renk: 6 şekerde 3 renge düştü, dağılım kötü.

## Sonuçlar / riskler
- Gerçek oyuncu süresi doğrulanmadı (`feedback-cli practice --game chain`).

## İlgili
- [[2026-10-21-chain-sure-devri-kademesiz-zorluk]] (yerine geçti)
