---
type: lesson
project: voice-detector
date: 2026-09-25
status: active
tags: [voice-detector, powershell, ui-automation, test, windows]
source: oturum 25d1d08a (Aşama 3-5 doğrulamaları)
---

# Masaüstü uygulamasını PowerShell + UI Automation ile doğrulamak işe yaradı; PowerShell 5.1'in üç tuzağı var

## İşe yarayan yöntem
Overlay ve tepsi uygulaması elle değil betikle doğrulandı:
- Uygulamayı ayrı ayar dosyasıyla başlat (`--settings <geçici yol>`); gerçek ayarlara ve gerçek örneğe dokunmaz (tek örnek kilidi ayar yoluna göre ayrılır).
- Düğmelere `InvokePattern`, onay kutularına `TogglePattern`, radyo düğmelerine `SelectionItemPattern` ile bas.
- `EnumWindows` + `GetWindowRect` ile pencere konumlarını **fiziksel** ekran sınırlarıyla karşılaştır (betik iş parçacığını `SetThreadDpiAwarenessContext(-4)` ile PerMonitorV2 yap).
- Tıklama geçirgenliği: çerçeve üstündeki noktada `WindowFromPoint` alttaki pencereyi döndürmeli. Odak: `GetForegroundWindow` önce/sonra aynı. Stiller: `GetWindowLong(GWL_EXSTYLE)`.
- Global kısayol `keybd_event` ile gönderilip ayar dosyasındaki değişiklikle doğrulandı. Bellek için çalışma kümesi yerine private bytes'a bak (paylaşılan DLL'ler çalışma kümesini şişirir).

## Tuzaklar (PowerShell 5.1)
- **BOM'suz UTF-8 betiği ANSI sanıp okur**: Türkçe düğme adları ("Köşe rozeti") bozuldu, öğeler bulunamadı. **Çözüm:** betiği BOM'lu UTF-8 kaydet. (Tersi, kaynak dosyaya yazarken BOM eklenmesi: [[2026-10-03-kapis-dev-ortami-tuzaklari]].)
- **Virgül operatörü `+`/`-`'den önce gelir**: `@($a, $b + $t)` "diziye $t ekle" diye okunur (`op_Subtraction` hatası). **Çözüm:** aritmetiği parantezle: `@($a, ($b + $t))`.
- **`New-Object PropertyCondition (...)` argümanı diziye sarar**: ControlType koşulu reddedildi. **Çözüm:** `[System.Windows.Automation.PropertyCondition]::new(...)`.
- İçeriği zengin (StackPanel'li) bir WPF CheckBox'ın UIA adı boştur; ada göre arayınca içindeki TextBlock bulunur. ControlType'a göre ara.

## İlgili
- [[_overview]], [[overlay-dort-serit-yalniz-uyarida-gorunur]]
