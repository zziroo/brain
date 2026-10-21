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

Klasör sütunu: `/Users/ziroo/ZZ/zProjects/` (Mac) ya da `C:\Users\yusuf\ZZ\zProjects\` (Windows, 2026-10-21'den beri aynı hook) altındaki ad ya da `~` ile başlayan tam yol. Vault sütunu boşsa (`-`) proje vault'ta tutulmuyor.

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
| ziroo-edge | ziroo-edge |
| ziroo-vpn | ziroo-vpn |
| ziroobank-expenses | ziroobank |
| ~/.claude/orchestration-report | pano |

- Masaüstü uygulamasının ortam kutusu klasör adı yerine GitHub repo adını gösterebiliyor (`mobil-playus` → "tussle", çalışma klasörü ipucunda doğru yol; 2026-10-20, neden doğrulanmadı). Klasörü yeniden adlandırma: hafıza yolu, preset ve bu tablo eski ada bağlı.

## Proje klasörü olmayan konular
ZZ kökündeki oturumlar (başlık öneki konudur, bkz. [[2026-10-15-oturum-basliklari-konu-oneki-ve-klasor-adlari]]):
- `sistem:` → `20-Areas/working-rules/` (karar ve dersler tarihli not olarak)
- `marka:` → `10-Projects/marka/`
- `araştırma:` → `30-Resources/`
- `kişisel:` → yalnızca kullanıcı isterse

İlgili: [[_index]]
