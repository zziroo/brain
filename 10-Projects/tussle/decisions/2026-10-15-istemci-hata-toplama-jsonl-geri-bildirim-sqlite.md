---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, izleme, geri-bildirim, hata, sunucu, istemci]
source: Claude Code oturumu 2026-10-15 "tussle: hata toplama + geri bildirim"
---

# Karar: İstemci hataları jsonl dosyasına, geri bildirim SQLite tablosuna; okuma CLI ile

## Bağlam
Canlı öncesi izleme eksikti: istemcide yakalanmayan hatalar hiçbir yere gitmiyordu, arkadaşlar geri bildirimi sohbetten ya da WhatsApp'tan iletiyordu. Diskort'ta aynı ihtiyaç jsonl + admin panel + gece gözcüsüyle çözülmüştü; gözcüye Tussle bölümü eklemek için önce bu kanalların olması gerekiyordu ([[2026-10-15-gozcu-birlesik-dort-bolum|gözcü kararı]]).

## Karar
- `POST /api/client-error`: kimlik gerekmez (bearer varsa userId eklenir), IP başına 30 / 10 dk, gövde ≤ 8 KB (413). Satır `DATA_DIR/logs/client-errors.jsonl`'a yazılır (`ts` sunucu zamanı, IP yazılmaz); 20 MB'ta `client-errors.1.jsonl`'a döner (tek nesil). Dosya hiçbir yedeğe girmez (`docs/BACKUP.md`).
- `POST /api/feedback`: bearer zorunlu, kullanıcı başına 5 / saat, IP 20 / saat, metin 1–1000 karakter. SQLite `feedback` tablosu (migration 16, `acked_at`); hesap birleşince satırlar taşınır, silinince silinir. Yanıt 201 `{id}`.
- İstemci `src/client/report.ts`: `window.error` + `unhandledrejection`; aynı imza (mesaj + stack ilk 200 karakter) oturumda bir kez, oturum başına en çok 5 gönderim; `url` yalnız yol + hash, oda kodu `/oda/*` diye maskeli; oturum yoksa `sendBeacon` (text/plain, preflight çıkmaz), oturum varsa bearer'lı `fetch keepalive`. `rev` vite `__APP_REV__`, `ota` çalışan paketin içine gömülü `__BUNDLE_VERSION__` (yalnız uygulama kabuğunda).
- Arayüz: Ayarlar'da tek alanlı "Geri bildirim" kartı (yalnız girişli kullanıcıya; `screen: settings`), gönderince "Teşekkürler, aldık!" toast'u, 429'da "Biraz sonra tekrar dene".
- Okuma: `scripts/feedback-cli.mjs` (`list [--all]`, `ack <id>|--all`, `errors [--tail N]`), konteynerde `docker exec tussle node scripts/feedback-cli.mjs …` (Dockerfile yalnız bu dosyayı kopyalar). Basılan her alan C0/C1 kontrol karakterleri ve Unicode yön/sıfır genişlik işaretlerinden süzülür; sunucu da `cut` içinde C0/C1'i boşluğa çevirir ([[2026-10-15-kimliksiz-girdiden-terminale-giden-metni-suz|ders]]).

## Neden
- Hata kayıtları yüksek hacimli ve değersiz-çoğunluklu: dosya + tail yeter, DB'yi şişirmez, yedeğe girmez.
- Geri bildirim az ve kıymetli: DB'de dursun ki gece yedeğine girsin, `acked_at` ile takip edilsin, hesap birleşmesinde taşınsın.
- Kimliksiz hata ucu: hatalar girişten önce de olur; kimliksiz uçta koruma IP sınırı + boyut + tek nesil dosya (en çok ~40 MB disk).
- Beacon: sayfa kapanırken de gider; bearer taşıyamadığı için kimlikli durumda fetch keepalive.
- CLI önce, panel sonra: gece gözcüsü SSH ile okuyacak; tarayıcı paneli ayrı karar ([[2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme]]).

## Reddedilen alternatifler
- Hataları da DB'ye yazmak: gürültü yedeğe ve VACUUM'a girer, `tail`/`grep` ile okunamaz.
- Geri bildirimi jsonl'a yazmak: ack durumu ve kullanıcı adı JOIN'i için tablo gerekir; yedek dışı kalırdı.
- Geri bildirimi kimliksiz kabul etmek: spam ve kimin yazdığının bilinmemesi; misafir kimliği zaten herkeste var.
- `net.ts`'i `report.ts`'ten içe aktarmak: `net.ts` yüklenirken `document`'e dokunuyor, döngüsel import ve test sorunu; token `setReportAuth` ile veriliyor.
- Content-Type zorunluluğu: beacon `text/plain` gönderir; `readJson` zaten tipe bakmadan parse eder, uç için zararsız.

## Sonuçlar / riskler
- Yayın `10dbe59` (2026-10-15 gece), OTA 0.20261015.2032, yedek `pre-10dbe59.db`, DB sürümü 16, 1.730 test. Canlıda uçlar ve konteynerde CLI doğrulandı; Yusuf Android'den ilk gerçek geri bildirimi gönderdi (`android 10dbe59 0.20261015.2032` damgalı), yani OTA ikinci kez kendi başına güncelledi.
- Geçersiz (400) istek de kotadan düşer; istemci boş metni engellediği için önemsiz.
- Geri bildirim kartı giriş durumunu ekran kurulurken okur; aynı ekranda çıkış yapılırsa gönderim 401 verir, bozulma yok (doğrulanmadı).
- `reportError` yalnız iki yerde (ekran kapatma, OTA); ws catch'i döngüsel import yüzünden eklenmedi.
- Uygulama kabuğunda sayfa kapanırken bearer'lı keepalive fetch'in gerçekten iletildiği doğrulanmadı.

## İlgili
- [[_overview]] · [[2026-10-15-tussle-hata-toplama-geri-bildirim]] · [[2026-10-15-ota-web-paketi-self-hosted-capgo]]
