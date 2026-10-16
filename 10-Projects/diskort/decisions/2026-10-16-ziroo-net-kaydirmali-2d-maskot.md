---
type: decision
project: ziroo-edge
date: 2026-10-16
status: active
tags: [marka, maskot, ziroo-net, ana-sayfa, animasyon]
source: oturum "ziroo-edge: 2D kaydırmalı Ziroo ana sayfa", 2026-10-16 (ziroo-edge commit'leri 0c07802, 8afcefd)
---

# Karar: ziroo.net ana sayfası kaydırmaya bağlı 2D (SVG) Ziroo hikâyesiyle açılıyor, çizim "koyu çizgi"

## Bağlam
Maskot Ziroo bugün yeniden tasarlandı ([[2026-10-16-maskot-adi-ziroo]]). Seçilen tasarım: süzülen gövde, top eller, halka gözler, sade kafa. 3D (Three.js) kaydırmalı denemenin etkileşimi beğenildi, ama 3D karakter beğenilmedi.

## Karar
- Ana sayfanın üstünde 5 bölümlük kaydırmalı hikâye var: Giriş → Oyunlar → Diskort → Araçlar → Son. Kapılar, KAPIŞ şeridi ve altbilgi hikâyenin altında aynen duruyor.
- Hikâye tek satır içi SVG ve kütüphanesiz `www/home/home.js` ile yapıldı (~23 KB).
- Çizim stili **koyu çizgi**: koyu zeminde açık #f4f2ff çizgi, koyu #141127 gövde, pembe vurgu. Site teması koyu neon olarak kalıyor.
- **v2 kompozisyonu:**
  - Dev başlıklar sahnenin parçası, Ziroo harflerin önünde.
  - Girişte "ZIROO" yazısının iki O'su gözlere dönüşüyor, gövde çizilerek oluşuyor.
  - Hareket kaydırmayı yaylanarak izliyor; bölümler arasında Ziroo kavisli yolla uçuyor.
  - Diskort'ta ses halkaları harfleri sallıyor, Araçlar'da fener spot ışığı yanıyor.
  - "Kaydır" işaretini Ziroo'nun kendisi veriyor.
- JS yoksa sayfa eski hâliyle okunuyor; hareket azaltmada her bölüm sabit duruş gösteriyor. CSP değişmedi: satır içi script ya da stil yok.
- `deploy-www.sh home` artık `home.js` dosyasını da yayınlıyor; `index.html` en son yerine geçiyor.
- 2026-10-16'da kullanıcı onayıyla ziroo.net'te yayına girdi.
- **Aynı gün sonraki düzeltmeler (yayında):**
  - Mobil takılma giderildi. Döngü her bölümde kaydırma durunca duruyor; fener ve el sallama CSS'e taşındı. Diskort halkaları ve fener ışığı küçük katmanlarla yapılıyor (büyük, `scale(4)` ile büyütülen katmanlar telefonda takılıyordu).
  - Harfler Ziroo'dan kaçmıyor, tek sırada duruyor. Kaçış geçişte titretiyor ve harfleri yamuk bırakıyordu; kullanıcı fark etti.
  - Ziroo durunca keskin yeniden çiziliyor (büyükken bulanık görünüyordu).
  - Başlık fontu **Unbounded** ExtraBold oldu. Kendi sunucumuzdan 10 KB'lık alt küme (Türkçe harfler, OFL) olarak sunuluyor. Kullanıcı seçti; Fredoka ve Syne seçenekleri seçilmedi.
  - Harfler **çizilerek** geliyor: önce dış çizgi çiziliyor, sonra renk doluyor. Kullanıcı seçti; yaylı zıplama, dalga ve 3D çevrilme seçenekleri seçilmedi.

## Neden
- Ziroo düz, harften türemiş bir karakter; SVG çizgisi 3D'den daha keskin ve daha hafif.
- v1'de karakter bir yanda, yazı öbür yanda duruyordu. Kullanıcı tam ekranda bunları "çok ayrı" buldu ve kaydırma ipucunun küçük kaldığını söyledi. v2 yazıyı ve karakteri tek kompozisyonda topladı.
- Koyu çizgiyi kullanıcı sitede iki stili yan yana deneyip seçti.

## Reddedilen alternatifler
- **3D (Three.js):** karakter 3D'de güzel durmadı, ayrıca sayfayı ağırlaştırıyordu.
- **Neon çizim (renk geçişli ışıldayan halka):** koyu çizgiye kaybetti.
- **v1 düzeni** (karakter bir yanda, metin sütunu öbür yanda): kopuk duruyordu.
- **GSAP, Lenis, Rive gibi kütüphaneler:** CSP ve hafiflik nedeniyle alınmadı; aynı teknikler küçük vanilla JS ile yapıldı.

## Açık kalanlar
- Halka göz ayarı inceltilebilir; ayarlar `home.js` içindeki `EYE` nesnesinde.
- Ziroo her başlığın son harfini büyük ölçüde örtüyor (harfler artık kaçmıyor).
- Çizgi animasyonu Safari ve Firefox'ta denenmedi.
- Telefonda balon Ziroo'nun eline biniyor, alt kısım boş kalıyor.
- Safari ve iOS'ta denenmedi.
