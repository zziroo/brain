---
type: session
project: rehber-okuyucu
date: 2026-10-05
status: active
tags: [rehber-okuyucu, oturum, yayin, ai-motoru]
source: oturum 2026-10-05 (achievement-guide-formatter, Mac), "verilen rehber diline göre çıktı, akıştaki dikkat notları kopuk" isteğiyle başladı
---

# AI belge kalitesi, Steam resmi başarım adları, AI araştırması ve üretim iptali yayına alındı

## Ne yapıldı
- Üç yerel AI belgesi analiz edildi: aynı bilgi 3-6 kez, kopuk notlar, yanlış geri çevrilmiş başarım adları. → [[2026-10-05-her-bilgi-tek-yerde]]
- Dil: Özgün/TR/EN, kartta Steam resmi adı, okuyucuda başarım adı dil seçimi (şema v5). → [[2026-10-05-basarim-adlari-steamden-resmi-haliyle]]
- AI araştırması (şema v6), sonra oynanış sırası zorunlu kılındı. → [[2026-10-05-ai-arastirmasi-iki-asamali]]
- Güvenlik: CLI stdin'inde `@` → `＠` (motorun tek çıkış noktasında). Canlıda doğrulandı ki genişletme bu projede de açıktı; canlı rehberlerde `@/` yoktu, sızıntı olmadı.
- Üretim iptali. → [[2026-10-05-uretim-iptali]]
- Yayınlar: c8b7e6c, 3d88177, 5c4b0e5, fb767ec (her biri öncesinde otomatik DB yedeği).
- Her kod değişikliği ayrı inceleme ajanından geçti; orta bulgular şüpheci ajanla doğrulandı (biri çürütüldü: v5 göç regex'i).

## Dersler
- [[yayin-oncesi-kuyruk-kontrolu-ayri-adim]]
- [[turkce-sayfada-ingilizce-buyuk-harf-i]]
- [[claude-cli-gizli-max-turns-bayragi]]
- Song Finder'da 2026-10-04'te bilinen `@` tuzağı bu projeye taşınmamıştı; kardeş projelerde aynı CLI kullanımı varsa dersi birlikte uygula.

## Bağlantı
[[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
