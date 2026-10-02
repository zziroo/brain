---
type: decision
project: ceviri-araci
date: 2026-10-02
status: accepted
tags: [ceviri-araci, mimari]
source: 2026-10-02 oturumu
---

# Çevrilmiş dosyalar yeniden serileştirilmez, yalnızca metin aralıkları değiştirilir

Her format işleyicisi çıkarırken her metnin orijinal metindeki yerini (span) kaydeder; yazarken sadece o aralıklar kaçışlanmış çeviriyle değiştirilir. Çeviri yoksa çıktı baytı girdiyle aynıdır. Çıktı yeniden ayrıştırılır; bozulursa (veya dosya UTF-8 değilse) dosya değiştirilmeden kopyalanır ve hata gösterilir.

**Neden:** Oyunlar dosyayı kendi ayrıştırıcısıyla okuyor; anahtar sırası, girinti, kaçış stili, yorumlar, BOM/CRLF değişirse diff şişer ya da oyun bozulabilir. Asıl risk çevirmenin bozuk dosya teslim etmesi.

**Reddedilen alternatifler:** `JSON.parse` + `stringify` ve DOM/YAML yeniden serileştirme (biçimi ve yorumları kaybeder); her format için tam şema kütüphaneleri (bağımlılık yükü, yine biçim kaybı).

Bağlam: [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]]
