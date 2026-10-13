---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, oyun-havuzu, oyun]
source: oturum 2026-10-13 ikinci (mobil-playus: kapaklar, Parti J, varyantlar, Dört Ok)
---

# Karar: Dört Ok (`dortok`): dört oklu karo, her birinin kendi süresi, okun yönüne kaydır

## Bağlam
Yusuf Playus "Swipe Fast" ekran görüntüsünden böyle bir oyun istedi. "Oyunlar partiyle çıkar" kuralına ([[2026-10-09-oyun-uretim-kiti-ve-partiler]]) rağmen tek oyun yayını istedi (telefonda test döngüsü).

## Karar
- 2×2 karo; her karoda ok ve kendi süre çubuğu. Karonun üstünde okun yönüne kaydır → o karo dolar, **yalnız o karonun oku değişir**. Yanlış yön ya da biten çubuk bitirir.
- Dördü tam süreyle başlar; 10. kaydırmadan sonra dolumların %30'u kısa (tamın %60–80'i).
- Süre: 4 sn → 50. kaydırmada 2 sn → 150.'de 1,4 sn. 120 sn teknik tavan; birim `kaydirma`; sürüm 3; 250 ms grace penceresi; ikinci parmak yanlış kaydırma saymaz.
- Görsel: köşeli ama Matematik karoları gibi (16 px köşe), hafif animasyon (ok pop, 4 px itme), parçacık/konfeti yok, yüz yok; süre çubuğu altta, dolu renk beyaz → kehribar → mercan kademeli (ani kırmızı yok).
- Bot: 0,5 sn tempo 30–45, 0,35–0,4 sn 45–100.
- Yusuf telefonda 3 tur denedi; 4 yayın yapıldı (`f04ef65`, `e1c252f`, `2db56a3`, `3fe3dc2`).

## Neden
Basit, anlık, "bir tur daha" hissi veren tutmuş bir mekanik ([[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]]). Ayarlar Yusuf'un telefon geri bildirimiyle geldi.

## Reddedilen alternatifler
- Kaydırınca başka karoyla takas (v1): Yusuf "bir oku yapınca diğerleri değişiyor" dedi, kaldırıldı.
- Daha kısa süreler (v1/v2'de tavan 1,6 / 1,1 sn): Yusuf "biraz daha uzatabiliriz" dedi.
- Üstte süre çubuğu, nabız, yüzler, parçacıklar (v2): sadeleştirildi.

## Sonuçlar / riskler
- Koyu temada bakılmadı; v3 telefon geri bildirimi bekleniyor.
- Çubuk renginin bütün karoya taşması hatası (`beginPath` eksikliği) son yayında düzeldi: [[2026-10-13-kapak-varyant-dort-ok-dersleri]].

## İlgili
- [[2026-10-13-tussle-kapaklar-parti-j-varyantlar-dort-ok]]
