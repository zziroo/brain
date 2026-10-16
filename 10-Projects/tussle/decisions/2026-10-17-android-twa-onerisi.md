---
type: decision
project: tussle
date: 2026-10-17
status: accepted
tags: [tussle, android, twa, capacitor, performans, magaza]
source: oturum 2026-10-16 gece (mobil-playus) kare hızı turu; Yusuf "TWA deneme sürümü yapalım ama yarın"
---

# Öneri: Android uygulaması WebView yerine Chrome motorunda (TWA) çalışsın

**Durum: kabul edildi, geçiş yapıldı (2026-10-17 gece, `ce1f519`, versionCode 5).** Önceki durum: önerildi, deneme olumlu. 2026-10-17 gece: TWA deneme sürümünde (`android-twa/`, Xiaomi) Slice parmak kalkıkken akıcı, Capacitor'daki takılma yok (Yusuf). Geçiş planı: [[2026-10-17-android-twa-gecis-plani]].

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

## Yusuf'un soruları (2026-10-17)
- **Standart mı?** Evet: TWA, Google'ın web uygulamalarını Play'de yayınlamak için resmi yolu (`androidbrowserhelper`, Play dokümanları, PWABuilder). Geçici çözüm değil.
- **Apple tarafı da geçsin mi?** Olmaz. iOS'ta TWA karşılığı yok: bütün tarayıcılar WebKit kullanmak zorunda (iPhone'daki Chrome da WebKit), App Store yalnız siteyi açan kabuğu reddedebiliyor (4.2). Gerek de yok: WKWebView oyunu düzenli 60'ta çalıştırıyor. Geçişte Capacitor yalnız iOS kabuğu olarak kalır.
- **Chrome yoksa?** Uyumlu başka tarayıcı (Samsung Internet, Edge, Opera) varsa onunla açılır. Hiç yoksa yedek yola düşer; önerilen yedek WebView (adres çubuğu yok, bugünkü davranış). Play'li telefonlarda Chrome önyüklü gelir.
- **Titreşim farkı:** [[2026-10-17-oyun-titresimi-media-arayuz-touch]].

## İlgili
- Devir notu: [[2026-10-17-twa-deneme-devir-notu]]
- [[2026-10-16-kare-siniri-kalkti-her-vsyncte-cizim]]
