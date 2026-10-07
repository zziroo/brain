---
type: decision
project: isik-bekcisi
date: 2026-10-05
status: superseded
tags: [isik-bekcisi, arayuz, beceri-gostergesi, ses, oyun-hissi]
source: oturum 53393f9a (incremantal-game), commit 0bcc0a0; seçenekler [[2026-10-04-devir-zorluk-ve-his-bulgulari]]
---

> **Yerini aldı (2026-10-07):** halkalar bekçiden kalktı, yalnız "hazır" anı görünüyor: [[2026-10-07-beceri-halkalari-bekciden-kalkti-yalniz-hazir-ani]].

# Beceri hazır işareti bekçinin üzerinde: Parlama fenerin çevresinde yay, Atılım ayak dibinde elips; yalnız beklemedeyken görünür

## Karar
Devir notundaki B seçeneği seçildi. Yusuf bu turda ürün hissi seçimlerini Claude'a bıraktı ("hepsini sen yap").
- **Parlama:** fenerin çevresinde 13 px'lik ince bir halka (gri iz, saat yönünde dolan kor rengi yay). Hazır olunca parlar ve ince bir halka açılarak söner.
- **Atılım:** ayak dibinde 19×6 px'lik yatık elips. Hazır olunca parlar ve küçük bir toz bulutu çıkar. *2026-10-06'da değişti: Atılım'ın halkası artık imleçte ([[2026-10-06-atilim-halkasi-imlecte]]).*
- **Ses:** Parlama hazır olunca yüksek bir çan sesi, Atılım için daha pes bir ton. Hazır değilken basınca boğuk bir tık duyulur ve halka iki kez yanıp söner.
- Her şey hazırken ekranda hiçbir şey yok. Sağ alttaki gösterge yedek olarak duruyor. Hareketi azaltma tercihinde yalnız kısa bir parlama var.
- Kural tarafı run.js'teki `watchSkills()` içinde: `skillReady` ve `skillNo` olaylarını yayar, çizim render.js'teki `skillSigns()` içinde.

## Neden
- B, kalan süreyi gösteren tek seçenek. Oyuncunun gözü zaten bekçide olduğu için köşeye bakması gerekmiyor.

## Reddedilen alternatifler
- **A. Yalnız an (parıltı ve ses):** an kaçarsa oyuncu yine köşeye bakmak zorunda kalır.
- **C. Fenerin kendisi:** sinyali en ince olanı ve kalan süreyi göstermiyor.

## Açık
- Fener başa yakınken halka bekçinin yüzüne biniyor; okunurluğu bozmuyor.
- Sesler kulakla dinlenmedi.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
