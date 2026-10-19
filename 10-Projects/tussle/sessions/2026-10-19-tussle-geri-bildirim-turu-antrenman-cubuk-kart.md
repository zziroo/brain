---
type: session
project: tussle
date: 2026-10-19
status: active
tags: [tussle, geri-bildirim, antrenman, oda-ustu, oda-karti, iap, derin-baglanti, bardak, serit, ses, yayin]
source: oturum "tussle: geri bildirim turu" (2026-10-19 gece 00:30-04:00, mobil-playus), commit'ler `dd51c0d` `c51692f` `e3c0d9b` `7caca25` `789a0d9` `2e3b249` `98c61ab`; yayın `82db816` (OTA 0.20261019.9, ~03:00) ve `98c61ab` (OTA 0.20261019.51)
---

# Oturum: geri bildirim turu — Bardak v6, Şerit v4, gizli Antrenman, iki satırlı oda üstü, ana sayfa oda kartı, derin bağlantılar

## Yayın
- Ara yayın ~03:00: `82db816` + OTA 0.20261019.9 (Antrenman o sırada yayına girmemeliydi, ders [[2026-10-19-yayin-ayri-worktree-dalindan-kismi-geri-alma]]).
- Son yayın: sunucu `98c61ab` + OTA 0.20261019.51, DB sürümü 21.

## Yapılanlar
- **Bardak v6** (arkadaş geri bildirimi #5, ilk 1-2 dk çok kolay): turluk tablo, kolay giriş 10-15 sn, eski v5 tepe hızı ~25 sn'de, 200 ms taban, tavan 90 sn. Karar [[2026-10-19-serit-ve-bardak-90-sn-tavan]].
- **Şerit v4** (80 sn üstü fazla uzun): tavan 90 sn, sert sınır ~70 sn'de. Aynı karar notu.
- **Ses motoru sağlamlaştırma:** `Failed to start the audio device` kayıtları `624c6e0` öncesi paketlerden geliyordu; ayrıca yarım kurulan bağlam kapatılıyor (iOS'ta her dokunuşta AudioContext sızıntısı yok), sessiz tampon kilidi en iyi çabayla.
- **Mağaza derlemeleri git sürümünü gösterir:** `vite build` `TUSSLE_REV` yoksa git'ten okur (`-dirty` ekler), dev sunucusu `dev` kalır.
- **Apple IAP doğrulaması sunucuda açık:** sertifikalar `/opt/tussle/data/iap/apple-certs`, `APPLE_IAP_ENVIRONMENT=Production`, `APPLE_APP_APPLE_ID=6822443511`; açılış satırı `iap play+apple`. iPhone'da hediye düğmesi artık görünebilir (cihazda teyit bekliyor). Sır değerleri sunucu `.env` içinde.
- **Gizli Antrenman:** Ayarlar'da sürüm satırına 5 dokunuş cihaz başına açar/kapatır; ana sayfa sonunda satır + `#/antrenman` tüm oyunlar. Bitmiş koşular `POST /api/practice/runs`'a gider, sunucuda tekrar oynatılıp `practice_runs`'ta ayrı tutulur (migration 21). Karar [[2026-10-19-antrenman-gizli-testci-modu-ve-ayri-veri]].
- **Açılış tutma:** ilk ekranın verisi gelene kadar yükleyici tutulur (4 sn tavan), oturumlu soğuk açılışta yükleyici → oda kur kartı → odalar titremesi yok; ana sayfaya dönüşte son `GET me` bellekten çizilir (`cachedMe`).
- **Büyük sistem yazısı:** Android `setTextZoom(100)` + web `--tzi` ölçeği. Ders [[2026-10-19-android-textzoom-sistem-yazi-boyutu]].
- **Derin bağlantılar:** Android App Links + iOS Universal Links, `assetlinks.json` ve AASA canlı, kapı sayfasında Android'de "Uygulamada aç". Mağaza derlemesi ister (aşağıda).
- **Oda üstü iki satır:** sarı sezon hapı + beyaz bugün satırı. Karar [[2026-10-19-oda-ustu-iki-satir-sezon-ve-bugun]].
- **Web'de hediye düğmesi:** "Hak paketi uygulamada" sayfası. Karar [[2026-10-19-web-hediye-dugmesi-uygulamaya-yonlendirir]].
- **Ana sayfa oda kartı v3:** kapak + avatarlar + büyük SEZON etiketi, tek eylem. Karar [[2026-10-19-ana-sayfa-oda-karti-v3]].
- **Geri bildirim:** #3 #4 #5 işaretlendi (ack).

## İnceleme
Kritik/yüksek bulgu yok. Orta bulgular düzeltildi: `practice_runs` yinelenen kayıt indeksi + küresel bayt bütçesi; mağazasız native derlemede web hediye sayfası (artık yalnız düz web ziyaretçisine). Üç düşük bulgu düzeltildi, üye listesinden ayrılınca ana sayfa önbelleğinde oda kalması da.

## Doğrulanmayanlar
Cihazda his: iki satırlı başlık, oda kartı, karttan otomatik oyuna geçiş, arkadaşın telefonunda büyük yazı, iPhone'da hediye düğmesi. Derin bağlantılar mağaza derlemesi olmadan çalışmaz.

## Sıradaki
[[10-Projects/tussle/_overview|Overview]] "Sıradaki işler" 0 ve 0a maddeleri (mağaza derlemeleri, cihaz teyitleri).
