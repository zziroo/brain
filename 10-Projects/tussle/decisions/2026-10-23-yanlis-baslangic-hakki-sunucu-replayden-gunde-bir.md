---
type: decision
project: tussle
date: 2026-10-23
status: active
tags: [tussle, karar, sunucu, hak, skor]
source: oturum [[2026-10-23-tussle-oyun-ici-duzenleme-turu-telefon-notlari]]
---
# Karar: yanlış başlangıç hakkı — 4 sn altında kendi biten koşu günde bir kez hak düşürmez

## Karar
Sunucu, gönderilen günlüğü replay ederken koşu sim tarafından 240 tick (4 sn) altında bitmişse, oyunun `meta.end` değeri 'auto' ise (süre/turla bitenler ve hedef oyunları hariç) ve koşu şüpheli değilse, günde kullanıcı başına bir kez deneme "yanlış başlangıç" sayılır: `tries.false_start = 1`, attempts kaydı tutulur, hak düşmez, gün/sezon sıralamasına, triesUsed'a, seriye ve profil tablolarına girmez. Sonraki deneme k = MAX(k)+1 ile yeni seed alır. İstemci bayrak göndermez.

## Neden
Yusuf: ilk saniyelerde yanlış dokunup biten deneme hakkı yakmamalı, aynı hakla yeniden oynansın; kayıt yine tutulsun. Sunucu tarafında karar, aksi hâlde istemci bayrağı kötüye kullanılır.

## Reddedilen alternatifler
- İstemcinin "yanlış başlangıç" bayrağı göndermesi: doğrulanamaz.
- Eşiği dokunuş sayısıyla koymak: oyuna göre anlamı değişiyor; tick sınırı tek ve replay'den okunuyor.
- tries satırını silmek: UNIQUE(day_id,user_id,k) ve geçmiş kaybı; bayrakla süzme seçildi.
- Sınırsız yanlış başlangıç: kötü açılışta bilerek ölüp yeni dizilim almak suistimal olur; günde 1 (bu kadarı kabul edildi).
