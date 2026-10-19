---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, ui, oda, profil]
source: oturum "tussle: geçiş ve düzenleme geri bildirimi" (2026-10-19/20)
---

# Karar: oyuncu kartı sade — "Profili gör", o günün denemeleri, tek satır sezon

## Bağlam
Odadaki oyuncu kartı karışıktı: o kişinin günkü denemeleri görünmüyordu, sezon sparkline'ı ve odayla ilgisiz genel profil istatistikleri vardı.

## Karar
Üstte avatar + isim + belirgin "Profili gör"; bugün: oyun + "#N" + denemeler sırayla (en iyisi ★, yarıda kalan, benim süren denemem); "Sezon: #N · P puan"; yönetici düğmeleri sakin. Sparkline ve profil özeti kalktı. Sunucu: `LeaderboardEntry.scores` (yalnız bitmiş denemeler, tahtayla aynı üye/settled kuralı). Başkasının kartında "N hak kaldı" yok (süren deneme sayıyı geciktirir).

## Neden
Yusuf: genel istatistikler profile ait; profile geçiş belirgin olursa üstten her şey çözülür.

## Reddedilen alternatifler
- Denemeyi tekrar izleme (▶): yapılabilir (loglar sunucuda, izleme ekranı var) ama orta büyüklükte iş; eski oyun sürümü logları ve gün kapanmadan strateji görme adaleti açık. Sonraya.

## İlgili
- [[2026-10-17-profil-ekrani-kapsami]]
