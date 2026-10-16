---
type: decision
project: tussle
date: 2026-10-17
status: proposed
tags: [tussle, android, twa, capacitor, performans, magaza]
source: oturum 2026-10-16 gece (mobil-playus) kare hızı turu; Yusuf "TWA deneme sürümü yapalım ama yarın"
---

# Öneri: Android uygulaması WebView yerine Chrome motorunda (TWA) çalışsın

**Durum: önerildi, deneme olumlu, geçiş kararı Yusuf'ta.** 2026-10-17 gece: TWA deneme sürümünde (`android-twa/`, Xiaomi) Slice parmak kalkıkken akıcı, Capacitor'daki takılma yok (Yusuf). Geçiş planı: [[2026-10-17-android-twa-gecis-plani]].

## Bağlam
Android uygulamasında (Capacitor + System WebView) oyun parmak kalkınca takılıyor, aynı sayfa Chrome'da her durumda akıcı. WebView içinde denenen her şey (ekran modu, güç tasarrufu kapatma, oyun modu, ADPF) işe yaramadı: [[2026-10-16-android-webview-parmak-kalkinca-takilma]]. Akıcılık bir numaralı kural.

## Seçenekler
| | Capacitor + WebView (bugün) | TWA (Trusted Web Activity) |
|---|---|---|
| Android akıcılığı | parmak kalkınca takılıyor | Chrome ile aynı (beklenen; deneme sürümüyle doğrulanacak) |
| Güncelleme | gömülü paket + OTA | site neyse o; OTA ve gömülü paket gerekmez |
| Titreşim | `@capacitor/haptics` | `navigator.vibrate` (Chrome'da var) |
| Geri tuşu | `@capacitor/app` dinleyicisi (tanıtım slaytı geri) | tarayıcı geçmişi; `back-intercept.ts` geçmiş tabanlı olmalı |
| Durum çubuğu | `@capacitor/status-bar` | `theme-color` + TWA ayarları |
| Çevrimdışı açılış | gömülü paket | service worker önbelleği |
| Google girişi | uygulamada gizli (web SDK'sı origin ister) | web'deki gibi çalışabilir (origin `tussle.ziroo.net`) |
| Gereken | — | sitede `/.well-known/assetlinks.json` (Play uygulama imzası + yükleme anahtarı SHA-256), Chrome yüklü cihaz (yoksa Custom Tab / WebView yedeği) |
| Hesap | WebView'in `localStorage`'ında (`https://localhost`, `tussle.token` + cihaz sırrı) | Chrome'un `tussle.ziroo.net` deposu; **aynı paket adıyla geçişte misafir hesap kaybolur**, taşıma adımı gerekir |

iOS etkilenmez: WKWebView 60'ta düzenli çalışıyor, Capacitor kalır ([[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]] iOS için geçerli).

## Önerinin nedeni
- Sorun WebView'in kare teslim düzeninde; bizim kodumuzda değil. Chrome'un motoru aynı kodu düzenli gösteriyor.
- Play TWA'yı resmi olarak destekliyor. Apple'daki "siteyi açan kabuk" (4.2) riski Play'de yok.

## Reddedilen ya da bekleyen alternatifler
- WebView'de sebebi aramaya devam: bir gecelik ölçümde kare sayaçları temiz, göz takılma görüyor. Kalan aday (rAF zaman damgası düzensizliği) ölçülemedi; WebView'i biz değiştiremeyiz.
- Oyunda 60 Hz'e kilitlemek: OnePlus'ta 60 Hz'de de takıldı.
- GeckoView vb. başka motor gömmek: uygulama ~50+ MB büyür, Chrome'dan farklı motor, bakım yükü.

## İlgili
- Devir notu: [[2026-10-17-twa-deneme-devir-notu]]
- [[2026-10-16-kare-siniri-kalkti-her-vsyncte-cizim]]
