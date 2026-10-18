---
type: session
project: ziroo-edge
date: 2026-10-18
status: active
tags: [ziroo-edge, ziroo-net, tussle, diskort, kapis, maskot]
source: "oturum 2026-10-18 (ziroo-edge): site yapısı ve Tussle'ın yeri; commitler 81991f8, 2a60886"
---

# 2026-10-18: ziroo.net iki sıra kapı, Tussle/Diskort tanıtım sayfaları, tek ekrana sığdırma

## Ne oldu
- Tussle'ın sitede yeri tartışıldı: oyun olarak Oyunlar'da, "uygulama" platform etiketi. Diskort kapısı bölüm değil ürün olduğu için alta indi; Kapış da öne çıkan ürün oldu. Karar: [[2026-10-18-ziroo-net-iki-sira-kapi-bolumler-ve-urunler]].
- `81991f8` (yayında, `deploy-www.sh all`): 2 büyük + 3 küçük kapı, Ziroo sıralar arası yayla atlar ve ürün kapısında eşyasını takar (telefon, bant, kulaklık); hikâye 7 bölüm; `www/home/urun.css` ortak şablonla `tussle/` (yalnız Play kapalı test + TestFlight, gizlilik bağlantısı, "reklam yok" kalır) ve `diskort/` (GitHub, kendi sunucunda kur, küçük giriş); Oyunlar'da Tussle geniş kart, tür + platform etiketleri; `deploy-www.sh` home alt klasörlerini yayınlar.
- Yusuf'un ekran görüntüsü: kapı ekranı bir ekrana sığmıyordu. `2a60886` (yayında, `deploy-www.sh home`): ölçek görünür yükseklikten, açıklamalar tek satır ve fareli masaüstünde yalnız kapı açılınca; ölçüt sayfa en dipteyken. Ders: [[sigdirma-olcutu-sayfa-dibinde-ve-zoom-kucuk-gorunum-alani]].
- Yöntem: iki paralel opus ajanı (ana sayfa / tanıtım sayfaları), ayrı dosyalar; iki inceleme ajanı, medium üstü bulgu yok.

## Doğrulanmayanlar
- Sıralar arası atlayış ve açıklama geçişi yalnız `h.js` ile kare kare denendi; gerçek tarayıcıda gözle bakılmadı.
- Gerçek telefon, tablet, Safari/iOS denenmedi. %150 zoom'da kapı ekranı kaydırır (bilerek).
- Tussle Play bağlantısı kapalı test sayfası; üretime çıkınca mağaza bağlantısıyla değişmeli.
