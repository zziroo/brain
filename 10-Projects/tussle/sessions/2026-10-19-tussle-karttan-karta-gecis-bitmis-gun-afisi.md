---
type: session
project: tussle
date: 2026-10-19
status: active
tags: [tussle, arayuz, gecis, akicilik, yayin]
source: oturum "tussle: geçiş ve düzenleme geri bildirimi" (2026-10-19 gece)
---

# Oturum: telefon notlarından geçiş düzeltmeleri (19 Eki gece)

Yayın: son `5c0161e` (0.20261019.2145, DB 24); önceki `c315068`. Ara yayın `db5237e` (0.20261019.1854).

## Kararlar (Yusuf)
- **Karttan karta geçiş:** ana sayfa oda kartının tamamı odadaki bugünün kartına dönüşür (eskiden yalnız kapak görseli büyüyordu, "tam ekrana uzuyor" hissi). Kapak sanatı iki uçta aynı yerde hizalanır, çift görsel yok; odanın geri kalanı kademeli belirir. Kalan küçük kusurlar (ilk 150 ms solda beyaz şerit, ad/düğme soluklaşarak değişir) kabul edildi.
- **Bitmiş gün = açık günün afişi (varyant A, 116 px):** ince şerit (76 px) kalktı; ▶ yerine yazısız sarı hediye rozeti. B (92 px) reddedildi: geçiş birebir aynı olsun.
- **Sonraki günü başlat sakin:** herkes bitirmeden yalnız soluk açıklama satırı, hazır olunca küçük düğme; satır yüksekliği sabit. Sahip beklerken 30 sn'de bir yalnız o satır yenilenir.
- **Dönüşte ortalama:** odadan dönünce kart görünür bandın dışındaysa ana sayfa kartı ortaya kaydırır, dönüşüm oraya iner.
- **Maskot:** görünsün diye yapay bekleme yok (Yusuf "bırakabiliriz" dedi). Gerçek bekleme olan parti sonuç bekleyişine eklendi (sonuç kartı + sohbetteki parti kartı).
- ▶ / yazı tura / hediye rozetleri 3 px kontur + sert gölge; ana sayfa profil düğmesine kontur.
- **Şansını dene varken hediye yok:** önce bedava yazı tura; kaybedince gün biter, hediye afişteki rozetle gelir (`6463108`).
- **Bugün kartı sade:** büyük satır "Bugün {sıra}." (puan/birim yok, puan altındaki satırda); sezon kutuları "#1"…"#32" (en fazla 32 üye; sezon 1–90 gün, bant en çok 14 kutu kaydırır); oynanmayan gün soluk beyaz (`1a89ebf`).
- **Sezon kartı H1c (20 Eki):** üstte "#N · P puan" | taçlı lider ("Lider sensin"); "Gün x/y" + gün noktaları (oynanan dolu, kaçan halka, bugün dolu siyah, kutulardaki 7 gün koyu, diğerleri soluk; çubuk/kaydırıcı ve parlayan pencere reddedildi); 7 kutu (4 geçmiş, bugün, 2 ileri). 14 kutu ve kayan şerit reddedildi (dokunma/kaydırma çakışması).
- **Sezon uzunluğu 7–30** (göç 24 ayarları sıkıştırır; süren sezon uzunluğunu korur). Yusuf: kısa sezona gerek yok, gün atlatılabiliyor.
- **Sezon sayfası:** elmas yerine "52 puan | #3"; sıralamada "61 p · 8/9 gün"; grafik ipucu parmak kalkınca kapanır. Satır içi Günler listesi reddedildi (sıkışık): ✕ yanında **Geçmiş** ekranı (#/oda/:code/gecmis), gün kartları, dokununca o günün tam sıralaması + denemeler (salt okunur GET season/days/:i, gün oluşturmaz).
- **Oyuncu kartı sade:** "Profili gör", bugünkü denemeler (en iyisi ★), tek satır sezon; sparkline ve genel profil özeti kalktı. Tekrar izleme şimdilik yok (yapılabilir: loglar var; eski sürüm ve adalet sorunu).
- Odadan çıkan sıralamadan düşer, geri gelince her şey döner (sıralar canlı hesaplanır); Yusuf bu hâli uygun buldu.
- Geçiş hızına dokunulmadı (Yusuf karar vermedi; telefonda hâlâ fark edilmiyorsa yavaşlatılır).

## Teknik
- İlk girişte dönüşüm yoktu: oda verisi yalnız odaya girince bellekte önbelleğe alınıyordu. Ana sayfadan boşta önceden çekme + dokununca başlatma + en çok 150 ms bekleme eklendi.
- **Tuzak:** `rooms/:code/today` ve `iap/catalog` günün satırını oluşturur (oyun seçimi donar). İstenmemiş önceden çekme önce salt okunur oda bilgisini alır, `today.picked` doğru ve `closesAt`'a 5 sn'den fazla varsa günlüğe dokunur; kilitli oda hiç çekilmez. Sunucu özetine `picked` eklendi.
- Hediye kataloğu oda+gün başına önbellekte; geç gelirse zıplamaz, kayar.
- Kapanış sertliği: liste söner sonra kart kenarı zıplıyordu (144 px tek kare); artık açılışın tersi (22 px).
- Geçiş köşeleri: `::view-transition-image-pair` üzerinde `clip-path: inset(round)`; değerler tek `<style id="vt-corners">` ile (html'e satır içi değişken tüm belgeyi yeniden hesaplatıyordu).

## Telefonda bakılacak
İlk girişte dönüşüm, bitmiş gün afişi ve hediye rozeti, sahip satırı, kapanış hissi, dönüşte ortalama, parti bekleme maskotu; Gece'de rozet konturu silik mi.

Kararlar: [[2026-10-19-karttan-karta-gecis-bitmis-gun-afisi]], [[2026-10-20-sezon-karti-h1c-gun-noktalari-7-kutu]], [[2026-10-20-sezon-uzunlugu-7-30-gun]], [[2026-10-20-sezon-gecmisi-ayri-ekran]], [[2026-10-20-oyuncu-karti-denemeler-profil-baglantisi]]. Ders: [[2026-10-19-onceden-cekme-gun-satirini-olusturmamali]].

İlgili: [[2026-10-19-tussle-arayuz-cilasi-gecis-maskot]], [[2026-10-19-gecis-olcumu-gizli-bolme-ve-view-transition-tuzaklari]].
