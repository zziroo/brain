---
type: resource
project: silksong-mod
date: 2026-10-06
status: active
tags: [silksong-mod, tasarim]
source: Silksong mod tasarım oturumu (2026-10-06); boss 01 tasarımı
---

# Boss Tasarımı 01: Kilnwright Scoria

> Silksong modu için özgün boss. Hedef: Team Cherry'nin yayınladığı bir boss gibi hissettirmek.
> Doğrulama sonuçları `notes-dogrulama.md` içinde (2026-10-06, oyun build 22479045). Hâlâ açık olanlar satır içinde `[doğrula]` ile işaretli.
> Kullanıcı kararları (2026-10-06): HP ~700 ve faz eşikleri %75/%40; arena lavı oyunun gerçek lavı; Forge Daughter'ın yerine geçen usta olarak Scoria; Cinder Fang hasarı 4 / 12 / 2.
> 2026-10-06: çekiç arenaya taşındı (karar), siluet A4. Çekiç artık Scoria'nın koluna kaynık değil; tavandan zincirle asılı arena şahmerdanı (§5, §6, §8, §11).
> 2026-10-06 akşam: siluet pelerinli şövalye (havuz A_orig_s24), gözler kırmızı; karakter LoRA `kilnwright_char_v1`. A4 kaya-golem siluetinin yerini aldı; lore uyarlaması minimal, hikâye ayrıntıları sonra netleşecek (§3, §5, §10, §12).
> 2026-10-07: zincir mekaniği netleşti (Yusuf, seçenek A): şahmerdan zinciri tavandaki makaradan geçer, ucu örsün yanında **sabit bir çekme noktasına** iner; Scoria A1/B3 için önce oraya yürür (yürüyüş ek telegraph). Maşayla uzaktan kancalama (B) ertelendi: A hasarla oynanıp örse yürüme sıkıcı gelirse eklenir. Çekici ele almak (C) reddedildi: LoRA çekiçli kolu çizemiyor, kare yükü artar (§6, §8).

---

## 1. Tek cümle

Deep Docks'un lavlarının altındaki Batık Ocak'ta, bitiremediği bir iğneyi yüzyıllardır döven, kaskı yüzüne kaynamış eski bir demirci ustası; Hornet'in kendi iğnesinin karanlık aynası.

## 2. Neden bu boss

- **Tema uyumu:** Silksong'un çekirdeği iğne, ipek ve zanaat. Oyunda ipeği ören (Grand Mother Silk) ve iğneyi bileyen (Pinmaster: Plinney, `nailUpgrades` yükseltmeleri) var, ama **iğneyi döven** yok. Forge Daughter tool yapar ("A smith? Hardly so crude!"), iğne dövmez. Scoria o boşluğu doldurur.
- **Mekanik ayna:** Hornet'in hareket setinin (dalış, Clawline, iğne fırlatma) demir ve ateş versiyonunu kullanır. Oyuncu kendi araçlarının karşısına çıkmış gibi hisseder; Lace düellosunun ağır, yavaş kardeşi.
- **Bölge uyumu:** Deep Docks'ta lav (14 sahnede `Lava Box`), zincir (Dock_01), kova (`DOCKS_FLINTSTONE_BUCKET`) ve Forge Daughter (`Room_Forge`) zaten var. Yeni bölge gerekmez, tek bir gizli arena yeter. İlk mod için gerçekçi kapsam.
- **Ton:** Team Cherry boss'ları ya trajik ya grotesk ya da ikisi. Scoria trajik: kötü değil, bırakamayan biri.

## 3. Lore

Sitadel'in parladığı çağda Deep Docks cevher ve metal taşıyordu (oyunda: `DOCKS_NOTE_1`, zil vuruşlarına göre Sitadel'e smelt sevkiyatı) ve ocakların en büyüğü Scoria'nındı. Sitadel'in hacılarına verilen iğneler, Bellway'lerin çanlarının dilleri, Grand Gate'in menteşeleri onun elinden çıktı. Bu nesnelerin kökeni oyunda anlatılmıyor; mod-özgün lore, ama "Docks Sitadel'e metal gönderirdi" çerçevesine bağlı.

Sonra Sitadel ince işi kendi gözünde "kutsal" bir zanaata devretti ve Scoria'nın yerine Forgehome'dan bir Forge Daughter getirtti. Siparişler yukarı çıktı, Scoria aşağıda kaldı. Sitadel sustuğunda geriye kalan siparişler de kesildi. Scoria son bir sipariş uydurdu kendine: "Geri dönecek olan için" bir iğne. Kimin döneceğini kendi de bilmiyor; belki bir kraliçe, belki bir hacı, belki hiç kimse. Ocağı söndürmedi. Yıllar içinde kaskı yüzüne, maşası eline kaynadı; pelerini ocak ateşinde kavruldu (pelerinin altında göğsünde cılız bir kor parıltısı hâlâ yanıyor). Ocağın şahmerdanı ise hâlâ tavanda, zincirinde asılı; onu artık kendi zinciriyle çekiyor. Yukarıdaki dock işçileri "duvarın ardındaki vuruş"u efsane sanıyor.

Hornet geldiğinde Scoria onu bitmemiş iğnenin sahibi sanır. Değil. Bunu anlayınca dövüş başlar: ya Hornet iğneyi alır ya da Scoria onu da cürufa katar.

**Forge Daughter bağı:** Forge Daughter, Scoria'nın çırağı ya da soyundan değil; onun yerine geçen ustadır. Oyundaki satırlar (`FORGE_DAUGHTER_TALK_3`) bunu çelişkisiz taşır: "Sent from our Forgehome… at request of those holy bugs above… An age ago". "Forge Daughter" bir soy/rol adı; Sitadel onu Forgehome'dan getirtti, Scoria'yı bu rolden eden de bu. Forge Daughter bunu hiç söylemez. Boss yenilince onda iki yeni diyalog satırı açılır; Scoria'dan söz etmez, sadece "aşağıdaki vuruş durdu" gibi bir şey der. Team Cherry tarzı: açıklamaz, hissettirir. Okuyan oyuncu, yerine geçilenin ve yerini alanın aynı ocağın iki ucunda olduğunu kendi çıkarır.

## 4. Konum ve erişim

- **Bölge:** Deep Docks, lav seviyesinin en altı. Mevcut bir kör duvarın arkasında yeni tek oda. Aday: **Dock_13** (Dock_15'in solunda çıkmaz dikey kuyu, girişi sağ üstte; dipte lav, lav üstünde yüzen bir item), kuyunun dibinde sol duvar (yaklaşık x 0–3, y 5–10; lav y ≈ 2,7). Alternatif: Dock_11 (haritada en alt, `explode_wall` örnekleri var). `[doğrula: koordinatlar transform zincirinden hesaplandı, duvar geometrisi (tilemap collider) okunmadı; oyun içinde bakılacak]` Güncelleme 2026-10-07: tahmin edilen nokta kayanın içinde kalıyor; gerçek geometri ve önerilen kapı (x=12 duvarı, y≈8–11, kapı tipi `isADoor`, runtime çıkıntı) için `notes-sahne-yolu.md` §6.
- **Giriş koşulu:** Clawline ve lav üstünde hareket için yeterli can. Clawline duvara değil yalnızca "Harpoon Ring" nesnelerine kancalanır (zincirde asılı varyantı `HarpoonRingChain` dahil); kuyudaki geçiş yolu bu halkalarla kurulur. Yani oyunun 2. perdesi, opsiyonel. Hikâye için zorunlu değil.
- **Keşif ipucu:** Odaya yaklaşırken ekranda ritmik titreşim ve ses (ses sonraya). Duvarda sıcaktan kızarmış bir leke; iğne ile 3 kez vurulunca cüruf kabuğu kırılır. Oyunun gizli duvar standardı: `Breakable Wall` + şablon FSM `breakable_wall_v2` (varsayılan `Hits` = 4; biz 3 yaparız, kalıcı bayrak mod kayıt dosyasına yazılır). Oyuncu "burada bir şey var" hissini alır.
- **Ön oda:** Kısa koridor, duvarlarda yarım kalmış iğneler saplı; Hornet'inkine benzeyen ama hepsi bir yerinden kusurlu. Oyuncu dövüşe girmeden hikâyeyi görür.
- **Bench:** Ön odada yok. En yakın bench **Dock_10** (RestBench, Dock_15 hub'ına bitişik); yol Dock_10 → Dock_15 → Dock_13 kuyusu. Koşu yaklaşık 30–40 saniye `[doğrula: süre ölçülmedi]`. Silksong boss'ları için standart ceza.

## 5. Görsel konsept

**Silüet (pelerinli şövalye, kilitli; 2026-10-06 akşam; oranlar 2026-10-07 V8 ile güncellendi, aşağıya bkz.):** Böcek şövalye. Yüzüne kaynamış gri, perçinli demir kask-maske; içinde iki parlak kırmızı göz. Kukuletalı, yırtık pırtık koyu kızıl pelerin (yanmış zincir-ipek önlük/pelerin olarak okunur). Kollar çok uzun ve siyah (ön kollar kalın), uçları kıskaç-el; küçük demir ocak aletleri taşır: Faz 1'de zincirli maşa, Faz 2'de bitmemiş iğne. Bacaklar kalın, kısa, sivri uçlu. Duruş dik ama yorgun (eski kambur taslağa göre daha az kambur). Hornet'in yaklaşık 2,5 katı boy (değişmedi). Siluet tek başına tanınmalı: **kukuletalı pelerin + perçinli kask-maske ve kırmızı gözler + uzun ince kollarda zincirli maşa.**

**Oranlar ve boyut (kilitli, 2026-10-07, varyant V8):** Oyun içi karşılaştırmayla seçildi (Forge Daughter odasında Hornet'in yanında, V0–V8 turları). İlk taslağın sırık bacakları ağırlıksız, "korkuluk" gibi okunuyordu. V8: bacaklar ~3,5 kat kalın ve %35 kısa, uçları sivri böcek ayağı (yere düz basar, uçlar dışa); üst kol 3 kat, ön kol ~4 kat (kolun en kalın yeri, demirci kolu); maşa çeneleri ince kalır (okunabilirlik). Pelerin ve omuz %12 geniş. Toplam boy Hornet collider'ının **2,5 katı** (2× "düşman" gibi, 3× arenada hareket alanı bırakmıyor, tavana değiyor). Pelerin Hornet'in kırmızısından ayrılsın diye koyu kızıl-pas (kaynakta ~`#391915`; oyunun renk ayarı kırmızıyı parlatır). Maşa ucundaki parıltı kalp değil, düzensiz kor. **Kontur kuralı:** oyundaki karakterlerin dış konturu 1080p'de ~5 px (Hornet ile aynı); sprite boyutu değişirse kontur yeniden çizilir, ölçeklenmez. Kaynak: `tools/anim/make_variants.py v8` (rig `tools/anim/rigs/kilnwright_idle_v8.json`, kareler `D:\SilksongMod\work\anim\kilnwright_idle_v8\`). Güncelleme (2026-10-07, V8C): bacaklar kavisli ve sivrilen şekillerle çizilir (`tools/anim/leg_shape.py`, Idle ve Walk ortak); üst kol omuza yakın kalınlaştırıldı (V8s); Idle duruşu Walk'la eşleşsin diye ayak uçları ileri, bir ayak önde (geçişte ayak sıçramaz). Walk: 10 kare @ 12 fps, ayak kaymasız hız 2,11 birim/s (`tools/anim/make_walk.py tools/anim/rigs/kilnwright_walk_v8c.json`).

**Çekiç yok:** Çekiç Scoria'nın kolu değil, arenanın mekanizması: tavandan zincirle asılı dev bir şahmerdan (bkz. §6). Scoria kendi silahı olarak Faz 1'de zincirli maşayı, Faz 2'de bitmemiş iğneyi taşır.

**Kaynak ve gerekçe (karar 2026-10-06):** Çekiç kararı gündüz alındı (A4 kaya-golem taslağı üzerinden): stil modeli zincir, maşa ve kor aletini doğal çiziyor, çekiç kolu hiç çizmiyor; çekiç prosedürel sprite olunca animasyon yükü de düşüyor; tematik olarak Scoria kendi ocağıyla dövüşüyor. Akşam siluet değişti: karakter LoRA havuzundan pelerinli şövalye seçildi (referans `D:\SilksongMod\ai\out\knight_v1\A_orig_s24.png`, havuz `_knight_havuz.png`; eski A4: `D:\SilksongMod\ai\out\scoria_v2\A_00_s4.png`). Çekiç/şahmerdan kararı aynen geçerli.

**Yüzey:** Kask-maske soğuk çelik grisi, perçinli, çizik ve dövme izli; yüze kaynak izleri görünür. Pelerin koyu kızıl, kenarları yanık ve yırtık, ocak isiyle kararmış; tek esnek katman. Kollar ve bacaklar kömür karası, eklemlerde dövme izleri ve perçinler. Pelerinin altında, göğüs hizasında cılız bir kor parıltısı (isteğe bağlı, küçük; fazlara göre hafifçe parlar, Faz 3'te pelerinin altından sızar). Belinde yanmış zincir-ipek önlük parçası ipeğin yandığını anlatır; pelerin bu detayı da taşır. Eski kaya yüzeyi, çatlak kor ve baca delikleri kalktı.

**Gözler:** Kask yarığında iki parlak kırmızı nokta (`#ff2a2a`), göz kapağı yok. Öfkelenince parlar, ölürken söner. Not: Hornet'in kırmızısına yakın; şimdilik kabul, ileride renk değişebilir (kor turuncusuna ya da soğuk bir tona).

**Renk paleti:**
- Kömür karası `#1a1614` (kollar, bacaklar, gövde)
- Pelerin kızılı `#5a1a1a` (koyu kızıl, yanık kenarlar kömüre doğru)
- Kask çelik grisi `#6b6f73`
- Göz kırmızısı `#ff2a2a`
- Kül grisi `#6b625c` (is, duman, ikincil gölge)
- Kor turuncusu `#ff7a1a` (azaltıldı: yalnız pelerin altı kor, Slag Spit, kıvılcım ve lav efektleri)
- Sıcak sarı `#ffd166` (kor merkezi ve kıvılcım; seyrek)
- Soğuk çelik mavisi `#9fb7c9` (iğne)

**Referans ton:** Hollow Knight'ın Nosk ve Silksong'un Crust King Khann'ı arasında bir ağırlık; ama Scoria'da organik değil "zanaat" dokusu var: perçinler, eklem yerlerinde dövme izleri.

**Bitmemiş İğne:** Hornet'inkinden uzun, kalın, ucu bitmemiş (küt ve kızgın). Gövdesinde tamamlanmamış bir desen. 2. fazda ortaya çıkar.

## 6. Arena

Dairesel ocak çukuru, genişlik **32–36 birim**. Karşılaştırma: kamera tek ekranı 29,2 birim; Lace 2 savaş kilidi ~37, Widow ~34, Bell Beast ~37, Signis & Gron ~37.

- **Zemin:** Ortada örs (Scoria'nın çalışma noktası, çarpışma var, Hornet üstüne çıkabilir). İki yanda taş platform. Platformlara ve örse `HazardRespawnMarker` konur.
- **Şahmerdan (arena mekanizması):** Örsün tam üstünde, tavandan kalın bir zincirle asılı dev bir demirci çekici. Prosedürel nesnedir (gövde sprite'ının parçası değil, 3 sprite: yükselme, düşüş, temas). Askıdayken hasar vermez ve oyuncu için engel değildir. Yalnızca düşerken hasar kutusu açılır (2 maske). Scoria zinciri çekince yükselir, bırakınca örse düşer (bkz. A1, B3). Scoria'nın ölümünde hareketsiz asılı kalır. **Zincir geometrisi (2026-10-07):** zincir şahmerdandan tavandaki makaraya çıkar, ikinci makaradan örsün yanındaki sabit çekme noktasına iner; Scoria ucu aşağı çektikçe şahmerdan yükselir. Çekme noktası tek ve sabittir; Scoria A1/B3'ten önce oraya yürür. Yükselmiş şahmerdan kamera görüş alanında kalmalı. Örsün çarpışması Scoria'yı da durdurur (içinden geçmez).
- **Alt:** Oyunun gerçek lavı (`HazardType.LAVA`, Deep Docks `Lava Box` bileşeni kopyası): değince **2 maske** + en son güvenli noktaya respawn (`HazardRespawnMarker`). Magma Bell bu hasarı yarıya indirir. Ölüm değil ama bedeli var. Faz 2'de yan platformlar yutulunca respawn işaretleri örse ve kalan platforma taşınmalı.
- **Üst:** Tavandan iki zincir sarkar; ucunda **Harpoon Ring** (zincirde asılı varyant, `HarpoonRingChain`). Clawline yalnızca ring'lere kancalanır. 2. fazda lav yükselince hayatta kalma yolu.
- **Arka plan:** Dev körük, soğuk ocaklar, duvara saplı yarım iğneler. Körük Scoria'nın nefesi ile hareket eder (3. fazda hızlanır).

**Arena dinamiği:** Faz 2 başında lav bir platform seviyesi yükselir; yan platformlar yarı yarıya yutulur, oyuncu örs ve zincirlere itilir. Emsal: Signis & Gron (Dock_09) son fazında lav şelaleleriyle alanı daraltıyor (`Lava Mode`, `Slide floors`). Aynı Deep Docks dilinde.

## 7. İstatistikler (oyun verisiyle kalibre edildi, 2026-10-06)

| | Değer | Not |
|---|---|---|
| Toplam HP | ~700 | Karşılaştırma: Widow 360, Moorwing 600, Signis 720 / Gron 520, Lace 2 800, Khann 1650 |
| Faz 1 → 2 eşiği | %75 (525) | Oyun düzeni: Lace 2 ve Khann %75/%40 |
| Faz 2 → 3 eşiği | %40 (280) | Faz HP'leri: F1 175 / F2 245 / F3 280 |
| Hasar çarpanları (`damageScaling`) | L1..L5 = 1,75 / 1,25 / 1 / 0,9 / 0,85 | Oyundaki bosslar gelen hasarı iğne seviyesine göre çarpar (`HealthManager` `Level1Mult`..`Level5Mult`). Lace 2'ye yakın değerler seçilir: 1,75 / 1,2 / 1 / 0,85 / 0,85 |
| Öldürme vuruşu (iğne 0/1/2/3/4) | ~78 / 64 / 54 / 47 / 39 | Lace 2: 89 / 73 / 62 / 58 / 45. İğne hasarı 5 / 9 / 13 / 17 / 21 |
| Temas hasarı | 2 maske | Oyunda düşman `DamageHero` değerleri 0 / 1 / 2; 3 maske hiç yok |
| Ağır saldırı hasarı | 2 maske | Aynı kural |
| Lav | 2 maske + son güvenli noktaya respawn | Oyunun gerçek lavı (`HazardType.LAVA`). Magma Bell yarıya indirir |
| Stagger eşiği | 13 isabet (1,0 sn `Combo Time` içinde) | Oyunun `Stun Control` şablon FSM'i; Lace 2 değeri (`Stun Combo` 13, `Stun Hit Max` 15). Vurunca kısa duraklama, sonra Quench ile sıfırlar |
| Ödül rosary | 0 | Boss rosary vermez, Tool verir |

**Zorluk hedefi:** Lace 2'den biraz altında (64 vuruş, Lace 2'de 73; iğne seviyesi 1), Widow'un üstünde (40). İlk denemede öğrenilebilir, 5–10 denemede geçilebilir. Opsiyonel boss, ama "gizli ceza boss'u" değil.

**Not:** Eşikler %75/%40 olunca Faz 1 kısa (175 HP), Faz 3 ise en uzun faz (280 HP) olur. Faz 1 ritim öğretir ve çabuk biter; Faz 3'ün yoğunluğu denge testinde ayarlanır (bkz. Faz 3).

## 8. Saldırı seti

Her saldırı: telegraph (ön hazırlık), aktif süre, toparlanma, kaçış yolu. Süreler saniye.

### Faz 1: Şahmerdan ve Zincir (Hammer)

Scoria yavaş ama alanı kontrol eder; kendi ocağının mekanizmasını kullanır. Oyuncu ritmi öğrenir.

**A1. Örs Vuruşu (Anvil Slam)**
- Telegraph 0,6: Scoria tavandan sarkan şahmerdan zincirini maşayla kavrar ve çeker; şahmerdan yükselir, göğüs ateşi parlar. Telegraph'ın görsel işareti zincir çekişi ve yükselen şahmerdandır.
- Aktif: Scoria zinciri bırakır, şahmerdan örse düşer, iki yöne zemin dalgası (hız orta, yükseklik 1 birim).
- Toparlanma 0,8: şahmerdan birkaç kez sallanıp durur, Scoria zinciri bırakır.
- Kaçış: zıpla. Dalga ikinci sıçramada yan platformlara ulaşır.
- Not: Örsün üstündeysen dalga olmaz ama şahmerdan doğrudan düşer.

**A2. Zincir Kırbacı (Chain Lash)**
- Telegraph 0,5: sağ el zincirli maşayı geriye savurur, zincir şıngırdar, kanca (maşa ucu) görünür.
- Aktif: maşa-zincir yatay salınır, önce ileri sonra geri (iki tur). Alçak.
- Kaçış: zıpla; ikinci turu unutma. Tavan zincirlerindeki Harpoon Ring'e Clawline ile tutunarak da kaçılır.
- Hasar bölgesi: zincirin tamamı. Maşa (kanca) ucu vurursa Hornet geri fırlar.

**A3. Cüruf Tükürüğü (Slag Spit)**
- Telegraph 0,7: kaya başını geri atar, çatlakları ve göğsündeki kor turuncu parlar.
- Aktif: 3 kavisli kor topu, farklı menzillere düşer. Düştükleri yerde 2,5 saniye yanan birikinti.
- Kaçış: boş aralığa koş, ya da örs üstüne.
- Amaç: alanı kirletmek, oyuncunun durma alışkanlığını kırmak.

**A4. Söndürme (Quench)**
- Sadece stagger sonrası ya da oyuncu çok yakın uzun süre kalırsa.
- Telegraph 0,4: lavın kıyısına eğilip maşanın ucunu lava daldırır.
- Aktif: Scoria'nın etrafında buhar sütunu, yarıçap 3 birim, 0,5 sn.
- Kaçış: geri çekil.
- Amaç: sırtına yapışıp vurma stratejisini cezalandırmak.

**Faz 1 sırası:** Rastgele, ama aynı saldırı art arda iki kez gelmez. A1 ve A2 ağırlıklı, A3 her 3–4 saldırıda bir.

### Geçiş 1 → 2: İğne

Scoria örse yürür, maşayla örsün üstündeki bitmemiş iğneyi kancalayıp çeker, sonra iğneyi eline alır (zincirli maşa beline asılır); çekerken bağırmaz, tek bir ağır nefes. Şahmerdan yukarıda hareketsiz asılı kalır. Lav bir seviye yükselir (1,5 saniye, oyuncuya zincirdeki Harpoon Ring'e tutunma zamanı). Yan platformlar yarıya iner; respawn işaretleri kalan zemine taşınır.

Diyalog (ekranda tek satır, oyun fontu):
> *"Not yours. Not anyone's."*
> TR: "Senin değil. Kimsenin değil."
>
> Yerelleştirme: oyunun 10 dili EN, DE, ES, FR, IT, JA, KO, PT, RU, ZH; Türkçe yok. TR metnini mod kendisi sağlar (`Language.Get` prefix yamasıyla kendi anahtarlarımız), oyun dilinden bağımsız bir mod ayarıyla seçilir. Oyun metinleri `resources.assets` içinde şifreli; biz oraya yazmayız.

### Faz 2: İğne (Needle)

Hornet'in hareket setinin aynası. Scoria hızlanır, alan daralmıştır.

**B1. Hamle (Lunge)**
- Telegraph 0,45: iğneyi geriye çeker, ucu parlar.
- Aktif: yatay saplama, 2/3 ekran menzil, çok hızlı.
- Kaçış: zıpla ya da üstünden geç. Hornet'in kendi dash'inin zamanlaması ile aynı; oyuncu "bunu biliyorum" hisseder.
- Toparlanma 0,9: iğne duvara saplanırsa ekstra 0,4. Cezalandırma penceresi.

**B2. Saplama ve Çekiş (Pin and Pull)**
- Telegraph 0,6: iğneyi omuza alır, Hornet'e nişan.
- Aktif: iğneyi fırlatır. Zemin veya duvara saplanır. 0,3 sonra Scoria zincir ile kendini iğneye çeker (Clawline aynası). Çekiş yolu üstündeki her şeye temas hasarı.
- Kaçış: fırlatmayı zıplayarak, çekişi yoldan çıkarak. Zincirlerde asılıysan güvendesin.
- Not: Fırlatma sırasında iğne 1 saniye yerde kalır. Hornet o sırada iğneye vurursa Scoria çekilemez ve 1,2 saniye açık kalır. **Gizli karşı hamle**, öğrenen oyuncuya ödül.

**B3. Kıvılcım Fırtınası (Sparkstorm)**
- Telegraph 0,8: iğneyi örse yatırır, sol maşa-elle şahmerdan zincirini çeker; şahmerdan yükselir.
- Aktif: şahmerdan iğneye vurur, tavandan 8–10 kıvılcım yağar, yere düşünce kısa patlama. Düşüş noktaları yerde 0,4 saniye önceden kızıl nokta ile gösterilir.
- Kaçış: noktaların arasında kal. Zincirler bu saldırıda güvensiz, kıvılcımlar yukarıdan gelir.
- Not: Örsün üstü bu saldırıda en tehlikeli yer; şahmerdan doğrudan iner.
- Amaç: "zincirde bekle" taktiğini kırmak.

**B4. Alçak Süpürme (Low Sweep)**
- Telegraph 0,35: iğne yere paralel iner.
- Aktif: yarım daire süpürme, önüne doğru.
- Kaçış: zıpla. Hızlı ve kısa; B1'den sonra kombo olarak gelir.

**Faz 2 sırası:** B1 → B4 kombosu sık; B2 her 3 saldırıda bir; B3 15 saniyede bir.

### Geçiş 2 → 3: Yeniden Tutuşma

Scoria diz çöker. Sol maşa-elle kendi göğsündeki cüruf kabuğunu parçalar. İçerideki ateş dışarı taşar, çatlaklar beyaza döner. Arka plandaki körük kendiliğinden hızlı çalışmaya başlar. 2 saniye hareketsiz; **tek büyük cezalandırma penceresi**, oyuncuya nefes.

Diyalog yok. Sadece ses (ses sonraya) ve ışık.

### Faz 3: Kor (Ember) — son faz, %40 HP altı (280 HP)

Tüm Faz 2 saldırıları, telegraph süreleri %20 kısa, toparlanmalar aynı. Faz artık en uzun faz olduğundan yoğunluk (kor parçası kuralı, %20 hızlanma) denge testinde ayarlanır. Eklenen:

**C1. Körük Nefesi (Bellows)**
- Telegraph 0,5: Scoria göğsünü şişirir, arka körük çöker.
- Aktif: 1,2 saniye yatay rüzgâr, Hornet'i lav yönüne iter. Zincir ring'lerinde tutunulabilir, zeminde itilirsin. İtilen lava düşerse 2 maske + respawn; bu yüzden rüzgâr süresi kısa tutulur.
- Kaçış: Ring'e Clawline ile tutun ya da rüzgâra karşı koş (koşarak yerinde kalınır, kaçılamaz).
- Amaç: oyuncu pozisyon seçmeye zorlanır, sonrasında B1 gelir.

**Faz 3 kuralı:** Her saldırıdan sonra Scoria'nın göğsünden bir kor parçası düşer, yerde 1,5 saniye yanar. Bu, hem görsel çöküş hissi hem alan baskısı.

### Ölüm

Scoria iğneyi örse saplar, iki eliyle tutunur, dizleri bükülür. Göğüs ateşi 3 saniyede kısılıp söner (sırttaki baca delikleri varsa duman onlardan çıkar). Çatlaklar kararır. Son kare: kül rengi, hareketsiz, ama ayakta, örse yaslı. **Düşmez.** Şahmerdan yukarıda zincirinde hareketsiz asılı. Bitmemiş iğne örste titrer, Hornet alır.

Ölüm diyaloğu (Hornet yaklaşınca):
> *"Then take it. Finish it... or don't. The fire never cared."*
> TR: "Al öyleyse. Bitir... ya da bitirme. Ateşin hiç umurunda olmadı."

## 9. Ödül

**Tool: Cinder Fang (Kor Dişi)** — kırmızı (saldırı) Tool (`ToolItemType` Red; depolu, shard ile dolar)
- Kullanım: Scoria'nın bitmemiş iğnesinden kırılmış bir parça fırlatır. Yüzeye saplanır, 1 saniye sonra patlar ve 2 saniye yanan birikinti bırakır.
- Hasar (taban): saplanma **4**, patlama **12**, yanma **2 hasar / 0,5 sn** (2 saniye birikintide kalan hedefe ek ~8). Emsaller: Straight Pin 5, Threefold Pin 4, Sting Shard fırlatma 2 / diken 4, Pimpillo patlaması 15 (en güçlü kırmızı patlayıcı). Yanma oyunun `DamageTag` sistemiyle kurulur (ör. `Dust Cloud`: 2 hasar / 0,5 sn, tool hasarı).
- Ölçekleme: tool hasarı her ToolKit yükseltmesinde **+%60** artar (`toolKitDamageIncrease` 0,6); boss'un `damageScaling`'i ayrıca uygulanır. Yukarıdaki değerler yükseltmesiz taban.
- Depo ve maliyet: depo ~6–8 kullanım. Dolum standart shard kuralıyla (tam depo 40 shard, `toolReplenishCost`).
- Tasarım gerekçesi: Hornet'in setinde alan kontrolü yok, hepsi anlık hasar. Cinder Fang bunu ekler; Scoria'nın Slag Spit saldırısının oyuncu versiyonu. Boss'un yeteneğini ödül yapmak Silksong'da da var: Bell Beast yenilince Bellway'lerde taşıyıcıya dönüşüyor (`Bone Beast NPC`).

**Yan ödüller:**
- Forge Daughter'da 2 yeni diyalog satırı.
- Ön odadaki yarım iğneler artık incelenebilir, her biri 1 satır lore (toplam 4).
- Bitmemiş İğne, oyuncunun envanterinde "Relic" olarak değil, Hornet'in iğnesine görsel değişiklik olarak **değil** (kapsam dışı; not düşüldü).

## 10. Animasyon listesi

Sprite oyun standardında: tk2d koleksiyonu başına 1 atlas, 64 piksel/birim; klipler çoğunlukla 12 fps (1463 klibin 1075'i), hızlı vuruşlar 15–30 fps. Oyun boss'larının toplam kare sayısı: Signis 176, Gron 178, Moorwing 232, Widow 384, Lace 642 (medyan klip 4–5 kare). Bizim ~150 kare alt sınırda ama Signis/Gron düzeyinde, yeterli.

| Animasyon | Kare | Not |
|---|---|---|
| Idle | 8 | Nefes, pelerin hafif salınır, pelerin altındaki kor titrer; duman döngüsü ayrı katman |
| Walk | 10 | Ağır, sol ayak geride sürüklenir |
| Turn | 3 | |
| Zincir çekme | 6 | Uzanma 2 + çekiş 2 + bırakma 2; A1'in gövde pozları (hazırlık ve toparlanma). Dalga ayrı efekt sprite'ı |
| A2 Chain Lash | 5 + 6 | Hazırlık + iki tur gövde pozu; maşa ve zincir prosedürel segment (kare sayılmaz) |
| A3 Slag Spit | 7 | Kor topları ayrı sprite (4 kare döngü) |
| A4 Quench | 5 | Buhar ayrı efekt |
| Geçiş 1→2 | 14 | Maşayla iğneyi örsten kancalama |
| B1 Lunge | 4 + 3 + 5 | Çekiş + hamle + toparlanma; duvara saplanma varyantı +3 |
| B2 Pin and Pull | 6 + 2 + 6 | Nişan + fırlatma + çekiliş; iğne ayrı sprite |
| B3 Sparkstorm | 8 | İğneyi örse yatırma 3 + sol elle zincir çekme 5 (Zincir çekme pozunun ayna varyantı); kıvılcım ayrı efekt |
| B4 Low Sweep | 5 | |
| Geçiş 2→3 | 12 | Göğsündeki kabuğu kırma |
| C1 Bellows | 9 | |
| Stagger | 4 | |
| Death | 16 | Sönme sırası baca katmanlarıyla |
| Şahmerdan (ayrı prosedürel sprite) | 3 | Yükselme + düşüş + temas; gövde karesi değil, arena nesnesi |
| **Toplam** | **~150 kare** | 147 gövde + 3 şahmerdan. Çekiç kolu kareleri kalktı; maşa ve zincir kare saymaz |

**Üretim notu:** Scoria ayrı katmanlardan kurulur: gövde (kask-maske + gövde, tek parça), pelerin (tek esnek katman), iki kol, iki bacak, iğne, maşa ve zincir (prosedürel), duman, pelerin altı kor parıltısı; şahmerdan ise gövdeden bağımsız arena sprite'ı. Pelerin ikincil harekete sahip olur: gövde hareketini gecikmeyle izler (yay/sarkaç benzeri, hızlı hamlelerde savrulur, durunca sallanıp oturur); bu yüzden pelerin kareleri el çizimi yerine kodla (mesh/segment eğilmesi) ya da gövdeden bağımsız kısa döngülerle verilir. Gövde kareleri LoRA ile üretilir, kol/bacak/iğne/maşa/zincir/şahmerdan kodla hareket ettirilebilir; "kare kare çizilmiş" hissi gövde ve pelerin katmanından gelir. Bu hibrit, oyunun kendi tekniğine en yakın ulaşabileceğimiz yol. Uyarı: attack/transition satırlarında geçen "göğüs ateşi / çatlak / kabuk" ifadeleri eski silüete göre yazıldı; animasyon tasarımı sırasında pelerin ve kor parıltısına uyarlanacak.

## 11. Teknik kapsam (mod kodu, kısa)

- BepInEx eklentisi, Harmony ile Deep Docks sahnesine kapı ve yeni sahne yükleme.
- Boss davranışı: oyunun boss'ları PlayMaker FSM kullanır (boss = `HealthManager` + `tk2dSpriteAnimator` + `DamageHero` hitbox'ları + `Control` FSM (60–159 state) + şablon `Stun Control` FSM). Biz FSM'yi kodla kurmayız; kendi C# state machine'imizi yazarız ve oyunun bileşenlerini yeniden kullanırız: `HealthManager`, `DamageHero`, `tk2dSpriteAnimator`. Faz geçişleri oyundaki gibi başta `hp` okunup eşik = HP × oran ile kontrol edilir.
- Hasar/can: `HealthManager` (hp, `damageScaling` Level1..5Mult, `TakeDamage`, `IHitResponder`) yeniden kullanılır. Fazlar kendi kodumuzda `hp` ile izlenir. Stagger: oyundaki `Stun Control` mantığı (Lace 2: 1,0 sn içinde 13 isabet, en fazla 15) kodda taklit edilir.
- Şahmerdan: Scoria'nın parçası değil, arena nesnesi; kendi küçük state machine'i var: `Askıda` → `Yükseliyor` (Scoria zinciri çekerken) → `Düşüyor` (hasar kutusu açık, `DamageHero` 2) → `Temas` (zemin dalgası ve kıvılcım olayı) → `Sallanıp durur` → `Askıda`. Scoria'nın state machine'i ona `Çek` ve `Bırak` olayları yollar; Scoria ölünce `Askıda` kilitlenir. Prosedürel sprite (3 sprite) ve zincir segmentleri koddan hareket eder. Scoria'nın maşa zinciri de prosedürel segmentlerle çizilir; maşa ucunun hasar kutusu A2'de açılır.
- Lav: `Lava Box` prefab'ı kopyalanır (`BoxCollider2D` + `LavaBox` efekt + `DamageHero` LAVA, 2 + `DamageEnemies` + `NonBouncer`); `HazardRespawnMarker`'lar elle konur.
- Tool: mevcut bir kırmızı Tool'u temel al, davranışını değiştir (`ToolItemBasic`, fırlatma prefab'ı `DamageEnemies` taşır).
- Kayıt: boss yenildi bayrağı oyunun `PlayerData`'sına değil, ayrı bir mod kayıt dosyasına yazılır. `PlayerData` sabit alanlı, reflection ile okunur, runtime'da alan eklenemez; bilinmeyen anahtar riski de var. Mod kaldırılınca kayıt bozulmaz. (Kayıt klasörü yönlendirmesi: `DesktopPlatform.Awake`, `CLAUDE.md` kuralı.)
- Sahne: yeni sahne için iki yol: (a) kendi Addressables kataloğumuz (`LoadContentCatalogAsync`, `Scenes/<Yeni>` anahtarı; oyunun `SceneLoad`'u yamasız çalışır), (b) küçük bir mevcut sahneyi (ör. Dock_14) yükleyip içeriğini runtime'da değiştirmek. Her sahnede `tk2dTileMap` ve `CustomSceneManager` (MapZone `DOCKS`) gerekir.

## 12. Açık sorular

1. Deep Docks'ta gizli kapı için uygun duvar: aday Dock_13 sol alt duvar (alternatif Dock_11, en yakın bench Dock_10). Koordinatlar yaklaşık; oyun içinde bakılıp seçilecek (bkz. §4).
2. ~~Forge Daughter geçmişi çelişkisi~~ Kapandı: Scoria, Forge Daughter'ın yerine geçtiği eski usta (bkz. §3).
3. Tool yerine yeni Crest daha mı iyi ödül? Crest çok daha fazla iş; ilk sürümde Tool, ikinci sürümde değerlendir.
4. Steel Soul modu oyunda var (`permadeathMode`, bazı sahnelerde `Steel Soul States` dalı). Boss orada da erişilebilir olsun mu? Karar kullanıcıda.
5. Lore ve isim yeniden gözden geçirilebilir: karakterin cüruf-golem arka planına bağlı kalması gerekmiyor (pelerinli şövalye siluetiyle "cüruf bedene yapıştı" anlatısı zaten kalktı). Kırmızı gözlerin Hornet'in kırmızısına yakınlığı da açık.

## 13. Sıradaki adımlar

1. Doğrulama büyük ölçüde yapıldı (`notes-dogrulama.md`). Kalan: gizli duvarın oyun içi konumu ve bench'ten koşu süresi.
2. Scoria için SVG silüet ve renk konsepti (burada, Mac'te yapılabilir).
3. LoRA veri seti: Deep Docks ve boss sprite'ları öncelikli.
4. Mod iskeleti: BepInEx "merhaba" eklentisi.
