---
type: lesson
project: rehber-okuyucu
date: 2026-10-05
status: active
tags: [rehber-okuyucu, ders, yayin, deploy]
source: oturum 2026-10-05, 3d88177 yayını
---

# Yayın öncesi kuyruk kontrolü ayrı bir adım olmalı; kontrolü `&&` ile yayına zincirlemek süren üretimi keser

Kuyruk listesi ile `deploy.sh` aynı komutta `&&` ile zincirlendi. Liste "processing" gösterdiği halde (liste komutu başarıyla çıktığı için) yayın başladı, `docker stop` yaklaşık 7 dakikadır süren bir Opus üretimini kesti. İş yeni konteynerde otomatik yeniden başladı; kayıp o denemenin süresi ve token'ı.

**Uygula:** önce `node src/cli.js list --status all` ayrı çalıştır, çıktıyı oku. `pending`/`processing` varsa Yusuf'a sor (ya da bitmesini bekle, ya da artık var olan iptal düğmesini kullan). Sonra ayrı komutla `deploy.sh`.

Bağlantı: [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
