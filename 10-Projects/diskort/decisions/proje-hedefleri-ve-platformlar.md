---
type: decision
project: diskort
date: 2026-09-26
status: active
tags: [diskort, hedef, platform, hosting, auth]
source: memory diskurt-project.md (2026-09-26/27 oturumları)
---

# Diskort, 10-20 kişilik kapalı grup için Discord kalitesinde sesli sohbet + ekran paylaşımı uygulamasıdır; Windows öncelikli, kendi VPS'inde

## Bağlam
Yusuf, kapalı bir arkadaş grubu için Discord kalitesinde sesli + ekran paylaşımlı masaüstü uygulaması istedi; zamanla tam bir Discord benzeri platforma büyüyecek. Proje 2026-09-26'da Diskurt'tan Diskort'a yeniden adlandırıldı; GitHub reposu `yusufholat/diskort` (aynı gün public oldu).

## Karar
- **Hosting:** kiralık VPS (Türkiye'deki kullanıcılar için İstanbul ya da Hetzner DE/FI). Sonuç: isimkayit.com VPS ([[sunucu-vps]]). `infra/` docker-compose: LiveKit + API + Caddy, host network.
- **Kimlik doğrulama:** davet kodu + kullanıcı adı/şifre hesapları; ilk kayıt olan (bootstrap daveti API logunda basılır) admin olur ([[kayit-sadece-hesap-davetiyesi]]).
- **Platformlar:** hepsi; öncelik Windows, sonra Linux, sonra macOS. Bazı özellikler bazı platformlarda eksik olabilir (sistem sesi paylaşımı şimdilik yalnız Windows). Linux/macOS eşitliği için özellik bloklanmaz.
- **Sıra (2026-09-27):** (0) paylaşılan `packages/client-core` (tamamlandı) -> (1) Android v1 (React Native/Expo + @livekit/react-native, APK kendi indirme sayfasından, Play Store değil) -> uygulama içi özellikler (tepkiler, dosyalar, roller, DM'ler), önce client-core'da yazılır.
- **Bildirim:** Android için FCM (sunucu FCM HTTP v1 ile gönderir, Firebase yalnız teslim eder).
- **iOS:** Apple Developer hesabı alındı; Ad Hoc OTA kurulumu ([[ios-ad-hoc-dagitim]]).
- **Test:** Yusuf her şeyi doğrudan canlıda ("canlı ortamdan") dener: önce sunucu deploy, sonra client release. Sonraki adımlar tek tek önerilir.

## Neden
Yusuf planlama sırasında bunları açıkça seçti. Veri modelinde `guilds` tablosu olduğundan çoklu sunucu sonradan eklenebilir.

## Reddedilen alternatifler
- Google Play ile Android dağıtımı: Yusuf APK'yı kendi sayfasından vermeyi seçti.
- iOS için ücretsiz sideload: eşdeğeri yok; Apple Developer + Ad Hoc seçildi.
- Linux/macOS eşitliği için özelliği bekletmek: Windows-first kuralıyla reddedildi.

## Sonuçlar / riskler
Kodu imzalamak (SmartScreen/Gatekeeper uyarıları) bilerek ertelendi ([[kod-imzalama-ertelendi]]). Özellik kararları: [[urun-basit-tutma-reddedilen-fikirler]].

## İlgili
- [[_overview]], [[mobil-ota-guncelleme]], [[dev-ortami-tuzaklari]]
