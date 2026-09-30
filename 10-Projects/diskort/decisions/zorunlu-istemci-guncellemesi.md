---
type: decision
project: diskort
date: 2026-09-27
status: active
tags: [guncelleme, desktop, mobil]
source: C--dev-diskort 2736605c (2026-09-26/27), C--dev-diskort 126a55f0 (2026-09-27)
---

# Karar: Herkes her zaman son sürümü kullanır: masaüstünde açılış kapısı + gateway sürüm reddi, Android'de zorunlu güncelleme ekranı.

## Bağlam
Kullanıcı Discord'daki Update.exe benzeri bir yapı ve herkesin yeni sürümde olmasını istedi; "oturaklı bir sistem" kurulmasını söyledi.

## Karar
Masaüstü: electron-updater (generic sağlayıcı, diferansiyel indirme), splash açılış kapısı, IDENTIFY'da sürüm gönderilir; eski sürüm UPDATE_REQUIRED (4010) ile reddedilir; yeni sürüm UPDATE_AVAILABLE olarak yayınlanır; boşta iken otomatik kurulum. NSIS kurulumu sabit dizine (`%LOCALAPPDATA%\Programs\diskort`). Android: uygulama içi APK indirme + kurulum ekranı, JS için ayrıca OTA.

## Neden
- Eski sürümlerle protokol uyumsuzluğu destek yükü yaratır; kapalı grupta zorunlu güncelleme sorun olmaz.
- Küçük diferansiyel paketlerle zorunlu güncelleme rahatsız etmez.

## Reddedilen alternatifler
- İsteğe bağlı güncelleme: sürüm çeşitliliği ve hata ayıklama zorluğu.

## Sonuçlar / riskler
macOS için otomatik güncelleme yok (ad-hoc imza). Sesteyken güncelleme araya girmez.

## İlgili
- [[2026-09-26-metin-kanallari-ve-android-baslangic]]
