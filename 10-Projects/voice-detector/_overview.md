---
type: project
project: voice-detector
date: 2026-10-04
status: active
tags: [voice-detector, wpf, dotnet, naudio]
source: C:\Users\yusuf\ZZ\zProjects\voice-detector (PLAN.md, src, tests); konuşma kaydı 25d1d08a (2026-09-25..28)
---

# Voice Detector: mikrofonun fazla yükseldiğini ekran çerçevesiyle uyaran Windows tepsi uygulaması

## Amaç
Overwatch oynarken kulaklıkla konuşurken sesin evdekileri/komşuları rahatsız edecek kadar yükselince ekranda göze batmayan ama fark edilen uyarı (kenar çerçeve ve/veya sol üst rozet). Oyundan tamamen ayrı çalışır; enjeksiyon/hook/bellek okuma/girdi gönderme yok, yalnız WASAPI paylaşımlı modla mikrofon dinleme + kendi saydam penceresi ([[2026-09-25-wpf-secimi-ve-asamalar]]).

## Teknoloji ve mimari
C# / .NET 10 + WPF + NAudio 3.1, xUnit. Akış: `AudioMonitor` (WASAPI, 20 ms bloklar, RMS/dB) -> `LoudnessDetector` (eşik + histerezis, tetik seviyesi) -> `OverlayManager` (monitör başına 4 kenar şeridi + rozet, click-through, NOACTIVATE, PerMonitorV2 DPI). Ayarlar `%AppData%\VoiceDetector\settings.json`; tepsi menüsü, Ctrl+Alt+V kısayolu, Windows ile başlat, 3 adımlı kalibrasyon sihirbazı. Kod: `src/VoiceDetector/{Audio,Core,Detection,Overlay,Settings,Tray,UI}`, testler `tests/VoiceDetector.Tests` (76 test). `PLAN.md` ayrıntılı tasarımı içerir; `README.md` planlanmış ama klasörde yok.
- Varsayılan eşikler: Yüksek -32 dB, Çok Yüksek -26 dB (Yusuf'un ölçümlerinden). Tasarım kararları: [[tetik-seviyesi-500ms-penceresi]], [[overlay-dort-serit-yalniz-uyarida-gorunur]], [[kalibrasyon-esik-hesabi]], [[kenarliksiz-pencereli-mod]].

## Güncel durum

_Son güncelleme: kaynak: PLAN.md + oturum kaydı; 2026-09-28'e kadar_

| Aşama | Durum |
|---|---|
| 0 Hazırlık (.NET 10 SDK) | bitti |
| 1 Ses ölçer | bitti (Yusuf ölçtü) |
| 2 Dedektör | bitti, Yusuf test etti |
| 3 Overlay MVP | bitti, Yusuf oyunda denedi, "çalışıyor" |
| 4 Tray + ayarlar + kalibrasyon | bitti, Yusuf test etti |
| 5 Çoklu monitör | bitti (oturumda gerçek ekranlarda doğrulandı) |
| 6 Overwatch testi | test listesi hazırlandı (2026-09-25); sonucu kayıtta yok, doğrulanmadı |
| 7 Paketleme (tek exe) | yapıldığına dair kayıt yok |

Proje 2026-09-28'de OneDrive'dan `C:\Users\yusuf\ZZ\zProjects\voice-detector` yoluna taşındı ([[2026-09-28-tasima]]; Mac'te klasör `/Users/ziroo/ZZ/zProjects/voice-detector`); eski OneDrive klasörü silindi (2026-10-04'te doğrulandı). Git deposu var (yerel, ilk commit `53ed904`).
- **Açık sorun (2026-10-04'te doğrulandı):** "Windows ile başlat" kaydı (`HKCU\...\Run\VoiceDetector`) hâlâ silinmiş OneDrive yolundaki exe'yi gösteriyor; oturum açılışında uygulama başlamaz. Uygulama yeni konumdan bir kez çalıştırılınca kendini düzeltir ([[kilitli-klasoru-tutan-sureci-bulmak]]).

## Sıradaki işler

_Son güncelleme: PLAN.md'den_

Önce: uygulamayı yeni konumdan bir kez çalıştırıp "Windows ile başlat" yolunu düzelt. Aşama 6 gerçek maç testi (liste: antrenman alanı A1–A10, FPS/gecikme B1–B3, gerçek maç C1–C6, uzun oturum D1–D3; en olası sorun masa mikrofonunun kulaklıktan sızan oyun sesini duyması); Aşama 7 `dotnet publish -r win-x64 --self-contained -p:PublishSingleFile=true`; sonra: kulaklığa bip, oturum istatistiği, oyun açılınca otomatik aktif olma, gece modu (23:00 sonrası daha düşük eşik). Riskler: sürücü AGC, yanlış mikrofon (3 mikrofon var, varsayılan iletişim cihazı masa mikrofonu), klavye tıkları, özel tam ekran (kenarlıksız pencereli gerekli).

## Oturumlar ve kararlar
- [[2026-09-25-wpf-secimi-ve-asamalar]] (oturum)
- [[2026-09-28-tasima]] (oturum)
- [[tetik-seviyesi-500ms-penceresi]] (karar)
- [[wpf-secimi]] (karar)
- [[kenarliksiz-pencereli-mod]] (karar)
- [[overlay-dort-serit-yalniz-uyarida-gorunur]] (karar)
- [[kalibrasyon-esik-hesabi]] (karar)
- [[wpf-masaustu-tuzaklari]] (ders)
- [[powershell-ui-otomasyon-betikleri]] (ders)
- [[kilitli-klasoru-tutan-sureci-bulmak]] (ders)

## İlgili
- [[Home]]
