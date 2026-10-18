---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, oda, varlik, serit, denge, iap, geri-bildirim]
source: oturum "tussle: geri bildirimler (Şerit, aktif kişiler)" (2026-10-18/19 gece), commit `4155dda` `a6af1ce` `e2de09a`, yayın `e2de09a` + OTA 0.20261018.2131
---

# Karar: YOSEF geri bildirimleri #3 #4 — oda adında "kim burada" rozeti, Şerit v3; iPhone hediye kataloğu mağazaya göre

## Bağlam
Geri bildirim kutusunda 4 kayıt vardı (#1 test, #2 Denge zaten v4 ile çözülmüştü, ikisi işaretlendi). Açık kalanlar: #3 YOSEF "Lane dash'i zorlaştır, çok kolay", #4 YOSEF "grupta kimler aktifse şu an aktif diye gözüksün veya kaç kişi". Yusuf ayrıca YOSEF'in ekran görüntüsünde sağ üstte hediye düğmesi olmadığını sordu.

## Karar
- **Kim burada (#4):** "burada" = o odaya abone ve ön planda soketi olan üye (bildirim için eklenen `away`/`isActive` ile aynı tanım, [[2026-10-18-bildirim-yalniz-on-plandaki-odada-susar]]). Hub `{t:'here', users}` yayınlar: değişince en çok saniyede bir, her `subbed` sonrası anlık görüntü. Gösterim: oda adı etiketinin köşesinde küçük rozet (yeşil nokta + sayı), yalnızken gizli; oda adına dokununca açılan üye listesinde buradakiler üstte ve yeşil noktalı (liste açılınca sıralanır, açıkken parmağın altında yer değiştirmez). 32 harflik adda ad kısalır, rozet 320 px'te de düğmelere değmez.
- **Şerit v3 (#3):** ilk rampa 70 → 50 sn, ardından ikinci rampa 12 m/sn'ye (aralık 0,42 sn, duvar %85), tavan 90 → 120 sn, meta.version 3. Adillik: hızlı aralıkta boş şerit koşucunun olabileceği şeride en çok bir şerit uzak (`state.reach`), iki sıra arası en az 0,22 sn açık yol; 300 tohumda çarpmayan koşucu tavana ulaşıyor. Botlar: orta 37 → 31 sn, iyi 67 → 48 sn. İnsan verisi (v2, 6 tur): 87, 66, 39, 35, 20, 19 sn; en iyi oyuncu tavana dayanmıştı.
- **Hediye (iPhone):** katalog artık soran istemcinin mağazasına göre "satışta" der (`?store=`). Sunucuda Apple doğrulaması yok (`iap play`), bu yüzden iPhone'da düğme Apple açılana kadar gizli. Önceden katalog "bir mağaza açıksa açık" diyordu; iPhone'da düğme çıksaydı sunucunun onaylayamayacağı bir satın alma açılırdı.

## Reddedilen alternatifler
- Rozet yerine başlığın altında ayrı "N kişi şu an burada" satırı: ilk yapıldı, Yusuf "sezonun önüne geçiyor" dedi; ayrıca biri gelip gidince içerik 38 px oynuyordu.
- Yalnız üye listesinde göstermek: liste açılmadan kimse görmez.
- Şerit'te Denge gibi 180 sn tavan: Şerit için gereksiz uzun, canlı kapışma beklemesi uzardı; süre modelinin sonsuz oyun tavanı 120 sn.
- Sürüm değişince eski günün parametrelerini yok saymak (incelemede düşük bulgu): yayın günün ortasındaysa o günün Şerit'i eski hız ayarlarıyla v3 oynanır, ertesi gün düzelir; ek kod değmez.

## Açık kalanlar
- Telefonda his: Şerit'te 80 sn sonrası ve 12 m/sn okunabilirlik; rozetin çentikli telefonda üst boşluğa sığması.
- Gerçek oyuncu verisiyle denge raporu ayrı oturumda çıktı ([[2026-10-19-denge-insan-kosulariyla-surum-bazli-olculur]]), Yusuf'un oyun seçimi bekleniyor.
