---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, yayin, ota, worktree, yan-oturum]
source: oturum "tussle: Android bildirim dengesizliği" (2026-10-18 gece), yayın `7958b67`
---

# Ders: aynı klasörde yan oturum çalışırken yayını HEAD'den açılan geçici worktree'den yap

- `deploy/release.sh` sunucuya `git archive HEAD` gönderir ama OTA paketini **çalışma ağacından** derler (`scripts/ota-bundle.mjs`). Kirli ağaçta reddeder, ancak yayın başladıktan sonra yan oturum dosya düzenlerse yarım iş OTA'ya girebilir.
- Çalışan yol: `git worktree add --detach <scratch>/rel <commit>`, `ln -s <repo>/node_modules <scratch>/rel/node_modules` (`.gitignore` symlink'i yok sayıyor, ağaç temiz görünür), `cd <scratch>/rel && bash deploy/release.sh`. Bittikten sonra `rm <scratch>/rel/node_modules` (yalnız link) ve `git worktree remove --force`.
- Bu yayında gerçekten işe yaradı: yayın sürerken Xiaomi rehberi oturumu aynı klasörde `MainActivity.java`, `native.ts`, `lobby.css` vb. düzenliyordu; OTA'ya girmedi.
- **Mağaza derlemesi de aynı yolla (2026-10-19, Android 1.8 + iOS build 8):** worktree'ye ayrıca git'te olmayan `android/keystore.properties` ve `android/local.properties` kopyalanır; `JAVA_HOME` Android Studio jbr. `cap sync` worktree'de `android/capacitor.settings.gradle` ve `ios/App/CapApp-SPM/Package.swift` yollarını ana klasörün `node_modules`'una mutlak yazar: zararsız, commit'lenmez, worktree ile silinir. O sırada aynı klasörde koordinatörün ajanı oda üstünü düzenliyordu; paketlere girmedi.
- Canlı web paketinde kod kontrolü: esbuild dizeleri ters tırnakla yazar (`t:\`away\``); `"away"` diye aramak yanlış negatif verir.

İlgili: [[2026-10-18-ayni-checkoutta-baska-oturum-varken-magaza-derlemesi-yarim-isi-alir]], [[2026-10-18-bildirim-yalniz-on-plandaki-odada-susar]].
