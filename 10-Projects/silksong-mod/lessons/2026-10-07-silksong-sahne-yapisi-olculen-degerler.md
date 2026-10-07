---
type: lesson
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong, sahne, unity, render, veri]
source: Windows oturumu 2026-10-07 (tools/biome/scene_pieces.py, band_stats.py, SceneDress.cs logları; Room_Forge, Dock_03, Ward_02, Song_05, Cog_05, Clover_01)
---

# Silksong sahnesi küçük parçalardan, gerçek derinlikle ve oyunun kendi materyalleriyle kurulur (ölçülen değerler)

- **Parça sayısı:** bir oda 1000–2000 SpriteRenderer, yalnız 70–140 farklı sprite (her biri 5–15 kez). Bir ekranda 105–313 sprite. Yoğunluğu 2–6 birimlik orta boy parçalar verir; küçük serpme parçalar 1080p'de görünmez.
- **Derinlik:** perspektif kamera z ≈ -38,1, fov 24, tek ekran ~29,2 × 16,6 birim; parçalar z ≈ -11 (ön) … +40 (arka). Paralaks script değil, gerçek z. Sıralama kamera uzaklığı (view depth); hepsi sorting layer Default/0.
- **Ton:** kamera önündeki silüetler saf siyah, oyun düzlemi tonsuz (1,0), arka plan 0,2–0,75 ve renksiz; renk sprite'tan ve ışıktan gelir. Parçaların %40–85'i döndürülmüş, %30–55'i aynalanmış, ölçek 0,85–1,35. Gerçek odada saf siyah payı ~%40.
- **Çözünürlük:** sahne parçaları 64 px/birim (1080p'de ~1:1); Hornet sprite'ı 3,34 birim, collider 2,08 birim.
- **Materyaller:** sahne parçalarının ~%90'ı `Crossroads_Material` (shader `Sprites/Lit`). Parlamalar `Sprites/Screen` / `UI/BlendModes/Screen`; saf ekleme shader'ı `Sprites/Approximate Linear Dodge` (paylaşılan shader paketinde). Kırılan cam için `Custom/Sprites-Refraction` ve arka planı bulanıklaştıran `BlurPlane` var (henüz kullanılmadı).
- **Animasyon:** 1715 klibin 1143'ü 12 fps; hızlı saldırılar 15–20 fps. Hornet boss Run 8 kare, Idle 6 kare.
- **Sahne kuralları:** kökte `TileMap` etiketli `tk2dTileMap` (genişlik/yükseklik = kamera sınırı), `SceneManager` etiketli `CustomSceneManager`, en az bir `TransitionPoint` ve çocuğunda `HazardRespawnMarker`. Terrain katmanı 8, hero 9, kapı tetikleyici 13.

İlgili: [[2026-10-07-biyom-cam-ocaklari-buz-mavisi]], [[2026-10-07-oyun-vinyeti-karanlik-seviyesi]]
