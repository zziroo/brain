---
type: decision
project: tussle
date: 2026-10-08
status: active
tags: [tussle, font, tipografi, turkce]
source: oturum 2026-10-08 gece (mobil-playus UI yenileme)
---

# Karar: tek font ailesi Nunito (self-host, alt kümeli), başlık ve gövde aynı

## Bağlam
İlk yenilemede başlıklar Fredoka'ya geçmişti. Yusuf Türkçe karakterlerin (ş, ı) hatalı göründüğünü söyledi ve "global" kapsamlı bir font istedi. Asıl sebep font değil, poster başlıklarda satır yüksekliği 1.0 + 4 px gölgenin İ/Ğ/Ü noktalarını üst satıra yapıştırmasıydı; yine de font değiştirildi.

## Karar
- Nunito değişken font, ağırlık 500–900, `src/client/public/fonts/` altında alt küme başına bir woff2 ve `unicode-range` (latin + latin-ext her zaman, cyrillic/cyrillic-ext/vietnamese yalnız gerekince). Latin ön yüklenir. Türkçe yükü ~74 KB.
- Başlık, düğme, sayı ve gövde aynı aile (gövde 500, başlıklar 800–900). Canvas oyunlar `readTheme().font` ile aynı fontu alır; oyun ilk çizimden önce `document.fonts.load` bekler (en çok 1,5 s).
- Poster başlıklar satır yüksekliği 1.14, gölge 3 px; `lang="tr"` sayesinde `text-transform: uppercase` "i"yi "İ" yapar.

## Neden
- Nunito yuvarlak ve tombul (oyuncak hissi), Latin-ext + Kiril + Vietnamca kapsıyor, 900 ağırlığı var.
- Tek aile tutarlı diyakritik ve daha az dosya.

## Reddedilen alternatifler
- **Fredoka:** daha tatlı ama en çok 700 ağırlık, Kiril yok, 34 KB; Yusuf'un "global" isteğini karşılamıyor.
- **Sistem fontu:** indirme yok ama kimlik yok; önceki turda denendi, "form gibi" durdu.
- **Baloo 2:** benzer; Nunito'nun okunurluğu tercih edildi (derin karşılaştırma yapılmadı).

## Sonuçlar / riskler
- Yunanca alt kümesi yok (Google Fonts'ta Nunito Greek sunmuyor).
- Telefonda Türkçe karakterler henüz gerçek cihazda görülmedi; sorun olursa ekran bazında bakılacak.

## İlgili
- [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]]
- [[2026-10-08-ui-yenileme-dersleri]]
