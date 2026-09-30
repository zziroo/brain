---
type: lesson
project: diskort
date: 2026-09-30
status: active
tags: [diskort, kozmetik, avif, renk, electron]
source: 54dc3a33-8a43-4d66-8774-07b1dfa4d58f.jsonl
---

# AVIF dosyaları "sınırlı renk aralığı" kodlanınca Electron'da soluk görünür

- Belirti: pencere yan yana konunca renkler ana uygulamadan soluk (kaynak kareler doygun, gösterimde soluk).
- Neden: uygulamanın tarayıcı motoru, belli bir durumdan sonra AVIF renk aralığını yanlış yorumluyor (sınırlı aralık).
- Çözüm: tam renk aralığıyla kodla, renk etiketlerini dosyaya yaz; kareleri atlayarak/başa sararak/ortadan başlayarak çözdürme testi; uygulama kodu değişmedi. Süs kenarlarına solma eklendi.
- Kontrol: aracın renk testinde birkaç açık kaldı (review).

Benzer/ilgili not (başka ajan): [[kozmetik-avif-tam-aralik]]
