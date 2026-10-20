---
type: decision
project: genel
date: 2026-10-10
status: active
tags: [working-rules, orkestrasyon, token, ajan]
source: 2026-10-10 oturumu "ajanların en çok token harcadığı durumlar"; ~/.claude/CLAUDE.md Orchestration'a eklendi
---

# Karar: Ajanlar küçük ve yalın bağlamla çalışır; büyük iş aşamalara bölünür

## Bağlam
Token analizi ([[2026-10-10-ajan-token-analizi]]): maliyetin yarısından fazlası 400k+ bağlama çıkan az sayıda uzun ajandan geliyor. Ajan sayısı ve inceleme kapısı ucuz.

## Karar
Global CLAUDE.md Orchestration bölümüne dört madde eklendi:
1. **Ajan boyutu:** ajan başına ~≤100 çağrı, ≤300k bağlam. 150+ çağrı sürecek iş aşamalara bölünür, her aşama kısa devir notuyla (dosyalar, kararlar, kalan iş) yeni ajana. Küçük iş bölünmez.
2. **Tekrarlayan aynı kalıp (ör. temalar):** bir ajan ilk örneği + ortak altyapıyı kurar ve dosya listesini çıkarır; kalanlar bu net tarifle yapılır. Mekanik tekrar `sonnet`'e gidebilir, tasarım/his `opus`'ta kalır.
3. **Yalın bağlam her ajan isteminde:** önce grep, sonra satır aralığı; aynı dosyayı tekrar okuma; build/test/kurulum çıktısı önce `grep -iE "error|fail|warn"`, sonra `tail -40`.
   - *Güncelleme 2026-10-20:* "satır aralığı" kısmı değişti: ~500 satıra kadar dosya bütün okunur, kod haritası önce okunur. Bkz. [[2026-10-20-token-ucuncu-tur-kod-haritasi-ve-kural-gozden-gecirme]].
4. **Koordinatör:** ajan değişikliğinin tamamı yerine inceleme bulgularına güvenir; ~400k bağlamı geçince kararları vault'a yazıp `/compact` ya da yeni oturum.

Efor: ajanlarda mevcut kural sürer (Opus medium, gerekirse high; xhigh/max yok). **Koordinatörün eforunu Yusuf seçer**, CLAUDE.md'ye kural yazılmadı.

## Neden
- Maliyet bağlam boyutuyla büyüyor (çağrı başı ~3 kat fark), soğuk başlangıç ucuz (~0,6 $).
- Kalite etkisi düşük maddeler seçildi; en pahalı uç vakaları hedefliyor.

## Reddedilen alternatifler
- Tasarım/tema işlerini toptan Sonnet'e vermek: ürün hissi Yusuf'un alanı, kalite riski.
- İnceleme/skeptik kapısını azaltmak: ajan başı ~2 $, toplamın ~%16'sı; değdiği görülüyor.
- Worktree'yi daha da kısmak: zaten 105'ten 17'ye indi; paralel çakışma riski.
- Koordinatör eforu için CLAUDE.md kuralı: Yusuf ayarı kendisi yapıyor, Claude kendi eforunu değiştirmez.
- Her işi bölmek: devir notunda ayrıntı kaybı ve koordinatör yükü; yalnız 150+ çağrılık işte.

## Sonuçlar / riskler
- `tail`/grep ile log ortasındaki hata kaçabilir; "önce hataları grep'le" sırası bunu azaltır.
- Etkisi doğrulanmadı: ~2026-10-17 civarı aynı karşılaştırma yeniden yapılmalı.

## İlgili
- [[orkestrasyon]], [[inceleme-kapisi]], [[_index]]
