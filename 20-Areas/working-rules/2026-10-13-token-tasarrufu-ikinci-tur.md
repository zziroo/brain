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

## Ölçüm 2 (14 Ekim 04:00 → 15 Ekim 03:20)
- 68 $, 178M token, 1.227 çağrı, 5 oturum, 18 ajan; çağrı başı ortalama bağlam 145k (156k'dan). Hafif gün, haftalık +4 puan (%29).
- Review ajanları 4–18 çağrı, ≤108k ✓. Koordinatör zirve 253k (300k altı) ✓. Ekran görüntüsü ajan başına 0–6 (biri 13) ↓.
- Kalan: mobil-playus denge turunda 5 Opus ajanı 100–172 çağrı, zirve 201–303k; 172 çağrılık ajan bölünmemiş (~10 $). Sonraki hedef: ajan brief'inde "tek oyun / ≤80 çağrı" sınırı.

## Ölçüm 3 (15 Ekim 04:00 → 16 Ekim 02:50)
- 236 $, 381M token, 2.711 çağrı, 22 oturum, 56 ajan; çağrı başı ortalama bağlam 140k (145k'dan). Ağır gün: 4 proje (mobil-playus 102 $, diskort 58 $, ZZ 51 $, ziroo-edge 25 $). Haftalık kota +18 puan (%47), Fable %59.
- Ajan tarafı hedefte: 56 ajan 58 $ (13 Ekim 105 $). Zirveler ≤200k (biri 247k), en uzun ajan 85 çağrı, Sonnet review/skeptik 3–16 çağrı ✓. Haiku 1 ajan. Ekran görüntüsü ajanlarda 0–9, koordinatörde 0–7 ↓.
- Para koordinatöre gitti: Fable 170 $ (%72; 13 Ekim 89 $), 920k çıktı token tek başına ~46 $. Zirveler: ziroo-edge ops 399k (185 çağrı, 24 browser_batch koordinatörde), diskort giriş sesi 348k (129 çağrı); 295k, 252k, 251k, 232k. 300k devir eşiği iki oturumda aşıldı.
- Yeni israf: eski oturumu yeniden açmak. 7 Ekim'in marka/maskot oturumu 641k bağlamla açıldı, 15 çağrı = 7,3 $; 13 Ekim'in Tussle oturumu 375k ile 19 çağrı = 9,4 $. İkisi de sıfırdan brief'le 1–2 $'a yapılırdı.
- Sonraki hedef: (1) 300k'da devir uygulanacak (ziroo-edge ve diskort oturumları); (2) tarayıcı işi koordinatörde değil ajanda; (3) 150k üstü eski oturumu devam ettirme, yeni oturum + kısa brief; (4) mekanik oturumları (deploy, küçük düzeltme, rapor) Opus'ta açma seçeneği Yusuf'ta duruyor.

## Ölçüm 4 (16 Ekim 04:00 → 17 Ekim 01:10)
- 229 $, 520M token, 2.963 çağrı, 21 oturum, 48 ajan; çağrı başı ortalama bağlam 176k (140k'dan geri yükseldi). Haftalık kota +13 puan (%60), **Fable +15 puan (%74)**; sıfırlanmaya 2 gün var, bu tempoda Fable kotası cumartesi gecesi dolar.
- Model karışımı değişti: ana oturumların yarısı Opus'ta açıldı (ana Fable 91 $, ana Opus 86 $, ajanlar 50 $). Opus toplam 133 $ (%58), Fable 92 $.
- Ajanlar yine hedefte: 48 ajan 50 $, zirve ≤204k, en uzun 82 çağrı, 12 Sonnet + 1 Haiku.
- Günün sorunu tek oturum: "tussle: admin paneli" (Fable) 343 çağrı, zirve 628k, 5,3 saat, **135 ekran görüntüsü, 88 browser_batch**, 62 $ (günün %27'si). Koordinatör tarayıcı işini kendi yaptı, 300k devir uygulanmadı. Diğer şişkinler: Opus Tussle oturumu 286 çağrı / 407k / 20 $; ziroo-edge ana sayfa 171 çağrı / 329k / 17 görüntü; marka maskotu 343k.
- Eski oturum yeniden açma tekrarlandı: 7 Ekim'in karakter tasarımı oturumu ikinci kez, 721k bağlamla 32 çağrı = 10,7 $ (dün 7,3 $).
- Ders: ekran görüntüsü kuralı yalnız ajanlar için yazıldı, koordinatörler kapsam dışı kaldı; günün görüntülerinin çoğu (135 + 39 + 31 + 17) koordinatörlerde. Sonraki hedef: aynı kuralı koordinatöre de uygulamak (tarayıcı doğrulamasını ajana vermek ya da read_page/get_page_text ile yapmak), 300k'da devir, eski oturumu açmamak.

## Ölçüm 5 (17 Ekim 04:00 → 18 Ekim 01:30)
- 249 $, 620M token, 3.975 çağrı, 24 oturum, 81 ajan; çağrı başı ortalama bağlam 156k. Haftanın en yoğun günü (çağrı sayısı %34 arttı), maliyet %9 arttı. Haftalık kota +15 puan (%75), **Fable +13 puan (%87)**, sıfırlanmaya 26 saat.
- Koordinatör düzeldi: en pahalı oturum 30 $ (önceki gün 62 $), görüntü en çok 26 (135 idi), ana Fable 65 $ (92 → 65). 300k aşan koordinatör yine 4 tane (430k, 366k, 345k, 313k).
- Ajanlar bozuldu: 81 ajan 91 $ (50 → 91). 11 ajan 200k tavanını ya da 100 çağrıyı aştı (en büyük 153 çağrı / 262k / 6,7 $). Ekran görüntüsü ajanlarda 84, koordinatörlerde 102. Sonnet ajanlarından biri 68 çağrı / 224k (review sınırı ≤30 / ≤120k).
- Eski oturum açma devam etti, bu kez arşivlemek için: üç 367–400k oturum 11–14 çağrıyla açılıp kapatıldı, ~11 $. Arşivleme için oturumu açmak gereksiz; `archive_session` dışarıdan çağrılır.
- Sonuç: koordinatör kuralı ilk gün tuttu, ajan disiplini yoğun günde gevşedi. Sonraki hedef: ajan brief'inde ≤80 çağrı sınırının yazılı olması, Sonnet review ≤30 çağrı, arşivlemeyi oturum açmadan yapmak.

## İlgili
- [[2026-10-10-ajan-boyutu-ve-yalin-baglam]], [[orkestrasyon]], [[inceleme-kapisi]], [[araclar-ve-raporlar]], [[_index]]
