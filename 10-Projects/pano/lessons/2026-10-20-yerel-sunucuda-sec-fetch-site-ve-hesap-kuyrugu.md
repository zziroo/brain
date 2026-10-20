---
type: lesson
project: pano
date: 2026-10-20
status: active
tags: [pano, guvenlik, yerel-sunucu, dos]
source: ZZ oturumu ec23c2ad, sunucu.mjs güvenlik incelemesi + şüpheci geçişi
---

# Yerel (127.0.0.1) sunucu yalnız Host denetimiyle korunmuş sayılmaz: başka siteler `no-cors` ile ağır iş tetikleyebilir

## Ne oldu
Pano sunucusu 127.0.0.1'e bağlıydı ve Host başlığını denetliyordu (DNS rebinding'e karşı). İnceleme, kullanıcının tarayıcısında açık herhangi bir sitenin `fetch("http://127.0.0.1:7788/pano.json?yenile=1&since=...", {mode:"no-cors"})` ile sunucuya her seferinde ağır (~880 MB, ~1 dk) bir geçmiş hesabı yaptırabildiğini gösterdi. Yanıt okunamadığı için veri sızmıyor, ama yerel CPU/RAM tüketimi (DoS) mümkündü; şüpheci geçiş bunu orta-düşük olarak onayladı.

## Ders
- Yerel araç sunucularında üç katman birlikte: (1) Host denetimi, (2) tarayıcı `Sec-Fetch-Site` gönderiyorsa yalnız `same-origin`/`none` kabul (başlıksız curl ve Node istekleri etkilenmez), (3) pahalı işte bekleyen iş sayısı sınırı (burada 3, fazlası 429).
- Süreç yönetimi: `--durdur` gibi komutlar pid'i sunucunun kendi beyanından almamalı; öldürmeden önce `ps -p N -o command=` ile gerçekten kendi sürecimiz mi doğrula.
- Sunucu kapanırken çalışan alt süreci (`spawn`) açıkça öldür; `process.exit` onu öldürmez.

## Doğrulama
Ayrı bir test portunda `Sec-Fetch-Site: same-origin|none` → 200, `cross-site|same-site` → 403; beş eşzamanlı farklı filtre isteğinde bir kısmı 429 aldı.

Bağlantı: [[2026-10-20-pano-ve-canli-tek-yerel-sunucu]].
