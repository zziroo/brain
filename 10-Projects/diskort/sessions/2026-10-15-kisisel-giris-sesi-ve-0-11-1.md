---
type: session
project: diskort
date: 2026-10-15
status: active
tags: [ses-tasarimi, geri-bildirim, surum, sunucu]
source: diskort oturumu 2026-10-15 akşam (Mac): #34 kişisel giriş sesi, sürüm 0.11.1
---

# Oturum 2026-10-15: kişisel giriş sesi (#34) ve sürüm 0.11.1

## Yapılanlar
- **#34 kişisel giriş sesi** ([[2026-10-15-kisisel-giris-sesi]]): üç ajan (sunucu+shared+client-core → masaüstü ‖ mobil), inceleme ajanı (kritik/yüksek yok; orta: ffmpeg protokol beyaz listesi; düşükler: ayar bölümü, 3600 sn sınırı, uzun dosyada PCM belleği, zaman aşımı yarışı, kendi girişin sağırken çalması, admin-cli id/kullanıcı adı araması), sonnet düzeltme ajanı. Şüpheci ajan atlandı (tek orta bulgu saf koruma bayrağıydı). Commit `88579c1`.
- Mac'e Homebrew ile ffmpeg 9.0.2 kuruldu; gerçek dönüştürme testi yerelde geçti. Tüm paketler typecheck + test yeşil (server 693, client-core 395, desktop 180, mobile 182).
- **Sürüm 0.11.1** (`ef73be1`, tag `v0.11.1`): sunucu önce deploy edildi (yedek `diskort-2026-10-15_2122.db.gz`, şema 27, bütünlük ok, imajda ffmpeg 5.1.9 Debian 12). CI ~7 dk'da bitti (macOS dahil, bu kez runner sorunu yok). APK 0.11.0 ve IPA 0.8.5 yeniden kullanıldı (parmak izi aynı), OTA android (`native-83d20c89…`) ve ios (`native-4ff5e06b…`) 200. `latest*.yml` 0.11.1. #34 ve #35 "tamamlandı".

## Gözlemler
- OTA uç noktası `/updates/expo/<platform>` (expo-platform + expo-runtime-version başlıklarıyla); `/updates/ota-*.json` yok, 404 normal.
- Uygulamada görsel/işitsel deneme yapılmadı: panel düğmesi, başlangıç seçici modalı, çıkış aygıtı yönlendirmesi, iOS'ta LiveKit ile karışım, expo-audio uzak MP3 akışı doğrulanmadı. Yusuf canlıda dener.

## Sonraki
- 0.11.1 canlı doğrulama (yukarıdaki liste); rahatsız edici ses gelirse `admin-cli intro-sound-remove`.
- 16 Ekim 07:30 bakım penceresi değişmedi.

## Ek: 0.11.1 canlı geri bildirimi ve 0.11.2 (aynı akşam)
Yusuf 0.11.1'i denedi: (1) Discord'da giriş sesi normal "girdi" sesinden *sonra* çalıyor, bizde yerine çalıyordu; (2) uzunluk seçilemiyordu, hep 5 sn; (3) çok gürültülüydü; (4) sesi çalanın halkası yanmıyordu. Düzeltmeler ([[2026-10-15-kisisel-giris-sesi]] güncellendi): önce genel ses sonra giriş sesi; masaüstünde uzunluk kaydırıcısı (0,3–5 sn), sunucu `duration` parametresi + klip sonunda fade, loudnorm -20 LUFS; istemcilerde sabit 0,5 kazanç (kaydırıcı %100 = eski seviyenin yarısı); giriş sesi çalarken sarı (warn) halka (`introPlayingUserId`). Üç ajan + inceleme (yalnız düşükler) + sonnet düzeltme; commit `80cc93b`, sunucu deploy edildi, sürüm 0.11.2 tag'lendi.
