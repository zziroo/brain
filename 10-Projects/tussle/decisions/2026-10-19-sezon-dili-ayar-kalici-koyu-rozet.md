---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, oda, ust-bar, sezon, ana-sayfa, tasarim]
source: oturum "tussle: sezon dili" (2026-10-19 sabah), commit `d2c6134` (yayında: sunucu + OTA 0.20261019.723, 19 Eki); mockup `src/client/mockups/sezon-dili.*`
---

# Karar: sezon dili — ayar tuşu kalıcı, koyu "#2" rozeti, ana sayfada "SEZON #2"

## Bağlam
Yusuf gerçek cihaz ekran görüntüsünden: katlanmış oda üstünde ayar tuşu kayboluyor, üst satır sağa yaslı kalıp alttaki bugün satırıyla ortalı durmuyordu. Sarı hap içindeki gümüş geçişli "#2" uymadı. Ana sayfa çıkartması "SEZON 2." yazıyordu; sezon için aynı dil istendi. Geçişli parlak dolgu "temaya uygunsa kalsın" dedi.

## Karar
- Ayar tuşu sabit: satır 1 = geri | sezon hapı | ayar (iki yanda 8 px, hap ortada, bugün satırı geri.sol–ayar.sağ arası).
- "#2" rozeti her sırada aynı: mürekkep (--ink) zemin, beyaz rakam. "SEZON" etiketiyle aynı renk, tek parça okunur; liderin krem çipinden ayrışır.
- Ana sayfa çıkartması "SEZON #2" (`home.seasonNum`); bugünkü "✓ 2." noktalı kalır (farklı anlam). Madalyalar düz (geçiş yok): temada kartlar düz, geçiş yalnız burada vardı.
- ~394 px altı telefonda gün "· 1/14" kısa biçime iner (gear yer aldı).

## Reddedilenler
- Geri tuşunu da kaldırmak: Android geri tuşu var ama iOS/web'de tek çıkış yolu; simetri ayarı tutarak da sağlanıyor.
- Beyaz rozet: lider çipiyle aynı tür öğe gibi durup yarışıyordu.
- Düz madalya rozet: altın sarının üstünde kayboluyor, ince kontur gerekiyordu.

Oturum: önceki [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]]. İlgili: [[2026-10-19-oda-ustu-iki-satir-sezon-ve-bugun]], [[2026-10-19-ana-sayfa-oda-karti-v3]].
