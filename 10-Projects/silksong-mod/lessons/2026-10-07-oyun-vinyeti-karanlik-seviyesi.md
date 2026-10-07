---
type: lesson
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong, render, isik, test]
source: Windows oturumu 2026-10-07 (NEW2-m oyun içi testi, RoomBuilder.cs)
---

# Oyun içi görüntüde yarım ekran siyahsa önce oyunun vinyetine bak; bizim parça değildir

- **Belirti:** kendi odamızda girişte ekranın sağ yarısı, ortada sol yarısı simsiyah çıktı; ilk tahmin yanlış yerleşmiş siyah bir parçaydı.
- **Gerçek neden:** oyun Hornet'in etrafına karanlık vinyet çiziyor (`Vignette` etiketli nesne, `Darkness Control` FSM). Ölçeği sahnenin karanlık seviyesine bağlı: -1 → 10,5, 0 → 5,5, 1 → 2,7, 2 → 1,8 birim. Bizim `CustomSceneManager` 0'daydı; Hornet ekran kenarındayken öbür yarı kararıyordu. Oyunun kendi Room_Forge'u da aynı vinyeti gösteriyor.
- **Ekran görüntüsü tuzağı:** `ScreenCapture.CaptureScreenshot` kareyi karenin sonunda alır. Aynı karede Hornet'i taşırsan görüntü yeni konumu gösterir; çekimden sonra bir kare bekle.
- **Renk:** bölgenin (zone) kamera renk ayarı otomatik yüklenir (DOCKS: doygunluk 1,22, soğuk gölgeler, güçlü hero ışığı). Renk zaten dokulara işlenmişse kendi sahnemizde nötr ayar kullan.
- **Karşılaştırma için:** `ShotArtOnly` vinyeti ve hero ışığını bir kare kapatıp ek görüntü alır. Yalnız ışık parçaları (`HeroLight` alanları + `Vignette`) kapatılmalı; `heroLight.gameObject` alt ağacını gezmek Hornet'i de gizler.

İlgili: [[2026-10-07-sahne-yolu-kabuk-demo-end-ve-kayit-hijyeni]], [[2026-10-07-silksong-sahne-yapisi-olculen-degerler]]
