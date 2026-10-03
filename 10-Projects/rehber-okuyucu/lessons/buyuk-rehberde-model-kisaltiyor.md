---
type: lesson
project: rehber-okuyucu
date: 2026-10-04
status: active
tags: [rehber-okuyucu, ai-motoru, model, kalite]
source: oturum 2026-10-04, canlı sunucu kaydı ve üretilen belge
---

# Çok büyük rehberde Sonnet biçimi geçerli ama kısaltılmış belge döndürdü; biçim doğrulaması tamlığı yakalamaz

## Ne oldu
Witcher 3 rehberi (45 bölüm, model girdisi ~281 KB / ~111 bin token, 78 resmi başarım), Sonnet:
1. İlk üretim başarısız: ilk yanıt belgeyi yanlış kapla döndürdü; onarım turu neredeyse doğruydu ama iki metin parçasındaki şemada olmayan birer alan yüzünden belgenin tamamı reddedildi.
2. Kural gevşetilince "hazır" oldu ama 78 başarımdan 10 kart (8'i boş) üretti, 21 sn ve 2.495 çıkış token'ı ile; `issues` içine "bu çıktı kısaltılmıştır" yazdı.
65 bölümlük (~28 KB) rehberde aynı model 63 kartı eksiksiz üretmişti.

## Ders
- Şema doğrulaması "geçerli ama eksik" çıktıyı yakalamaz; içerik için ayrı kural gerekir. Eklenen: resmi liste varsa her `apiName` tam bir kez kart olmalı, eksikse onarım turu, yine eksikse `failed` (yalnız motor yolunda).
- Motor yolunda bilinmeyen alan belgeyi reddettirmez, atılır: doğrulayıcı çıktıyı yalnız izinli alanlardan kurduğu için güvenlik açısından eşdeğer.
- Model seçimini küçük girdiyle yapılan denemeye dayandırma; en büyük gerçek girdiyle dene.

## Doğrulanmadı
Opus'un aynı rehberde tam belge üretip üretmediği (motor 2026-10-04'te Opus'a alındı, deneme Yusuf'ta). Opus da kısaltırsa ya da 64.000 çıkış token sınırına takılırsa sıradaki adım parçalı üretim.

## İlgili
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]], [[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]]
