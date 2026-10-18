---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ders, orkestrasyon, play, aab, yayin]
source: oturum 2026-10-18 akşam (mobil-playus, "tussle: durum ve kalan işler")
---

# Ders: aynı checkout'ta başka oturum çalışırken mağaza derlemesi onun yarım değişikliğini pakete alır

## Ne oldu
- `npm run build:aab` (Play 1.5, versionCode 9) çalışırken ziroo-edge'in başlattığı yan oturum ("kurulum adımlarını sıralı yap") aynı klasörde `install-ui.ts`, i18n ve `lobby.css` düzenliyordu. Vite derlemesi `install-ui.ts`'in yarım hâlini aldı; çeviriler derlemeden 25 sn sonra kaydedildi. AAB iç + kapalı teste yüklendikten sonra `git status`'ta fark edildi.
- Bu sefer zararsızdı: kurulum kartı yalnız tarayıcıda görünür (`!isNative && !isTwa`). Yan oturuma mesajla "bitince commit'le, haber ver" denildi; `202c2ec` gelince inceleme + `release.sh`.
- `release.sh` kirli ağaçta çalışmayı reddeder; `build:aab` ve iOS arşivi reddetmez.

## Ders
- Mağaza derlemesinden (AAB, `xcodebuild archive`) hemen önce: `git status --short` temiz olmalı ve `list_sessions` ile aynı `cwd`'de çalışan oturum var mı bakılmalı. Varsa ya önce onunla anlaş (commit'lesin), ya da derlemeyi temiz bir worktree'den yap.
- Yüklemeden sonra paketin içeriği doğrulanabilir: `unzip -l dist/tussle-release.aab` + bundle'da beklenen/beklenmeyen dize araması.

İlgili: [[2026-10-15-ayrik-klasor-paralellik-ve-paylasilan-dosyalar]], [[2026-10-18-tussle-kurulum-adimlari-sirali]], oturum [[2026-10-18-tussle-durum-kalan-isler-ios-motor-yayin]].
