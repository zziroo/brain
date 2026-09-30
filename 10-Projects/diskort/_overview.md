---
type: project
project: diskort
date: 2026-10-01
status: active
tags: [diskort, overview]
source: memory diskort-handoff.md (2026-09-30), diskurt-project.md, diskort-*.md
---

# Diskort: Discord kalitesinde sesli sohbet + ekran paylaşımı (Windows-first, kendi sunucusu)

## Nedir
10-20 kişilik kapalı bir arkadaş grubu için masaüstü (Electron) + mobil (Expo/React Native) uygulama; zamanla tam bir Discord benzeri platform. Yeniden adlandırma: Diskurt -> Diskort (2026-09-26). Klasör `C:\Users\yusuf\ZZ\zProjects\diskort`, repo `yusufholat/diskort` (public), güncellemeler GitHub Releases + kendi sunucumuz üzerinden.

## Hedefler
Ses + ekran paylaşımı kalitesi; metin kanalları, tepkiler, dosyalar, roller, DM'ler, profil/kozmetikler, Etkinlik (oynanan oyun). Yusuf canlıda test eder; client release'i onunla çıkar. Ayrıntı: [[proje-hedefleri-ve-platformlar]].

## Teknoloji
- pnpm monorepo: `apps/server` (Fastify, SQLite `node:sqlite`, WebSocket gateway), `packages/shared`, `packages/client-core`, `apps/desktop` (Electron), `apps/mobile` (Expo SDK 57, RN 0.86, @livekit/react-native, react-native-skia, yerel Kotlin modülü `voice-service`), `apps/web` (indirme sayfası), `infra/` (docker compose: LiveKit, api, Caddy).
- Dağıtım: VPS ([[sunucu-vps]]), Android APK + OTA ([[mobil-ota-guncelleme]]), iOS Ad Hoc ([[ios-ad-hoc-dagitim]]).
- Gürültü bastırma: DPDFNet (DeepFilterNet 3, 0.9.3'te kaldırıldı).

## Güncel durum (kaynak: handoff notu, 2026-09-30)
> Bu bölüm `diskort-handoff.md`'den türetildi; 2026-09-30 itibarıyla. Canlı doğrulama yapılmadı (`status` bu bölüm için unverified).
- **Canlı: v0.9.3** (tag 3d7ec24, 2026-09-30 ~21:00 UTC): DPDFNet orta arama fallback düzeltmesi, DeepFilterNet 3 kaldırıldı (ayarlar deepfilter -> dpdfnet), kozmetikler yalnız hover/açık profilde oynar. 0.9.2 = kozmetik paketleri + sunucu çubuğu rozetleri. Mobil: yalnız OTA (APK 0.9.2 / IPA 0.8.5 yeniden kullanıldı).
- **Sunucu:** 17d0e3c deploy (şema değişikliği yok, DB şema 24). Altı paket `/data/cosmetic-packs` içinde, tüm platformlar.
- **Mobil native:** Android APK 0.9.2 (runtime `native-690116b9069056da`, yamalı Skia; eski APK'lar zorunlu güncelleme ekranı alır). iOS hâlâ `Diskort-0.8.5-ios.ipa`; 0.9.2 iPhone'lara OTA ile ulaştı.
- **Docs denetimi (2026-09-30, main 60c22c1):** README/docs/privacy/udid/code-signing sayfaları koda uyduruldu (1440p yok; 720p60/1080p30/1080p60); indirme sayfasına Mesajlaşma/Etkinlik/Profil süsleri kartları; `pull-db-backups.ps1` geri bildirim ekran görüntülerini de yansılıyor; 30 birleştirilmiş uzak dal silindi. Yayınlanmamış istemci metni: DND açıklaması "Bildirim almayacaksın".
- **SignPath:** başvurulmayacak ([[kod-imzalama-ertelendi]]).
- **Etkinlik kod haritası:** sözleşme `packages/shared/src/activity.ts` (`Presence.activities[]`, en yeni önce, max 4; `ACTIVITY_SET`; ikon `/api/activity-icons/<sha256>`). Sunucu: oturum başına bellek içi liste, sıkı PNG doğrulama, 5 sn birleştirici. Masaüstü: `apps/desktop/src/main/activity/` (gizli PowerShell `scan.ps1`, ~90 MB RAM, yalnız girişliyken + anahtar açıkken). Gösterim: `components/status/ActivityCard.tsx`, `sidebar/ActivityHoverCard.tsx`, `VoiceMemberRow.tsx`; mobil `src/components/ActivityCard.tsx`. Karar: [[etkinlik-oyun-aktivitesi]].
- **Ses kesintileri** (09-29 ve 09-30 gecesi): olası sağlayıcı UDP filtresi; Yusuf sağlayıcıyla görüşecekti, sonuç bilinmiyor, sor ([[sunucu-vps]]).

### Sıradaki işler
1. Gelen kutusunu (gözcü/gece) 0.9.x regresyonları için kontrol et. Gece inceleme işaretçisi hâlâ 3adc990'daydı; sonraki çalışma tüm 0.9.x aralığını inceler.
2. Yusuf'un gerçek hayat Etkinlik geri bildirimini topla (gerçek oyun, anti-cheat, Battle.net, mobil).
3. **Telefon ısınması:** APK 0.8.13'te DPDFNet bütçe düzeltmesi + termal otomatik kapatma var. Kalan: Yusuf 5-10 dk yayın izler -> telemetri; gerekirse JS seçenekleri (VP9'u bırak / donanım kodlayıcıda 720p30 düşük katman / tam ekran değilse mobil düşük katmana abone).
4. Yusuf'un cihaz testleri: mobil Skia setleri, mobil ses ekranı/yayın kutucukları, masaüstü sahne otomatik gizleme/şerit/kendi önizleme duraklatma, rolsüz DM profili.
5. 0.9.2 sonrası borç: telefonda yeni kozmetikler (Android APK kurulumu, Android 10+ kart videosu, iOS OTA), `reportClientError('kozmetik')` izle, `mic.fallback` telemetrisi izle.
- **Açık öneriler (önce sor):** kanal kategorileri, IPA yalnız kendi sunucumuzdan, release/deploy/geri bildirim için proje skilleri, sunucular arası ses moderasyonu, Spotify tarzı `listening` etkinliği. (Not: handoff SignPath'i de bu listede gösteriyor ama karar "başvurma" idi; bkz. [[kod-imzalama-ertelendi]].)

## Önemli kararlar
- Hedefler/platformlar: [[proje-hedefleri-ve-platformlar]]
- Basit tut, reddedilenler: [[urun-basit-tutma-reddedilen-fikirler]]
- Etkinlik: [[etkinlik-oyun-aktivitesi]]; DM: [[dm-sunucu-ayrimi]]
- Kayıt: [[kayit-sadece-hesap-davetiyesi]]; ekran paylaşımı: [[ekran-paylasimi-sabit-presetler]]
- Kozmetik: [[kozmetik-sunucudan-paketler]], [[kozmetik-sadece-hover]]
- Release: [[surum-cikarma-kurali]]; imzalama: [[kod-imzalama-ertelendi]]
- Mobil: [[android-min-api-26]], [[mobil-ota-guncelleme]], [[ios-ad-hoc-dagitim]]; UI: [[sunucu-rail-rozeti]]

## Runbook'lar
[[sunucu-vps]] · [[deploy]] · [[surum-cikarma]] · [[geri-bildirim-inceleme]] · [[kozmetik-yayinlama]] · [[ios-cihaz-ekleme]] · [[yedekler]] · [[admin-paneli-ve-loglar]] · [[gelen-kutusu-ve-rutinler]] · [[yerel-ui-test-ortami]] · [[telefonla-erisim]]

## Dersler
[[dev-ortami-tuzaklari]] · [[electron-cdp-testi]] · [[yerel-installer-testi-userdata]] · [[rn-android-border-nan]] · [[kozmetik-avif-tam-aralik]] · [[worktree-silme-windows]] · [[claude-altina-yazma-izin-sorar]] · [[secret-isleme-kurali]] · [[caddy-bind-mount-restart]] · [[dpdfnet-fallback-koku-neden]]

## Oturumlar ve ek kararlar/dersler
- [[sessions/_index-dev-era]]: geliştirme dönemi (C:\dev, 2026-09-26..28)
- [[sessions/_index-current-era]]: güncel dönem (ZZ\zProjects\diskort)

## Çalışma kuralları (Claude)
[[20-Areas/working-rules/_index|Çalışma kuralları]] (20-Areas): [[git-push-autonomy]], [[diskort-orchestrator-mode]], [[zamanlanmis-gorevler-ve-skiller]]

## Sürüm özeti (kaynak: diskurt-project hafızası)
0.1.2 metin kanalları (2026-09-26) · 0.1.3 zorunlu otomatik güncelleme · 0.1.4 client-core · 0.2.0 Android v1 · 0.2.x OTA · 0.3.0 tepkiler+ekler · 0.3.1 DeepFilterNet 3 · 0.3.2 profil fotoğrafları · 0.3.3 tema UI · 0.3.4 GPU ekran kodlama · 0.4.0 roller · 0.8.1 iOS Ad Hoc + şema 21 · 0.9.0 Etkinlik · 0.9.2 kozmetik paketleri · 0.9.3 DPDFNet düzeltmesi.
