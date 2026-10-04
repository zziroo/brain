---
type: session
project: voice-detector
date: 2026-09-25
status: done
tags: [voice-detector, asamalar]
source: oturum 25d1d08a-6c1b-4d7a-9ff7-969cb698abc4 (2026-09-25 21:23..22:59)
---

# Oturum: plan incelemesi ve Aşama 0-5'in tek akşamda yapılması

## Ne yapıldı
- PLAN.md incelendi, sistem kontrol edildi: .NET SDK yok (yalnız runtime'lar), 2 monitör (ana 4K %150 ~239 Hz, yan 2560x1440 %200 altta), RTX 5070. Öneriler PLAN.md'ye işlendi ([[wpf-secimi]]).
- Aşama 0: .NET 10 SDK (10.0.401) kuruldu, WPF + xUnit iskeleti, PerMonitorV2 manifesti.
- Aşama 1: canlı dB ölçer penceresi. Yusuf HyperX DuoCast ile ölçtü: sessizlik medyan -94,3 dB; normal konuşma P90 -40,0 (maks -33,2); yüksek konuşma P90 -24,7 (medyan -34,1). Eşik önerisi -32 / -26 dB.
- Aşama 2: dedektör + 39 test; kural değişti ([[tetik-seviyesi-500ms-penceresi]]). Yusuf test etti, "iyi çalışıyor".
- Aşama 3: overlay (4 şerit + rozet; turuncu yüksek, mor çok yüksek, kırmızı hasar efektiyle karışmasın diye kaçınıldı). UI Automation ile doğrulandı (15 px şerit, tıklama geçirgenliği, odak çalmama, pencere stilleri, normalde gizli). Yusuf oyunda denedi, "çalışıyor".
- Aşama 4: tepsi, ayarlar, kalibrasyon sihirbazı, Ctrl+Alt+V, Windows ile başlat, cihaz değişince yeniden bağlanma; 66 test; tepside 55 MB bellek, %0 CPU.
- Aşama 5: Ana/Yan/Tüm ekranlar; 76 test; iki ölçekte doğrulandı.
- Aşama 6 için test listesi hazırlandı (antrenman alanı testleri A1..A9 + gerçek maç).

## Alınan kararlar
- [[wpf-secimi]], [[tetik-seviyesi-500ms-penceresi]], [[kenarliksiz-pencereli-mod]], [[overlay-dort-serit-yalniz-uyarida-gorunur]], [[kalibrasyon-esik-hesabi]]

## Öğrenilenler
- Ayrıntılı: [[wpf-masaustu-tuzaklari]], [[powershell-ui-otomasyon-betikleri]]
- PowerShell 5.1 BOM'suz UTF-8 betikte Türkçe karakterleri bozar; UI otomasyon betikleri BOM'lu kaydedildi.
- OneDrive klasöründe bin/obj senkronu derleme kilidi riskiydi (sonra taşındı: [[2026-09-28-tasima]]).

## Açık kalanlar
Aşama 6 sonucu ve Aşama 7 paketleme kayıtta yok.

## İlgili
- [[_overview]]
