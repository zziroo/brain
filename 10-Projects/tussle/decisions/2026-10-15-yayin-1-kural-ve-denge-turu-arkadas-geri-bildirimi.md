---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, denge, kural, sim, geri-bildirim, orkestrasyon]
source: "oturum 2026-10-15 (mobil-playus: arkadaş geri bildirimi planı; 16 ajan + inceleme + skeptik), commit 4137f21"
---

# Arkadaş geri bildirimi Yayın 1: 13 oyunda kural/denge, Lane Dash ve Chain yeniden, Brick Break silindi

## Karar
Yusuf'un arkadaşının 22 maddelik geri bildirimi üç yayına bölündü: **1** kural/denge (bu not), **2** görünüm ([[2026-10-15-yayin-2-gorunum-turu-kapak-paleti-sahneye]]), **3** kaybedince izleme (sonra). Yayın 1 commit `4137f21`; kural değişen oyunların sim sürümü arttı, eski denemeler yeniden puanlanmadı (kural: [[2026-10-09-puanlama-sabit-gunun-kurallari-donar]]).

| Oyun | Değişiklik |
|---|---|
| Brick Break (`tugla`) | silindi (410 `game_gone` otomatik; `tugla` skor birimi de kalktı), 47 oyun kayıtlı |
| Split (`jole`) v3 | 10 sabit tur, elenme yok, skor = tur toplamı; tur puanı 1000 − 10 / %0,1 sapma (40/60'ta 0) |
| Color Recall (`renkhafiza`) v3 | 5 tur, elenme yok, toplam; yeni HSL eşleşme eğrisi (`color.ts`: 0–5° 100→90, 5–15° 90→40, 15–25° 40→0) |
| On Time (`tamzaman`) v4 | kum hedefin %65 (1. tur) → %50 (7. tur) boyunca görünür; `peekMs` → `peekPct` |
| Target (`hedef`) v3 | tek hata elemesi kalktı; `BonusClock` taban 45 sn, isabet +1 / merkez +2 sn, kaçırma −3 sn (kırmızı "−3 sn" balonu), isabette anında yeni hedef (≤5 aynı anda), tavan 90 sn; skor puan (halka × seri) kaldı |
| Hoop (`basket`) v2 | basket +1,5 sn (`BonusClock` 60 → 90) |
| Swing (`yorunge`) v3 | ilk çivi 12 sn dayanır, ilk salınım yavaş (yerçekimi ×0,5→0,85 çivi 0–3), ilk çiviler yakın ve geniş pencereli, "Dokun: bırak" ipucu; 5 sn bekleyen ölmez |
| Lane Dash (`serit`) v2 | yeniden tasarım: sürükleyerek şerit (parmak x'ini izler, bırakınca en yakın şerite oturur; tek harekette çift atlama imkânsız; ikinci parmak korumalı `held` sayacı), sahte 3D yol (kaçış noktası, akan şerit çizgileri, ağaçlar, büyüyen bloklar) |
| Chain (`zincir`) v4 | şekerler süzülür, duvarlara ve birbirine çarpar (eşit kütle, önceden ayrılmış typed array, O(n²) ≤ 22); dokunulan donar; dokunma payı 0,025 → 0,035 |
| Spiral v2 | sıçrama 0,6 → 0,47 sn, dönüşler 2..10 dilim, ekşi dilimler 3. halkadan; kırmızı dilimlere dikenli koni (view) |
| Cups (`bardak`) v4 | 3/4/5 bardak 1./3./5. turda, takas hızı ve sayısı dik |
| Flutter (`kanat`) v3 | rampa 35 → 25 sn, dar boşluk 22. sütunda, geç evre (`speedLate`, `gapLate`); ortalama bot 36 → 31 |
| Sort It (`kargo`) v2 | iki bacaklı rampa: 10 sn'de yolun %35'i |
| Jetpack v2 | başlangıç hızı 0,45 → 0,62, ilk engel 2,6 sn |
| Parti hak seçimi | slot başına ×1 ×2 ×3 hapları + "Hepsi ×N"; dokununca döndürme ve ipucu kalktı; **"Temizle" kaldırıldı** (812 px'te taşıyordu; "Hepsi rastgele" + "Hepsi ×1" aynı işi görür; Yusuf "böyle kalsın") |
| Antrenman | listenin sağında sürüklenebilir kaydırma tutamacı (yalnız `pointer: coarse`) |

## Neden
- Arkadaşın maddeleri doğrudan oynanışla ilgiliydi ("çok kolay", "beklemeli", "tur sonunda topla", "süre olsun"); bunlar sim değişikliği ister, görünüm işleriyle karıştırılmadı.
- Elenmesiz tur oyunlarında (Split, Color Recall) puanlar sıkıştı (ortadan kesen bile 6.600 / 10.000, keskin–rastgele 404–473 / 500): eğri sertleştirildi; beceri farkı artık puanda görünüyor (Split ortadan 3.700, ortalama 7.250; Color Recall rastgele 17, ortalama 299, keskin 451).
- Target'ta "süre olsun" isteği projenin **A süre** kalıbına ([[2026-10-13-sure-modeli-taban-50-60-bonus-sert-tavan]]) birebir oturdu; puan korundu çünkü merkeze isabet ve seri oyunun becerisi, isabet sayısı sonuç kartında ikinci satır (Yusuf: "sen karar ver").
- Lane Dash'te dokunma yerine sürükleme: çift dokunma hatasını kökünden keser; yol hissi yalnız görünüm.
- Chain hareketi sim'e girdi (view'da sahte hareket hile/tekrar zincirini bozardı); dmath dışı yalnız `Math.sqrt` (IEEE deterministik, sim-purity yeşil).

## Reddedilen alternatifler
- Lane Dash'i havuzdan çıkarmak: Yusuf "yeniden tasarla" dedi.
- Target skorunu isabet sayısına çevirmek: hassasiyet boyutu kaybolur; telefonda "puan anlaşılmıyor" denirse tek satırlık değişiklik.
- Color Recall'da rastgeleyi ~50'ye çeken uzun kuyruk (90°'ye kadar): gündelik oyuncuyu da yükseltirdi, bırakıldı (rastgele 17).
- Cups'ta daha dik varyant (DUR_STEP 4, taban 9. turda): normal botun medyanı 4'e düştü, çok sert.
- Flutter'da ilk 8 sn'yi de sertleştirmek: okunabilir açılış kuralı, dokunulmadı.
- Temizle'yi ayrı satıra almak: kapak ızgarası yüksekliğini bozar.

## Süreç notu
15 oyun ajanı paralel (çalışma kopyasında yerinde, i18n ortak dosyalarında Edit yeniden okuyarak çakışmadan geçti), inceleme ajanı (orta: Lane Dash ikinci parmak; düşük: Target slot sayacı, Color Recall tavanı 70 sn, parti yorumu), skeptik (orta doğrulandı, Target düşüğe indi), sonnet düzeltme ajanı. 1.667 test, typecheck, build yeşil. Telefonda hiçbir şey görülmedi. Ders: [[2026-10-15-oyun-adi-kimlik-eslemesini-brieften-once-dogrula]].
