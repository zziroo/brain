---
type: session
project: tussle
date: 2026-10-18
status: done
tags: [tussle, kurulum-karti, kapali-test, yayin]
source: oturum 2026-10-18 akşam "tussle: kurulum kartı adımları" (ziroo-edge oturumunun başlattığı yan oturum)
---

# Oturum: kurulum kartında adımlar sıralı ve indirme kilitli, `202c2ec` yayında

- Sorun: arkadaşlar kapalı testte 1-2. adımı atlayıp Play indirme linkine bastı. Karar ve ayrıntı: [[2026-10-18-kurulum-adimlari-sirali-indirme-kilitli]].
- Değişen: `src/client/ui/install-ui.ts` (`stepStates`, yerinde güncellenen satırlar), `lobby.css` `.install-*`, `tr.ts`/`en.ts` `install.*Hint` + `install.lockedOne/Two`, `tests/install-ui.dom.test.ts` (sıra/kilit testleri).
- Doğrulama: `npm test` 2108 geçti, typecheck temiz; tarayıcıda telefon boyutunda `?gate=1` (Android UA), ana sayfa kartı ve iOS Ayarlar sayfası. Sonradan eklenen href kaldırma tarayıcıda yeniden denenmedi.
- İnceleme: sonnet ajanı, yalnız iki düşük bulgu (kilit uyarısı ekran okuyucuya bağlanmamıştı, uzun basma kilidi atlatıyordu); ikisi de düzeltildi.
- Yayın: ana oturum ("tussle: durum ve kalan işler") commit istedi; `202c2ec` main'e girdi, o oturum sunucu + OTA 0.20261018.1541 yayınladı ve push etti.
- Ders adayı: aynı checkout'ta paralel oturumlar varken commit'lenmemiş değişiklik başka oturumun AAB derlemesine yarım girdi (Play versionCode 9); yan oturum işini erken commit'lemeli ya da yayın oturumu derlemeden önce `git status` temizliğini kontrol etmeli.
- Not: `tests/sifre.test.ts` denge simülasyonu tam koşuda bir kez düştü, tek başına geçti (rastgele, ilgisiz).
