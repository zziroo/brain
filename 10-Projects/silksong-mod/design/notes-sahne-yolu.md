---
type: resource
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong-mod, tasarim]
source: Silksong mod oturumu (2026-10-07); decompile'dan sahne yolu notları
---

# Sahne yolu: kendi odalarımızı oyuna nasıl ekleriz

> Tarih: 2026-10-07. Kaynak: decompile `D:\SilksongMod\work\decomp\` (satır numaraları bu dökümde; yol önekleri `Assembly-CSharp/`, `TeamCherry.TK2D/`), `work\scan\*.json`, UnityPy ile okunan paketler (mod kopyası, build 22479045): `resources.assets` içindeki `SceneTeleportMap`, `globalgamemanagers` (etiket, katman, çarpışma matrisi), sahne paketleri `demoend`, `dock_13`, `dock_14`, `ward_04`.
> Kod yazılmadı, oyun açılmadı. Doğrulanmamış her şey `[doğrula]` ile işaretli.
> Soru: gizli duvar/kapı ile Dock_13'ten girilen, kapıdan Dock_13'e dönülen odalar (v0.1: ön oda + arena, v0.2: 7 oda) nasıl eklenir?

---

## 1. Kısa cevap

- **v0.1 (ön oda + arena): Yol B, kabuk sahne = `Demo End`.** Oyunun demo sürümünün kapanış sahnesi. Tam oyunda hiçbir yer onu yüklemiyor (tek referans demo modu, `GameManager.cs:989-997`). Küçük (7 kök nesne), kapısı yok, düşman yok, kalıcı öğe yok. İçini runtime'da temizleyip odayı kodla kurarız. Ön oda ile arena aynı sahnede yan yana durur (sahne boyutunu biz belirleriz), arenayı `CameraLockArea` kilitler. Unity editörü gerekmez.
- **v0.2 (7 oda): Yol C, boş gerçek sahneler.** Unity 6000.0.50f1 ile içinde **hiç oyun scripti olmayan** N boş sahne (`SunkenForge_R1` … `R7`, `SunkenForge_Arena`) tek bir AssetBundle'a derlenir. Eklenti açılışta paketi yükler ve Addressables'a kendi `ResourceLocationMap`'ini ekler (`Scenes/SunkenForge_*` anahtarları). Bundan sonra oyunun kendi `SceneLoad`'u, `TransitionPoint`'leri, ölüm ve bench respawn'u yamasız çalışır. İçeriği yine eklenti kurar.
- **Yol A (Unity'de oyun bileşenleriyle tam sahne) önerilmez.** Oyun DLL'leriyle stub proje, MonoScript eşleme, shader ve tk2d referansları, oyun prefab'larına erişememe. İçerik hattımız zaten PNG + `layout.json` (SceneDress). Unity'de sahne tasarlamak bu hatta bir şey katmıyor, bakım yükü getiriyor.
- **Ortak çekirdek `RoomBuilder`.** SceneDress'in büyümüş hali: sahneye oyunun beklediği nesneleri (TileMap boyut taşıyıcı, `CustomSceneManager`, kapılar, zemin collider'ları, hazard respawn, kamera kilidi) ve görselleri kurar. Kabuk (B) ya da boş sahne (C) fark etmez. v0.1 → v0.2 geçişinde çöpe giden iş yalnız kabuk temizliği.
- **Kayıt hijyeni yoldan bağımsız.** Oyun sahne adını `PlayerData`'ya üç yerde kendiliğinden yazar: `scenesVisited`, `respawnScene`, `HeroCorpseScene`. Üç hedefli yama ve kayıttan önce bir emniyet kontrolüyle `PlayerData`'ya hiç kabuk ya da mod sahnesi adı girmez. Mod kaldırılınca kayıt temiz kalır (bkz. §4.3). Sahne adını genel olarak değiştirmek (override) gereksiz ve riskli.

Neden B şimdi: yeni araç zinciri yok, en kısa yoldan kapı + oda + hijyen hattını uçtan uca kanıtlar. Neden v0.2'de B değil: tek kabuk = tek sahne adı. 7 oda için ya aynı sahneyi tekrar tekrar yüklemek (oyun destekliyor ama kırılgan) ya da kendi sahte geçiş sistemimizi yazmak gerekir. C'de her oda gerçek bir sahne, geçişler oyunun kendi geçişi.

---

## 2. Oyun sahneyi nasıl yüklüyor (doğrulandı)

1. **Anahtar `"Scenes/" + SceneName`.** `SceneLoad.BeginRoutine` (`SceneLoad.cs:153`). Önce `ScenePreloader`'a bakar (`:154`). `SceneLoadInfo.SceneResourceLocation` doluysa onu, değilse adresi `Addressables.LoadSceneAsync(..., LoadSceneMode.Additive, activateOnLoad: false)` ile yükler (`:177-188`). `TransitionPoint.Start` → `SetTargetScene` lokasyonu önceden `Addressables.LoadResourceLocationsAsync("Scenes/" + hedef)` ile çözer (`TransitionPoint.cs:181-193, 459-482`) ve `SceneResourceLocation` olarak geçirir (`:357-369`). `GameManager.LoadScene` de aynı anahtarı kullanır (`GameManager.cs:3065-3078`).
   **Sonuç:** sabit bir sahne listesi yok. Addressables'ta anahtarı olan her sahne yüklenir. Katalog `StreamingAssets\aa\catalog.bin`, Addressables **2.5.0** (`aa\settings.json`), sahne paketleri `aa\StandaloneWindows64\scenes_scenes_scenes\*.bundle` (590 adet). MonoScript'ler ayrı pakette (`94696d…_monoscripts.bundle`), shader'lar `shaders_assets_all.bundle`. `Unity.Addressables.dll` / `Unity.ResourceManager.dll` içinde `ResourceLocationMap`, `ResourceLocationBase`, `AddResourceLocator`, `LoadContentCatalogAsync`, `SceneProvider` tipleri mevcut.
2. **Geçiş akışı** (`GameManager.BeginSceneTransitionRoutine`, `GameManager.cs:647-885`):
   - `entryGateName = info.EntryGateName` (`:683`), `previousMapZone = sm.mapZone` (`:699`). Çıkılan sahnede `CustomSceneManager` yoksa burada NullReference olur, geçiş kilitlenir.
   - Aynı sahneyi yeniden yükleme destekli: eski kopyadaki `GuidComponent`'ler silinir (`:739-750`).
   - `ActivationCompleteAction` (`:783-817`): eski sahne **adıyla** kaldırılır (`SceneManager.UnloadScene`, `:786`, `:893-901`), sonra `RefreshTilemapInfo(hedef)` (`:788`).
   - `CompleteAction` (`:818-832`): `SetupSceneRefs`, `BeginScene` (kahraman giriş noktasına konur, `:3590-3631`), map zone değiştiyse `EnteredNewMapZone` (`:824-827`), `gameMap.LevelReady()`.
   - `FinishAction` (`:838-854`) → `OnNextLevelReady` → `EnterHero` (`:3108-3166`, `:3319-3391`).
3. **Sahne adı** aktif sahnenin adından gelir; sonundaki `_boss`, `_pre`, `_additive`, `_bellway`, `_mapper`, `_caravan` gibi ekler kırpılır (`GameManager.cs:3832-3881`, `WorldInfo.cs:13-17`). **Kural:** bizim sahne adlarımız bu eklerle bitmemeli (`SunkenForge_Arena` uygun, `SunkenForge_boss` değil).
4. **Gameplay sayılma:** adı menü/sinematik listelerinde olmayan her sahne gameplay (`GameManager.cs:3967-4038`). İstisna: sahnede `InGameCutsceneInfo` varsa gameplay sayılmaz (`:4007`, `InGameCutsceneInfo.cs`). `Demo End`'de bu bileşen var, yok edilmeli.
5. **Sahnede olması gerekenler:**
   - `TileMap` etiketli **kök** nesnede `tk2dTileMap` (`GameManager.cs:3883-3934`). `width`/`height` sahnenin boyutudur: kamera sınırı (`CameraController.cs:824-834`, xLimit = width − 14,6, yLimit = height − 8,3; kırpma `:388-405`; kamera kilidi de bu sınıra kırpılır `:478-511`), sahne kenarı siyah çerçeveleri (`CustomSceneManager.cs:673-707`), kahraman sınır dışı kontrolü (`HeroController.cs:9771-9800`), harita ölçeği. Dünya koordinatı (0,0)–(width,height). `width`/`height` public alan (`tk2dTileMap.cs:43-45`); `data`/`spriteCollection` yoksa Awake bir şey kurmuyor (`:132-174`). Yani boş bir `tk2dTileMap` "boyut taşıyıcı" olarak yeter `[doğrula]`.
   - `SceneManager` etiketli nesnede `CustomSceneManager` (`GameManager.cs:3499-3511`): `mapZone`, renk ayarı (`ReferencesData`'dan, `:315-324`), müzik/atmos, `manualMapTrigger`, `borderPrefab`, `heroCorpsePrefab` (`CustomSceneManager.cs:47-193`). `scenePools` dizisi null ise `Awake` NullReference verir (`:292-299`); runtime'da eklerken nesne pasifken ekle, alanları doldur, sonra aktif et.
   - En az bir `TransitionPoint`. İstenen kapı bulunmazsa ilk kapıya düşülür, hiç kapı yoksa kahraman (−20000, 20000)'e konur (`GameManager.cs:3268-3317`).
   - Giriş kapısının altında `HazardRespawnMarker` olmalı (ya da `nonHazardGate = true`). Yoksa girişte `SetHazardRespawn(sceneEntryGate.respawnMarker)` NullReference verir (`HeroController.cs:9273-9282`, `PlayerData.cs:3800-3804`). `TransitionPoint.Start` çocuktaki marker'ı kendisi bulur (`TransitionPoint.cs:184-191`).
6. **Kapı doğrulama tablosu `SceneTeleportMap`.** `TransitionPoint` geçmeden önce hedef sahne + kapıyı bu tabloda arar. Yoksa "Transition will fail! Returning to current scene" der ve bulunduğu sahneye geri döner (`TransitionPoint.cs:305-351`). Tablo `Resources.Load("SceneTeleportMap")` (`SceneTeleportMap.cs:88-92`); `resources.assets`'ten okundu: 591 sahne, `lintVer` 8. Runtime ekleme API'si var ve kalıcı yazmıyor: `AddTransitionGate`, `AddRespawnPoint`, `AddMapZone` (`:94-127`; `SetDirty` boş, `:158-160`). Ayrıca kapı başına `skipSceneMapCheck` (private, `TransitionPoint.cs:69-70`). İlgili kayıtlar: `Dock_13` kapı `[right1]`; `Dock_14` `[left1]`; `Dock_10` `[right1, left1]`, respawn `[RestBench]`; `Demo End` zone NONE, kapı yok; `Tut_01` respawn `Death Respawn Marker Init`.
7. **Respawn doğrulama.** Ölüm ve "devam et" `GetRespawnInfo`'dan geçer (`GameManager.cs:1030-1089`, devam `:5303`). Sahne + işaret tabloda yoksa oyuncu `Tut_01` / `Death Respawn Marker Init`'e gönderilir (`:1055-1072`). Kayıt "şu an hangi sahnedeyim" bilgisini tutmaz: `SaveGameData(playerData, sceneData)` (`:4295-4296`); yüklenince oyuncu respawn noktasında (bench) uyanır.
8. **Harita bilinmeyen sahneyi kaldırır.** `GetMapZoneFromSceneName` → `NONE`, sahne bulunmazsa pusula gizlenir, konum (−1000, −1000) (`GameMap.cs:676-744`, `:1275-1371`). Haritası olmayan sahne `scenesMapped`'e girmez (`:1626-1649`). Oyun tamamlanma yüzdesi sahne listelerine bakmıyor (`PlayerData.CountGameCompletion`'da sahne yok).
9. **Fizik ve etiketler** (`globalgamemanagers`): Terrain = katman 8, Player = 9, Hero Detector = 13. Player ↔ Terrain ve Player ↔ Hero Detector çarpışır. Kapı tetikleyicileri katman 13'te (Dock_14 `left1`), `TransitionPoint` yalnız katman 9'a tepki verir (`TransitionPoint.cs:195-210`). Zemin: katman 8, tetikleyici olmayan collider (`GlobalEnums/PhysLayers.cs`; `HeroController.cs:226` `GROUND_LAYERS = 8448`). `HazardRespawnMarker` zemini maske 256 ile arar (`HazardRespawnMarker.cs:43-48`). Tutunulmasın istenen duvar: `NonSlider` bileşeni. Etiketler mevcut: `TileMap`, `SceneManager`, `TransitionGate`, `RespawnPoint`, `Harpoon Ring`, `Lava`.
10. **Gerçek arazi:** `TileMap Render Data/Scenemap/Chunk x y` altında EdgeCollider2D (katman 8) + "terrain collider non slider" BoxCollider2D'ler (Dock_13, Dock_14 UnityPy). Kamera kilidi kök nesne `CameraLockArea` katman 13'te; kilit, tilemap aynı sahneye gelene kadar bekler (`CameraLockArea.cs:122-138`).
11. **Kancalar:** `GameManager.SceneTransitionBegan` (static, `GameManager.cs:466`, çağrı `:711-723`), `OnFinishedSceneTransition` (`:464`). GameManager kendi `ActivationComplete` dinleyicisini bizden önce bağlar (`:706-710`). Bu yüzden bizim kurulum **`SceneManager.sceneLoaded`** içinde yapılmalı: aktivasyon sırasında, `RefreshTilemapInfo` / `BeginScene` / `EnterHero`'dan önce `[doğrula: sıra oyun içinde loglanmalı]`. O anda aktif sahne hâlâ eski sahne; yeni nesneler `SceneManager.MoveGameObjectToScene` ile hedefe taşınır.

---

## 3. Yol A: Unity'de kurulmuş tam özel sahne

### Gereksinimler
- **Unity 6000.0.50f1** (birebir sürüm; paket formatı ve tip ağaçları buna bağlı). Kurulum yaklaşık 6–10 GB `[doğrula]`; Windows Mono build desteği editörle gelir. İndirme kullanıcı kararı.
- **Stub proje:** oyunun DLL'leri (`Assembly-CSharp`, `Assembly-CSharp-firstpass`, `PlayMaker`, `TeamCherry.TK2D`, `TeamCherry.SharedUtils`, `TeamCherry.Localization`, `TeamCherry.NestedFadeGroup`, `TeamCherry.Splines`, `TeamCherry.Cinematics`, InControl, TMPro vb.) `Assets/Plugins` altına. Projede `Assembly-CSharp`'a derlenen hiçbir script olmamalı (her şey asmdef'te), yoksa isim çakışır `[doğrula: Lethal Company "custom moon" şablonlarındaki yöntem]`.
- **Script eşleme:** paketteki `MonoBehaviour` bir `MonoScript` nesnesine bağlıdır (sınıf adı, namespace, assembly adı). Oyunda tip assembly adı + tam sınıf adıyla çözülür; GUID/fileID yalnız editörde önemli. Yani DLL adları birebir aynı olmalı `[doğrula]`. Tip ağaçları açık derlenirse küçük alan farkları tolere edilir.
- **Shader:** oyunun shader'ları `shaders_assets_all.bundle`'da. Bizim materyaller ya Unity yerleşik `Sprites/Default`'a bağlanır ya da yüklemede shader adıyla oyunun shader'ına çevrilir (SceneDress'in `FindShader` mantığı).
- **Oyun varlıkları** (tk2d koleksiyonları, `Lava Box`, `Harpoon Ring`, `Breakable Wall`, düşman prefab'ları) başka projenin paketine GUID ile bağlanamaz. Yine runtime'da oyunun paketlerinden klonlanır. Yani A'da da runtime kurulum kodu gerekiyor.
- **Sahne minimumu:** §2.5'teki nesneler + zemin collider'ları (katman 8) + `HazardRespawnTrigger`/`Marker` + `CameraLockArea` + isteğe bağlı `_Managers/PlayMaker Unity 2D` (eski PlayMaker 2D olay köprüsü; yalnız 2D olaylı FSM kullanırsak `[doğrula]`).
- **Kayıt:** `Addressables.LoadContentCatalogAsync(bizimKatalog)` (projede Addressables 2.5.0 build) ya da §5'teki `ResourceLocationMap` + `SceneTeleportMap.AddTransitionGate/AddMapZone`.

### Riskler
- Oyun DLL'lerinin editörde açılması: `[ExecuteInEditMode]` sınıflar (ör. `HazardRespawnMarker`), statik başlatıcılar, eksik bağımlılıklar editörde hata ya da çökme verebilir.
- MonoScript eşleme sessizce kırılırsa bileşenler "missing script" olur; hata ancak oyunda görülür.
- Her oyun güncellemesinde stub projenin DLL'leri yenilenmeli (sürüm zaten sabit).
- Görsel tasarımı Unity'de yapmak, Python araçlarımızla (`tools/biome`, `dress_export.py`) ikinci bir hat açar.

### İş yükü
Editör kurulumu yarım gün, stub proje + ilk yüklenen sahne 1–3 gün (risk yüksek), sonrası her odada Unity'de elle tasarım. Kazanç: görsel düzenleme. Bizim hatta bu kazanç küçük.

---

## 4. Yol B: kabuk sahne (mevcut küçük bir sahneyi dönüştürmek)

### 4.1 Aday sahneler (`scan\*.json` + UnityPy)
Tarama: tilemap'li, `HealthManager`/NPC/item/bench/`BattleScene`/dükkân olmayan 51 sahne. En uygun üçü:

| Sahne | Boyut | Kapı (tablo) | Zone | İçerik | Artı | Eksi |
|---|---|---|---|---|---|---|
| **`Demo End`** (önerilen) | 33×30 | yok | NONE | 7 kök: `Title`, `TC logo`, `Demo End Sequence` (FSM), `_Managers`, `TileMap`, `TileMap Render Data` (2 EdgeCollider2D), `_SceneManager` (sceneType CUTSCENE). `InGameCutsceneInfo` var | Tam oyunda hiç yüklenmiyor; oyuncu beklentisi, kalıcı öğe, kapı yok; temizlemesi en az iş | Hiç test edilmemiş bir sahne; zone NONE (değiştirilmeli); `Scenes/Demo End` anahtarı runtime'da doğrulanmalı |
| **`Dock_14`** (yedek) | 29×17 | `left1` ← Dock_15 `right2` | DOCKS | 69 kök: fıçılar, `PersistentBoolItem` ×3, `Breakable` ×2, `SilkGrubCocoon` ×2, `HeroCorpseMarker`, ağ/çim | Zone, müzik, atmosfer zaten Docks | Normal yoldan da giriliyor: dönüşüm yalnız bizim kapıdan girilince; kalıcı öğeler yazmadan önce yok edilmeli; oyuncunun gördüğü bir oda |
| `Ward_04` | 35×28 | `left1` | WARD | 65 kök: zincirler, `PersistentBoolItem` ×4, `SilkGrubCocoon` ×4 | Genişliği arenaya uygun (32–36) | Bölge alakasız, kalıcı öğeler, oyuncunun gördüğü oda |

Test/geliştirici sahnesi bulunamadı (590 paket; `MapZone.TEST_AREA` kullanan sahne yok). `Demo Start` ve `Quit_To_Menu` gameplay değil (`GameManager.cs:3988-4005`), kullanılamaz.

### 4.2 Kabukta kapatılacaklar (`Demo End` için)
Hepsi `SceneManager.sceneLoaded` içinde, sahnenin `Start`'ları çalışmadan:
1. `InGameCutsceneInfo`'yu `DestroyImmediate` (yoksa sahne gameplay sayılmaz, §2.4).
2. `Title`, `TC logo`, `Demo End Sequence` kök nesnelerini yok et (FSM `Start`'ta başlar, ondan önce gitmeli `[doğrula: PlayMakerFSM Awake/OnEnable'da durum çalıştırıyor mu]`).
3. `TileMap Render Data` altındaki collider'ları kapat ya da sil.
4. `tk2dTileMap.width/height`'i odamızın boyutuna çek (ör. ön oda + arena ≈ 70×30). `RefreshTilemapInfo`'dan önce yapılmalı.
5. `CustomSceneManager` alanları (reflection): `sceneType = GAMEPLAY`, `mapZone = DOCKS` (yoksa DOCKS → NONE geçişi `EnteredNewMapZone` çalıştırır, `GameManager.cs:824-827, 2293-2325`), `manualMapTrigger = true`, `sceneBordersMask = 0` (kendi kenarımızı çizeriz), `atmosCue = null`, `darknessLevel`, `environmentType = 4` (Metal).
6. Sonra `RoomBuilder` odayı kurar (zemin, kapılar, hazard, kamera kilidi, görseller).

`Dock_14` için ek: dönüşüm yalnız `gm.entryGateName` bizim kapı adıysa; `left1` kapısı, `PersistentBoolItem`/`Breakable`/`SilkGrubCocoon`/`HeroCorpseMarker` nesneleri `Start`'tan önce yok edilir `[doğrula: PersistentBoolItem yok edilince SceneData'ya yazıyor mu]`.

### 4.3 PlayerData etkileri ve önlemler (A ve C için de aynı)

| Oyunun yazdığı | Nerede | Önlem yoksa | Önlem |
|---|---|---|---|
| `scenesVisited.Add(sahne)` | `CustomSceneManager.AddSceneMapped`, `CustomSceneManager.cs:464-474, 709-726` | Kabuk adı listeye girer. Zararsız (haritası yok, `GameMap.cs:1638-1647`) ama kirli | **H1:** `manualMapTrigger = true` (Start'tan önce) |
| `respawnScene` + `respawnMarkerName` + `mapZone` | `GameManager.SetDeathRespawnSimple`, `GameManager.cs:2480-2486, 2617-2621`; bench FSM `SetDeathRespawnV2.cs:36-47` | v0.1'de bench yok. v0.2'de mod kaldırılınca işaret tabloda olmaz → oyuncu `Tut_01`'de uyanır (`GameManager.cs:1055-1072`) | **H3:** mod alanında prefix: `PlayerData`'ya güvenli yedek `Dock_10` / `RestBench` yazılır, gerçek bench mod kaydına. `GetRespawnInfo` postfix'i mod kaydına göre bizim sahneyi döndürür (+ `AddRespawnPoint`) |
| `HeroCorpseScene`, `HeroDeathScenePos`, `HeroDeathSceneSize`, `HeroCorpseMarkerGuid` | `HeroController.Die`, `HeroController.cs:9405-9426` | Mod kaldırılınca koza gidilemeyen sahnede kalır, rosary kaybolur (Dock_14'te vanilla odada bizim koordinatta belirir) | **H2:** ölüm kaydından önce (`PreparePlayerDataForSave` prefix, `GameManager.cs:4482`; ölüm kaydı `PlayerDead`, `:954-982`, `SaveGame` `:974`) koza `Dock_13` gizli kapının önüne taşınır, GUID null, boyut 35×76 |
| `hazardRespawnLocation` | `PlayerData.cs:3800-3810`, `HeroController.cs:9273-9282` | Sahne adı yok, geçici | Gerek yok (kapıya marker şart) |
| `environmentType` | `CustomSceneManager.cs:326` | Geçici, sonraki sahne ezer | Gerek yok |
| `SceneData` kalıcı öğeleri | `PersistentBoolItem` vb. (sahne adı + ID anahtarlı) | Kabuktaki öğeler yazabilir | Kabuk öğelerini `Start`'tan önce yok et; bizim odalarda oyunun kalıcı bileşenleri yok, durum mod kaydında |
| `nonLethalRespawn*`, `tempRespawn*` | `GameManager.cs:2488-2493, 3148-3153`, `HeroController.cs:9366` | Yalnız memory sahneleri | Kullanmıyoruz |

- **H6 emniyet ağı:** `PreparePlayerDataForSave` prefix'i her kayıttan önce `respawnScene`, `tempRespawnScene`, `nonLethalRespawnScene`, `HeroCorpseScene`, `scenesVisited`'ta kabuk/mod sahne adı arar. Bulursa güvenli değere çevirir ve uyarı loglar. Kayıt dosyasına kod yine dokunmaz; yalnız bellekteki `PlayerData` düzeltilir.
- **Başarımlar:** sahneye girişe bağlı başarım kodda bulunmadı (`TransitionPoint.cs:400` yalnız kuyruğu boşaltıyor) `[doğrula: FSM'lerden tetiklenen başarımlar; kabuk FSM'leri yok edildiği için risk düşük]`.
- **Harita/Shakra:** odamız haritada yok, pusula gizlenir. Pusulanın Dock_13'ü göstermesi için `GameMap.OverrideSceneName("Dock_13")` (`GameMap.cs:706-711`). `LevelReady` override'ı sildiği için (`:680`) çağrı `OnFinishedSceneTransition`'dan sonra yapılır.
- **Mod kaldırılınca:** H1–H3 + H6 ile `PlayerData`'da mod izi yok, oyuncu son vanilla bench'te uyanır. Önlemler atlanırsa en kötü durum: `Tut_01`'de uyanma ve koza kaybı. Kayıt bozulmaz, oyun açılır.

### 4.4 Sahne adını değiştirmek (override) neden gereksiz
`GameManager.sceneName`'i Harmony ile sahte bir isme çevirmek mümkün (`UpdateSceneName`, `GameManager.cs:3832-3846`), ama birçok bileşen doğrudan `gameObject.scene.name` kullanıyor (`CustomSceneManager.cs:437`, `InGameCutsceneInfo`, kalıcı öğeler). İki isim tutarsız kalır. Sahte isim yüklenemediği için respawn/koza yazımlarını yine yönlendirmek gerekir. Hedefli yamalar (H1–H3, H6) aynı işi daha az riskle görür.

### 4.5 Riskler
- `Demo End` tam oyunda hiç yüklenmedi: bağımlı paketlerinde demoya özel bir şey olabilir. İlk prototip adımı bunu ölçer.
- Kabuğun kendi `Awake`/`OnEnable`'ları bizim kancamızdan önce çalışır (FSM, TextMeshPro, `LocaliseSprite`).
- Kurulum yarıda patlarsa sahnede `CustomSceneManager` kalmayabilir: çıkışta `sm.mapZone` NullReference (`GameManager.cs:699`) → kilit. `RoomBuilder` önce `CustomSceneManager`'ı kurmalı, hata halinde Dock_13'e geri geçiş denemeli.
- Tek kabuk = tek oda adı. Çok oda için aynı sahneyi yeniden yükleme (`GameManager.cs:739-750`; hedef oda giriş kapısı adında kodlanır, ör. `sfR2_left1`) mümkün ama kırılgan; v0.2'de C'ye geçmenin sebebi bu.

---

## 5. Yol C: boş gerçek sahneler + runtime içerik (v0.2 önerisi)

### Fikir
Unity'de içinde yalnız bir boş kök nesne olan sahneler. Hiç oyun scripti yok, yani stub proje, MonoScript eşleme ve shader sorunu yok. İçerik `RoomBuilder` ile runtime'da kurulur (B ile aynı kod, temizlik adımı yok).

### Gereksinimler
1. Unity 6000.0.50f1 (A ile aynı kurulum). Boş proje + bir editör scripti: `SunkenForge_R1` … `R7`, `SunkenForge_Arena` (+ birkaç yedek) sahnelerini üretir, `BuildPipeline.BuildAssetBundles` ile tek pakete (`sunkenforge_scenes.bundle`, LZ4) derler. Addressables build gerekmez.
2. Eklenti açılışta (SaveGuard doğrulandıktan sonra): `AssetBundle.LoadFromFile`, paketi açık tutar. Her sahne için `new ResourceLocationBase("Scenes/SunkenForge_R1", <paketteki sahne yolu>, typeof(SceneProvider).FullName, typeof(SceneInstance))`, hepsi bir `ResourceLocationMap`'e, sonra `Addressables.AddResourceLocator(map)`. Paket zaten yüklü olduğu için lokasyonun bağımlılığı yok; `SceneProvider` sahneyi `SceneManager.LoadSceneAsync(internalId)` ile açar `[doğrula: Addressables 2.5 SceneProvider iç işleyişi]`.
3. `SceneTeleportMap.AddTransitionGate` (her oda kapısı + Dock_13'teki kapı), `AddMapZone(oda, DOCKS)`, v0.2 bench için `AddRespawnPoint`.
4. `sceneLoaded` kancası `SunkenForge_*` sahnelerinde `RoomBuilder`'ı çalıştırır.

Daha sağlam zamanlama istenirse: bağımlılıksız küçük bir `SunkenForge.SceneHooks.dll` (tek `MonoBehaviour`, yalnız UnityEngine) hem Unity projesine hem `BepInEx\plugins`'e konur. Boş sahnenin kökü bu bileşeni taşır, `Awake`'i eklentiye olay gönderir. Aktivasyon sırasında, kesin olarak `RefreshTilemapInfo`'dan önce.

### Artılar
- Her oda gerçek ve ayrı bir sahne. Odalar arası geçiş, ölüm, devam et, bench respawn oyunun kendi koduyla çalışır.
- Kabuk temizliği yok, vanilla sahneye bağımlılık yok.
- Mod kaldırılınca paket ve lokasyonlar da gider. Hijyen (H1–H3, H6) aynen geçerli.

### Riskler
- Lokasyon kaydı API'si ve `SceneProvider` davranışı prototipte doğrulanmalı. Yedek: Addressables 2.5.0 ile gerçek katalog build edip `LoadContentCatalogAsync`.
- Unity kurulumu (disk, indirme) kullanıcı kararı. Yeni oda adı gerekirse paket yeniden derlenir (baştan birkaç yedek sahne üretilerek azaltılır).

### Elenen alt yollar
- **C2: `SceneManager.CreateScene` ile runtime sahne.** Oyunun geçişi `AsyncOperationHandle<SceneInstance>` istiyor (`SceneLoad.cs:50, 177-235`). Ya özel `GameManager` geçişini baştan yazmak ya da Addressables iç sınıflarına Harmony gerekir. Ölüm/bench/`TransitionPoint` hepsi Addressables anahtarından geçtiği için her biri ayrı yama ister. Elendi.
- **C3: editörsüz, UnityPy ile kopyalanmış boş paket** (`Demo End` paketini klonlayıp sahne yolu ve CAB adlarını değiştirmek). Unity kurulumunu atlar ama paket iç tutarlılığı riskli `[doğrula]`. Yalnız Unity kurulumu kesinlikle istenmezse denenir.

---

## 6. Giriş ve çıkış kapısı (Dock_13)

### Dock_13'ün dibi (UnityPy, `TileMap Render Data/Scenemap/Chunk 0 0` EdgeCollider2D)
- Tasarımdaki "x 0–3, y 5–10" tahmini **kayanın içinde** kalıyor. Sol kaya kütlesinin sağ kenarı: y 0–5 arasında x = 6; yukarı doğru basamaklı çıkıntı (y 5→x 7, y 6→x 10, y 7→x 11) ve y 8–24 arasında **x = 12'de dikey duvar**. Yani dipte sol alt, lavın üstünde basık bir oyuk (tavanı y 5–8).
- Lav üstü y ≈ 2,7 (önceki not). Lavın içinde küçük ada x 14–18, üstü y = 3. Sağ kütle x = 22'den (y 0–6) x = 15'e (y ≈ 12) basamaklanıyor.
- Tutunmasız kutular (`terrain collider non slider`): x ≈ 5,6–7,4 / y 1,8–8,8 ve x ≈ 9,4–11,7 / y 6,2–10,1.
- **Öneri:** kapı x = 12 duvarında, y ≈ 8–11. Altına runtime bir çıkıntı (katman 8 collider + görsel) ya da tasarımdaki Harpoon Ring'li geçiş `[doğrula: oyun içinde bakılacak]`.

### Kapı tipi
- **v0.1: kapı tipi (`isADoor = true`).** Oyuncu yukarı basarak girer. Arazi collider'ını kesmek gerekmez. Gizli duvar kırılana kadar kapı pasif (`TransitionPoint.SetIsInactive(true)`, `TransitionPoint.cs:605-621`).
- Sonra istenirse yürüyerek giriş (`left`): duvarın EdgeCollider2D noktalarına runtime bir çentik eklenir (`EdgeCollider2D.points` yazılabilir), içine tetikleyici konur, üstü görselle örtülür.

### Kurulum (Dock_13'ün `sceneLoaded` kancasında, `EnterHero`'dan önce)
1. Nesne adı `door_sunkenForge`. Adda `door` var; `top/right/left/bot` yok (`GetGatePosition` adın içinde arar, `TransitionPoint.cs:433-457`). Katman 13, `BoxCollider2D` (isTrigger, ≈2×3).
2. Nesne pasifken `AddComponent<TransitionPoint>()`; alanlar: `isADoor = true`, `targetScene = "Demo End"` (v0.2'de `SunkenForge_R1`), `entryPoint = "door_sf_in"`. `InteractableBase`'in private `interactLabel` alanı reflection ile (ör. Enter) `[doğrula: PromptLabels değeri]`. Prompt işaretçisi yoksa nesnenin kendi transform'u kullanılır (`InteractableBase.cs:332`).
3. Çocuk `Hazard Respawn Marker` + `HazardRespawnMarker` (zemine 256 maskesiyle iner).
4. `SceneManager.MoveGameObjectToScene(go, dock13)` → `SetActive(true)`.
5. Eklenti açılışında `SceneTeleportMap.AddTransitionGate("Dock_13", "door_sunkenForge")` ve hedef oda kapıları (`"Demo End"`, `"door_sf_in"`). Yoksa geri dönüş §2.6'daki kontrolde reddedilir.
6. Gizli duvar: kendi bileşenimiz (`IHitResponder` uygulayan, 3 vuruş), kırılınca bayrak **mod kaydına**. Oyunun `breakable_wall_v2` FSM'i `SceneData`'ya yazdığı için kullanılmaz.

### Çıkış (bizim odada)
`TransitionPoint` adı ör. `door_sf_out`, `targetScene = "Dock_13"`, `entryPoint = "door_sunkenForge"`. Dönüşte Dock_13 kancası kapıyı yine `EnterHero`'dan önce kurmalı. Geç kalırsa kahraman `right1`'den girer (`GameManager.cs:3310-3315`); kırılmaz ama yanlış yer.

---

## 7. Prototip planı (Yol B, `Demo End`)

Hepsi varsayılan kapalı bir debug özelliği, yalnız `SaveGuard.Verified` sonrası, mod kayıt klasöründeki kopya kayıtla.
1. **Anahtar kontrolü:** açılışta `Addressables.LoadResourceLocationsAsync("Scenes/Demo End")` sonucunu logla (1 bekleniyor). `SceneTeleportMap.AddTransitionGate("Demo End", "door_sf_in")` ve `("Dock_13", "door_sunkenForge")`.
2. **Işınlanma:** DevTeleport'un mevcut doğrulaması tabloya baktığı için, kapı eklendikten sonra `Scenes = Demo End:door_sf_in` ile çalışmalı `[doğrula]`.
3. **Kabuk + minimal oda:** `sceneLoaded`'da §4.2 adımları; düz zemin + iki duvar (katman 8), tilemap 40×25, giriş kapısı `door_sf_in` (marker'lı), çıkış kapısı → Dock_13. Görsel isteğe bağlı (mevcut SceneDress `layout.json`).
4. **Ölçüm logu:** `sceneLoaded` / `RefreshTilemapInfo` / `BeginScene` / `EnterHero` sırası, `gm.sceneName`, `IsGameplayScene()`, `sm.mapZone`, kamera `xLimit`/`yLimit`, kahraman konumu, `scenesVisited.Contains("Demo End")` (false beklenir), otomatik ekran görüntüsü.
5. **Tam tur:** çıkış kapısı → Dock_13 (kahraman `door_sunkenForge`'dan çıkmalı) → kapıdan tekrar `Demo End`.
6. **Hijyen testi:** odada hazard (respawn marker'a dönüş) ve ölüm. Log: `HeroCorpseScene` Dock_13'e çevrildi mi, `respawnScene` vanilla mı. H6 uyarısı çıkmamalı.

**C spike'ı (v0.2 öncesi, Unity kurulumu onaylanırsa):** (a) 2 boş sahneli paket derle; (b) `ResourceLocationMap` kaydı + DevTeleport ile `SunkenForge_R1`; (c) R1 → R2 oyunun kendi `TransitionPoint` geçişiyle.

---

## 8. Açık sorular ve `[doğrula]`

1. `SceneManager.sceneLoaded`, Addressables `ActivateAsync` ile yüklenen sahnede gerçekten `RefreshTilemapInfo`/`BeginScene`'den önce mi geliyor? (Prototip 4. adım loglar.)
2. `Scenes/Demo End` anahtarı tam oyun kataloğunda var mı (catalog.bin'de `Demo End.unity` geçiyor) ve bağımlı paketleri sorunsuz yükleniyor mu?
3. `Demo End Sequence` FSM'i ve TextMeshPro/`LocaliseSprite` `Awake`/`OnEnable`'da yan etki yapıyor mu?
4. Boş `tk2dTileMap` (data yok) yalnız boyut taşıyıcı olarak sorunsuz mu?
5. Runtime eklenen `CustomSceneManager`: `ReferencesData` renk ayarı, `borderPrefab`/`heroCorpsePrefab` null iken `sceneBordersMask = 0` yeterli mi? (H2 ile koza bizim sahnede hiç doğmaz.)
6. `PersistentBoolItem` yok edilince `SceneData`'ya yazıyor mu (yalnız Dock_14 yedeği için)?
7. Addressables 2.5'te elle kurulan `ResourceLocationBase` + `SceneProvider`, `AssetBundle.LoadFromFile` ile açılmış paketteki sahneyi buluyor mu? Bulmazsa gerçek katalog + `LoadContentCatalogAsync`.
8. Unity 6000.0.50f1 kurulum boyutu ve kaynağı (kullanıcı onayı gerekir).
9. Dock_13'te kapının kesin yeri ve erişim (x = 12 duvarı, y ≈ 8–11; çıkıntı mı, Harpoon Ring mi), oyun içinde bakılacak.
10. `PromptLabels` içinde kapı için doğru etiket; gerçek kapıların `TransitionGate` etiketi ve `GateSnap` kullanıp kullanmadığı.
11. Başarımların FSM tarafında sahne adına bağlı tetiklenip tetiklenmediği (kod tarafında bulunmadı).
12. Tasarım dokümanlarına yansıtılacaklar: `00-dlc-overview` §11 "yeni sahne" satırı ve `boss-01` §4 koordinatı bu notla güncellenmeli (karar kullanıcıda).

---

## 9. Prototip durumu (Yol B, 2026-10-07)

Kod yazıldı, derleniyor (0 uyarı). **Oyun içinde henüz çalıştırılmadı.** Hepsi `[RoomBuilder] Enabled = false` arkasında, yalnız `SaveGuard.Verified` sonrası. Dosyalar: `src\SunkenForge\RoomBuilder.cs`, `src\SunkenForge\SaveHygiene.cs`.

**Yapılan**
- **Kapı kaydı (kalıcı değil):** açılışta `SceneTeleportMap.AddTransitionGate`: `Demo End` → `door_sf_in`, `right1`; `Dock13Door` açıksa `Dock_13` → `door_sunkenForge`. Kayıt, init'in en son adımı (kurulum kancaları hazır olduktan sonra); her sahne yüklemesinde yeniden eklenir (asset yeniden yüklenirse diye). Yalnız bizim eklediğimiz (sahne, kapı) çiftleri hatırlanır. `AddMapZone`/`AddRespawnPoint` gerekmedi. Böylece DevTeleport'un tablo doğrulaması da geçer (`Demo End:door_sf_in`).
- **Anahtar kontrolü:** `Addressables.LoadResourceLocationsAsync("Scenes/Demo End")` sonucu loglanır (≥ 1 = tamam). 0 konum, başarısız arama ya da istisna olursa bizim eklediğimiz kapılar tablodan **yine çıkarılır** (`ClearInSceneLists` değil, vanilla kapılar kalır), Dock_13 kapısı kurulmaz, "ROOM DISABLED" loglanır: yüklenemeyen sahneye geçiş takılır.
- **Kabuk dönüşümü** (`sceneLoaded`'da; gelmezse `RefreshTilemapInfo` prefix'inde yedek kurulum): önce **bizim** `CustomSceneManager` (pasif nesne, `SceneManager` etiketi, GAMEPLAY, DOCKS, `manualMapTrigger`, `scenePools` boş dizi, `sceneBordersMask = 0`, `borderPrefab`/`heroCorpsePrefab`/renk eğrileri/aktör-enviro-shade snapshot'ları kabuktan; `act3ParticlesOverride` gibi null kalan serileştirilebilir alanlar oluşturulur), sonra boyut taşıyıcı `TileMap` (60×30, ayarlanabilir), sonra kabuğun kökleri `DestroyImmediate` (`_Managers` kalır; `_SceneManager` + `InGameCutsceneInfo` ancak bizimki varsa silinir, yoksa nötrlenir), sonra bizim yönetici aktif edilir. Oda: zemin (üstü y=4), sol duvar, sağ duvar (y 4–9 arası çıkış açıklığı), tavan, ortada tutunmasız bir platform; hepsi katman 8, tetikleyici değil, fizik materyali kabuğun arazi collider'ından. Kapılar: `door_sf_in` (kapı tipi, x=6; hem varış noktası hem Dock_13'e dönüş) ve `right1` (sağ kenarda yürüyerek çıkış); ikisinin de çocuğunda `HazardRespawnMarker`. Görseller düz renkli SpriteRenderer'lar + koyu arka plan. Kurulum sonunda doğrulama logu (tek yönetici, tek TileMap, 0 `InGameCutsceneInfo`, giriş kapısı var).
- **Takılma önlemi:** kritik adım düşerse "ROOM BUILD FAILED" bloğu ve kahraman girince otomatik Dock_13'e dönüş; her durumda `ReturnKey` (F6) oyunun kendi geçişiyle Dock_13'e döndürür. İkisi de oyun duraklatılmışken çalışmaz (`isPaused`, `GameState.PAUSED`, `timeScale <= 0`): `BeginSceneTransitionRoutine` PAUSED'u EXITING_LEVEL yapıp `Time.deltaTime = 0` ile kamera solmasını bekler, oyun kilitlenir. F6 hazard dönüşü sırasında da yok sayılır. Otomatik dönüş başarısız denemeyi 2 sn'de bir tekrarlar.
- **Dock_13 tarafı** (`Dock13Door`, varsayılan kapalı): `door_sunkenForge` kapı tipi, x=13,2, zemin y=8 (`Dock13DoorPos`), altında runtime çıkıntı x 11,8–14,8 (`Dock13Ledge`, tutunmasız). Kapalıyken odanın çıkışları `Dock_13:right1`'e gider.
- **Kayıt hijyeni** (§4.3; kayıt dosyasına dokunmaz, yalnız bellekteki `PlayerData`): H1 `CustomSceneManager.AddSceneMapped` ve `GameManager.AddToScenesVisited` mod sahnesinde atlanır; H2 `GameManager.PlayerDead` prefix'i kozayı Dock_13'te sabit bir vanilla noktaya taşır: sahnenin kendi `Hero Corpse Marker (9)` konumu (16,78; 65,28), kuyunun üst kısmı, right1 (Dock_15) tarafı; bizim kapı/çıkıntıdan bağımsız, mod kaldırılınca da geçerli (GUID null, boyut Dock_13'ünki); H3 `SetDeathRespawnSimple`, `SetNonlethalDeathRespawn`, `PlayerData.SetBenchRespawn` (3 overload) mod sahnesi için atlanır; H6 `PlayerData.OnBeforeSave` prefix'i (üç kayıt yolunun hepsi bundan geçer) tüm string/küme/liste alanlarında mod sahnesi adı arar, düzeltir, loglar. Yedek respawn anlık görüntüsü `PlayerData` örneğine bağlı (başka kayıt yüklendiyse kullanılmaz) ve `extraRestZone`'u da geri yükler. Hijyen kurulamazsa oda kapalı kalır (kapılar kaydedilmez). Ayrı mod kayıt dosyası bu prototipte gerekmedi.
- **Ölçüm:** `[timing]` satırları: `sceneLoaded`, `RefreshTilemapInfo` (başlangıç/bitiş + sahne boyutu), `BeginScene` (gameplay, yönetici bizim mi), `EnterHero`, kahramanın girişi bitirmesi. Varıştan `ReportDelay` sn sonra `REPORT` satırı (kahraman konumu, zeminde mi, kamera sınırları, kapılar, hijyen durumu) ve isteğe bağlı ekran görüntüsü (`room_*.png`).
- **Tıklamasız tur:** `AutoDoorDelay` + `AutoDoorUses = 2`: Dock_13'te kahraman kapının önüne konur ve kapı `TransitionPoint.Interact` ile kullanılır → oda → odadaki kapı → Dock_13. Odada sanat için SceneDress `AutoBuildScene = Demo End` yeterli (kod değişmedi).

**Nottan sapmalar**
- Kabuktaki yöneticiyi düzenlemek yerine yenisi kuruluyor (Yol C'de de aynı kod çalışsın diye); kabuğunki yalnız bizimki kurulamazsa yaşatılıp nötrlenir.
- Odada iki kapı var: `door_sf_in` hem giriş hem dönüş (vanilla kapılar gibi), ek olarak yürüyerek çıkış `right1`. Notun `door_sf_out` adı kullanılmadı.
- H6 kancası `PreparePlayerDataForSave` yerine `PlayerData.OnBeforeSave`: `GetSaveGameData` yolu `PreparePlayerDataForSave`'den geçmiyor, `OnBeforeSave`'den geçiyor.

**Kalan `[doğrula]`** (ilk oyun içi koşu)
1. `sceneLoaded`'ın `RefreshTilemapInfo`/`BeginScene`/`EnterHero`'dan önce geldiği (`[timing]` sırası; yedek yol logda "sceneLoaded did not run before" der).
2. `Scenes/Demo End` anahtarı ve paketin tam oyunda sorunsuz yüklenmesi; `Demo End Sequence` FSM'inin `Start`'tan önce silinince ekranı karartmadığı.
3. Boş `tk2dTileMap` ve runtime `CustomSceneManager` ile kamera sınırları, renkler (DOCKS ayarı), ses (aktör snapshot'ı) ve harita/pusula davranışı.
4. Kahramanın zeminde durması, duvara tutunup zıplaması, platforma inmesi (çarpışma ayarları); kapı istemi ("Enter") ve yukarı basarak giriş.
5. Dock_13 kapı yeri ve çıkıntı yüksekliği (lav adasından erişilebilir mi; görsel kontrol).
6. Hijyen: odada ölüm (H2 koza Dock_13'e taşındı mı), hazard dönüşü, "Quit to menu" kaydında H6 satırının "clean" olması.
7. Henüz yok: gizli duvar (kapı şimdilik hep açık), `CameraLockArea`/arena, `GameMap.OverrideSceneName("Dock_13")`, odada hazard.
8. **H6 açığı (v0.2'den önce kapatılmalı):** H6 yalnız `PlayerData`'nın üst düzey `string` / `HashSet<string>` / `List<string>` alanlarını tarar. İç içe veriler taranmıyor, ör. `StoryEvents[].SceneName` (`PlayerStory.RecordEvent`, `CollectableItem.cs:304`). Odalara toplanabilir öğe girmeden önce bu yollar da hedefli yama ya da tarama ile kapatılmalı.
