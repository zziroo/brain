---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, denge, rampa, tempo]
source: oturum "tussle: kalan işler, tema ve canlı maç" (2026-10-19 öğleden sonra), Şerit v5 `bef09c5`
---

# Karar: Sonsuz oyunlarda ortak tempo hedefi (referans: Playus Lane Rush videosu)

## Bağlam
Yusuf bir referans oyun videosu attı (19 Eki): metre sayacından ölçüm, hız düz artıyor, ~22 sn'de ×2,3, trafik yoğunluğu da artıyor, koşu ~24 sn'de bitiyor. "Hızlanma biraz çok hızlı ama bu seviyede bir şey istiyorum, genel oyunlarımızda." Yalnız tempo alınır, görsel benzetilmez.

## Karar
- İlk 3–4 sn sakin; **~25 sn'de ×2**; **sert sınır ~45–50 sn**; sonrasında plato yok: hız tepki sınırında sabit, zorluk yoğunlukla yavaş artar (adil kurallar korunur).
- **Hız tavanı var** (insan tepki ~0,25–0,3 sn; ötesi şans olur). **Süre tavanı 90 sn** yalnız güvenlik ağı (canlı maç/parti beklemesin); rampa doğruysa neredeyse kimse ulaşmaz.
- Ölçüm: Antrenman insan koşuları, sürüm bazlı; hedef medyan 25–40 sn ([[2026-10-19-denge-insan-kosulariyla-surum-bazli-olculur]]).
- İlk uygulama Şerit v5 (`bef09c5`): rampSec 50→30, ×2,04 @25 sn, sınır ~50 sn, sonra 45 sn yoğunluk artışı; bot ortalama 31→23 sn.

## Tarama (19 Eki, formüllerden; insan medyanıyla çelişebilir)
- **Rampa yavaş:** Sekme (×2 @65 sn, accel 4→8), Jetpack (hız yalnız ×1,29, sonra 85 sn düz), Dörtok ve Zincir (pencere insanı sıkıştırmıyor), Diken (×2 @~41), Kule (×2 @~40, sınır ~70), Yılan (×2=sınır @~65), Çizgi (×2 @18 iyi ama sonra düzleşiyor; medyan 61 sn, %33 tavanda).
- **Rampa iyi, uzun düzlük:** Zıpla, Okduvar, Karşıya (sınırdan sonra yavaş artış eklenmeli).
- **Rampa değil başlangıç zor (medyan 6–10 sn):** Köprü, Kargo, Bambu, Ritim, Yörünge, Katane.
- **Süre tavanı >90 sn:** Sekme, Denge, Kule, Renk, Matematik, Onluk, Havada 180; Ritim 150; Jetpack, Karşıya, Zıpla, Kapı, Kargo, Okduvar, Zincir 120 → 90'a indirme önerisi (Denge 180 bilinçli seçilmişti, [[2026-10-18-denge-v4-rampa-tavan-180]]; yeniden sor).
- Çok hızlı olan yok (Spiral'in erimesi biraz sert).
- Sabit uzunluklu/bonus saatli (basket, cark, cift, hedef, isik, fren, jole...) bu kurala girmez; Hedef/Çift/Basket uzunluğu ayrı konu.

## Uygulama (19 Eki, `fb9f2dd`, yayında `fc70f52`)
- 33 oyun yeni sürüme geçti; her oyunun eski/yeni tablosu oyunun sim.ts başlık paragrafında ve oturum notunda [[2026-10-19-tussle-denge-partisi-oda-kilidi]].
- İnsan verisi hedefteyse bilerek yumuşak kalındı (Snake, Bounce, Jetpack, Zigzag, Flutter). Başlangıcı zor olanlarda (Bridge, Sort It, Chop, Beat, Swing, How Many) açılış yumuşadı; Swing'e görünüm ipucu "Dokun: yakala!" (`b84ad84`). Süreli oyunlarda (Target, Double Tap) isabet başına süre zamanla azalır (×15/(15+t)), taban 30 sn; bu 13 Eki "taban 50–60 sn" kuralını bilerek deler.
- Yeni insan medyanları bot tahmini; yayından sonra sürüm bazlı ölçülecek. Yusuf: "beğenilmezse geri alırız ya da üzerinden devam ederiz" → `git revert fb9f2dd` (Lane Dash ayrı `bef09c5`).

## Reddedilen alternatifler
- Referansın birebir temposu (×2 @20 sn): Yusuf "biraz yumuşak" dedi.
- Hız tavanı olmadan sonsuz hızlanma: tepki sınırını aşınca haksız ölüm.
- Süre tavanını kaldırmak: canlı maç/parti en uzun oyuncuyu bekler.

## İlgili
[[2026-10-19-serit-ve-bardak-90-sn-tavan]], [[2026-10-09-oyun-uretim-kiti-ve-partiler]] (yeni denge değişiklikleri partiyle çıkar)
