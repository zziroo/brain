---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, capacitor, ios, magaza, cors]
source: oturum 2026-10-13 üçüncü (mobil-playus: şeker kalıntıları, Capacitor iOS)
---

# Karar: Paket kimliği `net.ziroo.tussle`; iOS kabuğu gömülü web + sunucuda yalnız listeli origin'lere CORS

## Bağlam
[[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]] yolu seçilmişti; kodda hiçbir şey yoktu. Yusuf paket kimliğinin ne olduğunu sordu, `net.ziroo.tussle`'ı onayladı.

## Karar
- App id / bundle id **`net.ziroo.tussle`**, ad Tussle. Mağazaya yüklendikten sonra değişmez.
- iOS projesi `ios/` repoda, CocoaPods yok (SPM). Portre kilitli, ikon `icon.svg`'den 1024 PNG, açılış ekranı düz krem `#fff1e0`.
- İstemci dikişi `src/client/platform.ts`: `__API_BASE__` boşsa web birebir eski davranış; uygulamada `https://tussle.ziroo.net`. Paylaşım linki uygulamada her zaman web origin'i. Native'de service worker yok; Taptic haptik ve durum çubuğu teması `src/client/native.ts`.
- Sunucu: `capacitor://localhost` ve `https://localhost` yalnız `ALLOWED_ORIGINS`'te birebir yazılıysa kabul (localhost kuralı http dışı şemaya uygulanmaz); CORS başlığı ve OPTIONS ön kontrolü yalnız listeli origin'lere, credentials yok (Bearer token). `*` artık CORS açmaz. `deploy/compose.yml` listesi genişletildi; yayın `7c97dd6`.
- Uygulamada Google/Apple giriş düğmeleri gizli (web SDK'ları WKWebView'da çalışmaz); native giriş sonraya.
- `npm run build:app` = canlı sunucuya göre paket + `cap sync ios`; simülatör için `tussle-api-app` (8088) ve `TUSSLE_API_BASE=http://localhost:8088`. Rehber `docs/CAPACITOR.md`.

## Neden
- Kimlik ters alan adı biçimidir; ziroo.net Yusuf'un. Kullanıcı görmez, yalnız Play linkinde ve konsollarda.
- Gömülü paket farklı origin'den istek attığı için CORS şart oldu; listeyle sınırlamak yabancı sitelere API açmaz. Token çerez olmadığı için credentials gerekmez.
- Apple 4.8: Google girişi sunuluyorsa Apple girişi de şart; ikisini de gizlemek TestFlight'a kadar en temiz yol.

## Reddedilen alternatifler
- `com.tussle.app` benzeri kimlik: alan adı Yusuf'un değil.
- `*` ile CORS: her siteye API açar.
- CocoaPods: kurulu değil, SPM yeterli.
