---
type: resource
project: genel
date: 2026-10-10
status: active
tags: [claude-kullanim, token, maliyet, ajan, orkestrasyon]
source: 2026-10-10 oturumu "ajanların en çok token harcadığı durumlar" (usage.mjs + pano.json analizi)
---

# Ajan maliyetini ajan sayısı değil bağlam boyutu belirliyor: 400k+ bağlama çıkan %12 ajan maliyetin %55'i

Kapsam: 2026-09-26 – 2026-10-10, Mac + Windows arşivi. 304 oturum, 690 alt ajan, API liste fiyatı karşılığı ~5.314 $ (Max'te faturalanmaz, limitten düşer). Ajanlar %70 (3.715 $), ana oturumlar %30.

## Bulgular
- Alt ajan tokenlerinin neredeyse tamamı önbellek okuma (10,8 milyar), çıktı 12 milyon. Her çağrı birikmiş bağlamı yeniden okur; uzun ajan katlanarak pahalanır.
- Zirve bağlamı 400k+ olan 80 ajan maliyetin %55'i; 200k altı 377 ajan %11. Çağrı başı maliyet 400k+'da 0,136 $, 200k altında 0,043 $ (~3 kat).
- 150+ çağrı yapan 66 ajan maliyetin %46'sı; 20'den az çağrılı 180 ajan %3 (ajan başı ~0,6 $). Soğuk başlangıç ucuz, uzun kuyruk pahalı.
- Tür: kod yazan ajanlar %78 (ort. 8 $), inceleme %12 (ort. 2,1 $), skeptik/doğrulama %2 (ort. 1,1 $). İnceleme kapısı pahalı değil.
- Model: Sonnet ajan ort. 1,4 $, Opus 6,8 $, Fable 12,7 $ (37 Fable alt ajanı 469 $; 1–6 Ekim, deneme).
- Worktree ajanı ort. 10,5 $ / 118 çağrı, worktree'siz 4,3 $.
- En pahalı örnek: 2026-10-04 "farklı temalar eklenmesi" (web-fps-game), 6 paralel tema ajanı 43–58 $, bağlam 740–940k; hepsi kodu sıfırdan okudu.

## Son 7 gün vs öncesi (sınır 2026-10-04)
| | ≤3 Eki | son 7 gün |
|---|---|---|
| ajan | 299 | 391 |
| ajan başı ort. | 6,3 $ | 4,7 $ |
| 400k+ maliyet payı | %60 | %50 |
| worktree ajanı | 105 | 17 |
| inceleme+skeptik | 87 (130 $) | 150 (299 $) |

Yusuf sistemi ~3–5 gündür düzenli kullanıyor; son 7 gün karma. Bir hafta sonra aynı karşılaştırma yeniden yapılmalı.

## Efor (yalnız ana oturumlarda kayıtlı)
Son 7 günde oturum başı (ajanlar dahil): medium 4,9 $, high 31,6 $, xhigh 26,2 $, max 228 $ (3 oturum 685 $). İş büyüklüğüyle karışık bir ölçüm; efor maliyeti çoğunlukla daha çok okuma/kontrol ile bağlamı büyüterek artırıyor (yorum).

## Sonuç
Kurallar: [[2026-10-10-ajan-boyutu-ve-yalin-baglam]]. Araç: [[araclar-ve-raporlar]]. Önceki kesit: [[2026-10-05-windows-donemi-token-ozeti]].
