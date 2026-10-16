---
type: session
project: tussle
date: 2026-10-16
status: active
tags: [tussle, oturum, performans, android, ios, magaza]
source: oturum 2026-10-16 akşam → 2026-10-17 gece (mobil-playus) /basla → iOS build 3 → kare hızı turu
---

# Oturum: iOS build 3, kare sınırı kalktı, Android WebView takılması

- **iOS build 3** App Store Connect'e komut satırından yüklendi (`c7f0717`). Build 2 Beta App Review'dan geçmişti ama ilk açılışta eski giriş geliyordu (web paketi tanıtım akışından önce). Simülatörde temiz kurulumda tanıtım doğrulandı. TestFlight herkese açık bağlantısı henüz paylaşılmadı. Yapılacak: build 3'ü dış gruba ekle. Komutlar `docs/STORE.md` §3'te.
- **Android kapalı test:** sürüm 3 (versionCode 3) onaylandı. Yusuf katılım mesajını arkadaşlara attı, 12 kişiye ulaşmaya çalışılıyor.
- **Canlı izleme (Yayın 3):** Yusuf denedi, sorun görmedi. Açık iş kapandı.
- **Kare hızı:** adb + CDP ölçümüyle Xiaomi'nin uyarlanabilir panelinin oyunda 60 ↔ 120 gidip geldiği, 60 sınırının bu geçişlerde kare kaçırdığı görüldü. Kare sınırı ve "Yüksek kare hızı" ayarı kaldırıldı: [[2026-10-16-kare-siniri-kalkti-her-vsyncte-cizim]]. Opus ajanı uyguladı, ayrı inceleme ajanı yalnız düşük önemli bulgular çıkardı. **Yayın:** `11127a3`, yedek `pre-11127a3.db`, sağlık ok, OTA **0.20261016.1948**. 1.730 test.
- **Android ekran sabitleme eklentisi** (`DisplayRatePlugin`, `050c924`): oyun sırasında en yüksek yenileme modu, API 35 güç tasarrufu kapalı, WebView HIGH kategori. İnceleme ajanı, eklenti vekilinin `then`'e cevap verdiğini yakaladı (yüksek önem: istek hiç gitmiyordu). Düzeltildi, test eklendi. versionCode 4, **AAB üretilmedi**.
- **Çözülmeyen:** uygulamada parmak kalkınca takılma, Chrome'da yok. Perfetto, WebView iç kaydı ve 240 fps yavaş çekimle ölçüldü. Oyun modu, ADPF ve 60 Hz denendi, işe yaramadı: [[2026-10-16-android-webview-parmak-kalkinca-takilma]].
- **Karar seçeneği:** Android için TWA (Chrome motoru) deneme sürümü. Yusuf "yarın" dedi: [[2026-10-17-android-twa-onerisi]], devir notu [[2026-10-17-twa-deneme-devir-notu]].
- Ders: saniyelik `adb dumpsys` ölçüm döngüleri telefonu kasıyor. Eski sürümün de "kasıyor" sanılması bundandı.
- **Sonrası (2026-10-17):** TWA deneme oturumu ([[sessions/2026-10-17-tussle-twa-deneme]]) yapıldı. Sonuç akıcı; geçiş planı [[2026-10-17-android-twa-gecis-plani]]. Yusuf'un TWA, iOS ve Chrome yoksa soruları öneri notunda cevaplandı. Titreşimin hiç çalışmamasının sebebi bulundu (sistem dokunsal geri bildirim kapalı): [[2026-10-17-titresim-sistem-dokunsal-geri-bildirim-kapaliysa-yok]], karar [[2026-10-17-oyun-titresimi-media-arayuz-touch]].
