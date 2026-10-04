---
type: lesson
project: voice-detector
date: 2026-09-25
status: active
tags: [voice-detector, wpf, dotnet, winforms, naudio, dpi, tuzak]
source: oturum 25d1d08a (Aşama 1-5)
---

# WPF/.NET masaüstü tuzakları: ilk pencere, arka plan dispatcher'ı, WinForms using çakışması, DPI geçişi, NAudio 3

## Ne oldu ve çözüm
- **WPF ilk oluşturulan pencereyi `Application.MainWindow` sayar.** Overlay pencereleri ana pencerenin alan başlatıcısında oluşturulunca (base kurucudan önce çalışır) bir şerit "ana pencere" oldu; `OnMainWindowClose` ile uygulama kapanmayacaktı. **Çözüm:** yardımcı pencereleri `InitializeComponent()` sonrasında kurucuda oluştur; tepsi uygulamasında `ShutdownMode="OnExplicitShutdown"`.
- **`Dispatcher.CurrentDispatcher` arka plan iş parçacığında çağrılırsa o iş parçacığı için yeni bir dispatcher yaratır**, UI'ninkini değil. Ses yakalama iş parçacığından gelen olay böyle UI'ye hiç ulaşmayacaktı. **Çözüm:** UI dispatcher'ını kurucuda (UI iş parçacığında) bir değişkene al, olayda onu kullan.
- **`UseWPF` + `UseWindowsForms` birlikte** açılınca örtük global using'ler `Color`, `Brush`, `Application`, `Rectangle` adlarında belirsizlik hatası verdi. **Çözüm:** csproj'da `<Using Remove="System.Drawing" />` ve `<Using Remove="System.Windows.Forms" />`; WinForms'u yalnız tepsi dosyasında açıkça kullan. WinForms analizcisinin WFO0003 uyarısı (DPI manifest yerine `SetHighDpiMode`) WPF uygulamasında yersiz, `NoWarn` ile sustur.
- **Pencereyi farklı DPI'lı ekrana `SetWindowPos` ile taşıyınca WPF `WM_DPICHANGED`'de boyutu yeniden ölçekler.** **Çözüm:** konumu/boyutu iki kez uygula (ikinci çağrı doğru ekranda, tam piksel). Ölçülerek doğrulandı.
- **NAudio 3.x'te `WasapiCapture` kullanımdan kalktı** (CS0618). Yerine `WasapiRecorderBuilder().WithDevice().WithSharedMode().WithEventSync().Build()`: `DataAvailable` artık kopyasız `ReadOnlySpan<byte>` + buffer bayrakları verir, `RecordingStopped` yakalama iş parçacığında **senkron** gelir (durdurmadan önce abonelikten çık), `WaveFormat` `Build()` sonrası hazırdır. Cihaz olayları için `MMDeviceEnumerator.CreateNotificationClient()`. `WithRawMode()` sürücü AGC'sini atlatmak için ileride işe yarayabilir.
- **Tek kaynak üzerinden üstel yumuşatma (güç ortalaması) kısa sıçramayı uzun kuyrukla eşik üstünde tutar**; süre filtresi yumuşatılmış seviyeye değil ham bloklara uygulanmalı ([[tetik-seviyesi-500ms-penceresi]]).

## Tekrar etmemek için
Yeni bir WPF tepsi/overlay uygulamasında bu beş maddeyi baştan uygula. API'si değişmiş olabilecek bir paket sürümünde (NAudio 3 gibi) önce XML belgesine/yansımaya bak, sonra yaz.

## İlgili
- [[_overview]], [[overlay-dort-serit-yalniz-uyarida-gorunur]], [[wpf-secimi]]
