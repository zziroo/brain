---
type: session
project: tussle
date: 2026-10-20
status: done
tags: [tussle, geri-bildirim, denge, oyunlar]
source: Claude Code oturumu "tussle: geri bildirim turu", 20 Eki akşam; commit 68eaba3, OTA 0.20261020.1939
---

# 2026-10-20: geri bildirim turu (#6–#20) ve antrenman koşusu analizi

Yusuf'un iki hesabından gelen 15 açık geri bildirim + yan hesaptan 79 antrenman koşusu (her oyunda 1–3) tek turda ele alındı. Başkalarının 4 kaydı (YOSEF, Yasin) zaten işlenmişti.

## Yöntem
- Antrenman koşuları `practice_runs` tablosundan log'larıyla çekildi, 79/80 replay ile birebir doğrulandı (tick 60 Hz). Yorumlar ("0 puan aldım", "süreden patlıyorum") replay'de tur tur okundu; his doğru mu, hata mı denge mi ayrıldı.
- 6 paralel Opus ajanı dosya bazında ayrık alanlarda (tr/en i18n'i Edit ile küçük eşleşmelerle paylaştılar, çakışma olmadı); ardından tüm view'lara dokunan ortak bitiş satırı tek ajanla. İki inceleme (sim+sunucu / view+i18n) temiz; görsel kontrol canvas-shot ile iki çakışma buldu, düzeltildi.

## Yayınlananlar (ayrıntı: karar notları)
- Tek ölçü: flutter "geçit", spike-wall boncuksuz, crack-it fitili anahtarın üstünde ([[2026-10-20-oyunda-tek-olcu-ikinci-birim-yok]]).
- Adalet: double-tap kaçan şeker çubukta kırmızı "−1 sn" (shell `timeLoss`/`flashLoss`), on-time kum görünürken dokunuş yok sayılır (v5), hoop 0,45 sn yeniden yükleme + en çok 2 canlı top (v4).
- Eğriler: color-recall v4 (en kötü kanal yarı + çarpım yarı; L/S sürgünün %40'ında sıfır), flip-match v4 (ceza yalnız görülmüş kartla ıskada; pencere adımı 60/120) ([[2026-10-20-ceza-yalniz-bilinebilir-hatada]]).
- stop-wheel v3 taban 30 sn (ortanca 42–46); zigzag nokta ilk 5 viraj + OKLab halka camgöbeksiz; spiral kesit yüzleri yöne göre; bounce yan duvar + kamera kırpma; split tur noktaları derece rengi + işaret.
- swing v5 ([[2026-10-20-swing-gercek-sarkac-tek-dokunus-otomatik-tutunma]]); bridge v3 tam isabet sonraki platformu ×1,3 genişletir.
- Oyun içi bitiş satırı 19 oyunda ortak (shell `endLine`, h×0.34, düz tema metni, ünlemsiz neden) ([[2026-10-20-oyun-ici-bitis-satiri-duz-neden]]).
- Arayüz: yarış şeridi ve izleme çipinde profil fotoğrafı; "herkes bitirince oda sahibi başlatabilir · n/m" satırı sahip olmayanlara da.

## Antrenman verisinden çıkanlar (tek kişi, kesin değil)
- typicalSec yanlış: knife-toss 12 sn (hedef 60), make-10 17–22 (60), odd-one-out 23 (50), arrow-wall %32–59; tersine flutter, lane-dash, sort-it, bounce, snake, beat, balance çok uzun (master alınıyor; YOSEF'in "kolay" dediği oyunlarla örtüşüyor).
- Hiç rozet alınmayan oyunlar: arrow-wall, spiral, swing, crack-it, on-time, split, make-10, odd-one-out.
- lights 90 sn duvarına takılıyor (hız sınırlıyor, bellek değil). four-arrows'ta ilk hamle hatası 0,18 sn'de bitiriyor (koruma yok).
- Bunlar "denge turu" olarak ayrı: [[2026-10-19-denge-insan-kosulariyla-surum-bazli-olculur]].

## Açık kalanlar
- Telefon teyidi: swing hissi (ölçek değişti, eski rekorlarla karşılaştırılamaz), crack-it HUD'daki kısalan anahtar, bitiş satırı konumları (quick-math kart içi, snake baş bandında alta kayar, knife-toss çark altı), on-time "Henüz değil", hoop yeniden yükleme.
- Bitiş satırına geçmeyen 4 oyun: four-arrows, lights, stop-wheel, color-match (metin kendi arayüzüne gömülü).
- Deploy anında açık olan swing/stop-wheel günü eski parametreyle (gravity 6, 50 sn) oynanır; test aşamasında kabul edildi ([[geri-uyum-gerekmez]] ilkesi).
- `games.crack-it.pool` anahtarı kodda kullanılmıyor görünüyor; `boncuk` birimi listede ama kullanılmıyor.

## Dersler
- Replay, geri bildirimi sınıflandırmanın en ucuz yolu: "0 puan" bir hata değil eğri sertliğiydi; "süreden patlıyorum" bilinçli tasarımdı ama nedeni görünmüyordu. Önce veriyi oynat, sonra kural değiştir.
- Swing GC testi 4M adıma çıkınca tam koşuda 20 sn'yi aştı; adım maliyeti değişmemişti (30 ns). Test sabitlerini büyütme.
