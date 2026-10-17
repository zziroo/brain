---
type: lesson
project: genel
date: 2026-09-29
status: active
tags: [diskort, izin, rutin, claude-code, ortam]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl, 394744c4-d9f8-5503-a075-3edda0039f1c.jsonl, a23848e8-c89f-4e6e-b205-6a370f117b82.jsonl
---

# Rutinler neden sürekli izin ister: heredoc, birebir kayıt ve `.claude` klasörü

## Ne oldu
Kullanıcı "Allow once"tan başka seçenek çıkmadığını ve her seferinde onay gerektiğini bildirdi.

## Nedenleri ve çözümler
- `cat <<'EOF'` ile dosya yazmak "gizlenmiş komut" sayılıp yalnız "Allow once" verir. Çözüm: dosya yazmayı Write/Edit araçlarıyla, hata özetini hazır betikle (`diskort-inbox\hata-ozet.js`, sunucuda salt okur) yapmak.
- "Always allow" komutu birebir (commit numarası dahil) kaydeder. Çözüm: `settings.local.json`'a joker kurallar (`git log/diff/show *` Bash ve PowerShell için; `gh release view/download` ile sınırlı).
- Claude, kendi izin dosyasını değiştiremez (kendi izinlerini değiştirme yasağı); kullanıcı ekler. Kullanıcının elle eklediği dosyada iki kez JSON virgül hatası çıktı; geçersiz JSON tüm izinleri kaybettirebilir, kaydedince doğrula.
- `.claude` altındaki her dosya "hassas" sayıldığı için izin listesine rağmen yazma onay ister: gelen kutusunu dışarı taşıdık ([[gozcu-ve-gece-inceleme-rutinleri]]).
- Gözcü yerel saati öğrenmek için izinli listede olmayan `Get-Date` çalıştırmış (bir çalışmada).
- Otomatik mod, `git push` ve sunucu kurulumu komutunu bir seferinde reddetti; kullanıcı tekrar deneme izni verince geçti.

Benzer/ilgili not (başka ajan): [[claude-altina-yazma-izin-sorar]]
