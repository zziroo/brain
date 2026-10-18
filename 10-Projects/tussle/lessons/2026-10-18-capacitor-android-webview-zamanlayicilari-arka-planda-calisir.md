---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, capacitor, yasam-dongusu, mini-motor]
source: oturum 2026-10-18 "tussle: mini motor faz 2 (oyun ekranı → yerel motor)"
---

# Ders: Capacitor Android'de WebView zamanlayıcıları arka planda da çalışır; yerel ve JS duraklatma yarışa girer

- Capacitor `keepRunning` varsayılanı açık. `Bridge.onPause` ne `pauseTimers()` ne `WebView.onPause()` çağırır, yani JS `setTimeout` arka planda da çalışır (Chromium yalnız yavaşlatır).
- Faz 2 inceleme bulgusu (yüksek): "Devam et" geri sayımı sürerken ana ekrana çıkılırsa geri sayım arka planda biter ve JS `resume()` çağırır. Yerel taraf etkinlik duraklı olduğu için resume'u yutuyordu. Dönüşte koşu donuktu, kart yoktu; sayılan hakta X da gizli olduğundan çıkış yoktu.
- **Kural:** yerel tarafa gelen bir "devam" isteği etkinlik duraklıyken gelirse `paused` olayını yeniden gönder (JS kartı tekrar gösterir). Yerel/JS sınırındaki her durum geçişinde "uygulama arka plandayken gelirse" durumunu düşün. iOS'ta (Faz 4) WKWebView zamanlayıcıları dursa da aynı kural konmalı.
- Bağlantılı: [[2026-10-18-yerel-oyun-yuzeyi-webview-arkasinda-arayuz-dom-da]].
