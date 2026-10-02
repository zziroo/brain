---
type: lesson
project: kul-tahti
date: 2026-10-02
status: active
tags: [orkestrasyon, test, tarayici, webgl]
source: oturum 2026-10-02 (web-boss-teaser ilk sürüm)
---

# Ders: Paylaşılan tarayıcı panelinde WebGL oyunu, gizli sekmede requestAnimationFrame durduğu için kareleri elle ilerletip test edilmeli

## Ne oldu
Uygulama içi tarayıcı paneli gizliyken (ya da sekme arka plandayken) `requestAnimationFrame` duruyor; oyun ilerlemiyor, ekran görüntüleri bayat kalıyor, CSS geçişleri de ilerlemiyor (ekranlar yarım görünüyor). Dört paralel ajan aynı paneli paylaştı.

## Ne işe yaradı
- Oyuna `__game.step(n, dt)` (n kareyi senkron çalıştır) ve scriptle girdi (`input.virtual.move`, `input.tap('attack')`) eklemek. Böylece giriş sahnesi, savaş ve ölüm akışları görünür pencere olmadan test edildi.
- Her modül için stub ve `?use=<modül>` bayrağı: ajanlar birbirinin yarım kodundan etkilenmeden test etti.
- Ajanlara "kendi sekmeni aç, başkasınınkine dokunma, pencereyi yeniden boyutlandırma" kuralı.

## Uygula
- Gerçek zamanlı bir web projesinde ilk iskelete deterministik `step()` ve sanal girdi kancası koy.
- CSS animasyonlu ekranları ekran görüntüsüyle doğrularken panel gizliyse geçişlerin bitmemiş olabileceğini hesaba kat.
- Bir ajan kendi sekmesini kapatınca panel tamamen kapanabiliyor; sonrasında `preview_start` ile yeniden aç.

## İlgili
- [[_overview]]
