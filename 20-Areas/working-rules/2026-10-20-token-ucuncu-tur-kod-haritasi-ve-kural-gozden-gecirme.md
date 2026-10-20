---
type: decision
project: genel
date: 2026-10-20
status: active
tags: [working-rules, orkestrasyon, token, kod-haritasi, hook, ajan, kalite]
source: 2026-10-20 ZZ oturumu "araştırma: tweet doğrulama" (BGTS Context Engine tweet'i → kendi token kullanımımız); ~/.claude/CLAUDE.md, ~/.claude/settings.json, ~/.claude/hooks/baglam-uyarisi.mjs, ~/.claude/agents/kesif.md
---

# Karar: Token tasarrufu üçüncü tur; kod haritası, bağlam uyarısı hook'u, kesif ajanı ve kalite için kural gevşetmeleri

## Bağlam
- Bir tweet, BGTS Context Engine'in ajan token'ını %82, araç çağrısını %89 azalttığını söylüyordu. Rakamlar README ile tutarlı. Ama ölçülen iş yalnız dosya bulmaydı, Claude Code ile koşulmamıştı (Claude Code hook'u 14 görevlik ayrı bir testte %20) ve test düzeneği yayımlanmamıştı. Fikir doğru: ajana kodun nerede olduğunu önceden vermek arama çağrılarını keser.
- Bu haftanın verisi (19 Ekim 04:00 → 20 Ekim): 277 $, 850M token, 6.011 çağrı, çağrı başına 141k bağlam. Ekran görüntüsü 51 (18 Ekim: 353) ✓.
- Kalan israf:
  - mobil-playus alt ajanlarında 966 grep + 945 sed + 203 cat, Bash çağrılarının ~%60'ı.
  - 5 ana oturum 300k devir eşiğini aştı (483k, 429k, 398k, 377k, 373k).
  - 11 ajan 200k'yı aştı.
  - 469 araç çıktısı 8k karakterin üstündeydi.
  - Haiku keşfi fiilen kullanılmadı (0,05 $).

## Karar
1. **Bağlam uyarısı hook'u:** `~/.claude/hooks/baglam-uyarisi.mjs`, UserPromptSubmit olayında çalışır (`settings.json`, yedek `settings.json.bak-2026-10-20`). Transkriptin son 512 KB'ından son yanıtın bağlamını okur. 300k üstünde, ya da bir oturum 6+ saat sonra 150k üstüyle yeniden açıldığında modele `additionalContext` ekler. Model de kullanıcıya tek satırla söyler. Alt ajanlarda (`agent_id`) çalışmaz.
2. **`kesif` ajan tipi:** `~/.claude/agents/kesif.md`. Haiku, salt okunur, ≤30 çağrı. Önce kod haritasını okur, `dosya:satır` listesi döndürür. CLAUDE.md'deki "kod öncesi keşif" kuralı artık bu ajanı adıyla anıyor.
3. **Proje kod haritaları:** `docs/kod-haritasi.md`, ≤~400 satır. Satır numarası yerine dosya yolu + grep'lenebilir sembol adı içerir. Bölümleri: alan → dosyalar, "şunu yapmak için şuraya bak", büyük dosyaların iç haritası, tuzaklar. Yapıyı değiştiren her commit'te koordinatör haritayı da günceller. İlk proje mobil-playus ([[2026-10-20-kod-haritasi-devir-notu]]). Doğrulama sonucu iyi çıkarsa sırada incremantal-game ve diskort var.
4. **Okuma kuralı ters çevrildi:** ~500 satıra kadar olan dosya tek çağrıda bütün okunur. Yalnız daha büyük dosyalar, haritanın ya da grep'in gösterdiği aralıkla okunur. Önceki "önce grep, sonra satır aralığı" kuralı ([[2026-10-10-ajan-boyutu-ve-yalin-baglam]] madde 3) çok sayıda küçük sed çağrısı üretiyordu. Her ek çağrı ~140k bağlamı baştan okuyor; 300 satırlık bir dosya ~4k token tutuyor.
5. **Çağrı sınırı yumuşadı:** Ana tavan ≤200k bağlam. 100 çağrı artık bir işaret: bir sonraki doğal aşama sınırında bölünür. Kök nedene yaklaşmış bir hata ayıklama ajanı önce işini bitirebilir.
6. **Riskli review istisnası:** Giriş, ödeme/IAP, sunucu/API, izinler, sır işleme ve veri göçüne dokunan diff'ler `effort: "high"` ile incelenir. Bunlarda doğrudan çağıranların ötesine de bakılabilir, çağrı sınırı yoktur (bağlam yine ≤200k).
7. **Model satırı gerçeğe uyduruldu:** Koordinatör modelini ve eforunu kullanıcı seçer; 19 Ekim'den beri çoğunlukla Opus. Dışa giden metinler (mağaza sayfası, marka, açık sayfalar) yayın öncesinde Haiku değil Sonnet ile okunur.

## Neden
- Maliyet bağlam × çağrı. En büyük kalem, ajanların koddaki yeri aramak için harcadığı çağrılar. Harita ve keşif ajanı bu çağrıları keser, kaliteyi düşürmez.
- Kurallar yazılıydı ama uygulanmıyordu (300k devir, Haiku keşfi). Hook, hatırlatmayı modelin önüne koyuyor.
- 4–7 kaliteyi geri veriyor ya da koruyor: bütün dosyayı görmek, hata ayıklamanın bölünmemesi, riskli diff'lerde derin review, dışa giden metinde daha güçlü okuyucu.

## Reddedilen alternatifler
- **BGTS Context Engine kurmak:** Postgres + Apache AGE + pgvector gerektiriyor ve sonuçları bağımsız doğrulanmamış. Düz Markdown harita aynı işin çoğunu altyapısız yapıyor. Harita yetersiz kalırsa yeniden bakılır.
- **Status line:** Masaüstü Code sekmesinde görüneceği belgelenmemiş, üstelik yalnız kullanıcıya görünüyor. Hook ise Code sekmesinde çalışıyor ve modele ulaşıyor.
- **`CLAUDE_CODE_AUTO_COMPACT_WINDOW` ile erken otomatik sıkıştırma:** Sıkıştırma ayrıntı kaybettirir. Kullanıcı 1–2–3'ü seçti, bu madde açık kaldı.
- **`BASH_MAX_OUTPUT_LENGTH`'i düşürmek (varsayılan 30.000 karakter):** Gerekli çıktıyı ortadan kesebilir. Yalın bağlam kuralındaki grep/tail yeterli.
- **Kod haritasında satır numarası:** Her commit'te bozulur. Sembol adı grep'le anında bulunuyor.

## Sonuçlar / riskler
- Harita bakımsız kalırsa ajanı yanlış yere yönlendirir. Bakım kuralı commit'e bağlandı; `kesif` ajanı da haritada gördüğü yanlışları raporluyor.
- Bütün dosya okuma, büyük ve sık değişen dosyalarda bağlamı hızla büyütebilir. 500 satır sınırı bunun için var.
- Hook transkripti asenkron yazılıyor. Uyarı bir tur gecikebilir, bu kabul edilebilir.
- Ölçülecek: bir hafta sonra `usage.mjs --since 2026-10-21T01:00:00Z`. Bakılacaklar: mobil-playus ajanlarında grep/sed/cat sayısı, 300k üstü ana oturum sayısı, `kesif` çağrı sayısı.

## İlgili
- [[2026-10-13-token-tasarrufu-ikinci-tur]], [[2026-10-10-ajan-boyutu-ve-yalin-baglam]], [[orkestrasyon]], [[inceleme-kapisi]], [[_index]]
