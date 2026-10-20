> Tarih: 2026-10-21. Kaynak: Claude Code oturumu "tussle: mevcut durum kapsamlı çalışma", görsel analiz ajanı.

# Tussle oyun sahneleri: görsel tarz analizi (2026-10-21)

Kanıt: `shots/<id>.png` (gece, 375x812, oyun ortası), `shots-gunduz/` (beğenilen 7), `covers/<id>.png` (kart kapak, gece),
`kontak-oyunlar.png`, `kontak-kapaklar.png`, `begenilen-kapak-vs-oyun.png`. Yollar `src/games/...` göreli.
Notlar: `swing` çalışma kopyasında silinmiş (VISUAL.md diff'i: "2026-10-21'de kaldırıldı"), oyun çekimi yok, kapağı var.
`cups` şu an açılmıyor (`cups/sim.ts:187` `CUP_W_BY_N is not defined`, başka ajanın yarım düzenlemesi); ilk turdaki
(sonra silinen) karede masada küçük üç kupa + boş koyu sayfa görünüyordu. Bazı kareler oyun bitişine denk geldi
(bounce, spike-wall, keep-up "düştün" yazısı); sahne yine okunuyor.

## a) Hedef tarz: beğenilen 7 oyunun ortak dili

Görüntüde ortak olan: ekranın büyük kısmını kaplayan, hacimli, çok renkli bir ana nesne/dünya; boş koyu sayfa azdır.
Somut ölçütler (kodda):

1. **Büyük ana nesne, ekranın %35–60'ı.** fill-up bardağı `glassH = h*0.4` (`fill-up/view.ts:179`); crack-it kasası
   HUD'dan klavyeye kadar (`crack-it/view.ts:236-240`); on-time kum saati + arkasında disk; split'te tabak + jöle ortada;
   bounce'ta yakın karolar ekran genişliğinde; road-rush'ta dünya ekranın tamamı. (hoop istisna: pota küçük, ama saha bandı alt çeyreği doldurur.)
2. **Hacim (2.5D, en az iki ton):** her nesnenin ayrı tonlu bir alt/ön/yan yüzü var.
   bounce: üst yüz + koyu ön yüz + kameraya bakan yan duvar (`bounce/view.ts:274-300`, tonlar `darken 0.28/0.16` `:131-132`);
   road-rush: "top face = fill, front face = fill darkened with ink" (`road-rush/view.ts:4,90`); split: jöle gövdesi
   `mix(body,0,0.28/0.38)` ile 7u aşağı kaydırılmış yan kenar (`split/view.ts:111-112, 247-260`); crack-it kasa `edgeH 8u`,
   tuşlar `edgeH 6u` (`crack-it/view.ts:209,215-218`); on-time kapak `edgeH 5u` (`on-time/view.ts:197`); fill-up eliptik ağız,
   arka yarı ince/ön yarı kalın + parıltı (`fill-up/view.ts:5-8`); hoop pano `edgeH 5u` (`hoop/view.ts:100`).
3. **Kontur her nesnede, 2.5–3u, iki temaya göre:** gündüz `theme.ink`, gece `theme.line`/`muted` (mürekkep #2a1630 koyu
   sayfada kaybolur): `split/view.ts:110`, `on-time/view.ts:195`, `fill-up/view.ts:150`.
4. **Temas gölgesi / derinlik:** bounce topun altında karo üstü elips gölge (`bounce/view.ts:344`), fill-up tezgâhta
   yumuşak gölge (`fill-up/view.ts:587`), split tabağın kayık mürekkep gölgesi (`split/view.ts:263-281`).
5. **Parlaklık izi:** bounce topunda beyaz %55 elips (`bounce/view.ts:416`), fill-up'ta sol duvar şeridi + ağız parıltısı;
   kapaklardaki `ball()` parlaklığının aynısı (`client/ui/covers-core.ts:1173-1175`).
6. **Çok renk, geniş alanda:** on-time 7, road-rush 8, split 6, crack-it 5 farklı `theme.candy` (her rakam tuşu ayrı renk
   `crack-it/view.ts:215-218`; bounce karoları renk çemberinde akar `bounce/view.ts:123-133`).
7. **Sahne katmanı = "yer":** road-rush çim/yol/ray şeritleri tüm ekran (`road-rush/view.ts:185-240`), hoop petrol saha
   bandı + çizgi (`hoop/view.ts:107,176-178`), on-time kahraman arkasında `bg2` spot diski (`on-time/view.ts:320-325`).
   Hepsinde nesnenin "üstünde durduğu" bir zemin var (tezgâh, tabak, saha, karo, yol).
8. **Yüz + tepki:** hepsinde `drawFace` (EXPR değişir); HUD ve olay efektleri kabuktan (`ShellView`).

Kısaca hedef: **ekranı dolduran 1 kahraman/dünya + 2 tonlu hacim + iki temaya uyan kontur + temas gölgesi +
3+ şeker rengi + nesnenin bastığı bir zemin.**

## b) Kümeler (45 oyun; swing kaldırıldı)

| küme | oyun | eksik olan |
|---|---|---|
| hedef | road-rush, bounce, crack-it, hoop, on-time, fill-up, split | (referans) |
| hedef | zigzag | iso karolar 3 yüz, renk akışı; zemin boş ama yol ekranı dolduruyor |
| hedef | chop | alacakaranlık katmanı + nane zemin + kalın kamış; tam hedefte |
| yakın | spiral | 3B halkalar iyi; sayfa boş, kapak pembesi yok |
| yakın | stop-wheel | büyük çark iyi; çarkın altında zemin/ayak yok, düğmeler arayüz gibi |
| yakın | how-many | kapak + tuşlar büyük; tabak/masa zemini ve gölge yok |
| yakın | knife-toss | ahşap hedef ayrıntılı; arkası tamamen boş koyu sayfa |
| yakın | odd-one-out | yüzler büyük; tepsi düz, hacim yok |
| yakın | right-door | kapılar + tabela; duvar bandı soluk, kapılar küçük |
| yakın | hop | tepeler + bulut var; kahraman küçük, bloklar ince |
| yakın | flutter | tepeler var; kahraman küçük, sütun gövdesi ince |
| yakın | jetpack | silüet katmanı var; koridor çoğunlukla boş, kahraman küçük |
| yakın | lane-dash | yol perspektifi iyi; yol çevresi siyah, nesneler küçük |
| yakın | trace | şerit renkli; zemin koyu, damlalar soluk |
| yakın | beat | şerit + pedler; şeritler koyu boş, şekerler küçük |
| yakın | stack | bloklar hacimli ve yüzlü; kule küçük, ekranın 2/3'ü boş |
| yakın | reflex | dev göz iyi; sonuç/ara ekranlarında boş sayfa + küçük göz |
| baştan | four-arrows | iki düz mavi kutu, `edgeH: 0` (`four-arrows/view.ts:61-62`); sahne yok, arayüz düğmesi gibi |
| baştan | make-10 | sönük sarı daire ızgarası, hacimsiz; tek renk (`make-10/view.ts:49-50`) |
| baştan | quick-math | koyu gri kutu tuşlar (renk yok), kart arayüz paneli |
| baştan | color-match | koyu kart + iki düğme; sahne/karakter yok |
| baştan | lights | dört soluk büyük kare; sahne yok, arayüz gibi |
| baştan | double-tap | koyu boş yuva ızgarası, küçük şekerler |
| baştan | chain | koyu sayfada küçük numaralı noktalar, hiç zemin yok |
| baştan | flip-match | küçük düz lavanta kart arkası, "?"; masa yok |
| baştan | treasure | küçük sarı kare ızgarası; kum/ada sahnesi yok |
| baştan | brake | ince cetvel + minik araba; yol kapak gibi değil |
| baştan | cups | (ilk tur karesi) masa çubuğu + küçük kupalar, boş sayfa |
| baştan | balance | ince direk + çizgi yayı; nesneler çizgi kalınlığında |
| baştan | pinata | ince ip + çubuk + top, boş kuyu; kapaktaki yeşil bahçe yok |
| baştan | slice | koyu boş sayfa, tek küçük şeker; tezgâh ince |
| baştan | spike-wall | ince duvarlar, minik dikenler, boş kuyu |
| baştan | keep-up | ince duvar (`ww = 7u`, `keep-up/view.ts:127`), boş alan, tek top |
| baştan | target | koyu sayfada küçük hedefler; arka plan halkaları gece %12 (`target/view.ts:160`) |
| baştan | snake | boş koyu tahta, minik tırtıl |
| baştan | sort-it | ince bant, minik paketler, iki kutu |
| baştan | bridge | iki düz mor blok `edgeH: 0` (`bridge/view.ts:42`), minik kahraman |
| baştan | arrow-wall | ince çubuk duvar + küçük okçu, boş sayfa |
| baştan | color-recall | arayüz paneli + "?" halka; oyun nesnesi yok denecek kadar az |

Basitlik göstergeleri (baştan kümesinde tekrar eden): (1) ekranın >%60'ı düz `theme.bg` (gece #121417, `client/ui/theme.css:76`);
(2) `edgeH: 0` ya da ince çizgi nesne (hacim yok); (3) kahraman ekran genişliğinin <%12'si; (4) tek renk ya da koyu gri
`surface` dolgu; (5) nesnenin bastığı zemin yok; (6) gece arka plan katmanı alfa ≤ %12, görünmez.

## c) VISUAL.md §2.1 ("sade") ile ilişki

Çatışmayanlar (hedef tarz zaten içinde): tek dolgu + kontur + yüz; olay anında efekt; serpinti/konfeti zemin yok;
≤ 6 statik dekor; kare başına ayırma yok; metin kabuktan; `stickerRect` `edgeH` serbest.

Çatışanlar (beğenilen oyunlar zaten §2.1'in dışına çıkıyor):
- "Zemin düz `theme.bg`": road-rush tüm ekranı çim/yol şeridi + dama deseniyle dolduruyor (`road-rush/view.ts:185-210`), hoop saha bandı.
- "Gradient yok": bounce ufuk sisi `createLinearGradient` (`bounce/view.ts:145`).
- "Parlaklık lekesi yok": bounce top parlaklığı (`:416`), fill-up parıltı/gölge şeritleri.
- "Izgara/şerit deseni yok": road-rush sütun damaları (`road-rush/view.ts:193-199`).
- "En fazla 1 soluk katman": beğenilenlerde katman soluk değil, opak ve büyük (saha, tabak, çim).
Sonuç: §2.1 "boşluk" üretiyor; beğenilen tarz §2.1'in **maksimumu bile değil, üstü**. Gevşetilmesi gerekenler:
arka plan katmanı (zorunlu ve opak olabilir), parlaklık izi (sabit, pişirilmiş), hacim yüzü (zorunlu), kapak paleti (zorunlu).

Önerilen kural taslağı (§2.1'in yerine):
```
### 2.1 Oyun sahnesi: dolu ama sakin (2026-10-21)
- Sahne = bir "yer": kahramanın bastığı opak bir zemin/masa/saha/yol katmanı zorunlu (layoutGame'de pişirilir,
  kapak renginden: --cover-<id> / -2'ye en yakın candy, gece mixHex(bg, candy, 0.25-0.35)). Boş tema sayfası
  ekranın en fazla %40'ı.
- Kahraman ya da ana nesne kısa kenarın en az %25'i; oyun alanı ekranın ortasını doldurur.
- Her nesne: tek dolgu + 2. ton hacim yüzü (alt kenar edgeH >= 4u ya da ön/yan yüz, candy'nin %25-38 koyusu)
  + kontur 2.5-3u (gündüz theme.ink, gece theme.line/muted) + yere temas gölgesi.
- Yuvarlak kahramanda pişirilmiş tek parlaklık izi serbest (beyaz %45-55 elips); yüzde yanak + göz parıltısı
  (kapaktaki face()).
- En az 3 candy rengi sahnede; kapağın ana renk çifti sahnenin en büyük iki alanında.
- 1 opak zemin + en fazla 1 soluk uzak katman (tepe/silüet); statik dekor <= 6; süs hareket etmez.
- Gradient yalnız layoutGame'de pişirilmiş sis/HUD bandı; kare başına yok. Desen yok (dama yalnız oyun bilgisi
  taşıyorsa: ızgara/şerit).
- Efekt yalnız olayda; metin kabuktan; kare başına ayırma yok (değişmez).
```

## d) Kapak ile oyun ekranı farkı nereden geliyor

- **Zemin rengi:** kapak `backdrop()` tam doygun panel `--cover-<id>` + iki %10 beyaz hale + `--cover-<id>-2` tepe
  (`client/ui/covers-core.ts:139-147`). Oyun sahnesi gece #121417 (`theme.css:76`); kapak rengi sahneye çoğu oyunda hiç
  gelmiyor. Karşılaştırmada (begenilen-kapak-vs-oyun.png) farkı en az olanlar zemin rengini taşıyanlar: road-rush (çim),
  hoop (petrol saha).
- **Kompozisyon:** kapakta maskot ortada, yüksekliğin ~1/3'ü, etrafında 2-3 bağlam nesnesi; oyunda nesneler oyun
  geometrisine dağılmış ve küçük, ortası çoğu zaman boş.
- **Işık:** kapakta her oyuncakta parlaklık (`block()` şeridi `:115-118`, `ball()` elipsi `:1173-1175`) ve yüzde göz
  parıltısı + yanak (`face()` `:120-136`); oyundaki `drawFace` yalnız göz/kaş/ağız çiziyor (`games/view-kit.ts:128-140`),
  yanak/parıltı yok.
- **Hacim:** kapakta her şey koyu alt tonla (`--candy-N-dk`) kalın; oyunda birçok nesne `edgeH: 0`.
- **Kontrast:** kapakta kontur yok, renk-renk kontrastı var; oyunda kontur koyu sayfada (gece `theme.line` #383e46)
  zayıf, nesneler koyu zeminde "yüzüyor".
- **Statik parıltı/yıldız** kapakta var (`sparkle`), oyunda §2.1 yasağı; bu fark kalabilir.

## e) Tahmini iş ve sıra

Ölçek: küçük = zemin katmanı + renk/boyut ayarı (~1 oturum ajan, view.ts'te 50-100 satır); orta = nesnelere hacim +
kompozisyon + zemin (150-300 satır); büyük = sahne baştan (yeni dünya + nesne çizimleri, 300+).
- Küçük: stack, reflex, knife-toss, spiral, stop-wheel, how-many, odd-one-out, hop, flutter, jetpack, beat, trace, lane-dash, right-door.
- Orta: lights, color-match, quick-math, double-tap, flip-match, make-10, four-arrows, chain, target, keep-up, bridge, color-recall, sort-it.
- Büyük: treasure, brake, cups, balance, pinata, slice, spike-wall, snake, arrow-wall.
- Önce ortak altyapı (1 ajan): `view-kit`'e kapak `face()` eşdeğeri (yanak + göz parıltısı), `bakeGround(theme, coverId)`
  (kapak rengini iki temaya taşıyan opak zemin şeridi), `stickerStyle` için hacim yüzü varsayılanı (edgeH 5u, candy-dk).
- Önerilen ilk 8 (en basit görünen + sık oynanan tıklama oyunları; altyapıyı farklı sahne tiplerinde dener):
  four-arrows, make-10, bridge, target, snake, keep-up, chain, spike-wall.
  Sonra arayüz-benzeri grup (lights, color-match, quick-math, double-tap, flip-match), sonra büyükler.
