---
type: decision
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong, mod, sahne, kayit, bepinex]
source: Windows oturumu 2026-10-07 (design/notes-sahne-yolu.md, src/SunkenForge/RoomBuilder.cs, SaveHygiene.cs, RoomSpec.cs)
---

# Karar: v0.1 odaları kullanılmayan `Demo End` sahnesi kabuk yapılarak çalışma anında kurulur; v0.2'de boş gerçek sahneler; bizim sahne adları kayda hiç girmez

## Bağlam
Bölgenin odalarının oyunda birer sahne olarak var olması gerekiyor. Mevcut bir odanın üstüne set kurmak (Room_Forge denemesi) karışık sonuç verdi: odanın kendi parçaları ve Forge Daughter setin içinden görünüyordu.

## Karar
1. **v0.1 (ön oda + arena): Yol B.** Tam oyunda hiç yüklenmeyen demo kapanış sahnesi `Demo End` kabuk olur. `RoomBuilder` içini boşaltır; `CustomSceneManager` (ilk iş), boyut taşıyan `tk2dTileMap`, zemin collider'ları (katman 8), kapılar ve `HazardRespawnMarker`'ı kodla kurar. Kapılar `SceneTeleportMap`'e yalnız bellekte eklenir.
2. **Giriş:** Dock_13 dibinde x=12 duvarına kapı tipi geçiş (x 13,2, y 8) + çalışma anında çıkıntı. Tasarımdaki eski tahmin (x 0–3) kayanın içindeydi.
3. **v0.2 (7 oda): Yol C.** İçinde oyun scripti olmayan boş sahneler Unity 6000.0.50f1'de pakete derlenip Addressables'a eklenir (Unity editörü kurulumu gerekecek, 6–10 GB, Yusuf'a sorulacak).
4. **Kayıt hijyeni (SaveHygiene):** H1 `scenesVisited`/harita, H2 koza sahnesi (ölümde Dock_13'ün kendi `Hero Corpse Marker (9)` noktasına), H3 respawn ayarları atlanır; H6 kayıttan önce emniyet taraması. Bizim sahne adları kayda yazılmaz; mod kaldırılınca kayıt temiz kalır.
5. Oda içeriği `room.json` + `layout.json` setinden (`tools/biome/dress_room.py`); karanlık seviyesi -1 ve nötr kamera rengi `room.json`'da.

## Neden
- Yol B'de yeni araç zinciri yok; kapı + oda + hijyen hattını en kısa yoldan uçtan uca kanıtladı.
- Oyun sabit sahne listesi tutmuyor: anahtar `"Scenes/" + ad`; `Demo End` katalogda var (1 konum, 513 bağımlılık).
- Oyun sahne adını üç yerde kendiliğinden kayda yazıyor; mod kaldırılınca oyuncu `Tut_01`'de uyanır ve koza kaybolurdu.
- Oyun içinde doğrulandı (2026-10-07): Dock_13 → kapı → oda → kapı → Dock_13, 0 hata, `scenesVisited` bizim sahneyi içermiyor, `sceneLoaded` `RefreshTilemapInfo`'dan önce çalışıyor.

## Reddedilen alternatifler
- **Yol A** (Unity'de oyun bileşenleriyle tam sahne): stub proje, MonoScript eşleme, shader ve prefab referansları; içerik hattımız zaten PNG + layout.
- Mevcut bir odanın üstüne set: oda tam örtülemiyor, her şey kamera uzaklığıyla sıralanıyor.
- Sahne adını genel olarak değiştirmek (override): birçok bileşen `gameObject.scene.name`'i doğrudan okuyor.
- Dock_14 / Ward_04 kabuk: kalıcı eşyaları var, normal yolla erişiliyor.

## Sonuçlar / riskler
- Eksik: gizli duvar (kapı hep açık), arena kamera kilidi, haritada Dock_13 gösterimi, oda içinde ölüm/hazard testi (H2 oyunda denenmedi).
- H6 yalnız üst düzey string/HashSet/List alanlarını tarar; iç içe veri (`StoryEvents[].SceneName`) kapsanmıyor. v0.2'de odalara toplanabilir eşya konmadan kapatılmalı.
- Kayıt güvenliği kuralları geçerli: kod gerçek kayıtlara dokunmaz, yalnız oyunun bellekteki PlayerData'sına bizim sahne adlarının girmesini engeller.

## İlgili
- [[2026-10-06-kayit-yonlendirme-diske-gomulu-dll]]
- [[2026-10-07-oyun-vinyeti-karanlik-seviyesi]]
- [[notes-sahne-yolu|Sahne yolu notu]]
