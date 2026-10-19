---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, antrenman, veri, denge, gizlilik]
source: oturum "tussle: geri bildirim turu" (2026-10-19 gece), commit `789a0d9`, DB migration 21
---

# Karar: Antrenman gizli testçi modu olarak döndü, koşular sayılan verilerden ayrı tutulur

## Bağlam
Denge ölçümü için insan koşuları gerekiyor ([[2026-10-19-denge-insan-kosulariyla-surum-bazli-olculur]]) ama günlük/canlı turlar yeterli çeşit vermiyor; Antrenman bir zamanlar vardı ve kaldırılmıştı. Yusuf test amaçlı geri istedi, herkese açık olmasın.

## Karar
- **Gizli mod:** Ayarlar'da sürüm satırına 5 dokunuş cihaz başına açar/kapatır. Açıkken ana sayfa sonunda Antrenman satırı, `#/antrenman` tüm oyunları listeler, her biri serbest koşu.
- Biten koşular en iyi çabayla `POST /api/practice/runs`'a gider; günlük doğrulayıcıyla tekrar oynatılır, **sürüm uyuşmazlığı 409** ile reddedilir. Sunucu skoru ile `practice_runs` tablosunda saklanır, **hiçbir sayılan tabloya (skor, sezon, seri) girmez**.
- Sınırlar: kullanıcı başı 24 saatte 300, küresel 24 saatte 128 MB bayt bütçesi, (user_id, log_hash) ile yineleme kontrolü, 30 gün saklama; hesap silinince silinir, birleştirmede taşınır. Gizlilik sayfası güncellendi. `feedback-cli practice` oyun/sürüm başına istatistik basar.

## Neden
Veri ayrı olunca denge ölçümü kirlenmez ve kimse puan kazanmak için Antrenman'ı kullanamaz; aynı doğrulayıcı olduğu için veri günlük turlarla karşılaştırılabilir. Sınırlar tek kötü niyetli ya da hatalı istemcinin diski doldurmasını önler.

## Reddedilen alternatifler
- Herkese açık Antrenman: ürün kararı değil, yalnız ölçüm ihtiyacı; dikkat dağıtır.
- Koşuları mevcut tablolara işaretli yazmak: yanlışlıkla sayılma riski; ayrı tablo daha güvenli (inceleme de ayrılığı doğruladı).
- Doğrulamasız saklamak: sürüm karışırsa veri güvenilmez.

İnceleme orta bulguları (yineleme indeksi, küresel bayt bütçesi) düzeltildi. Oturum: [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]]. İlgili: [[2026-10-16-telefon-turu-izleme-sesi-rozet-claw-cups-antrenman]].
