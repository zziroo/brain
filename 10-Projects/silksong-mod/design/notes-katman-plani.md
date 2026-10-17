---
type: resource
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong-mod, tasarim]
source: Silksong mod oturumu (2026-10-07); katman planı notları
---

# Katman planı: bir oda katman katman nasıl kurulur

> Tarih: 2026-10-07. Araçlar: `tools/biome/bands.py` (bant tablosu), `band_stats.py` + `scene_pieces.py --bands` (gerçek sahne ölçümü), `scatter.py` + `scatter_rules.py` (yoğunluk geçişi), `rooms4.py` (birleşik oda NEW2-m), `make_grid4.py` (ızgaralar). Çıktılar `D:\SilksongMod\work\biome_probe4\`.
> Soru: sahne tek bir resim mi, arka ve ön katmanları planlıyor muyuz? Cevap: tek resim değil. Planı bu not.

---

## 1. Kısa cevap

- Oyunda bir ekran tek resim değil. Gerçek sahnelerde bir 1920×1080 ekranda **105–313 ayrı sprite** var. Her biri kendi derinliğinde (z) duruyor. Kamera perspektif, z = −38,1'de. Uzaktaki parça küçük görünür ve yavaş kayar (paralaks).
- Biz de böyle kuruyoruz. Oda **7 derinlik bandına** bölünür: `B0` fon … `B6` kamera silüeti. Bir parçanın bandını z'si belirler (`bands.band_of`).
- Her bandın bir görevi, tonu, sisi, bulanıklığı, ışık payı ve yoğunluk hedefi var (§2, §4).
- Büyük, dikkat çeken parçaları elle koyarız (kahraman parça). Küçük, çok tekrarlanan parçaları kuralla dağıtırız (`scatter.py`): moloz, cam kırığı, alet, braket, zincir, uzak kütle, sis kartı, ön plan silüeti. Kurallar tohumlu, aynı tohum aynı odayı verir.
- Oyuna aktarım: `layout_NEW2-m.json` her parçayı dünya koordinatıyla (X, Y, Z) taşır. Kendi sahnemizde parçayı gerçek Z'sine koyarız; ölçek ve paralaks kendiliğinden doğru çıkar. Projeksiyon gerekmez (§7).

---

## 2. Bantlar

Kamera z = −38,1. Derinlik z'deki parçanın ekran ölçeği `38,1 / (38,1 + z)`. Aynı oran paralakstır: z = 10'da parça kameranın %79'u kadar kayar, z = 40'ta %49'u, z = −6'da %119'u.

| Kod | id | z aralığı | Görev | Ton `mul` | Sis `fogk` | Bulanıklık (px) | Işık payı | Tipik parçalar |
|---|---|---|---|---|---|---|---|---|
| `B0` | `backdrop` | > 40 | Boşluğu kapatır, derinlik hissi. Okunmaz, yalnız leke | 0,27 | 0,78 | 5,5 | 0,15 | Gradyan, sis kartları, dev uzak kütleler |
| `B1` | `bg_far` | 15 … 40 | Bölgenin silüeti, "nerede olduğumu" söyler | 0,29–0,37 | 0,62–0,72 | 2,6–4,5 | 0,22 | Bacalar, kuleler, şişe fırınlar, uzak cam taşmaları |
| `B2` | `bg_mid` | 5 … 15 | Salonun mimarisi, ana ışık kaynakları | 0,37–0,55 | 0,40–0,61 | 1,2–2,5 | 0,60 | Sütun, vitray, gül pencere, duvar kütlesi, iskele, zincir, duvara tırmanan kristal |
| `B3` | `bg_near` | 0,5 … 5 | Odanın içi: eşyalar, hikâye | 0,58–0,85 | 0,10–0,36 | 0,2–1 | 0,85 | Fırın, kalıplar, pota, üfleme boruları, asılı raf, avize, taşan cam, yer dağınıklığı |
| `B4` | `game` | −0,5 … 0,5 | Oynanış düzlemi. Çarpışma buradaki çizimle hizalı | 0,90 | 0,06 | 0 | 1,00 | Zemin ve platform parçaları, duvarlar, kristaller, cam eşya, Hornet |
| `B5` | `fg_near` | −4 … −0,5 | Zeminin önü, çerçeve hissi | 0,06–0,55 | 0,06 | 0,5–3,5 | 0,45 | Kenar molozu, koyu cam kristal, ince zincir |
| `B6` | `fg_cam` | < −4 | Kameranın dibindeki siyah kütleler, derinlik ve ritim | 0,03–0,06 | 0,05 | 3,5–9 | 0,30 | Alt ve üst kenarda siyah silüetler, ekranı kesen sütun |

- Ton, sis ve bulanıklık z'ye göre sürekli değişir (`bands.TINT_CURVE`, `tint_at(z)`). Tablodaki değerler bandın tipik noktaları.
- **Ton:** parçalar gri çizilir. Uzaklaştıkça koyulaşır ve sis rengine (mavi-gri `fog = (0,065; 0,085; 0,115)`) karışır. Ön plan neredeyse siyah.
- **Bulanıklık:** oyunda sprite bulanıklığı yok. Uzak ve çok yakın parçaların PNG'sine bulanıklık önceden pişirilir (`blur_px > 1`).
- **Işık:** renk ışıktan gelir. Her bant odanın ışık haritasıyla `light` payı kadar çarpılır. B4 tam, B3 %85, B2 %60, uzak bantlar neredeyse düz. Sıcak ışık (kehribar) yalnız kaynağın yanında: fırın ağzı, döküm, kristal çekirdeği. Soğuk ışık pencereden B2'den B4'e huzme olarak iner. Ön plan aydınlanmaz, silüet kalır.
- **Doygunluk:** en doygun renk B3/B4'te, ışık kaynaklarının yanında. Uzak bantlar sis rengine yaklaştıkça doygunluk düşer. Gerçek sahnelerde `m_Color` tonu nötr (doygunluk 0): renk sprite'ın kendisinden ve sahne ışığından geliyor, tondan değil.
- **Sis kartı:** yumuşak kenarlı yarı saydam dikdörtgen. B0, B1 ve B2'nin altında, zemin hizasında alçak sis. Gerçek `Dock_03`'te B3'te de var.

---

## 3. Gerçek sahne ölçümü

`scene_pieces.py` beş sahnenin bütün aktif SpriteRenderer'larını okur. `band_stats.py` bunları banda böler. "Ekran başına" = sahne boyunca 4 birim adımla gezen 1920×1080 kameraya değen ortalama parça sayısı (kamera oynanış sınırında tutulur, oyundaki gibi).

| Sahne | Renderer | Benzersiz sprite | Boyut (ekran, en×boy) | Ekran başına |
|---|---|---|---|---|
| `Dock_03` (Deep Docks) | 2167 | 140 | 4,4 × 2,2 | 314 |
| `Ward_02` (Whiteward) | 1630 | 135 | 4,8 × 5,1 | 105 |
| `Song_05` (Choral Chambers) | 1294 | 144 | 1,6 × 6,7 | 204 |
| `Cog_05` (Cogwork) | 630 | 113 | 3,8 × 2,7 | 113 |
| `Clover_01` (Verdania) | 1095 | 71 | 5,9 × 1,2 | 199 |

Bant başına, ekran başına renderer / ekranda farklı sprite (sırayla `Dock_03`, `Ward_02`, `Song_05`, `Cog_05`, `Clover_01`):

| Bant | Ekran başına renderer / farklı sprite | Parça boyu (birim, medyan) | `m_Color` parlaklığı (medyan) | Aynalı | Döndürülmüş |
|---|---|---|---|---|---|
| `B0` fon | 3/1, –, 118/16, –, – | 19–29 | 0,38–0,48 | %42 | %15 |
| `B1` uzak | 55/14, 5/2, 14/8, 22/9, 16/5 | 5–23 | 0,21–0,66 | %0–35 | %0–78 |
| `B2` orta | 114/28, 38/12, 8/4, 20/10, 48/15 | 4,9–9 | 0,43–1,0 | %28–46 | %19–85 |
| `B3` yakın arka | 42/14, 24/11, 23/14, 21/10, 31/9 | 5,5–6,4 | 0,62–1,0 | %24–57 | %33–82 |
| `B4` oyun | 29/13, 13/6, 22/13, 29/11, 28/15 | 3,4–5,3 | 0,88–1,0 | %32–45 | %19–63 |
| `B5` yakın ön | 45/12, 9/4, 17/8, 16/7, 42/10 | 3,8–6,2 | 0,0–0,82 | %38–58 | %43–86 |
| `B6` kamera | 25/8, 16/6, 3/2, 5/3, 35/11 | 3,7–7,2 | 0,0 | %11–61 | %47–85 |

Okunanlar:
- Bir sahnede 70–145 benzersiz sprite, her biri ortalama 5–15 kez kullanılıyor. Ekranda bant başına 5–15 farklı sprite görünüyor.
- Döndürme çok yaygın: parçaların yarısından fazlası döndürülmüş. Borular ve ızgaralar 90°, dal, moloz ve süs küçük açılarla (medyan 15–60°). Üçte biri ile yarısı aynalı.
- Ölçek dar: p10–p90 çoğunlukla 0,85–1,35. Aynı sprite büyük ölçüde büyütülmüyor (kontur kalınlığı korunuyor). İstisna uzak bantlar (2–3× büyütülmüş bulanık lekeler).
- B6 tam siyah (`m_Color` 0). B4 tonlanmıyor (1,0). Arka bantlar 0,2–0,75 arası koyulaştırılmış.
- Uzak fon (z > 40) çoğu sahnede yok ya da tek parça. `Song_05` istisna (dikey kule, 212 uzak parça).
- Uyarı: `env_render` yeniden çizimi ışıksız, sissiz, parçacıksız. Sayılar doğru, görüntü oyundakinden daha düz.

Bantların ayrı ayrı görüntüsü: `biome_probe4\grid_layers_real.png` (`Ward_02`), tek tek dosyalar `biome_probe\ref\<Sahne>\bands\`.

---

## 4. Yoğunluk hedefleri (bizim odalar)

Gerçek sahnelerin orta değerleri. Ekran başına (1920×1080):

| Bant | Ekran başına renderer | Ekranda farklı sprite | Kahraman parça / ekran |
|---|---|---|---|
| `B0` | 1 gradyan + 4–8 sis kartı + 0–3 dev kütle | 1–4 | 0 |
| `B1` | 10–20 | 5–9 | 1–2 |
| `B2` | 25–50 | 10–15 | 2–3 (pencere, sütun çifti) |
| `B3` | 20–40 | 10–14 | 2–4 (fırın, pota, avize) |
| `B4` | 15–30 (+ çarpışma) | 8–13 | 1–2 (büyük kristal, cam platform) |
| `B5` | 10–40 | 4–10 | 0–1 |
| `B6` | 3–15 | 2–6 | 0–1 (ekranı kesen sütun) |
| Toplam | 100–200 | 45–70 | |

- Oda başına (1,5–2 ekran genişlik) **60–90 benzersiz sprite**. Kahraman parça 10–15 tane, gerisi tekrar eden küçük parçalar.
- Kahraman parça odada bir kez. Küçük parça 5–20 kez.
- Bir dağıtım rolü odada en fazla 4–6 varyant kullanır. Bölünmüş üretim sayfaları (`_c0`, `_c1` …) çok varyant verir; hepsini kullanmak benzersiz sprite sayısını şişirir (NEW2-m'de 98, hedefin üstünde).
- NEW2-m'nin ölçülen değerleri §10'da.

---

## 5. Yeniden kullanım kuralları

- **Ayna:** her tekrarda %50 olasılık.
- **Dönme:** moloz, cam kırığı, alet, braket ±10–25°. Boru, zincir, ızgara gibi simetrik parçalar 90°/180° olabilir. Kahraman parçalar ve zemin parçaları dönmez.
- **Zincir döşenir:** uzun zincir tek sprite'ı uzatmak yerine 2,6 birimlik parçaların üst üste kopyası (`rooms4.tile_chains`); halkalar aynı boyda kalır.
- **Ölçek:** aynı sprite 0,75×'in altına inmez, 1,4×'ün üstüne çıkmaz. Konturu ~5 px korumak için (CLAUDE.md kontur kuralı). Daha büyük lazımsa ayrı sprite üretilir. Uzak bantlar (B0/B1) bulanık olduğu için muaf.
- **Değer oynatma:** her kopyanın tonu ±%15 (`mul`).
- **Aralık:** aynı kuralın iki kopyası arasında en az `gap` birim. Aynı sprite yan yana aynı yönde durmaz.
- **Bant değişince farklı görünür:** aynı sprite B3'te açık gri, B1'de sisli leke, B6'da siyah silüet. Bir sprite üç banda hizmet edebilir.
- **Kural verisi:** `scatter_rules.NEW2_M`. Tipler: `line` (yüzey boyunca), `trim` (eşit aralıklı), `hang` (yukarıdan sarkan), `area` (Poisson dağılımı), `cluster` (bir çapanın çevresi), `edge` (ekran kenarı silüeti).

---

## 6. Çarpışma ve oyun düzlemi

- Zemin çarpışması B4'teki zemin parçalarının **yürünen üst çizgisi**. Satırı `rooms2.surface_frac` bulur: parçanın orta %70'inde %55'i dolu ilk satır. Parçanın pivotu bu satırdır, Y = zemin yüksekliği.
- `layout_NEW2-m.json` → `colliders`: `floor`, `platform`, `wall`; x0/x1, `y_top`, `y_bottom`. Oyunda: katman 8 (Terrain), tetikleyici olmayan `EdgeCollider2D` üst çizgi + `BoxCollider2D` gövde. Tutunulmasın istenen duvar `NonSlider` (bkz. `notes-sahne-yolu.md` §2.9–10).
- Çizim ile çarpışma farkı 0,1 birimden (6 px) az olmalı. Cam platform da çarpışır; görünümü saydam ama kenarı çizili.
- Oyun düzleminde kahramanın arkasında kalacak parçalar z 0 … +0,5, önünde kalacaklar −0,5 … 0. Hornet z = 0.
- B4'teki büyük kristaller dekor; kahramanın arkasında, çarpışması yok. Engel olacaksa ayrı collider ve okunur bir kenar.
- **Yürüme koridoru:** zemin + 0,45 … zemin + 6,5 birim. B5/B6 parçaları ekranda bu koridoru örtmez (`scatter.covers_lane`). Yalnız ince dikey silüetler (sütun, zincir) `cross_lane` ile geçebilir, ekran başına en fazla bir.

---

## 7. `layout.json` → oyun içi kurucu (`RoomBuilder` / `SceneDress`)

`layout_NEW2-m.json`: `placement: "true"`, `anchor: "absolute"`, 64 px/birim. Her öğe: `band`, `kind`, `role`, `sprite`, `X`, `Y`, `Z`, `size_units` + `size_axis`, `pivot`, `flip_x`, `rot`, `tint`, `fog_k`, `blur_px`, `light_k`, cam ayarları, `world_box`. Ayrıca `lights`, `bg_glows`, `colliders`, `pours`, `fx`, `room` (boyut, zemin, kamera aralığı).

| `kind` | Oyunda |
|---|---|
| `piece`, `ledge` | Bir SpriteRenderer. Gri PNG, renk = `tint` × odadaki ışığın parça üstündeki örneği (`light_k` payı). `fog_k > 0,03` ise aynı şeklin beyaz silüeti sis renginde, alfa = `fog_k`, hemen önünde (`dress_export.py` yöntemi). `ledge` ayrıca collider |
| `glass` | Üç renderer: gövde (multiply ya da alfa), mürekkep çizgileri (normal), parıltı + kenar ışığı + gökkuşağı saçağı (additive). Kehribar damar ayrı additive maske. Kırılma (arkayı büküp gösterme) oyunda yok; kabul |
| `window` | Çerçeve (gri, tonlu) + renk başına additive cam maskesi |
| `fog` | Paylaşılan yumuşak kare PNG, `haze` renginde, normal karışım |
| `lights`, `bg_glows` | Additive radyal parıltı (`fx_gauss.png`) + parça tintlerine ışık örneği |
| `pours` | Pişmiş RGBA erimiş cam sprite'ı + additive parıltı |

- **Projeksiyon yok.** Vanilla sahnede `SceneDress` `projected` modu vardı, çünkü oradaki kameranın z'si ve sıralaması bize ait değildi. Kendi sahnemizde (v0.1 kabuk `Demo End`, v0.2 boş sahneler) kamera aynı (z = −38,1, perspektif). Parça gerçek Z'sine konur; ölçek ve paralaks oyundaki gibi.
- **Sıralama:** tek sorting layer, perspektif sıralama z'ye göre. Aynı z'de bant içi sıra `order`.
- **Sahne boyutu:** `tk2dTileMap` width 48, height 17 (kamera sınırı). Kamera yalnız yatay gezer.
- Yapılacak iş: `SceneDress` `true` + `absolute` yerleşimi zaten destekliyor (`pieces`: `file`, `scale`/`w`/`h`, `x`/`y`/`z`, `rot`, `flipX`, `tint`, `mode`). Format farklı. Gereken bir dönüştürücü (`dress_export.py` gibi, Python tarafında): kit PNG'lerini 64 px/birime küçültür, `blur_px` ve `vg` gölgesini PNG'ye pişirir, `fog_k` silüetlerini, cam üçlüsünü (`dress_export.glass_parts`), pencere çerçeve + cam maskelerini, sis kartı ve parıltı dokularını yazar; `tint`'i odanın ışık haritasıyla çarpar. `colliders` ise `RoomBuilder`'ın işi (C#, `src\`).

---

## 8. Performans

- **Doku:** oda başına 60–90 benzersiz sprite. 64 px/birimde küçük parça 32–256 px, orta 256–768 px, büyük 768–1400 px. NEW2-m ölçümü: 98 benzersiz sprite, en büyük kullanım boyunda (yerel çözünürlükle sınırlı) RGBA sıkıştırmasız **37,5 MB**. Bant başına bir atlas (B0–B2 bir, B3–B4 bir, B5–B6 bir; 4096²), BC7/DXT5 ile 4–8 kat küçülür.
- **Uzak parçalar küçük doku:** B1/B0 parçaları ekranda yarı boyda ve bulanık. Dokuları yarı çözünürlükte saklanır.
- **Sis silüeti renderer sayısını ikiye katlar.** B1/B0'da sis rengi PNG'ye pişirilir (bu bantlarda ışık zaten düz), silüet yalnız B2/B3'te.
- **Renderer:** ekran başına 150–300, oyunun kendi sahneleriyle aynı aralık. Aynı atlas + aynı materyal = tek batch.
- **Cam:** parça başına üç renderer. Oda başına 5–8 büyük, 20–40 küçük cam.
- Fon gradyanı tek quad. Işıklar additive sprite, gerçek ışık hesabı yok.

---

## 9. Kristaller: fırından taşıp donmuş cam

Yusuf'un kararı: v1'in büyük saydam kristalleri kalıyor, ama buz değil. Kristal = **fırınlardan taşıp katılaşmış cam**.

- **Biçim:** taban akmış camdır: yuvarlak loblar, havuzlanmış birikinti, yuvarlak damla uçları (mum ya da lav akıntısı gibi). Prizmalar bu tabandan büyür. Yüzeyler düz ve pürüzsüz, kenarlar keskin ama tabanda erimiş gibi yumuşar.
- **Malzeme:** saydam ve kırıcı. Arkadaki salon bükülmüş görünür. Buz mavisi gövde, yüzey kenarlarında ince gökkuşağı saçağı (`dispersion`). Mürekkep konturu oyunun çizim diliyle aynı.
- **İçeride kehribar damar:** taşmanın çekirdeği hâlâ sıcak. Tabandan yukarı kıvrılan ince damarlar, birkaç yüzey dikişinde zayıf parıltı (`compose_room4.amber_core`). Camın içinden göründüğü için yumuşak ve sönük; zemin çatlaklarındaki damarlardan daha az parlak.
- **Nereden çıkar:** fırın ağzının önünde alçak cam tümseği (`xtal_wide`), devrilmiş asılı kepçeden yere kadar donmuş akıntı (`xtal_cascade` + `ladle`), potaların çevresi, zemin çatlakları. Büyük küme + 2–4 orta + uydu kristaller + çevresinde cam kırıkları (`cluster` kuralı).
- **Bantlara göre:** B4/B3'te tam saydam, parlak; B2'de duvara tırmanan, sisli (`fogged 0,35`); B1'de uzak fırınların üstünde silüet taşmalar (`fogged 0,75`); B5'te koyu, buzlu cam silüet.
- **Yasak (Mount Fay olmasın):** kar, kırağı, mat beyaz, sarkan ince sivri buz sarkıtları, beyaz-mavi parlama halesi, kar tanesi pırıltısı. Sarkan cam varsa ucu yuvarlak damla olur, sivri değil. Büyük açık gri cam gövdeler sütlü görünür (buz okunur): `gamma` 2,3–2,7 ile koyulaştırılır, yalnız gerçek parıltılar kalır (`GLASS_MOUND`).

### Üretim (sahne LoRA v2, adım 1200; `gen_kit4.py`)
- **Tur 1 (düz metin):** "formation", "prism", "overflowed glass" kelimelerini LoRA tanımıyor. Çıkanlar cam kap, kubbe, çubuk ve sarkıt oldu. Sarkıtlar buz gibi okunduğu için atıldı. Küçük cam damlaları ve kırık parçalar (`cullet`, `xtal_small`) kullanılabilir.
- **Tur 2 (v2 başlık sözlüğü):** "crystal shard, smooth facets" ve "smooth organic shape" işe yaradı: tek kristaller (`xtal2_shard`), kristal kümeleri (`xtal2_cluster`), küçük kristal sayfası. "hardened glass overflow" yine sarkıt verdi (atıldı).
- **Tur 3 (kaba + yeniden çizim):** taşma tabanı elle kuruldu: işlemsel cam tümseği (loblar, akış çizgileri, mürekkep kontur) + tur 2 kristalleri saplanmış. LoRA img2img (denoise 0,55–0,6) ile tek parça boyandı: `xflow` (küme + tümsek), `xspill` (akıntı + havuz), `xwide` (alçak tümsek). Bu yöntem `tools/anim`'deki kaba + yeniden çizim fikriyle aynı.
- Reddedilenler `rooms4.EXCLUDE` ve `KIT4` açıklamasında.

---

## 10. NEW2-m (birleşik oda)

`tools/biome/rooms4.py`. v2a'nın cam salonu mimarisi ve atölye eşyaları + v1'in büyük saydam kristalleri (taşmış cam olarak) + yoğunluk geçişi. Oda 48 × 16,4 birim (1,6 ekran), yürüyüş zemini Y = 2,75, salon zemini Y = 1,55. Kamera X 14,6 … 33,4.

| Bant | Parça (elle + kural) | Benzersiz sprite | Ekran başına | Ekranda farklı | Hedef (ekran başına) |
|---|---|---|---|---|---|
| `B0` | 15 (5 + 10; 5 sis kartı dahil) | 6 | 10,8 | 4,8 | 1 + 4–8 sis + 0–3 |
| `B1` | 24 (3 + 21) | 9 | 18,8 | 7,0 | 10–20 |
| `B2` | 53 (8 + 45) | 23 | 38,2 | 19,6 | 25–50 |
| `B3` | 55 (27 + 28) | 32 | 41,2 | 24,6 | 20–40 |
| `B4` | 49 (17 + 32) | 39 | 30,6 | 25,6 | 15–30 |
| `B5` | 17 (0 + 17) | 14 | 12,0 | 9,8 | 10–40 |
| `B6` | 10 (1 + 9) | 7 | 4,8 | 4,0 | 3–15 |
| Toplam | 223 (61 + 162) | 98 | 156 | | 100–200 |

- 36 cam parça, 20 sis kartı. Zincirler döşendiği için B3'te elle konan sayısı yüksek görünüyor.
- Ekran başına sayılar hedef aralığında. Ekranda farklı sprite B3/B4'te hedefin iki katı (§4: rol başına 4–6 varyant kuralı bir sonraki adım).

**Ne düzeldi (v2a ve v1'e göre):**
- Her parça açık bir bantta. Bant bant görüntü: `biome_probe4\grid_layers.png`; aynı ayrım gerçek `Ward_02` için `grid_layers_real.png`.
- Kristaller artık buz değil cam: arkadaki salon görünüyor, tabanı akmış cam tümseği, içinde sönük kehribar damar ve sıcak çekirdek, kenarlarında gökkuşağı saçağı. Fırın ağzının parıltısı önündeki cam tümseğin içinden görünüyor.
- Yoğunluk: zemin boyunca cüruf ve cam kırığı, alet, platform braketleri, arka duvar kütleleri, iskeleler, döşenmiş zincirler, alçak sis, kenar silüetleri. Hepsi kuralla ve tohumla (`seed 41`).
- Uzak bantlar sis içinde ama iç detay koruyor (B1 sis 0,6–0,7).

**Hâlâ mod gibi duran (dürüst):**
- Genel değer aralığı dar ve mavi. Gerçek sahnelerde saf siyah ön plan kütleleri ve parlak sis huzmeleri kontrast veriyor; bizde B6 az ve ince, sahne "düz koyu mavi".
- Büyük kristallerin tümsek tabanı hâlâ biraz sütlü. Uzaktan buz sanılabilir; gamma ile bastırıldı, çözülmedi.
- Donmuş akıntı (kepçeden yere) ince soluk bir cam yaprak gibi; "akan cam" diye okunması zayıf.
- Zemin hâlâ probe 3'ün yastık gibi yuvarlak taş blokları; çatlaklardaki kehribar lav bölgesi gibi okunuyor.
- Küçük dağıtım parçaları 1080p'de çok küçük ve koyu; kontrol görüntüsüyle (`NEW2-m-L0`, dağıtım kapalı) fark ince. Gerçek sahnelerin sıklığı bunu orta boy (2–6 birim) parçalarla yapıyor.
- Mimari parçalar (sütun, kemer, pencere) hâlâ her yerde aynı birkaç sprite; uzak bantta yassı lekeler.

**Oyun içinde kurmak için gerekenler:**
1. `RoomBuilder` (src, C#): kabuk ya da boş sahnede `tk2dTileMap` 48 × 17, `CustomSceneManager`, kapılar, `colliders` → katman 8 collider'lar, hazard respawn (bkz. `notes-sahne-yolu.md`).
2. Dönüştürücü (Python, §7): `layout_NEW2-m.json` + kit → PNG seti (64 px/birim, bulanıklık ve gölge pişmiş, sis silüetleri, cam üçlüsü, pencere maskeleri, sis kartı, parıltı) + `SceneDress` `true`/`absolute` JSON. Odanın ışık haritası parça tintlerine işlenir.
3. Erimiş cam dökümü (`pours`) ve LoRA ile boyanmış hali: pişmiş sprite olarak.
4. Kırılma, ısı titremesi, ekran sonu renk ayarı oyunda yok; kabul edilir ya da oyunun kendi post efektleriyle yaklaşılır.
