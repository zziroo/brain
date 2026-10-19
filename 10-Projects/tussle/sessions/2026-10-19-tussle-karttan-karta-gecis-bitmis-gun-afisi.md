---
type: session
project: tussle
date: 2026-10-19
status: active
tags: [tussle, arayuz, gecis, akicilik, yayin]
source: oturum "tussle: geçiş ve düzenleme geri bildirimi" (2026-10-19 gece)
---

# Oturum: telefon notlarından geçiş düzeltmeleri (19 Eki gece)

Yayın: sunucu + OTA `c315068` (0.20261019.1933). Ara yayın `db5237e` (0.20261019.1854).

## Kararlar (Yusuf)
- **Karttan karta geçiş:** ana sayfa oda kartının tamamı odadaki bugünün kartına dönüşür (eskiden yalnız kapak görseli büyüyordu, "tam ekrana uzuyor" hissi). Kapak sanatı iki uçta aynı yerde hizalanır, çift görsel yok; odanın geri kalanı kademeli belirir. Kalan küçük kusurlar (ilk 150 ms solda beyaz şerit, ad/düğme soluklaşarak değişir) kabul edildi.
- **Bitmiş gün = açık günün afişi (varyant A, 116 px):** ince şerit (76 px) kalktı; ▶ yerine yazısız sarı hediye rozeti. B (92 px) reddedildi: geçiş birebir aynı olsun.
- **Sonraki günü başlat sakin:** herkes bitirmeden yalnız soluk açıklama satırı, hazır olunca küçük düğme; satır yüksekliği sabit. Sahip beklerken 30 sn'de bir yalnız o satır yenilenir.
- **Dönüşte ortalama:** odadan dönünce kart görünür bandın dışındaysa ana sayfa kartı ortaya kaydırır, dönüşüm oraya iner.
- **Maskot:** görünsün diye yapay bekleme yok (Yusuf "bırakabiliriz" dedi). Gerçek bekleme olan parti sonuç bekleyişine eklendi (sonuç kartı + sohbetteki parti kartı).
- ▶ / yazı tura / hediye rozetleri 3 px kontur + sert gölge; ana sayfa profil düğmesine kontur.
- **Şansını dene varken hediye yok:** önce bedava yazı tura; kaybedince gün biter, hediye afişteki rozetle gelir (`6463108`).
- **Bugün kartı sade:** büyük satır "Bugün {sıra}." (puan/birim yok, puan altındaki satırda); sezon kutuları "#1"…"#32" (en fazla 32 üye; sezon 1–90 gün, bant en çok 14 kutu kaydırır); oynanmayan gün soluk beyaz (`1a89ebf`).
- Geçiş hızına dokunulmadı (Yusuf karar vermedi; telefonda hâlâ fark edilmiyorsa yavaşlatılır).

## Teknik
- İlk girişte dönüşüm yoktu: oda verisi yalnız odaya girince bellekte önbelleğe alınıyordu. Ana sayfadan boşta önceden çekme + dokununca başlatma + en çok 150 ms bekleme eklendi.
- **Tuzak:** `rooms/:code/today` ve `iap/catalog` günün satırını oluşturur (oyun seçimi donar). İstenmemiş önceden çekme önce salt okunur oda bilgisini alır, `today.picked` doğru ve `closesAt`'a 5 sn'den fazla varsa günlüğe dokunur; kilitli oda hiç çekilmez. Sunucu özetine `picked` eklendi.
- Hediye kataloğu oda+gün başına önbellekte; geç gelirse zıplamaz, kayar.
- Kapanış sertliği: liste söner sonra kart kenarı zıplıyordu (144 px tek kare); artık açılışın tersi (22 px).
- Geçiş köşeleri: `::view-transition-image-pair` üzerinde `clip-path: inset(round)`; değerler tek `<style id="vt-corners">` ile (html'e satır içi değişken tüm belgeyi yeniden hesaplatıyordu).

## Telefonda bakılacak
İlk girişte dönüşüm, bitmiş gün afişi ve hediye rozeti, sahip satırı, kapanış hissi, dönüşte ortalama, parti bekleme maskotu; Gece'de rozet konturu silik mi.

İlgili: [[2026-10-19-tussle-arayuz-cilasi-gecis-maskot]], [[2026-10-19-gecis-olcumu-gizli-bolme-ve-view-transition-tuzaklari]].
