---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, kapisma, arena, parti-gecesi, bildirim, animasyon, ui]
source: "oturum 2026-10-21 akşam (mobil-playus: rol sadeleştirme → kapışma 1v1)"
---

# Karar: Kapışma 1v1 ve bildirimsiz, arena kendi sekmesinde, VS ve Parti açılış sahneleri

## Ne
- **Kapışma = 1v1, odaya açık, bildirimsiz.** ⚔ → oyun (son oynanan ya da Rastgele hazır seçili) → "Odaya aç". İlk "Katıl" diyen rakip. Kart, açan odada kaldıkça süresiz durur.
- **⚔ penceresi üç sekme: Kapışma · Arena · Parti Gecesi.** Arena oyunları kendi sekmesinde, "Masa aç", koltuk oyuna göre 2-4 (min≠max ise seçim). Arena kartları da bildirimsiz. Parti Gecesi açılışında bildirim sürer.
- **Kart:** iki taraflı (VS, önde çubuğu, taç, fark), "N izliyor" (maçın oyuncuları sayılmaz). **Rövanş = yeni kart** (aynı oyun, odaya açık; eski rakip de basarsa o karta oturur).
- **İzleme:** tek pencerede iki oyuncu yan yana, önde olanın ekranı halkalı; dokununca tam ekran. Oyunun kendi büyük skoru şimdilik kalıyor.
- **VS açılışı B "ayrık ekran"** (2 kişi çapraz; 3 kişi eğik Y, 4 kişi eğik artı), ~2,1 sn, 5 sn başlama payına sığar. Parti maçlarında yok.
- **Parti Gecesi açılışı B "halka"**: avatarlar sarmalla halkaya oturur (14+ iki halka, 32'ye kadar), ilk oyun `PARTY_OPEN_SCENE_MS` 2,5 sn geç başlar.
- Commit'ler `1206fb1` (kapışma/arena/VS), `ce164c0` (halka); çizimler `src/client/mockups/kapisma*`, `acilis*`.

## Neden
- Kapışma anlık bir şey; odaya giden canlı bildirim, herkes parti açabildiği için spam'e dönüyordu (Yusuf: "kapışma odaya bildirim göndermesin").
- "Birine meydan oku" araya kişi seçme adımı sokuyordu (Yusuf); odaya açık 1v1 hem adımsız hem anlık.
- Grup oyunu zaten Parti Gecesi'nde; arena ileride toplu odalarla ayrı düşünülecek, bu yüzden kendi sekmesi.

## Reddedilen
- Hedefli meydan okuma (kişi seç, kabul/geç): fazladan adım.
- 2/3/4 kişilik kapışma: Parti ile çakışıyor.
- Rövanşta istek/kabul akışı: yeni kart daha basit (Yusuf yeni kartı seçti, Claude da onayladı).
- VS A "çarpışma" ve Parti A "takım fotoğrafı": Yusuf B'leri seçti (A 32 kişide kalabalık).
- Ana ekranda ayrı arena bölümü (yabancılarla eşleştirme): moderasyon/eşleştirme/sunucu yükü; ileride.
- Canlı bildirime oda başına sıklık sınırı: kapışma bildirimi tamamen kalkınca gerek kalmadı. Sohbet bildirimi sınırı önerildi, karar verilmedi.
- İptal edilen parti bildirimini silmek: üç platformda ayrı yerel iş; Yusuf "zorsa boşverelim".

## Açık
- Arenanın toplu/açık odaları ve ayrı bölüm tasarımı.
- Telefon teyidi: VS ve halka sahnesinde kasma (düşük donanım), izleme penceresi, 2 kişilik arena masası, Android geri tuşu.

İlgili: [[2026-10-21-yardimci-rol-kalkti-parti-ve-sonraki-gun-herkese]], [[2026-10-21-arena-parti-2-gecikmesiz-oyunlar-ve-gorsel-sema]].
