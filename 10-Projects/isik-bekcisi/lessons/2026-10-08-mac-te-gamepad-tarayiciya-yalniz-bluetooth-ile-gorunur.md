---
type: lesson
project: isik-bekcisi
date: 2026-10-08
status: active
tags: [isik-bekcisi, gamepad, mac, tarayici, ortam]
source: oturum a15a1fc5 (incremantal-game, 2026-10-08); Yusuf'un Flydigi Vader 5 Pro denemesi
---

# Ders: Mac'te Steam'in gördüğü gamepad'i tarayıcı görmeyebilir; Flydigi Vader 5 Pro ancak Bluetooth'la görünür

## Ne oldu
- **2.4G alıcı / kablo:** Steam gamepad'i görüyordu, ama oyun da gamepad test siteleri de görmüyordu (`navigator.getGamepads()` boş).
- **Flydigi'nin sitesi:** cihaza WebHID ile bağlanabiliyordu. Bu ham erişim, oyunların kullandığı Gamepad API değil.
- **Bluetooth:** eşleyince tarayıcı gamepad'i hemen gördü: `Xbox Wireless Controller (STANDARD GAMEPAD)`, düzen `standard`, Xbox tuş yerleri.

## Neden
- Steam kendi sürücüsüyle neredeyse her gamepad'i okur.
- Tarayıcılar yalnız macOS'un oyun denetleyicisi diye tanıdığını gösterir. Flydigi 2.4G/kabloda büyük ihtimalle eski Xbox 360 protokolüyle bağlanıyor; macOS onu yerleşik olarak tanımıyor (doğrulanmadı, tahmin).

## Uygulama
- Kullanıcı "gamepad çalışmıyor" derse önce koda değil bağlantıya bak. Sayfaya tıklayıp bir tuşa bastıktan sonra konsolda `[...navigator.getGamepads()].filter(Boolean).map(g => [g.id, g.mapping])` çalıştırılır.
  - Boş liste: işletim sistemi tanımıyor (Bluetooth'u dene, Steam'i kapat).
  - Düzen boş: tarayıcı standart düzeni bilmiyor (oyun onu yok sayar).
- Tarayıcı gamepad'i ancak sayfa açıkken bir tuşa basılınca gösterir.

İlgili: [[2026-10-08-gamepad-destegi-omuz-tuslari]]
