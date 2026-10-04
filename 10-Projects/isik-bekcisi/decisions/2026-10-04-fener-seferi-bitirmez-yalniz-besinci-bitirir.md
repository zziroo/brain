---
type: decision
project: isik-bekcisi
date: 2026-10-04
status: active
tags: [isik-bekcisi, oyun-tasarimi, fener, sefer, denge]
source: oturum 2026-10-04 (incremantal-game, 9e4d0124); commit 071332d
---

# Karar: 1.–4. fener yanınca sefer sürer, yalnız 5. fener seferi bitirip kampa döndürür

## Bağlam
Önceden her fener yanınca sefer bitiyor, oyuncu zorla kampa dönüyordu ([[2026-10-02-isik-bekcisi-tasarim-kararlari]] madde 4). Yusuf sordu: "biyom geçişlerinde kampa zorunlu döndürüyoruz, yapmasak daha iyi olmaz mı?" Yağ bitince sefer cezasız bittiği (toplanan her şey kaldığı) için zorla bitirmek oyuncudan yalnızca oynama süresini alıyordu; ivme varken "eve" demek türün akışına ters.

## Karar
- **1.–4. fener:** yanar (pankart, ses, toz bankaya ve kayda, karanlık duvar açılır). 1,8 sn'lik anda (`LIGHTING`) yağ yanmaz, diken emmez, ipucu beklemez; kontrol hiç kesilmez. Sonra kalan yağla sonraki bölgeye yürünür; **yağ doldurulmaz**. Sefer olağan yollarla biter (yağ, duraklatma menüsü, şafak). Bir seferde birden fazla fener yanabilir.
- Yeni yıldız kademesi uyanınca üst bantta "Gökyüzünde yeni yıldızlar belirdi" (gökyüzü açılınca bir kez daha; bilinçli bırakıldı).
- Özet ve kamp tepkisi seferde yananları izler (`R.lit`, `sum.lit`): başlık "Fener yandı", satır "Yolda yakılan: 2. Fener"; tepki sonuncuya.
- **5. fener seferi eskisi gibi bitirir** (`endRun('beacon')`, kutlama duraklatmayla kesilemez) ve o 1,8 sn'de Kalp başlayamaz. Kalp ancak kampa dönüp 5. bölümün konuşmaları sunulduktan sonra.
- Vırak'ın gelişi Puhu'nunkini bekler (`after: 'puhu.arrive'`): iki fener tek seferde yanarsa sıra bozulmasın.

## Neden
- Kayıpsız seferde zorla dönüş yalnız akışı kesiyordu; yeni bölgeyi kalan yağla "tatmak" (kabuklu, prizma ilk orada görülür) yeni yıldızlara istek doğurur.
- Yusuf'un tahmini: yeni fenere geçen oyuncu çok ilerleyemez. Bot doğruladı: hiçbir seferde iki fener yanmadı, fenerlerin düştüğü sefer neredeyse aynı (b1@5, b2@13–15, b3@21–23, b4@30–32, b5@39–41).
- 2026-10-02'de "fener seferi bitirmezse bot 18 dakikada bitiriyordu" kaygısı vardı; bugünkü dengede (bölge derinleştikçe hızlanan yağ, `ZONE_BURN`) bu görülmedi: 43,4 sefer / 46,2 dk (önce 44,6 / 46,8), Kalp 3,4 deneme (aynı). İstek/iksirsiz 50,0 / 52,7.
- 5. fener istisnası: Kalp 5. fenerden ~230 birim ötede başlıyor. Sefer sürerse Ülker'in Kalp brifingi ve diğer `ch: LAST` konuşmaları ilk dövüşten sonraya kalıyor, Kalp aynı seferde yenilirse oyun epiloğa geçip bu konuşmalar kalıcı kayboluyordu. Son fener zaten büyük bir an; orada dönmek doğal.

## Reddedilen alternatifler
- **A. Her fener seferi bitirsin** (eski hal): akışı kesiyor; Yusuf istemedi.
- **C. Fener feneri kısmen doldursun + fenerde E ile "kampa dön":** önerilmişti; Yusuf yağ dolumsuz sade hali (B) seçti.
- **5. fener için: sefer sürsün ama duvar arenanın önünde dursun:** ışık yanmış, yapacak iş yok, duvar önünde bekleme; bot boşa yağ yakar; `S`/`R` arasında bölünmüş duvar durumu. Şüpheci ajan da reddetti.
- **5. fener için: olduğu gibi bırak** (Kalp'e hemen yürünsün): final öncesi konuşmalar kaybolabiliyor.

## Sonuçlar / riskler
- Kodda: `run.js` (`LIGHTING`, `R.lit`, `lastLit()`, çağrılan ruhlar yalnız çağıran fenere besler, Kalp `R.lighting` sırasında başlamaz), `main.js` (`runIsClosing`, bant), `ui.js` (özet), `talk.js` (tepki, `pendingEvents()`), `sky.js` (aradaki tüm kademeleri gösterir), `story.js`, `tools/story-check.mjs` (3 yeni durum), `CLAUDE.md`.
- Tarayıcıda denenmedi: tek seferde iki fener yakmak (yalnız kod ve hikâye testi), 4. ve 5. feneri aynı seferde yakmak (yalnız hikâye testi), `prefers-reduced-motion`. İnsan oyuncuyla his denenmedi.

## İlgili
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
- [[2026-10-02-isik-bekcisi-tasarim-kararlari]] (madde 4'ün yerini kısmen alır)
- [[2026-10-04-zorunlu-donus-noktasi-hikaye-kapisi-olabilir]]
- [[2026-10-02-hikaye-kampi-f-ile-konusma-ve-yumusak-gecisler]]
