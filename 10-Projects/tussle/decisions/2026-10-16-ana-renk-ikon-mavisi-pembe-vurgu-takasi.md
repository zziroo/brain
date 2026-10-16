---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, tema, gorsel, renk, karar]
source: oturum 2026-10-16 (mobil-playus: telefon geri bildirimi turu; izleme sesi, antrenman, renk)
---

# Karar: Ana renk pembeden ikon mavisine geçti; pembe ikinci vurgu ("sen", bağlantı, odak) oldu

## Bağlam
Yusuf telefonda ana rengi "vişne çürüğü" diye tarif etti ve alternatif istedi; aklına uygulama ikonundaki mavi geldi ama kararı Claude'a bıraktı. Eski renkler: gündüz `#d0368a`, gece `#ff7ac0` ([[2026-10-15-tema-orta-yol-kart-konturu-yumusak-pembe]]). İkon paleti: pembe, sarı, camgöbeği, mürekkep, krem.

## Karar
- `--primary` ve `--accent`: gündüz `#0b74c9` (beyaz yazı 4,8:1), gece `#4da3ff` (koyu yazı `#0b2433`, 7,6:1).
- `--accent2` (eski camgöbeği): pembeye takas, gündüz `#c7307f`, gece `#ff7ac0`. "Sen" işareti, bağlantılar, odak halkası, gönder ikonu artık pembe.
- Çip dolguları: `.chip-accent` açık mavi `#c4ecff`, `.chip-accent2` açık pembe `#ffc2e0`; `--fill-cyan` adı kaldı ama artık accent2'den (pembe) türüyor ("sen" satırları).
- `src/client/theme.ts` yedek değerleri ve `docs/VISUAL.md` §1 tablosu güncellendi. İkon ve logo (üçlü blok) değişmedi.
- Gece tonu önce ikonun `#42dbff` camgöbeğiydi; sohbet balonlarının (candy-4) rengiyle birebir çakıştığı için bir adım koyu maviye (`#4da3ff`) çekildi.

## Neden
- Sarı sezon bandıyla en güçlü tamamlayıcı karşıtlık; ikonla akraba; gündüz/gece kontrastı en iyi adaylardan.
- Pembe tamamen gitmedi: ikonun üçlüsü (mavi, sarı, pembe) arayüzde yaşamaya devam ediyor.

## Reddedilen alternatifler
- Canlı magenta (`#c21aa0` / `#ff5ad6`, ajanın önerisi): ekran görüntüsünde mevcut pembeden ayırt edilmiyor; Yusuf pembenin kendisinden uzaklaşmak istiyordu.
- Mercan/turuncu: sarı bantla komşu ton, düello düğmesi ve `--bad` kırmızısıyla çakışıyor; "tek eylem rengi" niteliğini yitiriyor.
- Teal/yeşil: gündüz en okunaklısı ama `--good` ile karışıp "onay/başarı" gibi okunuyor; ikon paletinde yok.

## Sonuçlar / riskler
- Ekran mavi ağırlıklı oldu (balonlar camgöbeği, Kule'nin oyun rengi mavi). Telefonda gece teması henüz görülmedi.
- Canvas oyunlarında `theme.accent` artık mavi (ör. Slice parmak izi); oyun bazında göz gerekebilir.
- Yöntem: adaylar gerçek arayüzde CSS değişkeni değiştirilerek gündüz/gece ekran görüntüleriyle karşılaştırıldı ([[2026-10-16-renk-onizleme-css-degiskeni-ve-ajan-anahtar-sizintisi]]).

## İlgili
- [[2026-10-15-tema-orta-yol-kart-konturu-yumusak-pembe]] (renk kısmı bu kararla değişti)
- [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]]
