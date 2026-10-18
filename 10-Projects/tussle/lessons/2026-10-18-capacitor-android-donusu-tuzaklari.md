---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, capacitor, firebase, fcm, play, worktree]
source: oturum 2026-10-18 Android Capacitor'a dönüş (Faz 3)
---

# Ders: TWA'dan Capacitor Android'e dönüşte çıkan tuzaklar

- **Bildirim eklentisi vekil `then` tuzağı (yine):** `push.ts` `import('@capacitor/push-notifications').then(m => m.PushNotifications)` sözü hiç çözülmüyordu; Android'de bildirim bölümü çizilmez, kayıt olmaz. **iOS build 5'in APNs yolu da aynı yüzden ölüydü** (cihazda denenmediği için görülmemişti). İnceleme ajanı yakaladı; çözüm kutu `{ p: plugin }`, test sahte eklentiyi `then`'e cevap veren Proxy yapar. Her yeni `registerPlugin`/dinamik eklenti importu bu gözle incelenmeli ([[2026-10-16-android-webview-parmak-kalkinca-takilma]]).
- **Firebase yokken `PushNotifications.register()` uygulamayı çöker** (`FirebaseMessaging.getInstance()` → RuntimeException). İstemci yalnız sunucu `push/config` `fcm: true` derken kaydolur.
- **Firebase'i mevcut GCP projesine eklemek Android OAuth istemcilerini kendiliğinden açmıyor;** SHA-1 eklemek de yetmedi. Credential Manager ile Google girişi için Google Auth Platform > Clients'ta paket + SHA-1 başına Android istemci elle açıldı (Play imzası, yükleme anahtarı, debug/.dev). `google-services.json`'da yalnız web istemcisi (tip 3) görünür, normal.
- **`.dev` paketi Firebase'de ayrıca kayıtlı olmalı;** yoksa google-services eklentisi "No matching client found" ile derlemeyi durdurur. `.dev` Play ürünlerini görmez: satın alma yalnız Play'den kurulan sürümde denenir.
- **`play-upload.mjs` sürüm adını TWA projesinden okuyordu;** 7 "1.2" diye yüklendi, `--promote 7` ile ad düzeltildi, betik `android/app/build.gradle`'a çevrildi. Betik `PLAY_SERVICE_ACCOUNT_JSON=~/.config/tussle/play-service-account.json` ister.
- **Worktree origin/main'den kesiliyor;** yerel main 46 commit ilerideydi (GitHub'a push yapılmıyor). İşe başlamadan `git rev-list --count HEAD..main` bak, gerekirse `git merge --ff-only main`. Uygulamanın `sync_with_base_branch` aracı origin'e baktığı için "güncel" dedi.
- **WebView'de geçiş "animasyonsuz" hissi:** View Transition çalışıyordu (~320 ms); asıl eksik oda sihirbazında adım değişiminin hiç animasyonu olmamasıydı (her platformda). Kasma ilk girişte veri geçiş ortasında gelince oluyor; gerekirse veriyi `vt.finished` sonrası çiz.
- **Telefon başka oturumla paylaşılınca** (mini motor denemeleri) ekrana kendiliğinden uygulama gelir; Yusuf'un denemesini o iş bitince yaptır.
- zsh'de `echo ===` hata verir (`=` genişletmesi); ayraç için `echo '---'`.
