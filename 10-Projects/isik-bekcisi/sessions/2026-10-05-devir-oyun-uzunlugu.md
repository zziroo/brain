---
type: session
project: isik-bekcisi
date: 2026-10-05
status: active
tags: [isik-bekcisi, devir, uzunluk, denge, olcum]
source: Claude Code oturumu 82134d2a (ZZ kökü, tasarım dersi); repodaki CLAUDE.md denge bölümü ve 4475842 sonrası çalışma kopyası (data.js, quests.js, run.js, sim.js commitlenmemiş değişiklik içeriyordu)
---

# Devir: oyun kısa (insan için ~1–1,5 saat, tür 3–4 saat); öneri maliyet değil sefer uzaması + içerik, önce gerçek oyuncu ölç

## Soru
Yusuf (2026-10-05): "Böyle oyunları genelde 3–4 saatte bitiriyorum, bizimki kısa mı?"

## Sayılar
- **Bot** (repo `CLAUDE.md`, zincirleme yıldızlar dahil): ~37 sefer / ~41 dk istek ve iksirle, ~44 / ~48 onlarsız; Kalp 1–2 deneme. Zincirleme yıldızlar oyunu ~7 sefer kısalttı (önce ~42 / ~47).
- Botun saati sefer başına şunları ekliyor: seferin kendisi + 22 sn kamp + 4 sn sabit + ~3,4 sn geçiş. Buradan sefer başına yolda ~37 sn, toplamda yolda ~23 dk çıkıyor. Kalan ~18 dk botun kamp ve geçiş varsayımı.
- **İnsan** (ölçülmedi): eski varsayım bot ×1,5–2, yani ~1–1,5 saat. Karanlık sürüsü insanı bottan çok yavaşlatır (dikkatsiz bekçi sefer yağının %5–20'sini yapışan sürüye kaptırıyor).
- **Tür:** Shelldiver 3–4 saat, Rock Bottom 3,5–5 saat ([[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]]). Işık Bekçisi bunun kabaca üçte biri.

## Yapısal bulgu
- Seferler oyunun her aşamasında ~35–45 sn, çünkü yağ bölge derinleştikçe hızlı yanıyor (`ZONE_BURN`, [[2026-10-02-odak-isini-fener-olayi-ve-yag-dengesi]]). Bunun nedeni, uzun seferlerde yapacak şey kalmamasıydı ("yağ hiç bitmiyor").
- Türün iskeletinde ise ilk koşular çok kısadır ve geliştirmeyle uzar; sefer uzaması ilerlemenin kendisidir. Bizde oyuncu bu ödülü hiç almıyor ve aktif oyun süresi kısa kalıyor.
- Artık seferde direnç var (karanlık sürüsü), yani uzun sefer eskisi gibi boş kalmayabilir.

## Claude'un önerisi (karar Yusuf'un)
- **Hedef:** ilk bitiriş için ~2–2,5 saat. Bugünkü içerikle 3–4 saate ancak şişirerek çıkılır.
- **Yol:**
  1. Seferler güçlendikçe uzasın: oyun başında ~30–40 sn, geç bölgelerde 1,5–2 dk. Yağ yıldızları `ZONE_BURN`'ü biraz geçsin.
  2. İçerik eklensin: bölgelere özgü karanlık sürüsü çeşitleri ve daha çok niteliksel yıldız.
- **Yapılmasın:** `TIER_SCALE` ya da maliyet artışı yalnız ince ayar için kullanılsın; uzatma aracı olmasın (dolgu / grind).
- **İsteğe bağlı:** şafaktan sonra zor gece, rekorlar ve meydan okumalar; ana yolu şişirmez.

## Önce ölçüm
- Oyun sefer sayısını (`S.runs`) ve yolda geçen süreyi (`S.playTime`, yalnız `updateRun` içinde artıyor) zaten tutuyor. Günlükte "Kayıtlar"da ve oyun sonu ekranında (`endStats`: sefer · ruh · süre) görünüyor.
- Yeni sürüm yayına çıkınca 2–3 oyuncu bitirdiğinde bu iki sayıyı söylesin. Bunlar botun "~37 sefer / ~23 dk yolda" değeriyle doğrudan karşılaştırılabilir.
- Eksik olan toplam süre (kamp dahil). Kayda bir `totalTime` eklemek küçük bir iş; yerini oyun oturumu seçsin.
- Uzunluk ayarı, karanlık sürüsü ve zincirleme yıldızlar oturduktan **sonra** yapılmalı; ikisi de süreyi değiştiriyor.

## Çerçeve
[[ders-04-uzunluk-yenilik-yogunlugudur]]

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-04-devir-zorluk-ve-his-bulgulari]]
