---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, magaza, gizlilik, sunucu]
source: Claude Code yan oturumu 2026-10-16 "tussle: mağaza hazırlığı" (mobil-playus)
---

# Karar: gizlilik politikası Node sunucusundan statik HTML olarak `/privacy` (EN) ve `/privacy/tr` (TR) yollarında sunulur

## Bağlam
Play ve App Store kalıcı bir gizlilik politikası URL'si ister. Uygulama bir SPA; `dist/client` içine konan bir dosya SW gezinti önbelleğine takılır ([[2026-10-16-sw-gezinti-onbellegi-yeni-sunucu-sayfalarini-kabuk-sanir]]). `docs/DESIGN.md` eskiden "ziroo.net altında" demişti.

## Karar
- `src/server/privacy-page.ts`: `PRIVACY_HTML_EN`, `PRIVACY_HTML_TR`, `PRIVACY_CONTACT_EMAIL` (taslak `privacy@ziroo.net`, Yusuf teyit edecek). Admin sayfası gibi tek dosya, satır içi CSS, script yok, dış kaynak yok, açık/koyu tema, dizine açık (noindex yok).
- `server.ts`: `/privacy`, `/privacy/`, `/privacy/tr` dalı `/admin` dalından önce; yalnız GET/HEAD, CSP `frame-ancestors 'none'`, `Cache-Control: public, max-age=3600`.
- `sw.js`: `/privacy*` gezintisi SW'ye uğramaz, `VERSION` v5.
- İçerik yalnız koddan doğrulanmış akışları anlatır (misafir anahtarının sha256'sı, takma ad, skor + girdi günlüğü, isteğe bağlı Google/Apple e-postası, hata raporları, geri bildirim, IP yalnız bellekte, reklam/analitik yok, hesap silme uygulamada). Saklama sözü: gece yedeği 14 gün, yayın öncesi anlık kopya en fazla 30 gün, silinen veri 30 gün içinde yedeklerden çıkar.

## Neden
- Mağaza bağlantısı uygulamanın kendi alanında olmalı; ayrı site yönetimi gereksiz.
- Sunucu dalı SW ve SPA yönlendirmesinden bağımsız; admin sayfasıyla aynı kalıp, test edilebilir.
- İki dil ayrı yolda: mağazaya tek URL verilir, sayfa içinden geçiş.

## Reddedilen alternatifler
- `dist/client/privacy.html` statik dosya: SW gezinti önbelleği HTML yanıtını kabuk sanabilir, Vite derlemesine bağımlı.
- ziroo.net altında ayrı sayfa: başka bir dağıtım yolu, Caddy ayarı; uygulamayla aynı yerde durması daha doğru.
- Tek sayfada iki dil alt alta: uzun, mağaza önizlemesinde karışık.

## Sonuçlar / riskler
- Sözün tutması için `deploy/release.sh`'in aldığı `pre-<sha>.db` kopyalarına budama gerekir ([[2026-10-16-gizlilik-metni-brieften-degil-koddan]]).
- Antrenman kalkınca sayfadaki "Antrenman oyunları cihazınızda kalır" cümlesi silinir; native giriş gelince "uygulamada sağlayıcı düğmesi yok" cümlesi güncellenir ([[2026-10-16-native-google-apple-giris-play-imzasindan-sonra]]).
- Geliştirmede Vite `/privacy`'yi vekillemez; sayfa yalnız Node sunucusunda (8087 / canlı) görünür.

## İlgili
- [[2026-10-13-magaza-hesaplari-apple-bireysel-play-ziroo]] · [[2026-10-16-tussle-magaza-hazirligi]]
