---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, tema, gorsel, arayuz, karar]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# Karar: Tema orta yol: kartlarda 2px kontur + ofset gölge, kontroller düz, ana renk yumuşak pembe

## Bağlam
Yusuf "kenarlık ve gölgeleri azalt, çok cartoon" dedi. Ajan her şeyi düzleştirdi (`4a43fe8`): şeker deseni gitti, koyu tema nötr gri #121417, ana renk turkuaz, 1px çizgi, yumuşak gölge. Yusuf eski ve yeniyi karşılaştırınca Claude'un görüşü: eski daha karakterli, yeni "şablon" gibi duruyor.

## Karar
Orta yol (`889735d`):
- Kartlar, sezon bandı, alt sayfalar ve birincil düğme: 2px `--card-outline` + 2px ofset gölge (eskisi 3px).
- Düğmeler, balonlar, çipler, girdiler düz.
- Beyaz temada şeker deseni yok; koyu tema nötr koyu gri (mor gitti).
- Ana renk yumuşak canlı pembe: gündüz #d0368a (beyaz yazı 4,6:1), gece #ff7ac0 (koyu yazı #2a0f1e, 7,4:1); `--accent` gündüz #c7307f; çip vurgu #ffc2e0.
- Logo (üçlü blok) magentası olduğu gibi kaldı. Sarı aynı token (#ffd24a); simülatörde farklı görünmesi P3 renk alanı + kontur yokluğundandı.
- `docs/VISUAL.md` güncellendi.
- Ek (küçük): günlük sıralama listesinde (topRow/todayList, `formatEntryValue`) skor birimsiz; aria etiketi birimi tutuyor. Sonuç kartı, oyun ekranı ve akış satırlarında birim kalıyor.

## Neden
- Kontur + ofset gölge kartlara kimlik veriyor; kontrolleri düz tutmak "cartoon" gürültüsünü kesiyor.
- Pembe logoyla uyumlu ve ayırt edici; yumuşatılmış tonlar iki temada kontrast eşiğini geçiyor.
- Sıralama listesinde birim tekrarı satırı kalabalıklaştırıyordu; bağlam zaten belli.

## Reddedilen alternatifler
- Tam düz (`4a43fe8`): karakter kaybı, şablon görünümü.
- Eskiye dönüş (3px kontur, şeker deseni): gürültü, Yusuf'un şikâyeti duruyor.
- Turkuaz ana renk: ayırt edici değil, logo pembesiyle kavga ediyor.
- Eski neon magenta #ff3fd0: fazla şeker.

## Sonuçlar / riskler
- Gerçek telefonda görülmedi (gece birincil düğmenin gri konturu, ⚔ turuncu kaldı).
- Ders: büyük görsel değişiklikte önce eski/yeni ekran görüntüsüyle sor ([[2026-10-15-tema-degisikligini-once-goster]]).

## İlgili
- Arayüz dilini kısmen değiştirdi: [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]], [[2026-10-12-oyun-sahnesi-sade]]
- [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]]
