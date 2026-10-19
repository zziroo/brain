---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, yeniden-adlandirma, db, test]
source: oturum "tussle: oyun kimlikleri İngilizceye" (2026-10-19 akşam)
---

# Oyun kimliği yeniden adlandırmada kör bul-değiştir olmaz; kimlik bağlamına göre değiştir

- **Türkçe kimlikler başka ad alanlarıyla çakışıyor:** `refleks` aynı zamanda havuz etiketi, `bicak`/`cift`/`kopru` skor birimi, `kes`/`renk`/`denge`/`hedef` düz Türkçe kelime. Değişim yalnız kimlik bağlamında yapıldı: tırnak içi tam token, import/test yolları, `--cover-<id>`, `games.<id>.` i18n anahtarı ve kayıt dosyalarındaki nesne anahtarları. Etiket satırı ve `unit:` önü atlandı.
- **tsc her şeyi yakalamaz:** `Record<string, …>` haritalar, nesne kısaltmaları (`{ refleks, kule }`) ve dot erişimi (`GAME_COVER_BG.kule`) ayrıca grep'lendi. Kayıp kapaklar testte `cover-default` olarak çıktı.
- **Doğrulayıcılar tireyi reddediyordu** (`params.ts` checkMeta, `feed.ts` GAME_ID_RE, `new-game.mjs`, parite `--games`); kebab-case seçilince hepsi genişletilmeli.
- **Kayıtlı girdi logu kimliği içerir** (`g`) ve replay `log.gameId === meta.id` ister; log_hash da `g`'yi kapsar. Göç logu yeniden yazıp hash'i yeniden hesaplar.
- **Eski göç testleri eski şemaya eski kimlikle veri yazar:** betik test verisini de yeni kimliğe çevirince eski adımlar (3, 6) eşleşmedi. Bu fixture'lar eski kimlikle bırakılır, sonda yeni kimlik beklenir (bu da göç 22'yi sınar).
- **Gerçek veriyle dene:** ana klasördeki geliştirme DB'sinin kopyası yeni kodla açılıp önce/sonra özet karşılaştırıldı.

İlgili: [[2026-10-19-oyun-kimlikleri-ingilizce-kebab-case]]
