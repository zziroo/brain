---
type: lesson
project: rehber-okuyucu
date: 2026-10-03
status: active
tags: [rehber-okuyucu, steam, hiz-siniri]
source: oturum 2026-10-03, curl ile gözlem
---

# Steam rehber sayfaları ~4 hızlı istekten sonra HTTP 200 ile "too many requests" sayfası döndürür

## Gözlem
`steamcommunity.com/sharedfiles/filedetails/?id=…` adresine birkaç saniye arayla ~4 istekten sonra Steam dakikalarca (12 sn aralıkla 5 denemede hâlâ) rehber yerine genel "Steam Workshop" sayfası verdi: HTTP 200, 329.628 bayt, içinde "You've made too many requests recently". Durum kodu hata göstermez.

## Sonuç
- Sunucu bu sayfayı içerikten tanır (`steam_rate_limited`), 5 dakika Steam'e gitmez, istekleri en az 3 sn aralar; rehberi bir kez çekip saklar.
- Geliştirirken canlı çekme yerine `test/fixtures/` ve `cli import-html` kullan.
- Girişsiz erişilebilen rehber sayfasının işaretleri: `.workshopItemTitle`, `.guideAuthors`, `div.subSection.detailBox[id]` → `.subSectionTitle` + `.subSectionDesc`.

## İlgili
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
