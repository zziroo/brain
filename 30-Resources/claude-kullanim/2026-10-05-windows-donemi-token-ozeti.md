---
type: resource
project: genel
date: 2026-10-05
status: active
tags: [claude, token, maliyet, rapor]
source: node ~/.claude/orchestration-report/usage.mjs, Windows, 2026-10-05 15:30 (İstanbul)
---

# Windows dönemi Claude kullanımı (2026-09-26 – 2026-10-05): API karşılığı yaklaşık 3.713 $

Bu, Mac'e geçmeden önce Windows'ta çıkarılan son token raporu. Konuşma kayıtları Mac'e taşınmadı ([[2026-10-05-windowstan-maca-gecis]]), bu yüzden Mac'teki rapor sıfırdan başlar. Bu dönemin toplamı burada kalıcı olarak duruyor. Tam HTML rapor bu notun yanında: `2026-10-05-windows-donemi-token-raporu.html`.

**Dolar değerleri hakkında:** Max aboneliğinde gerçek fatura sabit. Buradaki $ değerleri "aynı işi API'den yapsaydın ne tutardı" tahmini.

## Toplam
- 235 oturum, 358 subagent, 33.781 model çağrısı, 10,1 milyar token (büyük kısmı önbellekten okuma).
- Ana oturumlar yaklaşık 1.131 $, subagent'lar yaklaşık 2.582 $.

## Modele göre
| Model | API karşılığı | Pay |
|---|---|---|
| Opus 5.5 | 2.599 $ | %70 |
| Fable 5.1 | 840 $ | %23 |
| Sonnet 5.5 | 261 $ | %7 |
| Sonnet 5 | 13 $ | %0,3 |

## Projeye göre
| Proje | API karşılığı |
|---|---|
| diskort | 1.725 $ |
| web-fps-game (KAPIŞ) | 910 $ |
| incremantal-game (Işık Bekçisi, Bal Vadisi) | 577 $ |
| achievement-guide-formatter (Rehber Okuyucu) | 150 $ |
| web-boss-teaser (Kül Tahtı) | 90 $ |
| song-finder | 89 $ |
| ZZ (genel) | 66 $ |
| string-tool (Çeviri Aracı) | 55 $ |
| voice-detector | 20 $ |
| steam-avgr-calculator | 20 $ |
| ziroobank-expenses | 11 $ |

## Mac döneminde
Aynı rapor Mac'te `node ~/.claude/orchestration-report/usage.mjs` ile alınır ve yalnızca Mac oturumlarını sayar. İki dönemin toplamı için bu notun sayılarını eklemek gerekir. Araç: [[araclar-ve-raporlar]].
