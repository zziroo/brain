---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, arayuz, isin, gamepad, okunurluk]
source: oturum e5a9fa92 / 5f403d52 (incremantal-game, 2026-10-07); commit b14f502
---

# Karar: camın ısısı fenerin kendisinde ve sağ alttaki odak simgesinde görünür; imlece ve bekçinin üstüne gösterge çizilmez

## Bağlam
Işın ısısı bir kaynak oldu ([[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]]); oyuncunun bunu görmesi gerekiyordu. İmlecin iki yanında dolan iki yaylı bir gösterge `( )` yapıldı ve denendi. Yusuf iki şey söyledi:
- "Karakter üzerinde fazla UI oldu."
- "İmleç üzerinde olmasını iyi hissedemedim. Ayrıca gamepad desteği getirdiğimizde bu UI kötü kalacak."

## Karar
- **İmleçte hiçbir şey çizilmez.** Isı göstergesi kaldırıldı, Atılım halkası da oradan alındı. Kural: imlecin sayfada olmasına bağlı hiçbir şey yok, çünkü gamepad desteği planlanıyor.
- **Fenerin kendisi gösterir,** aşamalarla:
  - Kırmızı bölgede cam turuncudan kor kırmızısına döner, ince buhar tüter (yüze değil, dışa doğru), cızırtı sesi gelir.
  - Dolmasına bir saniye kala fener elde 1–2 piksel titrer.
  - Kilitliyken cam mat kırmızıdır ve soğudukça söner. Kilit açılınca camda küçük bir parıltı ve "tın" sesi olur.
- **Kesin değer sağ alttaki odak simgesinde:**
  - Simgenin içi aşağıdan yukarı ısıyla dolar, termometre gibi. Kırmızı bölgede kızarır.
  - Kilitliyken soğuma halkası görünür. Açılınca bir kez parlar.
  - Erken basılırsa iki kez yanıp söner.
- Bekçinin üstü sadeleşti: [[2026-10-07-beceri-halkalari-bekciden-kalkti-yalniz-hazir-ani]].

## Neden
- Gamepad'de imleç yok. Fenerin üstündeki işaretler ve köşedeki gösterge her girdiyle aynı çalışır.
- Bekçi sade kalınca okunuyor. Bilgi ya oyun dünyasında (fener, ışın), ya da köşede.
- Nişangâhta ısı göstermek bilinen bir kalıp (Halo'nun plazma silahları). Ama bu oyunda gözün baktığı yer ışının ucu ve bekçi; imleçteki yaylar yine fazla geldi.

## Reddedilen alternatifler
- **İmleçte iki yan yay `( )`:** yapıldı ve denendi. Yusuf iyi hissetmedi; gamepad'de de karşılığı yok.
- **Bekçinin yanında yay** (BotW'deki dayanıklılık çarkı gibi): bekçinin üstündeki arayüzü artırırdı.
- **Yalnız köşe:** oyun sırasında köşeye bakmak gerekirdi. Hissedilen asıl bilgi fenerde olmalı.

## Sonuçlar / riskler
- Ajanın görüntülerinde kırmızı bölgedeki kızarma zayıf kalıyor, halenin sarı parıltısı rengi bastırıyor. Kilitliyken kızıl cam belirgin. Yusuf oynayınca karar verilecek: kızarma güçlendirilsin mi?
- Köşedeki simgenin görüntüsü alınamadı; yalnız hesaplanan CSS değerleri kontrol edildi.

## İlgili
- [[2026-10-06-atilim-halkasi-imlecte]] (yerini aldı)
- [[2026-10-07-cam-isinir-ve-isi-gostergesi]]
