---
title: Oyunda tek ölçü skor: kademe geri bildirimi ve zorluk etiketi yok
date: 2026-10-23
project: tussle
status: done
tags: [tussle, karar, oyun-ici, hud, ses]
source: oturum "tussle: ses seçimi ad ad, kademe rozeti kalkıyor" (2026-10-23)
---
# Karar
Oyun sırasında başarı/zorluk için ikinci bir gösterge yok: kademe/milestone geri bildirimi (level sesi, titreşim, kıvılcım, HUD altın rozeti "50 m", "Seri 10") ve zorluk/aşama etiketleri ("Aşama n", "Hız n", "Rüzgâr n", "Tur n", "n. piñata", "Hızlanıyor!" afişleri) kalktı. Başarı değerlendirmesi yalnız oyun sonunda, çıkartma yazısıyla ("Usta!", "Harika!").

# Neden
Yusuf: antrenman için kurulan başarı metreleri gereksiz; oyun içinde ses/rozet olmasın. Zorluk rampası (hızlanma) oyunun gerilimi olarak kalır ama sayıyla yazmak ikinci ölçü oluyor ve "oyunda tek ölçü" kuralına aykırı ([[2026-10-20-oyunda-tek-olcu-ikinci-birim-yok]]); oyuncu hızlandığını zaten görüyor.

# Kalanlar (bilinçli)
- Kombo çarpanı ×n (beat, target, bounce, stack): puanı doğrudan çarpıyor, göstermezsek +15/+30 sıçramaları açıklamasız kalır.
- n/toplam ilerleme sayacı (split, on-time, reflex, color-recall, fill-up): başarı değil kalan iş; süre çubuğu bunu söylemiyor.
- Tur/seviye geçişi `level` sesleri (split, lights, right-door, keep-up, balance, bounce, knife-toss, spiral, color-recall, crack-it): evre değişimini duyurur; ileride `level` adı paletten çıkıp bilgi verenler `pop`, kutlama olanlar sessiz olabilir (önerildi, karar yok).
- Skorun kendisi metre ise (trace, jetpack, hop) HUD'da kalır.

# Reddedilenler
- Sim'lerden `EV_SHELL_CHEER` yayımını silmek: 40 dosya, replay riski; kabuk olayı yok sayıyor, şablon artık yaymıyor.
- n/toplam sayaçlarını da kaldırmak: Yusuf "önerdiğin gibi" dedi, yalnız A grubu.

# Uygulama
75e8c14 (kademe), 9e86378 (etiketler); yalnız view, i18n, belgeler. GAME-CONTRACT güncel. Yayın: sunucu 9e86378, OTA 0.20261023.1425.
