---
type: decision
project: tussle
date: 2026-10-08
status: superseded
tags: [tussle, gorsel, tema, ui]
source: oturum 2026-10-08 (mobil-playus cila turu)
---

# Karar: görsel dil "neon oyuncak"; koyu tema varsayılan, açık tema ayar

> **Geçersiz (2026-10-08 gece):** yerini [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]] aldı. Yüz/maskot, alt kenar ve parçacık bütçesi kuralları orada da geçerli; zemin, tema varsayılanı ve font değişti.

## Bağlam
M0 yayındaydı ama arayüz ve oyunlar düz ve kişiliksizdi. Yusuf Playus ekran görüntülerini "fikir olsun" diye paylaştı, görsel yönü Claude'a bıraktı; tek şartı Playus'u kopyalamamak.

## Karar
- Yönerge `docs/VISUAL.md`: koyu lacivert zemin, tombul yuvarlak şekiller, düğme/kartta kalın **alt kenar** (ekstrüzyon) ile derinlik, şeker paleti (`--candy-1..8`, avatar rengi kimlik karması), her oyuna bir **yüz** (Refleks göz, Kule üst blok, Matematik baykuş, Bıçak kütük), squash-stretch ve en çok 48 parçacık.
- **Gece (koyu) varsayılan**, **Gündüz (açık)** ve **Sistem** Ayarlar'dan seçilir (`data-theme`, ilk boyadan önce satır içi betikle). Canvas oyunlar temayı oyun başında okur, iki temada da çalışmak zorunda.
- Işıma yalnız birincil düğme ve geri sayımda; kart kenarında ışıma, blur/cam yok.

## Neden
- Koyu zemin OLED'de pil/ısı için iyi (önceki karar) ve ziroo.net ailesiyle uyumlu; ama Playus'un krem/oyuncak hissi erişilebilirlik ve "sıcaklık" açısından güçlü. İkisi de: koyu varsayılan + açık ayar.
- Derinliği ışıma yerine alt kenarla vermek hem ucuz (compositor dostu) hem oyuncak hissini veriyor.

## Reddedilen alternatifler
- **Açık krem varsayılan (Playus gibi):** Yusuf koyu istedi.
- **Yalnız koyu:** açık tema isteyen kullanıcı ve gündüz dış mekân okunurluğu için ayar ucuz, eklendi.
- **Playus ekran yapısını kopyalamak:** fikir kaynağı sayıldı; ekranlar `docs/VISUAL.md` §5'e göre kendi yapımızla tasarlandı.
