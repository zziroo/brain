---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, performans, android, webview, capacitor, ders]
source: oturum 2026-10-16 gece (mobil-playus) kare hızı turu; Xiaomi 17 Pro + OnePlus 15, Android 16
---

# Ders: Android WebView'de oyun parmak kalkınca takılıyor, aynı sayfa Chrome'da akıcı

## Ne oldu
Kare sınırı kalktıktan sonra ([[2026-10-16-kare-siniri-kalkti-her-vsyncte-cizim]]) Chrome'da oyunlar her durumda akıcı. Uygulamada (Capacitor, Android System WebView 154) Slice'ta toplar "takılarak" geliyor. **Parmak ekrana basılıyken yağ gibi akıyor, kalkınca takılıyor.** İki telefonda da aynı; 60 Hz'de de; Play sürümünde de (eski yapı).

## Ölçülenler
- JS: rAF saniyede 120, aralık en çok 8,4 ms; çizim kare başına 0,1-0,3 ms.
- Android `gfxinfo`: ~120 kare/sn, %95'i 7-10 ms altında, gecikmiş kare birkaç tane.
- Perfetto (OnePlus): SurfaceFlinger kare zaman çizelgesi parmak kalkıkken 120 kare/sn, hepsi zamanında; parmak basılıyken "Buffer Stuffing" (geç sunum) ama yine 120. İşlemci: parmak basılıyken büyük çekirdek 2-3,4 GHz, kalkınca ~1 GHz.
- WebView iç kaydı (CDP Tracing): oyun sırasında 450 kare, her karede ana iş parçacığı içeriği, yalnız 1 düşen kare.
- **240 fps yavaş çekim video (Xiaomi kamerası OnePlus ekranını çekti):** uygulamada top çoğunlukla her ekran karesinde ilerliyor ama 7 sn'de ~45 kez 1-2 karelik duraksama var (120 / 60 / 40 karışık). Chrome sabit 60 fps'de, düzenli. Yani göz düzensizliği görüyor; kare sayaçları bunu göstermiyor.

## Denenip işe yaramayanlar (hepsi Android, deneme sürümü `.dev`)
- Oyun sırasında en yüksek yenileme modunu tercih ettirmek (`preferredDisplayModeId`): katman "120 Hz Exact" istiyor, panel 120'de kalıyor (commit `050c924`, AAB çıkmadı). Takılma sürdü.
- API 35 `setFrameRatePowerSavingsBalanced(false)` + WebView `setRequestedFrameRate(HIGH)`: sürdü (commit `050c924` içinde).
- Telefonu 60 Hz'e almak: sürdü (OnePlus).
- `appCategory="game"` + `GameManager.setGameState(GAMEPLAY_UNINTERRUPTIBLE)` + ADPF ipucu oturumu (main, RenderThread, WebView GPU, Viz; 8,3 ms hedef, oturum açıldığı `dumpsys performance_hint` ile doğrulandı): sürdü, geri alındı.
- Titreşim kapalı: fark yok.

## Uygula
- Android'de oyun akıcılığı için WebView yerine Chrome motoru (TWA) denenecek: [[2026-10-17-android-twa-onerisi]], devir notu [[2026-10-17-twa-deneme-devir-notu]].
- Kare sayaçları (gfxinfo, frametimeline, rAF) "temiz" diyorsa ama göz takılma görüyorsa: telefonun ekranını başka bir telefonla 240 fps çek, ffmpeg ile kare kare top hareketini ölç. Bu oturumun asıl kanıtı buydu.
- **Ölçüm aracı telefonu kasar:** saniyede bir `adb shell dumpsys display` döngüsü (üst üste 2-3 tane) bütün uygulamaları takılttı, eski sürüm de "kasıyor" sanıldı. Saniyelik dumpsys sorgusu yapma; ölçümü bitince döngüleri kapat. Uzun test + USB şarj telefonu ısıtıyor (işlemci 77 °C görüldü).
- **Capacitor eklenti vekili `then`'e de cevap verir:** `import('@capacitor/core').then(m => m.registerPlugin(...))` sözü asılı kalır ve yakalanmamış ret üretir. Vekili bir kutuda tut (`{ p: plugin }`). İnceleme ajanı yakaladı, test `tests/native-refresh.dom.test.ts`.
- `adb shell "am start -d 'url?a=1&b=2'"`: tırnaksız `&` adb kabuğunda URL'yi keser.

## İlgili
- [[2026-10-16-90-hz-ekranda-60-fps-siniri-duzensiz-kare]]
- [[sessions/2026-10-16-tussle-kare-hizi-webview]]
