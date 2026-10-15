---
type: decision
project: tussle
date: 2026-10-15
status: unverified
tags: [tussle, denge, oyun, karar]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# Karar: Yusuf'un telefon geri bildirimiyle 19 oyunun dengesi ve hissi değişti

## Bağlam
Yusuf telefonda 25 oyunu oynayıp madde madde geri bildirim verdi. 3'ü silindi ([[2026-10-15-bop-pop-or-stop-catch-silindi]]); 19'u dengelendi ya da görünümü düzeltildi. Kurallar değişen oyunların sürümü arttı. Bot ölçümleri ajan raporlarında.

## Karar
- **Reflex:** 5 tur (v4).
- **Stack:** kenarda sekme, 6 kat plato, en çok hız 1.5 (v5).
- **Knife Toss:** 11° çarpışma, çark 0.35 tur/s, ×1.08 (v2); 40 bıçak kazanımı pratikte yok, skor oyunu olarak kaldı.
- **Double Tap:** zor başlangıç, 1.8→3 spawn/s (v4).
- **Hop:** altın dönmez ve güvenli yol dışında, rampa 40 sn, 11 m/s (v3).
- **Bounce:** solan renk, seyrek, 3 satır, düz zemin (sürüm yok).
- **Road Rush:** ilk 10–15 sn sakin (v3).
- **Chain:** yanlış dokunuş −3 sn, tahtalar 6/9/12/16/20/22, tipik 40 sn (v3).
- **Brake:** 7 tur, çizgiyi geçmek o tura 0 (v5, en çok 700).
- **Cups:** 3→4→5 bardak, hamle 2–8 artan (v3).
- **Balance:** rüzgâr tavanlı (windCap 16e-5, rampSec 40), zorluk gust/wobble ile; CAP_SEC 150→90 (koordinatör kararı, süre kuralı) (v3).
- **Treasure:** küreksiz, 60 sn + iade, yanlış kazı −1 sn, bulunca 300−50d puan (v3).
- **Piñata:** vuruş hissi (hit-stop 45/95 ms, squash, flash, spike, haptik; yalnız görünüm).
- **Crack It:** 12 tahmin (v3).
- **How Many:** tek tür, 7 adet kademesi, daha sık kümeler (v3).
- **Trace:** yol boyunca renk geçişi (görünüm).
- **Fill Up:** 3D bardak + koyu temada hedef bandı (görünüm).
- **Beat:** 4 yol, Good penceresi +1 tick (v3; kapak da 4 yol).
- **Flutter:** rampa 35 sn, daha dar başlangıç (v2).

## Neden
Yusuf'un gerçek cihaz hissi bot ölçümünden önce gelir; amaç basit, anlaşılır ve "bir tur daha" ([[2026-10-12-sure-baskisi-yerine-tur-penceresi]], [[2026-10-13-sure-modeli-taban-50-60-bonus-sert-tavan]]).

## Reddedilen alternatifler
- Balance'ta CAP_SEC 150: süre modelinin 90 sn sert tavanını aşıyordu.
- Knife Toss'u "40 bıçak = kazanç" oyununa çevirmek: pratikte ulaşılamıyor, skor oyunu kaldı.

## Sonuçlar / riskler
- **Hiçbiri telefonda doğrulanmadı** (status unverified): Telefon turu 2'de bakılacak.
- Eski denemeler yeni kuralla yeniden puanlanmadı (sürüm arttı).

## İlgili
- [[2026-10-13-once-magaza-sonra-denge]]
- [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]]
