---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, xiaomi, yenileme-hizi, performans, olcum]
source: oturum 2026-10-18 "tussle: Android TWA yerine Capacitor + oyun tanınması"
---

# Ders: Xiaomi paneli dokunurken 120, bırakınca ~2,4 sn sonra 60 Hz; Chrome hep 60 çizer, uygulama istekleri dinlenmez

## Ne oldu
"Parmak kalkınca takılma / ghosting" WebView'e özgü sanılıyordu. Xiaomi 17 Pro'da ölçüm (`dumpsys SurfaceFlinger` activeMode, 5 sn aralıkla) gösterdi ki panel dokunurken 120 Hz, parmak kalktıktan ~2,4 sn sonra oyun sürerken bile 60 Hz'e iniyor. Chrome (TWA) oyunu hep 60 fps çiziyor (ekran kaydı: saniyede 60-63 kare, sapma yok), o yüzden hep aynı "60 bulanıklığında" ve düzenli görünüyor. GeckoView 120↔60 geçişlerinde "ghosting" gösterdi; WebView takıldı. Kendi motorumuz (Choreographer + beklenen sunum zamanı) geçişte tek kare kaydırıp düzgün devam etti ([[2026-10-18-android-mini-oyun-motoru]]).

## Denenip dinlenmeyenler
- `WindowManager.LayoutParams.preferredDisplayModeId` (60 Hz kipi): `baseModeId=4` görünür ama panel 120'de kalır.
- 1x1 SurfaceView + `Surface.setFrameRate(60, FIXED_SOURCE, CHANGE_FRAME_RATE_ALWAYS)` ve Gecko'nun SurfaceView'ine aynı oy: panel yine 120↔60.
- Game Turbo performans modu (Capacitor/WebView): takılma sürdü.

## Uygula
- Paneli zorlamaya çalışma; her karenin gerçek sunum zamanına göre çiz (fixed step + interpolasyon, zaman damgası = beklenen sunum zamanı).
- "Ghosting" şikâyeti için önce Hz'i ölç: 60'ta hareket 120'ye göre doğal olarak bulanık; sorun 60 değil 60↔120 gidip gelmesi.
- Ölçüm yöntemi: `adb shell screenrecord` (90 sn) + `ffprobe -show_entries frame=pts_time` ile kare aralığı histogramı; tek karelik görüntü bozukluğu için `ffmpeg select='gt(scene,0.04)'` ile ani değişen kareleri bulup `tile` ile kare kare bak (Gecko'nun yarım çizilmiş karesi böyle bulundu). Ekran görüntüsü `screencap -p -d <display-id>` (çok ekranlı telefonda `-d` yoksa PNG bozuk). Kayıt telefonu biraz yükler; karşılaştırmada iki tarafı da kayıtla al.
