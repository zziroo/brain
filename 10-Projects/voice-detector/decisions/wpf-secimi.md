---
type: decision
project: voice-detector
date: 2026-09-25
status: active
tags: [voice-detector, teknoloji, wpf]
source: PLAN.md bölüm 3, oturum 25d1d08a (2026-09-25)
---

# Uygulama C# / .NET 10 + WPF + NAudio ile yazılır (MAUI/Avalonia değil)

## Bağlam
Yusuf hangi platformun kullanılacağını sordu (MAUI mi Avalonia mı).

## Karar
WPF + NAudio, .NET 10 (LTS). Tepsi ikonu WinForms `NotifyIcon` ile (WPF ile birlikte kullanılabilir). Tek dosya exe olarak paketlenecek.

## Neden
Kritik parça overlay penceresi: saydam, click-through, odak çalmayan, Alt+Tab'da görünmeyen. WPF + Win32 stilleriyle en kolayı. Uygulama zaten Windows'a özel (WASAPI, `RegisterHotKey`, `SetWindowDisplayAffinity`); çoklu platform avantajı yok. .NET 8 desteği Kasım 2026'da bitiyor, .NET 10 güncel LTS.

## Reddedilen alternatifler
- Avalonia: çoklu platform avantajı burada karşılıksız; yine Win32 P/Invoke gerekir.
- MAUI: mobil odaklı, saydam pencere desteği zayıf, masaüstü tarafı zayıf.
- Python + PySide6 + sounddevice: geliştirmesi hızlı ama PyInstaller exe'leri büyük ve bazen antivirüse takılıyor (PLAN.md).
- .NET 8: desteği bitiyor.

## Sonuçlar / riskler
Yalnız Windows. Mikrofon paylaşımlı modda dinlenir; Discord/Overwatch aynı mikrofonla çakışmaz.

## İlgili
- [[_overview]], [[tetik-seviyesi-500ms-penceresi]]
