---
type: session
project: tussle
date: 2026-10-23
status: done
tags: [tussle, oyun-ici, hud, denge, sunucu, hak]
source: Claude Code oturumu "tussle: oyun içi düzenleme turu (telefon notları)" (2026-10-23 akşam); önceki [[2026-10-23-tussle-ses-secimi-ad-ad-kademe-ve-zorluk-etiketleri]]
---

# Oturum: Yusuf'un telefon notlarından oyun içi düzenleme turu (21 madde, tek commit)

Yusuf oyunları telefonda tek tek oynayıp notları ara ara gönderdi; "bitti" deyince hepsi gruplandı, 7 paralel ajan + 2 inceleme ile tek commit'e (`9934b0a`) toplandı. Typecheck temiz, 2700 test geçti. Yusuf'un onayıyla yayınlandı: sunucu 9934b0a, OTA 0.20261023.1607 (yedek pre-9934b0a.db), DB göç 30.

## Yapılan
- **Ortak HUD** (`src/games/shell/hud.ts` yeniden): skor üst ortada, sayı büyük kalın, birim küçük soluk; tek tur göstergesi `hud.setRound(n,total)` sağ üstte hap (brake artık 1/7 gösteriyor; split, fill-up, reflex, on-time, color-recall kendi tur noktalarını/yazılarını bıraktı). Karar [[2026-10-23-ortak-hud-skor-ortada-tur-hapi-ipucu-ve-altin-yok]].
- **Oyun içi ipucu öğeleri kalktı** (chop ilk vuruşa kadar, zigzag, odd-one-out, on-time, hoop kılavuz noktaları); flutter "Dokun!" ilk dokunuşa kadar olduğundan kaldı.
- **Ekranda karşılığı olmayan `level` sesi kalktı**: balance, right-door, bounce, knife-toss. Görünür tur geçişi olanlar kaldı (split, lights, keep-up, crack-it, spiral, color-recall).
- **Altın/para toplama kalktı**: hop (v5, görünen ad **Leap**, Hoop ile karışıyordu), jetpack (v4), lane-dash (v7). RNG çekimleri boşa tüketilerek engel dizileri korundu. sort-it "altın joker" kapsam dışı (toplanan altın değil).
- **Oyun bazlı**: balance v6 (zeminde büyük sarı rüzgâr oku, windStart 3→8, rampSec 40→15, iyi oyuncu 15-25 sn), bridge v4 (perfect bonusu ve genişleme yok, gölge platforma kırpıldı), stack v7 (taban = perfect büyüme tavanı 0.62, ilk blok 0.44), hoop v5 (sabit 30 sn, sepet başına süre eki yok), keep-up v3 (ikinci top 10. vuruşta, her 10'da bir, en çok 4; top sayısına göre yerçekimi gevşer), knife-toss v3 (atış kapısı 18 tick, bıçak 7°, maxKnives 50, tek yön dalgalı hız; hızlı dövme avantajı gitti), flip-match v5 (tek BonusClock 24 sn + tahta başına 8 sn), fill-up v3 (Tam! ek bardak vermez, MAX_GLASSES 12), chain (geri sayımda tahta boş), crack-it (aktif hane konturu, rakam düşerek gelir, tambur dönüşü yok), pinata (yıldız yerine şerit ortasında parlak bant), reflex (isabetteki "^" göz ağız gibi okunuyordu, kalktı), lane-dash duvar olayı tekrarı düzeldi (EDGE_OFF kilidi), görüş 24→17 m.
- **Yanlış başlangıç hakkı** (sunucu): replay'de 4 sn altında kendi biten, `meta.end` 'auto', şüpheli olmayan koşu günde 1 kez hak düşürmez; `tries.false_start` (göç 30), SETTLED/triesUsed/streak/prevBest/profil sorguları süzer, `nextTryIndex` = MAX(k)+1, `today.triesNext`. Sonuç kartında "Yanlış başlangıç, hak gitmedi". Karar [[2026-10-23-yanlis-baslangic-hakki-sunucu-replayden-gunde-bir]].

## Ders
- [[2026-10-23-paralel-ajanlar-tek-vite-sunucusu-hmr-ve-paylasilan-sozluk]]

## Açık / doğrulanmadı
- Telefonda hiçbiri denenmedi; özellikle balance sertliği (casual bot 10 sn), hoop 30 sn'de casual ~4 sayı, keep-up 4 top hissi, stack tabanı hâlâ ilk bloktan geniş (bilinçli: ulaşılabilir tavan).
- Ses yoğunluğu sadeleştirme turu (Yusuf: "normal oyun sesleri de çok") yapılmadı, ayrı tur.
- Balance ve right-door sonuç ekranındaki "Seviye" satırı duruyor.
- hud.ts `scoreMaxW` hapı 0.15w sayıyor, hap 0.3w'ye kadar büyüyebilir; uzun skor + geniş hap çakışabilir (bugün tetiklenmiyor).
