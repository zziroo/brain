---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, admin-panel, izleme, guvenlik, sunucu]
source: Claude Code oturumu 2026-10-16 "tussle: admin paneli" (yayın 7d01386)
---

# Karar: Tussle admin paneli sunucudan servis edilen tek sayfa, `ADMIN_TOKEN` bearer ile korunur, anahtar yoksa hiç yokmuş gibi 404 döner

## Bağlam
[[2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme]] kararının uygulama katmanı: geri bildirim ve istemci hatalarını `ssh` + CLI yerine telefondan görmek. Oyuncu oturum sistemi (misafir/Google/Apple) sahip ayrımı bilmiyor; ayrı bir yönetici kimliği gerekiyordu.

## Karar
- **Yol:** `GET /admin` (tek dosya, satır içi CSS + JS, `src/server/admin-page.ts`, sunucuda `serveStatic`'ten önce dal) + `GET /api/admin/health|usage|feedback|errors`, `POST /api/admin/feedback/:id/ack` (`src/server/admin.ts`, `api.ts`).
- **Kimlik:** `/opt/tussle/.env` içindeki `ADMIN_TOKEN` (≥16 karakter, bearer karakter kümesi), `timingSafeEqual` ile karşılaştırma; sayfa anahtarı `localStorage`'da tutar. Oyuncu oturum tokenı asla yönetici sayılmaz.
- **Kapalıysa görünmez:** anahtar tanımsız ya da biçimsizse `/admin` ve `/api/admin/*` aynı 404'ü döner (SPA kabuğu da dönmez).
- **Hatalı deneme sınırı:** IP başına 15 dakikada 10 (`adminAuth`); sınır aşılınca 429 ama doğru anahtar yine geçer (sahip kilitlenmez; sınır yalnız gürültü). Yerel/loopback muaf.
- **İçerik:** Özet (rev, OTA paketi, istemci sürüm dağılımı, çalışma süresi, ws bağlı, izleme koşusu, DB/disk/yedek/RSS, açık geri bildirim), Geri bildirim (açık/hepsi, Tamam = ack), Hatalar (24 sa / 7 gün, mesaj + platform ile gruplu; sayılar `#` ile normalize), Kullanım (bugün/7 gün/canlı, 14 gün SVG grafik, oyun başına 7 gün).
- **Hata dosyası:** `client-errors.jsonl` (+`.1`) inode + ofset ile artımlı okunur; 8 günden eski satırlar atılır; rotasyon/kısalma tam okuma tetikler.
- **İstemci sürümleri:** `POST /api/app/update` isteklerinden süreç ömrü boyunca sayaç (≤50 anahtar, en az görülen düşer); yalnız `x.y.z` biçimli ya da `builtin` adlar sayılır (kimliksiz uç noktayı zehirleme engeli).
- **Rev:** `TUSSLE_REV` artık Dockerfile son aşamasında da ENV; sunucu çalışma zamanında bilir.
- **SW:** `sw.js` `/admin` yolunu hiç ele almaz (v4); yoksa gezinti önbelleği `/admin` HTML'ini `/` kabuğu olarak saklardı.
- **Başlıklar:** sayfada sıkı CSP (`default-src 'none'`, satır içi script/style, `connect-src 'self'`), `X-Frame-Options: DENY`, `no-store`, `noindex`. Yeni migration yok; `attempts.created_at` dizinsiz tarama (düşük trafikte yeterli).

## Neden
- Oyuncu veri modeline "admin" rolü eklemek, oturum/kimlik kodunu büyütürdü; tek sır en küçük yüzey.
- Vite'a ikinci giriş eklemek yerine sunucudan satır içi HTML: derleme değişmez, sayfa istemci paketine bağımlı değil, CSP tam kapalı.
- Kapalıyken 404: anahtar koyulmamış ortamlarda (yerel dev, test) panelin varlığı bile sızmaz.
- Sınırda doğru anahtarın geçmesi: 10 yanlış deneme ile sahibi 15 dk kilitlemek, tahmin edilemez anahtara karşı kazandırmaz.

## Reddedilen alternatifler
- Oturum tablosuna sahip/rol bayrağı: fazla kod, Google/Apple bağlama şart olurdu.
- Sınır aşınca doğru anahtarı da reddetmek (gerçek kaba kuvvet freni): sahip kilidi riski; ≥16 karakter/64 sembol tahmin edilemez, yalnız yorumla belgelendi.
- Diskort'taki gibi makine bölümü: [[2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme]] gereği ops katmanı ayrı.
- `(mtime, size)` ile tüm dosyayı yeniden ayrıştırma önbelleği: her yeni hatada 20 MB'ı yeniden okurdu.

## Sonuçlar / riskler
- Yeni sır `/opt/tussle/.env` (mode 600); compose `env_file` zaten okuyor. Anahtarı okumak: sunucuda dosyaya bak; sohbete yazılmaz.
- Sayfa `localStorage`'da anahtar tutar: paylaşılan cihazda "Çıkış" ile silinir.
- Yerel geliştirme: `.claude/launch.json` `tussle-admin` yapılandırması (8089, yalnız yerel örnek anahtar).
- Küçük açıklar: 403 dışı bir 403/404 (ör. `bad_origin`) anahtarı silmez artık, yalnız `admin.forbidden`/`no_endpoint` siler. İsteğe bağlı testler: anahtarsız ack, `%61dmin` yol varyantı, `dataDir: null`.

## İlgili
- [[_overview]] · [[2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme]] · [[2026-10-15-istemci-hata-toplama-jsonl-geri-bildirim-sqlite]] · [[2026-10-16-tussle-admin-paneli]]
