---
type: lesson
project: kul-tahti
date: 2026-10-02
status: active
tags: [orkestrasyon, test, tarayici, webgl]
source: oturum 2026-10-02 (web-boss-teaser ilk sürüm)
---

# Ders: Paralel ajanlar aynı tarayıcı panelini paylaşırken her modül stub'la, kendi sekmesinde ve step() ile test edilmeli

## Ne oldu
Dört ajan aynı uygulama içi tarayıcı panelinde aynı anda kendi modülünü test etti. Panel gizliyken rAF neredeyse durdu (temel durum: [[2026-10-02-gizli-onizleme-panelinde-raf-durur]]). Ayrıca CSS geçişleri de ilerlemedi, ölüm/zafer ekranları ekran görüntüsünde yarım kaldı. Koordinatör bir kez farkında olmadan başka bir ajanın sekmesinde JS çalıştırdı. Bir ajan kendi sekmesini kapatınca panel tamamen kapandı.

## Ne işe yaradı
- İskelete baştan `__game.step(n, dt)` ve sanal girdi (`input.virtual.move`, `input.tap('attack')`) koymak. Sanal girdi gerçek girdi modülünün `update()` adımından geçiyor, yani test girdi yolunu atlamıyor (karşı örnek: [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]]).
- Her modül için çalışan stub ve `?use=<modül>` / `?stub=<modül>` bayrakları: ajanlar birbirinin yarım kodundan etkilenmeden test etti.
- Ajan kuralı: kendi sekmeni `tabs_create` ile aç, başkasının sekmesine dokunma, pencereyi yeniden boyutlandırma, sunucuyu başlatma/durdurma.

## Uygula
- Paralel ajanlı bir web projesinde iskelete deterministik `step()`, sanal girdi ve stub'ları ilk commit'te koy.
- Koordinatör de JS çalıştırırken `tabId`'yi açıkça ver.
- Panel kapandıysa `preview_start` ile yeniden aç.

## İlgili
- [[10-Projects/kul-tahti/_overview|Kül Tahtı]]
