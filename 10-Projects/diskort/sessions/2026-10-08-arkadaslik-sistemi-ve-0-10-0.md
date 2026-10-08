---
type: session
project: diskort
date: 2026-10-08
status: done
tags: [diskort, session, arkadaslik, yayin, release]
source: Claude Code oturumu 2026-10-08
---

# 2026-10-08: Arkadaşlık sistemi, donanım simulcast, 720p30, 0.10.0

- Yusuf: 0.9.6 DM araması sorunsuz; telefonda yayın izlerken FPS düşüktü.
- Geri bildirim #32/#33 → [[arkadaslik-sistemi]] (şema 26). 5 ajan: sunucu+shared+client-core, masaüstü UI, mobil UI, 3 inceleme, 1 düzeltme. Orta bulgular düzeltildi (genel 403, bildirim sıklığı, çift tıklama).
- Ekran paylaşımı: donanım H.264 kodlayıcıda simulcast (alt katman 720p30 / 360p30), `adaptiveStream pixelDensity 2`; yazılım kodlayıcıda eski davranış. Yeni ön ayar 720p30 · 3 Mbps. Canlıda doğrulanacak: iki katman da GPU'da mı (bağlantı panelinde OpenH264 geçmemeli).
- Hatalar: [[electron-net-fetch-rangeerror]], `killed` fırtınası bastırma.
- Sunucu 56d1c8a deploy edildi (yedek 2026-10-08_1819, şema 26, bütünlük ok). Sürüm 0.10.0 etiketlendi; macOS/iOS işleri runner kapasitesi yüzünden iptal oldu, yeniden kuyruklandı ([[github-macos-runner-kapasitesi]]).
- Rutinler 10-05'ten beri oturum açmıyor; Yusuf günlüğe çevirecek.
