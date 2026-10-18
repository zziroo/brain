---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, klavye, chrome, ios, webview]
source: oturum 2026-10-18 "tussle: durum özeti" (giriş slaytı misafir formu)
---

# Ders: Chrome 108+ ve iOS klavye açılınca yalnız görsel görünümü daraltır; `scrollIntoView` formu "görünür" sayar, taşma yoksa kaydıracak yer yoktur

## Ne oldu
Giriş slaytında misafire dokununca ad formu klavyenin altında kalıyordu. İlk düzeltme (`visualViewport` resize'da `scrollBy`) iki telefonda da işe yaramadı: yerleşim küçülmediği için slaytın içeriği ekrana sığıyor, kaydıracak taşma yoktu.

## Uygula
- Klavye açıkken (örtülen alan = `innerHeight - vv.height - vv.offsetTop` > 120 px ve giriş odakta) kaydırıcıya örtülen alan kadar `padding-bottom` ekle, sonra kaydır; klavye kapanınca boşluğu kaldır (`2e3d4ba`, `src/client/ui/onboarding.ts`).
- Sheet ve sohbet zaten `visualViewport`'u izliyor (`sheet.ts`, `chat.ts pinToVisualViewport`); yeni form ekranlarında aynı kalıbı kullan.
- Alternatif `interactive-widget=resizes-content` meta'sı uygulama genelini etkiler, denenmedi.
- Masaüstünde klavye taklit edilemiyor; bu tür düzeltme telefonda doğrulanmadan "bitti" denmez.

## İlgili
- [[2026-10-18-android-twa-kalir-web-izleri-kodda-kapatilir]]
