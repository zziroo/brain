---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, oda, ust-bar, sezon, bugun, tasarim]
source: oturum "tussle: geri bildirim turu" (2026-10-19 gece), commit `2e3b249` (yalnız bugün çubuğu) ve `98c61ab` (iki satır); mockup `src/client/mockups/oda-ust.*`
---

# Karar: oda üstü iki satır — sarı sezon hapı, beyaz bugün satırı

## Bağlam
Oda ekranında sezon bandı ve bugün kartı aşağı kayınca üst çubuk iki bilgiyi birden taşımaya çalışıyordu. `2e3b249`'da çubuk yalnız "bugün"e indirilmişti, Yusuf sezonun görünür kalmasını istedi. Üç seçenekli mockup (A/B/C) `src/client/mockups/oda-ust.*` içinde karşılaştırıldı.

## Karar
- **İki satır, renk anlamı:** sarı = sezon, beyaz = bugün (bugün kartı beyaz, sezon bandı sarı).
- Sezon bandı kaydırılıp çıkınca başlık sarı bir hapa dönüşür: "Sezon" · #sıra · taç + lider. **Puan ve seri yok** (sıra puandan türer, seri ve gün kutuları bantta duruyor), gün kutuları yok.
- Bugün kartı kaydırılıp çıkınca çubuğun altında beyaz bugün satırı: oyun küçük resmi · ad · bugünün lideri · ▶ veya jeton. **Skor yok.** Başlatacak bir şey yoksa ▶ yerine bir sonraki oyuna geri sayım.
- İkisi de geri düğmesi gibi konturlu, bindirme (yerleşim kaymaz), histerezis korunur; sezon hapı bant yüklenene kadar çıkmaz. ▶ dışındaki her dokunuş en üste gider.
- **v2–v3 (gerçek veriyle, 19 Eki ~04:30, `9e21c13`, `466b32d`):** iki satır 8 px arayla tek blok, arkası tek parça opak zemin (tam piksel; aradan 1 px sohbet sızıyordu); iki hap da 44 px. Sezon hapı: koyu "SEZON" · madalya renkli sıra çipi (gümüş artık pasif gibi değil) · "Gün N/M" · lider. Bugün satırında lider adı önceliklidir, süre kısa ("12sa"). **Başlıkta hediye düğmesi yok**: hediye hakların bitince bugün kartında, oyun sonu kartında ve oda panelinde; sezon hapı sağ kenara kadar uzar. Ek sezon bilgisi ("7 gün kaldı") eklenmedi: Gün N/M'yi tekrar eder, lideri sıkıştırır.

## Neden
Renk iki bilgiyi ayırır: gözün ilk bakışta "bu sezon mu bugün mü" demesi gerekmez. Puan ve seri sezon bandında ve sezon sayfasında zaten var; sıra puandan türediği için ayrı puan göstermek çubuğu doldurur. Skor bugün satırında lider çipiyle çakışır ve her oyunda birimi farklı.

## Reddedilen alternatifler
- Tek karışık satır (sezon + bugün bir arada): karışıktı, hangi bilgi hangi bağlamda belli olmuyordu.
- Yalnız bugün çubuğu (`2e3b249`): Yusuf sezonun kaydırınca da görünmesini istedi.
- Mockup A/B/C'deki diğer düzenler: iki satır renkli ayrım en okunur bulundu.
- Bugünde geri sayımı her zaman göstermek: yalnız başlatılacak bir şey yokken anlamlı.

Oturum: [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]]. İlgili: [[2026-10-17-uygulama-disi-web-kapisi-ve-oda-ustu-sadelesti]], [[2026-10-11-oda-ekrani-sezon-bandi-ve-canli-ilk-3]].
