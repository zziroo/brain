---
type: decision
project: ziroo-edge
date: 2026-10-18
status: active
tags: [ziroo-edge, ziroo-net, bilgi-mimarisi, tussle, diskort, kapis]
source: "oturum 2026-10-18 (ziroo-edge): site yapısı ve Tussle'ın yeri; commit 81991f8, yayın deploy-www.sh all"
---

# ziroo.net kapıları iki sıra: üstte bölümler (Oyunlar, Araçlar), altta öne çıkan ürünler (Tussle, Kapış, Diskort)

## Karar
- Ana sayfa kapı ekranı: üst sırada 2 büyük bölüm kapısı (Oyunlar, Araçlar), alt sırada 3 küçük ürün kapısı (Tussle `/tussle/`, Kapış `kapis.ziroo.net`, Diskort `/diskort/`). Ürün kapıları boyut ve kendi renk/biçimiyle ayrılır; ayrı "öne çıkanlar" başlığı yok.
- Kaydırmalı hikâye kapı sırasını izler: Oyunlar, Araçlar, Tussle, Kapış, Diskort, Hadi başla. Ürün bölümleri daha kısa.
- Tussle bir **oyun**: Oyunlar listesinde öne çıkan geniş kart. "Uygulama" olması kategori değil, platform etiketi (`Android`, `iOS`, `Tarayıcı`, `Masaüstü`). Tarayıcı sürümü sitede gösterilmez (Yusuf: sonunda olmayacak); yalnız Play kapalı test + TestFlight.
- Diskort açık kaynak (MIT): kapı uygulamanın girişine değil, tanıtım sayfasına (`ziroo.net/diskort/`) açılır; GitHub, kendi sunucunda kur, küçük "Giriş yap".
- Tanıtım sayfaları ortak şablon `www/home/urun.css`, home hub'ının alt klasörleri olarak yayınlanır (`deploy-www.sh home`).

## Neden
- Kapılar bölüm, ürünler vitrin: kategori ile ürün aynı boyutta yan yana karışık durur, ama maskotun kapılarla etkileşimi sayfanın en iyi yanı, ürünler de kapı olmalı. Boyut farkı hiyerarşiyi kendiliğinden kurar.
- Ziyaretçi Tussle'la ne yapar? Oynar. Kurulum biçimi etiket işidir.
- Diskort'u yabancı biri açınca giremeyeceği giriş ekranına düşmemeli.

## Reddedilen alternatifler
- Ayrı "Uygulamalar" kapısı/bölümü: şimdilik içine yalnız Tussle girerdi ve "oyun mu uygulama mı" karışıklığını doğururdu. Oyun da araç da olmayan ikinci ürün çıkınca yeniden düşünülür.
- 4 eş kapı (Oyunlar, Araçlar, Tussle, Diskort): kategori ve ürün aynı ağırlıkta, tutarsız.
- Kapıların altında ayrı vitrin şeridi: maskot etkileşimini ürünlere taşımıyordu.
- Oyunlarda alt kategoriler: 4 oyunla erken; 8–10 oyundan sonra.

## Ek (aynı gün, `2a60886`): tek ekrana sığdırma
- Ölçüt: sayfa en dipteyken başlık tepede, alt bilgi ekranda. Kapı alanı eni CSS'te görünür yükseklikten hesaplanır (`--dw`, clamp 520–920px); zoom CSS görünüm alanını küçülttüğü için ayrıca ele alınmaz.
- Açıklamalar tek satır; fareli masaüstünde yalnız hover/odak/Ziroo kapıyı açınca (opacity, yeri ayrılı, düzen kaymaz). Telefonda ve JS'siz hep görünür.
- Reddedilen: açıklamaları tamamen kaldırmak (telefon/erişilebilirlik için gerekli), sabit piksel kırılımları (zoom'u karşılamaz).
