# DLC Tasarımı: The Sunken Forge (Batık Ocak)

> Silksong için mod olarak yapılacak mini-genişleme. Merkez: `boss-01-kilnwright-scoria.md`.
> Oyunla temas eden noktalar `[doğrula]` ile işaretli, oyun dosyaları açılınca kapatılır.

---

## 1. Tek cümle

Deep Docks'un altında, Sitadel'in unutulmuş demir mahallesi: lavın yuttuğu ocaklar, bırakılmış işçiler ve hâlâ vuran tek bir çekiç.

## 2. Tasarım sütunları

1. **Oyunun içinden çıkmış gibi.** Yeni sistem yok. Mevcut Tool, Crest, Wish, Bench, Bellway, rosary ve shard kuralları aynen. Oyuncu "mod" hissetmemeli.
2. **Küçük ama dolu.** Team Cherry'nin ücretsiz Hollow Knight paketleri ölçüsünde (Hidden Dreams: 2 boss + 1 hareket; Grimm Troupe: 1 bölge + 1 görev zinciri + 2 boss). Biz: 1 küçük bölge, 1 ana boss, 1 mini-boss, 3 düşman, 1 NPC, 1 görev, 1 Tool, 1 Crest (sonraki sürüm).
3. **Tek tema, uçtan uca.** Zanaat ve bırakamamak. Scoria iğneyi bırakamaz, işçiler ocağı bırakamaz, NPC dönmeyi bırakamaz. Hornet'in iğnesi bu temanın tersi: o kullanılıyor, bitmiş, yaşıyor.
4. **Ses ve müzik kapsam dışı** (şimdilik). Tasarım ses yokmuş gibi değil, ses sonra eklenecekmiş gibi yazılır.

## 3. Kapsam ve sürümler

| Sürüm | İçerik | Oynanış süresi | Amaç |
|---|---|---|---|
| **v0.1 Boss** | Scoria arenası + ön oda + gizli kapı + Cinder Fang | 15–30 dk | Hattı uçtan uca kanıtla |
| **v0.2 Bölge** | 7 oda, 3 düşman, mini-boss, bench, lore nesneleri | 60–90 dk | Gerçek "yeni alan" hissi |
| **v0.3 Görev** | NPC Ferrun, Wish, Forge Daughter bağı, Crest ödülü | +30 dk | Hikâye ve oyun dünyasına dikiş |

Her sürüm kendi başına oynanabilir. v0.1 bitmeden v0.2'ye kod yazılmaz.

## 4. Bölge: Batık Ocak

### Konum ve giriş
Deep Docks'un en alt lav seviyesinden gizli duvar `[doğrula: sahne ve koordinat]`. Giriş koşulu Clawline. Oyun 2. perde, tamamen opsiyonel. Harita Shakra'dan alınmaz; oyuncu kendi keşfeder, haritası Scoria yenilince ön odada bulunan "ocak planı" ile açılır.

### Oda planı (7 oda)

```
            [R7 Scoria arenası]
                   |
   [R5 Körük galerisi] — [R6 Ön oda: yarım iğneler]
         |
[R3 Soğuk ocaklar] — [R4 Bench + NPC Ferrun]
         |
   [R2 Zincir kuyusu]
         |
   [R1 Giriş: kırılan cüruf duvarı] ← Deep Docks
```

- **R1 Giriş.** Kısa koridor, sıcak kızıl duvar, 3 vuruşla kırılır. Yere dökülmüş soğumuş cüruf; adım atınca çatlak sesi (ses sonra). Hiç düşman yok. Oyuncuya "burası farklı" dedirtir.
- **R2 Zincir kuyusu.** Dikey oda. Tavandan sarkan zincirler, Clawline ile inilir. Lav altta. Düşman: Cüruf Kabuğu (E1) duvarlarda. Platform dersi: zincir → zincir geçişi, Scoria arenasına hazırlık.
- **R3 Soğuk ocaklar.** Yatay, geniş. Sönmüş ocaklar dizisi; birkaçının içinden Kor Kurdu (E2) fırlar. Arka planda devasa soğuk körükler. Lore nesnesi 1: duvar yazısı.
- **R4 Bench + Ferrun.** Tek güvenli oda. Bench sönmüş bir ocağın içine kurulmuş. NPC Ferrun burada oturur (v0.3). Bellway yok; dönüş yolu Deep Docks bench'i. Rosary çeşmesi yok, bir tane kırık "shard" deposu var `[doğrula: shard ödül nesnesi]`.
- **R5 Körük galerisi.** Dikey yukarı. Dev körükler ritmik çalışır (Scoria'nın nefesi), çalıştıkları an rüzgârla iter. Zamanlama platformu. Düşman: Perçinci (E3), mini-boss "Ustabaşı" ile ilk karşılaşma değil, Ustabaşı R3'ün gizli yan odasında.
- **R6 Ön oda.** Duvarlara saplı 4 yarım iğne, her biri incelenebilir (lore). Son nefes alanı. Bench yok.
- **R7 Arena.** `boss-01` dokümanında.

**Gizli oda R3b:** R3'ün bir ocağının arkasından dalışla açılır. Mini-boss Ustabaşı. Ödül: Kırık Kalıp (görev nesnesi) + rosary.

### Bölge kuralları
- Lav her yerde: dokunma 1 maske + geri sıçrama, ölüm değil. Oyunun mevcut lavı `[doğrula]`.
- Sıcak hava: oyuncu 8 saniyeden fazla lavın hemen üstünde zincirde asılı kalırsa 1 maske. Zincirde kamp yapmayı engeller. Görsel: ekran kenarları hafif kızarır.
- Rosary yoğunluğu Deep Docks ile aynı, biraz altı. Yeni bölgeler ödülü düşmanla verir, çeşmeyle değil.

## 5. Düşmanlar

Hepsi Deep Docks düşmanlarının teknik iskeletini kullanır `[doğrula: hangi düşman sınıfları kopyalanabilir]`.

**E1. Cüruf Kabuğu (Slag Husk)** — duvar düşmanı
- Duvara yapışık cüruf yumrusu, yaklaşınca kabuğu çatlar, içinden sıcak böcek fırlar ve 1 kez saldırır, sonra tekrar kapanır.
- HP 20, temas 1. Rosary 3–5.
- Rolü: zincir geçişlerinde zamanlama baskısı.
- Sprite: 6 kare idle, 5 çatlama, 4 saldırı, 4 kapanma.

**E2. Kor Kurdu (Ember Grub)** — ocak düşmanı
- Sönmüş ocakların içinde yaşar, oyuncu geçerken fırlar, yere düşünce 1,5 sn yanan iz bırakır.
- HP 30, temas 1, iz 1. Rosary 5–8.
- Rolü: alan kirletme; Scoria'nın Slag Spit'inin düşük seviye versiyonu. Oyuncu kaçma refleksini burada öğrenir.
- Sprite: 4 pusu, 6 fırlama, 4 sürünme, 5 ölüm.

**E3. Perçinci (Riveter)** — işçi düşmanı
- Scoria'nın eski işçileri; küçük, iki ayaklı, bir eli çekiç. Hâlâ "çalışıyor": sana değil, duvara vuruyor. Yaklaşınca sana döner, 2 vuruşlu kombo, geri çekilir.
- HP 45, çekiç 1. Rosary 8–12.
- Rolü: tek ağır düşman. Grup halinde değil, tek tek.
- Davranış detayı: öldürülmezse ve uzaklaşırsan duvara vurmaya geri döner. Trajik ve temaya uygun.
- Sprite: 8 çalışma döngüsü, 3 dönüş, 7 kombo, 5 geri çekilme, 6 ölüm.

## 6. Mini-boss: Ustabaşı (The Foreman)

- Perçinci'nin büyük versiyonu değil; onların eski ustabaşısı. Göğsünde Scoria'nın ocak izi (dövme) var, yani Scoria'nın "ekibi".
- 2 kat Hornet boyu. İki el iki çekiç. Yüzü yok, kask gibi kaynamış kabuk.
- Saldırılar: çift vuruş, zıplayıp çökme (zemin dalgası, Scoria'nın A1'inin öğreticisi), duvar vuruşu ile tavandan taş düşürme.
- HP 300 `[doğrula: Sister Splinter, Moorwing seviyesi]`. Tek faz.
- Ödül: Kırık Kalıp (görev) + 120 rosary.
- Amaç: oyuncu Scoria'ya gitmeden "zemin dalgasına zıpla" ve "tavandan düşene dikkat" reflekslerini kazanır. Team Cherry'nin mini-boss → boss öğretme düzeni.

## 7. NPC: Ferrun (v0.3)

- Yaşlı, küçük, bir gözü cam. Eski iğne dağıtıcısı: Scoria'nın yaptığı iğneleri Sitadel'e taşırdı. Sitadel sustuktan sonra geri döndü, bir daha çıkmadı. "Bir sipariş daha gelir" diye bekliyor.
- Sönmüş ocağın içinde oturur, bench'in yanında. Konuşmaları kısa, hafif alaycı, Silksong NPC tonunda.
- 3 konuşma aşaması: ilk karşılaşma, Ustabaşı sonrası, Scoria sonrası.
- Scoria sonrası son satırı: *"Quiet now. Suppose I'll carry one last thing up."* Sonrasında Bone Bottom ya da Bellhart'ta görünür `[doğrula: NPC yer değiştirme sistemi]`. Oyunun "NPC'ler yolculuk eder" kuralına uyar.

## 8. Görev: "Kırık Kalıp" (Wish) (v0.3)

Oyunun Wish tahtası sistemine takılır `[doğrula: Wish veri yapısı]`.
1. Ferrun'dan alınır: "Aşağıda kalıp var. Getir."
2. Ustabaşı'dan Kırık Kalıp düşer.
3. Kalıp Forge Daughter'a götürülür. Forge Daughter onu tanır, konuşmaz, alır. 1 oyun döngüsü sonra `[doğrula: zaman ilerletme = bench kullanımı]` Crest hazır.
4. Crest alınır. Ferrun'a dönülürse ek diyalog, ödül yok.

**Ödül Crest: Kilnwright Crest (Ocak Arması)** `[doğrula: Crest veri yapısı, slot düzeni]`
- Saldırı: iğne vuruşu yavaş ama ağır (Reaper'a benzer temp), her 3. vuruş zemine kor izi bırakır.
- Silk Skill: "Quench" — ileriye kısa bir buhar patlaması, düşmanları iter ve yavaşlatır. Hasar düşük, kontrol yüksek.
- Slotlar: 2 kırmızı, 1 mavi, 1 sarı (ağırlıklı saldırı, Scoria'nın karakteri).
- Gerekçe: Hornet'in setinde "ağır ve alan bırakan" bir Crest yok. Cinder Fang Tool'u ile doğal sinerji.

## 9. Lore dağılımı

Hiçbir şey doğrudan anlatılmaz. Parçalar:
- R1: duvarda kazıma: "Siparişler durdu. Ocak durmadı."
- R3: işçi listesi, isimler çizili, biri çizili değil: Scoria.
- R6: 4 yarım iğne, her biri bir satır: kime yapılıyordu, neden bitmedi.
- Ferrun: 3 konuşma.
- Scoria: 2 satır (geçiş + ölüm).
- Forge Daughter: 2 yeni satır. Scoria'nın adını hiç söylemez.
- Toplam yeni metin: ~40 satır. Çeviri: oyun TR destekliyorsa `[doğrula]` iki dilde yazılır.

## 10. Üretim hattı

```
Tersine mühendislik (Win)  →  Tasarım doğrulama  →  LoRA (Win)  →  Sprite üretimi (Win)
        ↓                                                              ↓
BepInEx iskelet (Win)  →  Boss kodu  →  Oda yükleme  →  Rig/animasyon (Mac veya Win)  →  Test (Win)
```

**Sprite bütçesi (tahmin)**
| Öge | Kare |
|---|---|
| Scoria | ~160 |
| Ustabaşı | ~60 |
| E1 + E2 + E3 | ~75 |
| Ferrun | ~20 |
| Efektler (dalga, kıvılcım, buhar, kor) | ~40 |
| Tileset ve arka plan parçaları | ~30 parça |
| **Toplam** | **~385 kare + 30 parça** |

LoRA ile her kareden ortalama 4 üretip 1 seçersek ~1500 üretim, 5070'de 3–5 sn/kare: **2–3 saat GPU**. Eleme ve rötuş insan zamanı, asıl maliyet orası.

## 11. Riskler

| Risk | Etki | Önlem |
|---|---|---|
| Sprite'lar oyun stilinden sapar | DLC "mod gibi" durur | LoRA'yı Deep Docks sprite'larıyla eğit, ilk testi tek Perçinci ile yap |
| Yeni sahne yüklemek zor | v0.2 gecikir | v0.1'de arena, mevcut sahneye eklenen alt oda olarak dener |
| IL2CPP çıkarsa | Decompile zorlaşır | Il2CppInterop ile BepInEx yine çalışır, iş 1,5 katına çıkar |
| Oyun güncellemesi modu kırar | Yeniden yama | Sürüm sabitle, Steam otomatik güncellemeyi kapat |
| Kapsam şişer | Hiçbir şey bitmez | v0.1 bitmeden v0.2 yok. Kural. |

## 12. Açık sorular (Windows'ta kapanacak)

1. Deep Docks sahne yapısı: alt oda eklenebilir mi, yeni sahne mi gerekir?
2. Düşman ve boss'lar PlayMaker FSM mi? Cevap kod mimarisini belirler.
3. Wish ve Crest veri yapıları mod ile genişletilebilir mi, yoksa mevcut bir kaydı mı ezmek gerekir?
4. NPC yer değiştirme sistemi dışarıdan kullanılabilir mi?
5. Oyunun Türkçe yerelleştirmesi var mı?
