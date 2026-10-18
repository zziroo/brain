---
type: decision
project: tussle
date: 2026-10-18
status: superseded
tags: [tussle, android, twa, uygulama-hissi]
source: oturum 2026-10-18 "tussle: durum özeti" (uygulama hissi turu)
---

# Karar: Android'de TWA'da kalınır; "site gibi" hissi veren web izleri kodda tek tek kapatılır

## Bağlam
Yusuf telefonda tarayıcının `confirm()` kutusunu ("tussle.ziroo.net web sitesinin mesajı") ve Chrome'un ilk açılıştaki "Chrome'da çalışıyor" bildirimini gördü; "native gibi olsun, gerekirse Capacitor'a dönelim" dedi.

## Karar
TWA kalır. Web izleri kod tarafında kapatılır: tarayıcı `confirm()` yerine uygulama içi onay sayfası (`confirmSheet`), `user-select: none` (giriş alanları ve `.selectable` açık), `-webkit-touch-callout: none`, `overscroll-behavior: none` (aşağı çekince yenileme ve kenar parıltısı yok, iOS esnemesi de kalktı), `touch-action: manipulation`; sohbette yanıt kaydırması her mesajda sağa; Oda sayfasındaki paylaş düğmesi QR'lı davet sayfasını açar. Yayın `986cc50`.

## Neden
- İzlerin hepsi motor değil kod meselesi; WebView'de de aynen çıkar.
- WebView'e dönüşün tek kazancı bir kerelik Chrome bildirimi; 16 Ekim ölçümleri (parmak kalkınca takılma, denenen her şey işe yaramadı) duruyor. Akıcılık bir numaralı kural.
- iOS zaten WKWebView'de; aynı CSS/JS düzeltmeleri iki platformu birden temizler.

## Reddedilen alternatifler
- Capacitor/WebView'e dönüş: takılma; yalnız bildirim kazanılır. [[2026-10-16-android-webview-parmak-kalkinca-takilma]]
- `interactive-widget=resizes-content` viewport meta'sı (klavye için): denenmedi, yerleşim bütün uygulamada klavyeyle küçülürdü; yerel çözüm seçildi ([[2026-10-18-chrome-klavye-yalniz-gorsel-gorunumu-daraltir-scrollintoview-calismaz]]).

## Sonuçlar / riskler
- Chrome'un tek seferlik bildirimi kalır. Tema ve çubuk renkleri (gece temasında gezinme çubuğu açık kalıyor olabilir) cila turuna bırakıldı (Yusuf: "her şey bitsin bir").

## İlgili
- [[2026-10-17-android-twa-onerisi]]
- [[2026-10-18-tussle-uygulama-hissi-onay-sayfasi-slaytlar-ios-120]]

> **Yerine geçti (2026-10-18 akşam):** Android Capacitor arayüzüne döndü, oyunlar mini motora: [[2026-10-18-android-mini-oyun-motoru]], [[2026-10-18-tussle-android-capacitor-donusu-faz-3]].
