---
type: decision
project: diskort
date: 2026-10-01
status: active
tags: [diskort, yayin, ses, windows, ertelendi]
source: Claude Code oturumu 2026-10-01 (Sonar yankısı tartışması)
---

# Karar: Yayın sesine dokunulmadı; uygulamaya özel yayın sesi ayrı iş olarak bekliyor

## Bağlam
Pencere de ekran da paylaşılsa yayına Diskort hariç tüm sistem sesi gidiyor (`main/index.ts` içinde `audio: 'loopback'`, renderer'da `restrictOwnAudio`). Electron'da "yalnızca şu uygulamanın sesi" seçeneği yok. SteelSeries Sonar kullananlarda kişinin kendi sesi yayına karışıyor ([[sonar-yayin-sesine-kendi-sesini-katar]]).

## Karar
Yusuf'un kararı: yayın sesiyle ilgili şimdilik hiçbir değişiklik yapılmayacak; Sonar uyarısı da eklenmedi. Pencere paylaşımında yalnızca o uygulamanın sesini yakalamak ileride ayrı bir iş olarak planlanabilir. Yöntem: Windows 10 2004 ve sonrasındaki process loopback API'si, include modunda, süreç ağacıyla birlikte.

## Neden
- Sorunun kaynağı kullanıcının Sonar kurulumu.
- Uygulamaya özel ses orta-büyük bir iş: tahminen 1–2 günlük ajan işi ve ardından gerçek yayın testi.
- Yerel (native) modül gerekiyor ve makinede C++ derleme araçları yok. CI'da derlemek ya da hazır derlenmiş bir paket bulmak gerekir.

## Reddedilen alternatifler
- Sonar ya da başka bir sanal çıkış cihazı algılanınca uyarı göstermek: Yusuf istemedi.
- `restrictOwnAudio` doğrulanamıyorsa sistem sesini kapatmak: bazı makinelerde yayın sesini tamamen kapatabilirdi.

## Sonuçlar / riskler
Tam ekran paylaşımında uygulamaya özel ses yine mümkün değil; tüm sistem sesi gider.

## İlgili
- [[2026-10-01-sinanse-boguk-ses-ve-0-9-5]]
