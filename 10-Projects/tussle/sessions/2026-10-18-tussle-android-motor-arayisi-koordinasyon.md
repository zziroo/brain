---
type: session
project: tussle
date: 2026-10-18
status: done
tags: [tussle, android, mini-motor, geckoview, capacitor, twa, koordinasyon]
source: oturum 2026-10-18 "tussle: Android TWA yerine Capacitor + oyun tanınması"
---

# Oturum: TWA'dan çıkış arayışı → mini oyun motoru (koordinatör)

## Akış
- Yusuf TWA'dan rahatsız (site gibi, oyun olarak tanınmıyor). Capacitor/WebView yeniden denendi: `appCategory=game`, renderer önceliği, Game Turbo performans → parmak kalkınca yine takıldı ([[2026-10-16-android-webview-parmak-kalkinca-takilma]]).
- GeckoView denemesi: akıcı ama ~80 MB, hızlandırılmış canvas'ta yarım kare, 60 Hz'de ghosting ([[2026-10-18-geckoview-parmak-kalkinca-akici]]). Klasör ve uygulama silindi.
- Ölçümle asıl sebep: Xiaomi paneli 120↔60 ([[2026-10-18-xiaomi-panel-dokununca-120-birakinca-60]]).
- Mini motor keşfi (oyunlar ~40 canvas komutu, sim'ler motor bağımsız) → Slice denemesi, Yusuf: "hiç bu kadar akmamıştı" → karar [[2026-10-18-android-mini-oyun-motoru]].
- Fazlar yan oturumlarda: Faz 1 [[2026-10-18-tussle-mini-motor-faz-1]], Faz 3 [[2026-10-18-tussle-android-capacitor-donusu-faz-3]], Faz 2 [[2026-10-18-tussle-mini-motor-faz-2]]; devir notu [[2026-10-18-mini-motor-faz-devir-notu]]. Telefon iki oturum arasında paylaşıldı; Yusuf elle denerken diğer oturum telefonu bırakacak şekilde mesajla düzenlendi.
- Titreşim: Yusuf'un önerisiyle Android'de `performHapticFeedback` (telefonun ayarı ve şiddeti), oyunda ve arayüzde aynı eşleme.
- Ara iş: oda ayarlarındaki oyun havuzu 4 sütunlu (geniş ekranda 5) küçük kapak ızgarası (`940b04f`, yayında, OTA 0.20261018.1343).

## Durum (oturum sonu)
main `e61359e`, sunucu + OTA 0.20261018.1346, Play 1.4 (versionCode 8) iç + kapalı testte; birleşmiş dallar/worktree'ler silindi, proje klasörü main'de. GitHub'a push yok (main origin'den 57 commit ileride).

## Doğrulanmayanlar
- Play'den kurulan 1.4'te satın alma ve FCM bildirimi elle denenmedi.
- Basket v3 (`basket-pull-range` `a010d20`, worktree `.claude/worktrees/ecstatic-kirch-aed66a`) incelenmedi, main'de değil.
