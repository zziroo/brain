---
type: lesson
project: ceviri-araci
date: 2026-10-03
status: active
tags: [yayin, sunucu, deploy]
source: 2026-10-02/03 oturumu; deploy.sh ve sunucu-vps runbook'u
---

# Ders: Paylaşılan web köküne yayın yapan betik yalnız kendi yollarına dokunmalı (chown/chmod/tar kapsamı)

`string-tool/deploy/deploy.sh` ilk hâlinde `chown -R` ve `chmod -R`'yi tüm `/opt/diskort/apps/web/tools` üzerinde çalıştırıyordu ve tar akışı `tools` klasör girdisini de taşıyordu. Aynı gün başka bir oturum Ziroobank'ın statik dosyalarını da `tools/ziroobank/` altına koymuştu. Betik artık yalnız `tools/ceviri-araci` ve `tools/ceviri-araci.html` yollarını paketliyor ve yalnız onların sahip/izinlerini ayarlıyor (string-tool commit b52a86c).

Önceki iki yayın sırasında Ziroobank dosyalarının sahip/izinleri değişmiş olabilir. 2026-10-03'te https://diskort.ziroo.net/tools/ziroobank/ 200 ve doğru başlıkla döndü; sunucudaki dosya izinleri SSH ile ayrıca kontrol edilmedi (doğrulanmadı).

Genel kural: ortak bir klasöre yazan her betikte `-R` işlemlerini ve arşiv kökünü kendi alt yoluna sınırla; başka projelerin de oraya yazabileceğini varsay.

İlgili: [[2026-10-02-yayin-diskort-tools-altinda]], [[vps-makinesi]]
