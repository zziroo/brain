---
type: decision
project: isik-bekcisi
date: 2026-10-24
status: active
tags: [tutorial, ui, koc-isaretleri]
source: Claude Code oturumu "ışık bekçisi: durum ve sıradaki işler", 2026-10-24
---
# Öğretme yazısız olsun: mevcut 32 ipucunun sınıflaması ve üç seçenek

Yusuf 2026-10-24: "Guide'ı yazı olarak yapınca okunmuyor; sezgisel, yazısız bir tutorial yapalım." (Önceki karar: ipuçları tamamen değişebilir, Claude hafızası "tutorial-open-to-redesign", oyun asla durmaz.)
Aynı gün hikâye rafa kaldırıldı (`STORY.on` false), öğretme artık hikâyeye yaslanamaz.

## Sınıflama (ui.js `MARKS`, i18n `h_*`)
Dört sınıf: **A dünya öğretir** (durum kendini gösteriyor ya da dünya tasarımı değişip gösterecek), **C sözsüz simge** (eşyanın yanında tuş kapağı / fare / Boşluk, cümle yok), **D kalkar** (bilgi işareti; görsel zaten anlatıyor).

| İpucu | Şimdi | Sonra |
|---|---|---|
| h_camp_keys, h_camp_scope, h_camp_gate | "[WASD] yürü", "Kapıdan çık", "[E] teleskoba bak" | C: WASD kapağı bekçinin yanında bir an; kapı oku ve Ülker'in işareti zaten var (A) |
| h_move_keys | yürü / feneri çevir / ruhları ışığında tut | C: WASD + fare simgesi; "ışığında tut" A: ilk ruh tam önde, ışıkta ışığın aktığı görülür |
| h_beam_mouse | "[mouseL] basılı tut: odakla" | C: fare-sol simgesi nabız (basılı = nabız). A: ilk kabuklu ruh halede yakalanmaz, oyuncu denemeye itilir |
| h_flare_mouse | "[Boşluk] Parlama" | C: Boşluk kapağı + köşedeki gösterge nabız |
| h_siege (fener nöbeti) | "Fener hazır: ışığına gir", "tırmananları yak" | **A, en kritik**: hazır fenerin yerde ışıklı halkası, bekçiden fenere çağıran ışık çizgisi; çubuk %80'de "takılı" durmasın (ikinci yarı görünür biçimde fenerde doluyor). Tırmananlar görünür; fare simgesi fenerin yanında (C) |
| h_waymark (3 satır) | yaklaş / tutuştur / yağ verir | A: sönük lamba yaklaşınca kıvılcım çakar; C: fare simgesi; "yağ verir" zaten görsel (damlalar) |
| h_road | "Kuzey Yolu'nu izle" | D: yol, kuzey parıltısı, Kandil'in lafı var; gerekirse yol taşları ilk seferde daha belirgin |
| h_oil, h_flow, h_focusOil (bilgi) | fitil / akış / odak yağ yakar | D: fitil göstergesi, akan moteler, ×1.8 zaten anlatıyor |
| h_heat | "Cam ısındı: bırak" | D: cam kızıllığı, ışının solması, halkanın kenarı bunun için tasarlandı |
| h_storm, h_shock, h_sunrise (bilgi) | yıldızın ne yaptığı | D: efektin kendisi; açıklama yıldızın detay kutusunda zaten var |
| h_moth, h_deathhead | döner sonra dalar / iki kez | D (A): tell var: kanat açma, kızıl gözler, çıtırtı sesi; yanında tek fare simgesi yeter |
| h_shy, h_crystal, h_shade, h_prism, h_thorn | ne yaptığı + "[mouseL]" | A + C: davranış görülür; yalnız fare-sol simgesi ilk karşılaşmada |
| h_soot, h_mare, h_great, h_gnawer, h_koncolos | ne yaptığı + "[mouseL]" | A + C: aynı tek simge; "hale tutar ama bitiremez" halede kavrulup gelmeye devam etmesiyle görülür |
| h_tree, h_rock, h_wall | "[mouseL] ağacı tutuştur…" | C: yıldız alınınca ilk uygun katının yanında fare simgesi |
| h_bossOpen | "Kalp açık, odakla" | A: Kalp açılınca parlar; C simge |
| h_sky_mouse | "[mouseL] yıldızı yak" | C: alınabilir yıldız nabız atar + tıklama simgesi |
| Bantlar: newStars, sootHint, h_ulker | cümle | D: teleskop işareti ve is sayacının belirmesi yeter |
| Bantlar: bossSafe | "Hüzmenin içinde dur!" | A: halka görseli + acil ses; yazı kalkar |
| Bant: audioWake | ses için tıkla | kalır (teknik, gamepad) |

Toplam: 12 ipucu ve 3 bant tamamen kalkar; 14 ipucu tek bir tekrar eden "ışın simgesi"ne iner (ilk karşılaşmada, canlının yanında, nabız atan fare-sol); 6 yapısal nokta kalır (kamp yürüme, seferde yürüme/çevirme, odak, parlama, nöbet, gökyüzü).

## Simge dili (ortak)
- Yalnız tuş kapağı çizimleri: WASD, Boşluk, E, fare gövdesi (sol tuşu yanan). Hepsi zaten kapak çiziminde var; `PAD_CAP` eşlemesiyle gamepad'de A / RT / sol çubuk olur.
- "Basılı tut" = simgenin yavaş nabzı; "bas" = tek yanıp sönme.
- Onay: yapınca simge sıcak renge döner, söner, çan sesi (bugünkü "tick" davranışı korunur).
- Yer: eşyanın yanında, oyun durmaz, bir kez; cevapsız kalırsa yine 15 s'de solar, 3 gösterimde öğrenilmiş sayılır (mekanizma aynı).

## Seçenekler
1. **Yalnız simgeler.** Mevcut sistem kalır, bütün cümleler gider, D sınıfı silinir, C sınıfı simgeye iner. Nöbet için yerdeki halka eklenir (bu tek dünya değişikliği). Yaklaşık 1-2 gün ajan işi; risk düşük; "neden" bilgisi gider ama zaten okunmuyordu.
2. **Dünya öğretir + simgeler.** 1'e ek: ilk sefer koreografisi (çayırda ilk ruh tek başına tam önde; ilk kabuklu ve ilk karacık tek, güvenli), hazır fener oyuncuyu çağırır (halka + ışık çizgisi, çubuk ikinci yarıyı fenerde gösterir), yol lambası yaklaşınca kıvılcım çakar. run.js spawn kuralları + render; 3-5 gün. En iyi his, bot dengesi için yeniden ölçüm gerekir (ilk sefer değişir).
3. **Gösterim.** Sakinler gösterir (Kandil kampta ışını ve parlamayı yapar, oyuncu taklit eder; kampta deneme ruhu). Karakter ve animasyon işi, hikâye raftayken temelsiz; pahalı. Şimdi önerilmez.

## Karar (2026-10-24, Yusuf)
Seçenek 1 seçildi ve yazıldı (depo `4283dfd`, canlıda): koç işaretleri yalnız tuş kapağı (`k_walk`, `k_aim`, `k_hold` nabızlı, `k_press`, `k_use`, `k_click`), bilgi işaretleri ve metin bantları silindi (yalnız `audioWake` kaldı), `h_siege` yalnız nöbet sürerken; hazır fenerin yerde sıcak halkası (`siegeRing()`, render.js `ringGlow`/`ringHoles`/`groundRing`), sönük yol lambasının serin halkası. Seçenek 2 (dünya öğretir: ilk sefer koreografisi, fener çağırır) Yusuf simgeli hâli oynadıktan sonra; "ikisini beraber kurgulayabiliriz" dedi, emin değil. Seçenek 3 hikâyeyle birlikte sonraya ([[2026-10-24-hikaye-rafta-tek-bayrak]]).

## Öneri (karardan önce)
İki faz: önce 1 (bir ajan, tek dilim: yazı tamamen gider, simge dili oturur), sonra 2'nin nöbet ve ilk sefer parçaları. Denge ölçümü yalnız 2'den sonra.

## Açık soru (Yusuf'un kararı)
İlk fener bugün ~8 seferde dolar (12 Ekim "uzunluk içerikten" kararı); Yusuf 4-5 seferde dolmayınca "anlayamadım" dedi. Nöbet sinyali bunun bir yarısı; kotanın kendisi (`BEACON_ENERGY[0]`) ayrı karar.

Reddedilen: yazıları kısaltmak (yine yazı), oyunu durduran öğretici (eski karar: asla), hikâye karakterleriyle öğretmek (seçenek 3, rafta).
