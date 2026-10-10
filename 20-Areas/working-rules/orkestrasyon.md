---
type: resource
project: genel
date: 2026-10-10
status: active
tags: [working-rules, orkestrasyon, ajan]
source: C:\Users\yusuf\.claude\CLAUDE.md (Orchestration)
---

# Büyük işte ana sohbet koordinatördür, işi arka plan ajanlarına devreder

## Kural
- Uzun, çok adımlı işte ana sohbet planlar, ürün kararlarını Yusuf'a sorar, işi arka plan alt ajanlarına verir (`run_in_background: true`). Sonra sonuçları inceler, testleri çalıştırır, commit atar. Ajanlar çalışma kopyasında yerinde düzenler ve commit atmaz. `isolation: "worktree"` (ayrı dal) yalnızca paralel ajanlar aynı dosyalara dokunabilecekse ya da iş riskli/deneysel ise kullanılır (2026-10-01 kararı; eskiden her kod işi için zorunluydu).
- Devretme izni kalıcıdır; her iş için ayrıca sorulmaz.
- İşi dikey dilimle (özellik bazlı) böl, rol bazlı değil. Çakışmayan alanlarda ajanlar paralel çalışabilir.
- Ajanlar asla main'e commit atmaz, merge etmez, tag atmaz, release/deploy yapmaz, secret'lara dokunmaz, production'a SSH ile girmez. İstisna: zamanlanmış salt okuma rutinleri (ör. Diskort gözcüsü) production'ı SSH ile okuyabilir. Bunları koordinatör yapar, projenin kendi kurallarına göre. Brifingde yayın/SSH betiklerinin **hiçbir biçimde** (sahte komutla, değiştirilmiş PATH'le, kopyayla) çalıştırılmayacağını açık yaz; yalnız `bash -n` ve okuma ([[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]]).
- Birleştirdikten sonra varsa worktree ve dallar temizlenir.
- Ajan sonuçları Yusuf'a kısa aktarılır; doğrulanmamış ajan iddiası doğrulanmış gibi sunulmaz.

## Satır içi mi, ajan mı
Her ajan soğuk başlar (iş yapmadan ~45-50k token bağlam) ve kodu yeniden okur.
- Satır içi: kısa, az okuma gerektiren iş (tek satır düzeltme, config/hafıza düzenleme, git/deploy adımları, hızlı kontrol).
- Ajan: çok okuma/düzenleme gerektiren iş (çok dosya, uzun araştırma), değişiklik küçük olsa bile; koordinatörün bağlamını temiz tutar. Koordinatörün bağlamı şişmişse yine ajana ver.

## Ajan boyutu ve yalın bağlam (2026-10-10)
- Ajan başına ~≤100 çağrı, ≤300k bağlam; 150+ çağrılık iş aşamalara bölünür, her aşama devir notuyla yeni ajana. Küçük iş bölünmez.
- Aynı kalıpta tekrarlayan iş: ilk örnek + ortak altyapı bir ajanda, kalanlar net tarifle; mekanik tekrar `sonnet`, tasarım `opus`.
- Her ajan istemine yalın bağlam kuralı: grep → satır aralığı, tekrar okuma yok, log önce hata grep'i sonra `tail -40`.
- Koordinatör inceleme bulgularına güvenir; ~400k bağlamda vault'a yaz + `/compact` ya da yeni oturum.
- Karar ve gerekçe: [[2026-10-10-ajan-boyutu-ve-yalin-baglam]].

## Model seçimi
- **Güncel (CLAUDE.md, 2026-10-10'da okundu):** koordinatör Fable'da çalışır; alt ajanlar onu asla devralmaz, `model` her zaman açıkça verilir. Varsayılan `opus` + `effort: "medium"` (çapraz kesen/tasarım ağırlıklı iş ve derin incelemede `high`). Aşağıdaki maddeler eski kuraldır.
- Opus (inherit): çapraz kesen veya tasarım ağırlıklı iş, derin inceleme.
- `sonnet`: dar ve iyi tanımlı değişiklik, doğrulayıcı/skeptic geçişi, araçlar.
- `haiku` ya da Explore: salt okunur arama.
- Diskort notu: ağır ajanlar ana sohbet modelini "inherit" eder (Yusuf maliyeti ana sohbet modelini Opus/Sonnet arası değiştirerek yönetir); yalnız dar/skeptic ajanlar `sonnet`'e sabitlenir. Global model kuralı yeniden yazılmaz ([[diskort-orchestrator-mode]]).

## Neden
Kaynakta gerekçe açık yazılmamış. Ima edilen: bağlamı temiz tutmak ve limit harcamasını yönetmek (yorum, doğrulanmadı).

## Reddedilen alternatifler
Kaynakta yok.

## İlgili
- [[inceleme-kapisi]], [[karar-dagilimi]], [[_index]], [[2026-10-10-ajan-token-analizi]]
