---
type: resource
project: genel
date: 2026-10-17
status: active
tags: [working-rules, vault, eslesme]
source: 2026-10-17 kaydet/basla komutları ve vault düzeni oturumu; karar [[2026-10-17-basla-yerine-hook-ve-bitir-komutu]]
---

# Kod klasörü → vault projesi eşlemesi

Oturum başlangıcı hook'u (`~/.claude/hooks/oturum-baslangici.mjs`) ve `/kaydet`, `/bitir` hangi `10-Projects/<proje>/` klasörünün kullanılacağını **bu tablodan** okur. Klasör adı vault adıyla aynı olsa da buraya yaz. Yeni proje açınca bir satır ekle.

Klasör sütunu: `/Users/ziroo/ZZ/zProjects/` altındaki ad ya da `~` ile başlayan tam yol. Vault sütunu boşsa (`-`) proje vault'ta tutulmuyor.

| Klasör | Vault projesi |
|---|---|
| achievement-guide-formatter | rehber-okuyucu |
| bal-vadisi | bal-vadisi |
| diskort | diskort |
| document-formatter | pdf-ceviri |
| incremantal-game | isik-bekcisi |
| kripto-bot | kripto-bot |
| mobil-playus | tussle |
| silksong-mod | silksong-mod |
| song-finder | song-finder |
| steam-avgr-calculator | steam-avgr |
| string-tool | ceviri-araci |
| trencheck | trencheck |
| voice-detector | voice-detector |
| web-boss-teaser | kul-tahti |
| web-fps-game | kapis |
| ziroo-dns-vpn | ziroo-dns-vpn |
| ziroo-edge | ziroo-edge |
| ziroobank-expenses | ziroobank |
| ~/.claude/orchestration-report | pano |

## Proje klasörü olmayan konular
ZZ kökündeki oturumlar (başlık öneki konudur, bkz. [[2026-10-15-oturum-basliklari-konu-oneki-ve-klasor-adlari]]):
- `sistem:` → `20-Areas/working-rules/` (karar ve dersler tarihli not olarak)
- `marka:` → `10-Projects/marka/`
- `araştırma:` → `30-Resources/`
- `kişisel:` → yalnızca kullanıcı isterse

İlgili: [[_index]]
