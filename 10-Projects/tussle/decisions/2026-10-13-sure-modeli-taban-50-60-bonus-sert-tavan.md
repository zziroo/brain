---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, oyun-tasarimi, denge, sure]
source: oturum 2026-10-13 (mobil-playus: eleme, süre modeli, Parti I)
---

# Karar: Süreli oyunlarda taban 50–60 sn, iyi oyun süre ya da adet kazandırır, sert tavan 90 sn

## Bağlam
Yusuf: "30 sn çok az; ilk oyunların 50–60 sn + iyi oynayan üstüne çıkabiliyordu, o sistem iyiydi." Bonus süreye karşı endişesi: sonsuza kadar oynatmasın, yorucu olmasın. Pilot yerine komple uygulama istedi.

## Karar
Oyun oyun dört kalıp (yayın `ef42a91` A, B merge + `2609905`):
- **A süre** (`BonusClock`, taban 50–60 sn, başarı +sn, tavan 90 sn): Çift Dokun (+1/+2 sn grup, v3), Işık Sırası (+3 sn tur, 20 tur, v4), Çark (Dur'da çeviriş başına +1 sn, en çok +5, v2).
- **A adet** (`EV_EXTRA`): Bardak Doldur 10→16 (Tam +1, v2), Fırlat 10→16 (ortadan +1, v2), Balon 12→16 (mükemmel bank +1, v2), Refleks 8 tur (v3), Tam Zamanı 7 tur (v3), Hazine 20 kürek/90 sn (v2).
- **B sonsuz** (teknik tavan 120 sn, süre çubuğu yok): Karşıya Geç (süre kalktı, v2), Zıpla (v2).
- **Tur penceresi**: Jöle Kes (pencere 6→2,5 sn, yükselen eşik 600+20/tur, v2), Renk Hafızası (bakış 2→0,6 sn, cevap 8→3 sn, PASS 650, skor toplam 'puan', v2).
Kalan ~30 oyun zaten sonsuz ya da tur pencereli; değişmedi.

Teknik: `src/shared/sim-kit.ts` `BonusClock` (`left = min(left+n, base, cap−elapsed)`, çubuk `left/base`); `EV_SHELL_TIME` + kabukta `timePop` "+N sn"; canlı maç deadline'ı artık `maxTicks/60 + 60 sn` (`src/server/live.ts`), Parti Gecesi aynı fonksiyonu kullanır (eski `2*typicalSec+30` kısalığı da çözüldü).

## Neden
Kısa sabit süre acele hissi veriyordu; taban rahat, beceri ödüllü, tavan yorgunluğu ve günlük süreyi sınırlıyor.

## Reddedilen alternatifler
- Sınırsız bonus süre: Yusuf'un "yorucu olmasın" endişesi; sert tavan 90 sn.
- Önce 3–4 oyunla pilot: Yusuf komple istedi.
- Çark'ta Dur'a sabit +3 sn: sık Dur'u ödüllendiriyordu; bonus çeviriş sayısıyla (riskle) ölçekleniyor.

## Sonuçlar / riskler
Hepsi bot ölçümü, telefonda hissedilmedi. Sürüm atlayan 13 oyunda eski denemeler yeniden puanlanmadı.

## İlgili
- [[2026-10-12-sure-baskisi-yerine-tur-penceresi]]
- [[2026-10-09-sure-siniri-yerine-sonsuz-hizlanan]]
- [[2026-10-13-parti-i-ve-sure-modeli-dersleri]]
