---
type: resource
project: silksong-mod
date: 2026-10-06
status: active
tags: [silksong-mod, tasarim]
source: Silksong mod oturumu (2026-10-06); oyun dosyalarından doğrulama notları
---

# Doğrulama notları (oyun dosyalarından)

> Tarih: 2026-10-06. Kaynak: oyun build 22479045 (mod kopyası), decompile (`D:\SilksongMod\work\decomp\`), UnityPy ile okunan Addressables paketleri.
> Tasarım dosyalarına dokunulmadı; düzeltmeler burada **öneri** olarak duruyor.
> Ham çıktılar: `D:\SilksongMod\work\` altında `scan\` (590 sahnenin bileşen dökümü), `dumps\` (HP listesi, FSM dökümleri, tool/crest/quest verisi, animasyonlar), `loc\` (çözülmüş EN metinleri, `_ALL_EN.tsv`), `ripped\` (Deep Docks sprite atlasları), `scripts\` (Python araçları, `venv-unitypy` içinde çalışır).
> AssetRipper kullanılmadı: UnityPy (ayrı venv, sistem Python'una dokunmadan) seçili paketleri doğrudan okuyabildi, alan değerleri için daha uygundu.

## Özet: tasarımı değiştiren bulgular

1. **Boss'lar PlayMaker.** Düşman/boss GameObject'lerinin %95'inde aynı nesnede PlayMakerFSM var (2844 HealthManager'ın 2708'i). Boss = `HealthManager` + `tk2dSpriteAnimator` + `DamageHero` hitbox'ları + `Control` FSM (60–159 state) + şablon `Stun Control` FSM. Kendi C# state machine'imizi yazma kararı geçerli.
2. **Oyunun lavı "1 maske + geri sıçrama" değil.** `HazardType.LAVA` zorla **2 maske** ve hazard respawn (en son `HazardRespawnMarker`'a ışınlanma). `Flame` bayrağı da hasarı 2'ye sabitler. İstenen davranış için lav hitbox'ı `hazardType = ENEMY`, `damageDealt = 1`, Flame bayrağı **olmadan** kurulmalı. Ya da oyunun kuralı benimsenir: 2 maske + respawn, Magma Bell yarıya indirir.
3. **HP 900 fazla.** Lace 2 = 800 HP. Act 2'de tipik iğne seviyesinde (nailUpgrades=1) bu ~73 vuruş ediyor. Scoria 900 HP ise ~82 vuruş, yani Lace 2'nin **üstü**. "Lace 2'nin biraz altı" hedefi için **~700 HP** ve Lace 2 benzeri `damageScaling` (≈64 vuruş).
4. **Arena 24 birim değil.** Kamera yarı genişliği 14.6, yani tek ekran 29.2 birim. Karşılaştırılabilir boss arenaları ~34–37 birim (Lace 2 savaş alanı ~37). Öneri: 32–36 birim.
5. **Cinder Fang hasarı çok yüksek.** Straight Pin 5, Pimpillo patlaması 15 (en güçlü kırmızı patlayıcı), Sting Shard 2–4. Öneri: saplanma 4, patlama 12, yanma 2 hasar/0,5 sn.
6. **Forge Daughter'ın geçmişi tasarımla çelişiyor.** Yerel bir soydan değil, Sitadel'in isteğiyle "Forgehome"dan "çok eskiden" gönderilmiş, "Forge Daughter" bir soy/rol adı. Öneri: Scoria, Forge Daughter gönderilmeden önceki docks ustası. Sitadel onun yerine Forge Daughter'ı yollamış. Bu çelişkisiz ve daha dokunaklı.
7. **Türkçe yok.** Oyun dilleri: EN, DE, ES, FR, IT, JA, KO, PT, RU, ZH. TR metni mod kendi enjekte etmeli.
8. **Clawline duvara kancalamaz.** `hasHarpoonDash`; hedefleri "Harpoon Ring" nesneleri (zincirde asılı varyantı var: `HarpoonRingChain`). Arenadaki "zincir" tutunma noktaları Harpoon Ring olarak tasarlanmalı.
9. **Emsal var.** Deep Docks boss'u Signis & Gron (Dock_09) son fazında lav şelaleleriyle alanı daraltıyor (`Lava Mode`, `Slide floors`). Scoria'nın faz 2 lav yükselmesi için doğrudan referans.
10. **PlayerData genişletilemez.** Sabit alanlar, reflection ile isimden okuma, Newtonsoft JSON. Ayrı mod kayıt dosyası kararı doğru.

## A. Teknik mimari

### Boss yapısı (örnek: Lace 2, `Song_Tower_01` > `Boss Scene/Lace Boss2 New`)
- Bileşenler: `tk2dSprite`, `tk2dSpriteAnimator`, `HealthManager`, PlayMakerFSM'ler (`Control` 159 state, `Stun Control`, `Multicircle`, `Circle Slash Catch`), `SpriteFlash`, `EventRegister`, `DeactivateIfPlayerdataTrue`. Saldırılar çocuk nesnelerde `DamageHero` (ör. `Thwip Slash`, `Combo Slash 1`). FSM bunları `SetDamageHero` ile açıp kapatır.
- Üst nesne `Boss Scene`: savaş başlangıcı/bitişi FSM'leri, `CameraLockArea` (savaş kamera kilidi), kapılar. Yenilgi bayrağı FSM ile PlayerData'ya yazılır (`SetPlayerDataBool defeatedBellBeast`, `spinnerDefeated`).
- Faz geçişi FSM'de: başta `GetHP`, sonra eşik = HP × oran, `CompareHP`. Oranlar: Lace 2 %75/%40, Khann %75/%40, Sister Splinter %80/%40, Widow %70, Moorwing %65 (rage), Bell Beast %80 (P2) ve %50 (rage), Signis %90/%70/…
- Stagger: şablon FSM `Stun Control`. Lace 2 için `Stun Combo`=13 (1,0 sn `Combo Time` içinde), `Stun Hit Max`=15. Tasarımdaki "12 isabet" bu düzende.
- C#'ta `BossSceneController` / `BossSequence` var ama Hollow Knight'tan kalma (Godhome). Silksong boss'ları bunu kullanmıyor.

### Can ve hasar (`HealthManager.cs`, `DamageHero.cs`, `HeroController.cs`)
- `HealthManager.hp` (int) ve `damageScaling` (Level1..5Mult): oyuncunun iğne seviyesine göre gelen hasarı çarpar (`ApplyDamageScaling`, HealthManager.cs:943). Tool vuruşunda seviye `ToolKitUpgrades`.
- İğne hasarı (PlayerData.cs:2896): nailUpgrades 0–4 için **5 / 9 / 13 / 17 / 21**.
- Boss'a hasar: `DamageEnemies` → `IHitResponder.Hit` → `HealthManager.TakeDamage`.
- Hornet'e hasar: `DamageHero.damageDealt` + `hazardType` → `HeroController.TakeDamage` (HeroController.cs:5275). Kurallar:
  - SPIKES, ACID, COAL: 1. **LAVA: 2.** Flame veya Void bayrağı: 2.
  - ENEMY ve EXPLOSION dışındaki hazard'lar `DieFromHazard` ile respawn ettirir.
  - Barbed Bracelet alınan hasarı ×2 yapar. Magma Bell (`Lava Charm`) ateş hasarını yarıya indirir (5 sn bekleme).
- Tüm sahnelerde düşman `DamageHero` değerleri: 0 (1925), **1 (7403), 2 (1815)**. 3 maske hiç yok. Tasarımdaki "1–2 maske, 3 yok" doğru.

### Deep Docks lavı
- Nesne `Lava Box`: `BoxCollider2D` (134.7×5.7) + `LavaBox` (yalnızca sıçrama efekti) + `DamageHero` (hazardType=LAVA, damage=2) + `DamageEnemies` + `NonBouncer`. Görsel `lava_set/LavaTop`, `LavaBase`, `lava haze`.
- Ayrıca `Coal Region` (hazardType COAL, FSM `Damage Hero`) ve `Spike Collider` (COAL_SPIKES, 1 maske).

### tk2d sprite ve animasyon
- Koleksiyon başına 1 atlas, **64 piksel/birim** (ör. `Dock Guard Cln` 106 sprite, `Forge Daughter Cln` 28 sprite).
- Klipler: 1463 klibin 1075'i **12 fps**. Diğerleri 15/20/18/30 (hızlı vuruşlar).
- Boss başına toplam kare: Signis 176, Gron 178, Moorwing 232, Widow 384, Lace 642. Medyan klip 4–5 kare, Idle 5 kare.

### Sahne yükleme
- Addressables anahtarı `"Scenes/" + SceneName` (SceneLoad.cs:153, GameManager.cs:3073). Sahneler `scenes_scenes_scenes\<isim>.bundle`.
- Geçiş: `TransitionPoint` (`targetScene`, `entryPoint`; kapı adları `left1`, `right1`, `top1`, `bot1`, `door1`), `GateSnap`, `HazardRespawnMarker`.
- Her sahnede `tk2dTileMap` (yoksa `GameManager.RefreshTilemapInfo` hata verir), `CustomSceneManager` (MapZone, Deep Docks için `DOCKS`) ve `CameraLockArea`'lar var.
- Yeni sahne için iki yol:
  - (a) Unity 6000.0.50f1'de kendi Addressables kataloğumuzu kurup `Addressables.LoadContentCatalogAsync` ile `Scenes/<Yeni>` anahtarı eklemek. Oyunun kendi `SceneLoad`'u yamasız çalışır.
  - (b) Küçük mevcut bir sahneyi (ör. Dock_14, 29×17) yükleyip runtime'da içeriğini değiştirmek.
- Gizli duvar standardı: `Breakable Wall` + şablon FSM `breakable_wall_v2` (83 adet; `Hits`=4 varsayılan, PlayerData/persistent bool ile kalıcı, "secret tone"). Gizli odayı açan maskeler `unmasker` FSM'i. Dock_11'de `explode_wall` örnekleri var.

### Kayıt (PlayerData)
- `PlayerData : PlayerDataBase`, `[JsonObject(MemberSerialization.Fields)]`. `GetBool`/`SetBool` reflection veya FieldAccessOptimizer ile çalışır. **Runtime'da alan eklenemez.**
- İsimli listeler: `Tools` (ToolItemsData), `ToolEquips` (crest), `QuestCompletionData`, `Collectables`. String anahtarlı oldukları için teknik olarak mod kaydı eklenebilir, ama mod kaldırılınca bilinmeyen anahtar riski var. Mod durumu ayrı dosyada tutulmalı. Tool/crest eklenirse kayıttan önce temizlenmeli.
- Kayıt yolu: `DesktopPlatform.Awake` (DesktopPlatform.cs:159–176) → `persistentDataPath/<SteamAccountID>/`, dosyalar `user{N}.dat`, `shared.dat`, yedekler `DesktopSaveRestoreHandler`. **Yönlendirme yama noktası burası**: `saveDirPath`, `roamingSharedData`, `desktopSaveRestoreHandler` Awake içinde kuruluyor. Postfix ile üçünü yeniden kurmak ya da Awake'i transpile etmek gerekir. BepInEx'in bu Awake'ten önce yüklendiği ilk çalıştırmadan önce log ile doğrulanmalı. Ayarlar ayrıca PlayerPrefs'te (registry, vanilla ile ortak).

### Tool ve Crest
- `ToolItem` (ScriptableObject, `ToolItemBasic` / `ToolItemSkill` / `ToolItemStatesLiquid`): `type` (Red / Blue / Yellow / Skill), `baseStorageAmount`, `replenishResource` (Shard), `usageOptions.ThrowPrefab`.
- Fırlatılan prefab'lar `herodynamic_assets_all.bundle` içinde. Hasar `DamageEnemies` üzerinde (`representingTool`, `damageAsset` → `DamageReference.value`).
- Tool hasarı ToolKit yükseltmesi başına **+%60** (`Gameplay.toolKitDamageIncrease` 0.6), ayrıca boss'un `damageScaling`'i uygulanır.
- Doldurma: tam depo = 40 shard (`toolReplenishCost`; kullanım başına 40/depo).
- Yanma ve zaman içinde hasar için mevcut sistem `DamageTag` (ör. `Dust Cloud`: 2 hasar/0,5 sn, tool hasarı).
- `ToolCrest` (SO): `slots[]` (Type, Position, AttackBinding, IsLocked), `heroConfig` (saldırı seti/tempo; `HeroControllerConfig`), sprite'lar ve `herocollections_assets_crest*` paketleri. İç adlar: Hunter (v1–v3), Reaper, Wanderer, Warrior (=Beast), Witch, Toolmaster (=Architect), Spell (=Shaman), Cursed, Cloakless.

### Yerelleştirme
- `resources.assets` içinde `Languages/<DİL>_<Sayfa>` TextAsset'leri, şifreli (anahtar `TeamCherry.SharedUtils.Encryption`'da). Okuma `TeamCherry.Localization.Language.Get(key, sheet)`.
- Mod metni için `Language.Get` prefix yaması ile kendi anahtarlarımızı döndürmek en basit yol.

## B. İçerik ve lore

| Konu | Bulgu |
|---|---|
| Deep Docks sahneleri | `Dock_01` … `Dock_16` (07 yok), `Dock_02b`, `03b–d`, `Dock_06_Church`, `Room_Forge`, `Room_Diving_Bell`. Komşular: `Bone_East_01/05/07/12/13`, `Bone_09`, `Bellway_02`, `Abyss_09`. |
| En alt lav | Harita (maps_assets_all) y-konumu en düşük: Dock_11 (51.53), Dock_13 (51.85), Room_Diving_Bell (51.89), Dock_12, Dock_15. **Dock_13**: Dock_15'in solunda çıkmaz dikey kuyu (35×76 tile), girişi sağ üstte (35.5, 65). Dipte lav (Lava Box y≈2.7) ve lavın üstünde yüzen bir item (15.3, 3.3). Coal ve spike bölgeleri var. |
| Bench'ler | Dock_01 (`bell_bench`, Bellway istasyonu tipi), Dock_06_Church, **Dock_10** (Dock_15 hub'ına bitişik), Room_Forge. Bellway: Dock_16 → Bellway_02. |
| Forge Daughter | `Room_Forge`'da. Hornet'e tool yapar (malzeme + ücret). "Sent from our Forgehome… at request of those holy bugs above… An age ago". "We Forge Daughters live to hone the craft". İşçiler "wound up", hâlâ basitçe çalışıyor. |
| Pinmaster | Plinney (iç adı PINSMITH), Bellhart. İğneyi biler, 4 yükseltme (`nailUpgrades`). "That the pins of our land all once held such shine". |
| Bell Beast / Bellway | Boss sahnesi `Bone_05_boss` (`Bone Beast`, HP 150). Yenilince `defeatedBellBeast`. Bellway sahnelerinde `Bone Beast NPC/Travel Interaction`: boss, Bellway taşıyıcısına dönüşüyor. |
| Deep Docks boss'ları | Lace 1: `Bone_East_12` (Room_Forge üstü, HP 250). Forebrothers Signis & Gron: `Dock_09` (720 + 520, lav fazı var). |
| Docks lore | `DOCKS_NOTE_1`: zil vuruşlarına göre Smokerock/Sweetsmelt sevkiyatı, "Mark of fealty". `DOCKS_NOTE_2`: "If the haunted continue their work, leave them be!". Gezgin notu: "more advanced in metalwork… natural heat source at its base". |
| Steel Soul | Var: `PlayerData.permadeathMode` (Off/On/Dead). Bazı sahnelerde `Steel Soul States` dalı var. |
| Shakra | Harita satıcısı/savaşçı kartograf. `HasDocksMap` bayrağı var. Yeni bölge haritası `maps_assets_all` içindeki GameMap prefab'ına eklenmeli; büyük iş. |
| Wish (görev) | `Quest`/`MainQuest`/`SubQuest` SO (FullQuestBase: targets, rewardItem, displayName, location, wallDescription, required…), 10 `QuestType` (Hunt, Grand Hunt, Gather, Courier, Donate, Journal, Sprint, Wayfarer, Herald, Steel Sentinel). Tahta listeleri: Belltown, Bonetown, Enclave, Pilgrim's Rest. İlerleme `PlayerData.QuestCompletionData` (isimle). |
| Crest slotları ((k) = kilitli) | Witch: S R R(k) B(k) B(k) B. Hunter: R B Y S + 3 kilitli. Toolmaster: R R R + 4 kilitli. Spell: S S S + 2 kilitli. Warrior: S R R + 2 kilitli. Reaper: S R R(k) B(k) B Y(k) Y. Wanderer: S R B(k) B(k) Y(k) Y Y. Neredeyse hepsinde 1+ Skill slotu var. |

### Boss HP tablosu (sahne HealthManager.hp; vuruş = nailUpgrades 0..4 için öldürme vuruşu)

| Boss | Sahne | HP | damageScaling L1..L5 | Vuruş (0/1/2/3/4) |
|---|---|---|---|---|
| Bell Beast | Bone_05_boss | 150 | 1,1,1,1,1 | 30/17/12/9/8 |
| Lace 1 | Bone_East_12 | 250 | 1,1,1,1,1 | – |
| Sister Splinter | Shellwood_18 | 310 | 1, .675, .575, .55, .5 | 62/52/45/35/26 |
| Widow | Belltown_Shrine | 360 | 1,1,1,1,1 | 72/40/28/22/18 |
| Moorwing | Greymoor_05_boss | 600 | 2, 1.3, 1, .9, .85 | 60/50/47/40/34 |
| Signis / Gron | Dock_09 | 720 / 520 | 1.6, 1.25, 1, .95, .9 | 90/66/56/45/38 (Signis) |
| Lace 2 | Song_Tower_01 | 800 | 1.75, 1.2, 1, .85, .85 | 89/73/62/58/45 |
| Crust King Khann | Memory_Coral_Tower | 1650 | 2, 1.35, 1.15, 1, .95 | 165/138/110/98/83 |
| (diğer) | | Trobbio 700, Last Judge 720, Lost Lace 1800, Grand Mother Silk 1204 | | |
| **Scoria 900** (Lace 2 skalası) | | 900 | | 100/82/70/65/50 |
| **Scoria öneri** | | **700** | 1.75, 1.25, 1, .9, .85 | 78/64/54/47/39 |

### Deep Docks düşmanları (kopyalanabilir şablonlar, hepsi FSM'li sahne prefab'ı)
Smelt Shoveller (`Dock Worker`) 30, Shield Dockworker 40, Flintstone Flyer (`Dock Flyer`) 30, Flintflame Flyer (`Dock Bomber`) 60, Deep Diver (`Dock Charger`) 90, Tar Slug 15 / Huge 85, Bone Circler 14 / Vicious 27. Animasyon kitaplıkları `tk2danimations_assets_areadocks`, sprite'lar `tk2dcollections_assets_areadocks` (PNG'ler `ripped\`).

## C. `[doğrula]` maddeleri

### boss-01-kilnwright-scoria.md

| Satır | Madde | Durum | Kanıt | Öneri |
|---|---|---|---|---|
| 14 | Pinmaster iğneyi biler | DOĞRU | Plinney, `PINSMITH_*` (Belltown sayfası), `nailUpgrades` 0–4 | "iğneyi döven yok" kalabilir. Not: Forge Daughter tool döver ("A smith? Hardly so crude!"). |
| 16 | Lav, zincir, kova, Forge Daughter Deep Docks'ta | DOĞRU | 14 sahnede `Lava Box`; Dock_01'de zincirler (`ChainLinkInteraction`, `LiftChain`); `DOCKS_FLINTSTONE_BUCKET`; Room_Forge | – |
| 21 | Hacı iğneleri, Bellway çan dilleri, Grand Gate menteşeleri anlatılıyor mu | BULUNAMADI | Metinlerde bu nesnelerin kökeni yok. Docks'un Sitadel'e metal/smelt gönderdiği var (`DOCKS_NOTE_1`). | Mod-özgün lore olarak kalabilir, ama "docks Sitadel'e smelt gönderirdi" çerçevesine bağla. |
| 27 | Forge Daughter'ın geçmişi | YANLIŞ (çelişki) | `FORGE_DAUGHTER_TALK_3`: Forgehome'dan, Sitadel isteğiyle, çok eskiden gönderilmiş, "ancient line" | Soy bağını kaldır. Scoria = Forge Daughter'dan önceki usta; Sitadel yerine onu getirtti. |
| 31 | Sahne adı ve kapı noktası | KISMEN | Aday: **Dock_13** dibi, sol duvar (x≈0–3, y≈5–10, lav y≈2.7). Alternatif: Dock_11 (haritada en alt, `explode_wall` örnekleri var). | Duvar geometrisi collider'dan doğrulanmadı. Oyun içinde konum bakılmalı. |
| 35 | En yakın bench | DOĞRU (konum), süre tahmini | Dock_10 RestBench → Dock_15 hub → Dock_13 | 30–40 sn makul ama ölçülmedi. |
| 58 | Arena ~24 birim (Lace 2 ile kıyas) | YANLIŞ | Kamera 29.2 birim. Lace 2 savaş kilidi x 50–58 (~37 birim, geniş mod ~54). Widow ~34, Bell Beast ~37, Signis ~37. | 32–36 birim. |
| 61 | Deep Docks lav hasar bileşeni | KISMEN | `Lava Box` = DamageHero(LAVA, 2) + LavaBox(efekt). Oyun davranışı 2 maske + respawn. | 1 maske + itme için ENEMY tipi, 1 hasar, Flame bayrağı yok. |
| 65 | Widow / Bell Beast'te alan daralması | BULUNAMADI | Bu iki boss'ta lav/alan daralması bulunmadı. Signis & Gron'da var (`Lava Mode`, lav şelaleleri, `Slide floors`). | Referansı Signis & Gron yap. |
| 71 | Widow, Moorwing, Khann HP | DOĞRU (değerler bulundu) | 360 / 600 / 1650 (Khann Act 3 hafıza boss'u). Lace 2 800. | Scoria 700 HP + Lace 2 benzeri skala. Faz eşikleri oyunda %75/%40 civarı, tasarımdaki %60/%25 de olur. |
| 183 | Tool renk sınıfları ve slot kuralları | DOĞRU | `ToolItemType` Red/Blue/Yellow/Skill; crest slotları tipli, bir kısmı kilitli | Kırmızı = saldırı/fırlatma, depolu, shard ile dolar. |
| 185 | Kırmızı Tool hasarları | DOĞRU (değerler bulundu) | Straight Pin 5 (depo 12); Sting Shard fırlatma 2 + tuzak 2 (çoklu vuruş) / diken 4 (depo 6); Threefold Pin 4; Tack 2; Pimpillo patlama 15; Curve Claws 3; Cogwork Saw 2 çoklu | 10/25/5 → **4 / 12 / 2 (0,5 sn)**, depo ~6–8. Yanma için `DamageTag` kullan. |
| 187 | Bell Beast → Bellway, Lace → ? | KISMEN | Bell Beast → Bellway doğru (`Bone Beast NPC` Bellway'lerde). Lace'in yetenek ödülü bulunamadı. Widow sahnesi `hasNeedolin` kontrol ediyor. | Örneği "Bell Beast → Bellway" ile sınırla. |
| 196 | 12 fps ve kare sayıları | DOĞRU | 1463 klibin 1075'i 12 fps. Boss toplamı 176–642 kare. Idle 5 kare. | ~160 kare alt sınırda ama Signis/Gron (~177) düzeyinde, yeterli. |
| 223 | PlayMaker mı C# mı | DOĞRU: PlayMaker | %95 FSM; `Control` + `Stun Control` | Kendi C# state machine kararı uygun. |
| 224 | HealthManager yeniden kullanımı | DOĞRU | `HealthManager` (hp, damageScaling, TakeDamage, IHitResponder) | Boss'a HealthManager + damageScaling ekle. Fazları kendi kodunda `hp` ile kontrol et. |
| 227 | PlayerData'ya alan ekleme | YANLIŞ | Sabit alan + reflection + JSON; runtime'da alan eklenemez | Ayrı mod kayıt dosyası (CLAUDE.md'deki karar). |
| 234 | Steel Soul modu var mı | DOĞRU | `permadeathMode`, `Steel Soul States` sahne dalları | Erişim kararı kullanıcıda. |

### 00-dlc-overview-sunken-forge.md

| Satır | Madde | Durum | Kanıt | Öneri |
|---|---|---|---|---|
| 32 | En alt lav seviyesi, sahne ve koordinat | KISMEN | Bkz. boss satır 31 (Dock_13 / Dock_11). Haritada `Dock_15_secret` diye ayrı bir gizli alan da işaretli. | Oyun içinde bakılmalı. |
| 51 | Shard ödül nesnesi | DOĞRU | `Shell Shard Fossil Dock` kırılabilir nesnesi (Bone_East_13); `HealthManager.shellShardDrops`; `explode_wall/.../Shard Flinger` | "Kırık shard deposu" = Shell Shard Fossil Dock kopyası. |
| 59 | Oyunun mevcut lavı | KISMEN | 2 maske + respawn (yukarıda) | Bölge kuralını buna göre seç. |
| 65 | Kopyalanabilir düşman sınıfları | DOĞRU | Düşmanlar C# sınıfı değil, FSM'li sahne nesneleri (liste B'de) | Sahne önyükleme + klonlama (HK modlarındaki preload deseni) ya da kendi C# davranışımız + oyun bileşenleri. |
| 91 | Mini-boss HP 300 (Splinter, Moorwing) | KISMEN | Splinter 310, Moorwing 600 | 300 Splinter düzeyi. Act 2 için 400–500 de düşünülebilir. |
| 100 | NPC yer değiştirme sistemi | KISMEN | Merkezi sistem yok. Sahne başına `PlayerDataTestResponse`, `DeactivateIfPlayerdataTrue/False`, `ActivateIfPlayerdata*` ile koşullu açma. | Ferrun'u Bellhart/Bonebottom sahnesine mod bayrağına göre runtime'da enjekte et. |
| 104 | Wish veri yapısı | DOĞRU | `Quest` SO + `QuestType` + `QuestBoardList` + `QuestCompletionData` | Yeni Quest SO runtime'da oluşturulup tahta listesine eklenebilir. İlerleme mod dosyasında tutulmalı. |
| 107 | Zaman ilerletme = bench kullanımı | BULUNAMADI | Genel gün/dinlenme sayacı bulunamadı. Forge Daughter üretimi anlık dükkân alışverişi. | Mod kendi sayacını tutsun (bench'e oturmayı veya sahne geçişini dinleyerek). |
| 110 | Crest veri yapısı, slot düzeni | DOĞRU | `ToolCrest` (slots, heroConfig, sprite'lar) | Slotlara en az 1 **Skill** ekle (oyunda neredeyse her crest'te var). Silk Skill crest'in parçası değil, ayrı `ToolItemSkill`. "Quench" ya crest'in özel hareketi (`hasCustomAction`/`heroConfig`) ya da ayrı bir Skill olmalı. |
| 125 | Oyun TR destekliyor mu | YANLIŞ | `Languages/` altında TR sayfası yok (10 dil) | TR'yi mod kendi sağlar (`Language.Get` yaması), oyun dilinden bağımsız ayar. |

## Doğrulanamayanlar ve sınırlar
- Konum/koordinatlar transform zincirinden hesaplandı (rotasyon yok sayıldı). Duvar ve zemin geometrisi (tilemap collider) okunmadı.
- Lace'in ödülü, Clawline ile ring'de asılı kalma süresi, bench'ten Dock_13'e koşu süresi oyun içinde ölçülmeli.
- Kayıt yönlendirmesi yalnızca kodda bulundu, test edilmedi. Modlu oyun açılmadan önce log ile doğrulanmalı (CLAUDE.md kuralı).
