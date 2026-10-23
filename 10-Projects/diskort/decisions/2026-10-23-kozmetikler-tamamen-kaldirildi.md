---
type: decision
project: diskort
date: 2026-10-23
status: active
tags: [diskort, kozmetik, mobil, sadelik]
source: 2026-10-23 oturumu "diskort: kozmetikleri kaldırma kararı" (commit 8dccfed, sürüm 0.12.0)
---

# Profil kozmetikleri her platformdan kaldırıldı; daha sade arayüz

**Karar:** Kart efekti, avatar süsü, isim plakası, sunucudan gelen önceden çizilmiş kozmetik paketleri, mobil Skia oynatıcı (+ `react-native-skia` yaması), gölgelendiriciler/döngüler ve çizim aracı (`scripts/cosmetic-render`) tamamen silindi. Sunucu göç 28 ile `users` tablosundan `profile_effect`, `avatar_decoration`, `profile_frame`, `nameplate` sütunlarını düşürdü. Profil görünümü ayarında afiş, giriş sesi ve profil teması kaldı; renk temaları aynen duruyor. Bir daha önerme.

**Neden:** Yusuf daha temiz, sade bir arayüz istedi; telefonda kozmetik oynatmanın takıldığı yerler vardı. Kozmetikler cihazda hiç doğrulanmamıştı (Android/iOS kart videosu, bellek); yani kanıtlanmış bir değer değil, kanıtlanmamış bir risk atıldı. ~9 bin satır istemci + 1,2 bin satır sunucu bakım yükü ve mobilde yalnız bunun için duran Skia bağımlılığı gitti. Harcanan oturumlar tutma gerekçesi sayılmadı (batık maliyet).

**Reddedilen alternatifler:**
- Sunucudan kill switch ile kapatıp kodu tutmak (`cosmetics-cli platforms <id> none`): geri dönülebilir ama iki kod yolu ve bakım yükü kalıyordu; Yusuf "komple her yerden" dedi.
- Yalnız mobilden sökmek, masaüstünde (`<img>` ile ucuz) tutmak: yarım kaldırma, protokolde ölü alanlar.

**Uyumluluk (sahadaki eski istemciler masaüstü ≤0.11.3, Android 0.11.0, iOS 0.8.5):** sunucu `User`'da kozmetik alanlarını hiç göndermiyor (eski istemciler isteğe bağlı okur, `?? null`); `PATCH /api/me` eski alanları strip ediyor; IDENTIFY'daki `cosmetic_packs` bayrağı yok sayılıyor; `/api/cosmetics` rotası silindi (eski client-core 404'te sessizce vazgeçer, yeniden deneme döngüsü yok). Göç 28 sonrası eski sunucu imajına dönüş yedekten geri yükleme ister (yedek: `/var/backups/diskort/diskort-2026-10-23_1705.db.gz`). Sunucudaki `/data/cosmetic-packs` (34 MB) silindi.

**Yayın:** Mobilde native bağımlılık kalktığı için runtimeVersion değişti; 0.12.0 yeni APK + IPA ister, OTA ile gitmez.

Eskiyen notlar (`status: superseded`): [[kozmetik-sunucudan-paketler]], [[kozmetik-sadece-hover]], [[kozmetik-paketleri-sunucudan-on-render]], [[kozmetik-setleri-ucretsiz]], [[kozmetik-yalnizca-uzerine-gelince-oynar]], runbook [[kozmetik-yayinlama]], ders [[kozmetik-avif-tam-aralik]].
