---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, oyun-tasarimi, swing]
source: Claude Code oturumu "tussle: geri bildirim turu" (geri bildirim #16)
---

# Swing v5: gerçek sarkaç, tek dokunuş = bırak, ip kendiliğinden tutunur

**Karar:** Swing baştan yazıldı (sim v5). Tek karar kaldı: ne zaman bırak. Havada dokunuşun işi yok; ip, uçuşta bir çivinin yakalama yarıçapına (0,14) girince kendiliğinden tutunur (öndeki 3 çividen en yakını). Gerçek sarkaç: genlik ≤ 0,95 (ip yatayı geçmez, çivinin üstüne çıkmaz), gevşek/gergin ip, hafif pompa yalnız sönümü dengeler, bırakma hızı ipe dik × 1,1 (eski 1,45), tek yerçekimi (eski: ilk 8 çivide ×0,4→0,9). Açılış kolaylığı ağır çekimle değil yakın/alçak ilk çivilerle. Yeni zikzak yerleşim; metre ölçeği 10 → 20 (iyi koşu ~15–30 m, eski 20–100+; eski rekorlarla karşılaştırılamaz).

**Neden:** Yusuf: "mekanik olarak baştan biraz yanlış gibi". Koddan dört kaynak: değişen yerçekimi, ×1,45 fırlama, katı çubuk gibi yatayın üstüne çıkan ip, bir tuşun iki işi. Antrenman koşuları "iyi" botun üstündeydi; sorun zorluk değil histi. Gerçek sarkaçta bırakma anı ile uçuş yayı gözün beklediğiyle örtüşür.

**Reddedilen alternatifler:**
- Basılı tut = tutun, bırak = uç (Stickman Hook): en temiz ama yeniden yazım + yeniden denge; ileride istenirse.
- Yalnız fırlama/yerçekimi sabitlerini düzeltip iki dokunuşu bırakmak: "bir tuşun iki işi" kalır.

**Botlar (v4 → v5, 60 tohum, metre p50 / süre):** novice 7→4 m, casual 13→8 m / 23,6 sn, average 20→13 m / 33 sn, good 30→16 m / 40 sn. typicalSec 25 kaldı. Sticker: Keskin 12 m, Usta 20 m. `gapStart` parametresi kaldırıldı, yerçekimi varsayılanı 6 → 4 (3–7).

**Teyit bekleyen:** telefonda his (çivi 0–6'da şeker bir sonraki çiviye neredeyse değip bırakılana kadar tutunmuyor: tasarım gereği). GC testi 2M adımda (4M tam koşuda 20 sn'yi aşıyordu; adım maliyeti aynı, 30 ns).
