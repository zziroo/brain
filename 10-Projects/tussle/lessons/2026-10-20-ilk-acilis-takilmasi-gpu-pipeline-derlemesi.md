---
type: lesson
project: tussle
date: 2026-10-20
status: active
tags: [tussle, android, webview, gpu, performans, gecis, olcum]
source: "oturum 2026-10-20 akşam (mobil-playus: ilk açılış takılması ve geçiş düzeltmeleri)"
---

# "Her ekranın ilk açılışı takılıyor" = Android WebView'da ilk kullanımda GPU pipeline derlemesi

- Uygulama her açıldığında ilk oda açılışında ~14 `VulkanCreateGraphicsPipelines` (89–124 ms GPU, 6–8 kaçan vsync); ikinci açılışta ~0. Pipeline önbelleği uygulama yeniden başlayınca kalmıyor.
- Masaüstü (4x CPU) yalnız ana iş parçacığı payını gösterdi (ilk `Intl.NumberFormat`, tembel derleme, ilk yerleşim); onu gizli ön kurulumla gidermek telefonda yetmedi.
- **`visibility:hidden` / `opacity:0` hiç rasterlenmez → GPU ısınmaz.** İşe yarayan: ekranı %1 opaklıkla 2 kare gerçekten boyamak + boşta hiçbir şeyi değiştirmeyen bir View Transition (yakalama pipeline'ları). Sonuç 1 pipeline, 1–2 vsync.
- Aynı kök neden açılış uçuşunda: kartların ilk rasteri ve giriş katmanının sayfaya geri rasterlenmesi RenderThread'i bloklayıp kompozitör animasyonunu da donduruyor (logonun konarken ~3 px "atlaması"). Çözüm: ağır raster işini hareket anlarının dışına almak (ana sayfa uçuşa kadar boyanmaz, katmanlar uçuştan önce hazırlanır, girişler logoyla aynı karede biter).
- Ölçüm: debug uygulamaya CDP (`webview_devtools_remote_<pid>`) + `gpu,viz,cc` kategorili iz; gezinmeyi `location.hash` ile betik yapınca kullanıcının dokunması gerekmiyor. ColorOS (OnePlus) `screenrecord`'a izin vermiyor; Xiaomi veriyor.
- İlgili: [[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]], [[2026-10-20-webview-raster-ucus-animasyonunda-gpu-donmasi]].
