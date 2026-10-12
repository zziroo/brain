---
type: lesson
project: pano
date: 2026-10-13
status: active
tags: [pano, gizlilik, transkript, guvenlik]
source: ZZ oturumu 9f1a0281 (Artifact yayın öncesi tarama)
---

# Claude Code transkriptleri `!` ile çalıştırılan terminal komutlarını da istem olarak saklar

Pano Artifact olarak yayınlanmadan önce yapılan otomatik taramada istem metinlerinde şunlar çıktı:
- sunucunun genel IP adresi,
- `ssh -i ~/.ssh/<anahtar> root@<IP>` komutları,
- `/etc/*.env` yolları,
- `gh secret set` komutları.

Bunlar Yusuf'un sohbette `!` önekiyle çalıştırdığı komutlardı. Claude Code bu komutları transkripte kullanıcı mesajı olarak yazıyor. Bu yüzden pano verisine "istem" olarak girdiler.

Gerçek anahtar ve parola değerleri yoktu: anahtarlar `read -s` ile girilmişti, bu alışkanlık işe yaradı.

## Ders
- Transkriptten türeyen her çıktıyı (pano, rapor, analiz) yayınlamadan ya da paylaşmadan önce tamamını oku.
- Genel IP adreslerini maskele (`pano.mjs --artifact` bunu yapıyor).
- Sır kelimesi geçen satırlara özellikle bak; otomatik işaretleme `pano/yayin-kontrol.mjs`'de.
- Sohbet içinden sunucuya sır gönderirken değeri komut satırına yazma; `read -s` ya da Terminal sekmesi kullan (Claude hafızasındaki "sunucu yazma: komutu kullanıcıya" kuralıyla aynı yönde).

İlgili: [[2026-10-13-pano-artifact-yayini]], [[10-Projects/pano/_overview|Pano]]
