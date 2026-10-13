---
type: decision
project: genel
date: 2026-10-13
status: active
tags: [working-rules, orkestrasyon, token, ajan, haiku]
source: 2026-10-13 oturumu "pano: son 1 gün token analizi"; ~/.claude/CLAUDE.md Orchestration + Review gate, pano SKILL.md, usage.mjs/ortak.mjs
---

# Karar: Token tasarrufu ikinci tur; inceleme ajanı diff'e sınırlı, 200k tavan, Haiku keşif, ekran görüntüsü kısıtı

## Bağlam
12 Ekim 04:00 haftalık sıfırlamasından sonraki ~21 saatin analizi (`usage.mjs --since 2026-10-12T01:00:00Z`):
- API-eşdeğeri 200 $, 497M token, 12 oturum, 53 ajan, 3.187 çağrı. Haftalık kota %12, Fable kotası %11; tempo sürdürülebilir.
- Çağrı başına ortalama bağlam 156k (7 Ekim 259k, 8 Ekim 177k, 2–4 Ekim 300–410k). [[2026-10-10-ajan-boyutu-ve-yalin-baglam]] işe yaradı.
- Token'ların %98'i önbellek okuması: maliyet = bağlam × çağrı. Ajanlar 126 $ (hepsi Opus), koordinatör Fable 65 $ (yarısı 1 saatlik önbellek yazımı), Sonnet 8 $.
- Kalan israf: review ajanları 60–75 çağrı / 215–243k zirveyle ~10 $'ar; iki incremantal-game ajanı 358k ve 282k'ya çıkmış; ajanlarda 81 javascript_tool + 32 browser_batch ve ekran görüntüleri bağlamda birikmiş; Haiku kuralı vardı ama geçmişte tek Haiku çağrısı yok.

## Karar
1. **Review ajanı diff'e sınırlı:** diff + hunk çevresi ~40 satır + değişen fonksiyonların doğrudan çağıranları; tüm dosya/repo okuma yok; hedef ≤30 çağrı, ≤120k bağlam (CLAUDE.md Review gate).
2. **Ajan bağlam tavanı 300k → 200k;** koordinatör devir eşiği 400k → 300k.
3. **Tarayıcı kontrolü ajanlarda:** read_page / get_page_text / javascript_tool öncelikli; ekran görüntüsü yalnız düzen sorusuysa, `scale: 0.5`, sonda.
4. **Kod öncesi keşif:** "X nerede, Y'ye hangi dosyalar dokunuyor" işi önce `haiku`/Explore ajanına (ya da inline grep), çıkan dosya:satır listesi Opus brief'ine girer. Haiku kapsamı genişletildi: keşif, log/test özeti, yayın öncesi metin okuma. Pano yayın kontrolünde Sonnet yerine Haiku.
5. **usage.mjs ve ortak.mjs'e Haiku 5.5 fiyat satırı** (0,10 / 0,50 $, önbellek okuma 0,01 $ per MTok); yoksa Haiku kullanımı "fiyatsız" görünürdü.
6. **Koordinatör Fable medium'da kalır.** Opus'a geçiş günde ~35 $ (%15–17) kazandırırdı; Fable'ın ayrı kotası var ve planlama/karar kalitesi oraya ait. Mekanik oturumlar (deploy, küçük düzeltme, rapor) Opus'ta açılabilir, bu Yusuf'un tercihi.

## Neden
- Kalite etkisi düşük, en pahalı uç vakaları hedefleyen maddeler; önceki turun aynı mantığı.
- Beklenen etki: günlük ~200 $ → ~140 $ API-eşdeğeri. Kota zaten rahat; amaç haftalık sınıra hiç yaklaşmamak.

## Reddedilen alternatifler
- Koordinatörü Opus'a almak: kazanç orta, kalite riski koordinatörde en pahalı.
- Review'u Sonnet'e vermek: bulgu kalitesi düşer, skeptik yükü artar; önce kapsamı daraltıp ölçmek.
- Haiku'ya kod yazdırmak/review yaptırmak: düzeltme maliyeti tasarrufu yer.

## Sonuçlar / riskler
- Review kapsamı daralınca değişen fonksiyonun uzak çağıranlarındaki kırılma kaçabilir; skeptik ve testler dengeliyor.
- Etkisi doğrulanmadı: **14 Ekim'de aynı analiz** (`usage.mjs --since 2026-10-13T01:00:00Z`) tekrarlanacak; bakılacak: çağrı başı ortalama bağlam, review ajanı çağrı/zirve, Haiku çağrı sayısı.

## Ölçüm (13 Ekim 04:00 → 23:00, kurallardan sonraki gün)
- Toplam değişmedi: 194 $ (önceki gün 200 $), 497M token, 3.185 çağrı, çağrı başı ortalama bağlam yine 156k; haftalık kota +13 puan (%25). İş karışımı farklı: 5 uzun oturum (12 kısa yerine), 58 ajan.
- Uygulanan: review ajanları 8–43 çağrı, zirve 65–224k (önceki gün 60–75 çağrı, 215–243k) ✓. Haiku ilk kez kullanıldı: 3 ajan, 42 çağrı, 0,08 $ ✓. Ajan maliyeti 126 → 105 $, ajan başı ortalama bağlam 151k → 140k ✓.
- Uygulanmayan: koordinatör devir eşiği (Fable oturumları 412k, 322k, 321k, 277k zirve; 5–7 saat; koordinatör maliyeti 65 → 89 $). Ajan 200k tavanı incremantal-game'de aşıldı (5 ajan 254–324k, 80–124 çağrı; js/run.js 3.480 satır, render.js 2.552 satır). Ekran görüntüleri sürüyor (ajanlarda 11–17 görüntü, koordinatörde 14–15).
- Sonuç: ajan tarafı ucuzladı, kazanç koordinatör şişmesine gitti. Sonraki hedef koordinatör devri ve incremantal-game'de dosya/aşama bölme.

## İlgili
- [[2026-10-10-ajan-boyutu-ve-yalin-baglam]], [[orkestrasyon]], [[inceleme-kapisi]], [[araclar-ve-raporlar]], [[_index]]
