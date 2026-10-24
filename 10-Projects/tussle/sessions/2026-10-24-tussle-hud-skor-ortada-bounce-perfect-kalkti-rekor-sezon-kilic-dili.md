---
title: "Tussle: HUD skor ortada, Bounce perfect kalktı, ses takma adları, rekor/sezon geçmişi ⚔ dili"
date: 2026-10-24
project: tussle
type: session
tags: [tussle, hud, bounce, ses, profil, sezon]
---

# Oturum: kalan küçük işler (24 Eki gece)

Yusuf'un telefon notları: HUD'da uzun birimde ("10 şeker") sayı sola kayıyor; Bounce'ta perfect bonusu gereksiz. Keep-up v4 / Balance v7 / Stack kenar dönüşü ve ses seçimi onaylandı.

## Yapılanlar (commit `e5b93ef`, sunucu + OTA 0.20261024.18, yedek pre-e5b93ef.db)
- **HUD skor:** sayı merkeze sabit, birim küçük/soluk sağa asılı. Yer `UNIT_MIN_FIT` (0,8) altına düşerse birim gizlenir, sayı küçülmez (`src/games/shell/hud.ts`). Gerçek Hud sınıfıyla ölçüldü: sapma < 1 px, X ve haplarla çakışma yok. Karar: [[2026-10-24-hud-skor-sayisi-ortada-birim-saga-asili]].
- **Bounce v5:** perfect bonusu ve kombo çarpanı kalktı, karo başına sabit 10. Sonuç kartında yalnız karo ve hız. Denge tablosu 400 tohumla yeniden (ortanca: casual 290 / decent 690 / skilled 1080 / expert 1420; süreler v4 ile aynı, typicalSec 26). `games.bounce.line.perfects/bestStreak`, `games.bounce.combo` anahtarları silindi.
- **Ses:** `click/success/fail` takma adları `SfxName` ve `engine.ts`'ten silindi (hiç çağıran kalmamıştı); testler ve `docs/GAME-CONTRACT.md`, `docs/ses-tasarimi.md`, kod haritası güncel.
- **⚔ dili:** profil rekor alt sayfası (`openRecordSheet`: 64 px kapak + ad + kısa satır, "En iyin" kutuda, başkasının profilinde iki satır + taç, üç sayı karosu kutu içinde), tüm sezonlar alt sayfası (`openSeasonsSheet`), oda sezon geçmişi (`season-history.ts`: üstte "N gün kaldı" çipi + Gün X/Y, GÜNLER başlığı) ve gün alt sayfası (88×66 kapak, "Sıran" kutusu, tablo kutu stilinde). Veri/davranış aynı; isabet alanı büyümesi gerekmedi. `npm run tasma` 360/375/412 iki tema temiz; alt sayfalar kapsamda (`season-day`, `profile-record`, `profile-other-record`; virgüllü seçici sırayla denenir).
- `tests/server-verify.test.ts` göç sayısı 31 (dün geceki göç 31 testi kırmıştı, kimse fark etmemiş).

## Zaten kapanmış çıkanlar
Balance/right-door "Seviye" sonuç satırı ve hud.ts geniş hap çakışma payı dün geceki `e9b6573`'te kapanmıştı; vault'taki "Kalan" satırı bayattı.

## Açık / telefon teyidi
- HUD: iki hap açıkken birimin gizlenmesi hissi; Bounce yeni puan ölçeği; rekor/gün alt sayfaları Gece'de (profil "Tümünü gör" alt sayfası tohum verisinde 5+ sezon olmadığından tarayıcıda görülmedi).
- Kombo ×n ve n/toplam hapı 23 Eki kararıyla serbest, dokunulmadı. Tur geçişi `level` sesleri ses sadeleştirme turuna kaldı.

## Ajanlar
bounce (opus medium, 14 çağrı), profil/sezon ⚔ (opus high, 41 çağrı), HUD tarayıcı denetimi (sonnet, 40 çağrı), inceleme (opus medium, 2 düşük bulgu: tasma seçicisi, göç testi; ikisi de düzeltildi; şüpheci gerekmedi).
