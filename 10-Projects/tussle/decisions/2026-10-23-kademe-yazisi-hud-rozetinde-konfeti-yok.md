---
type: decision
project: tussle
date: 2026-10-23
status: active
tags: [tussle, hud, oyun, gorsel]
source: Claude Code oturumu "tussle: dokunma sesi ve kademe animasyonu kararı" (2026-10-23)
---

# Karar: oyun içi kademe (milestone/cheer) yazısı oyun alanından HUD'daki altın rozete taşındı, büyük konfeti kalktı

## Bağlam
39 oyun `EV_SHELL_CHEER` yayar (metre, seri, seviye: "bir tur daha" hissi). Kabuk `level` sesi + titreşim + HUD altına büyük konfeti atıyor, oyunlar "50 m!" yazısını puan uçan etiketiyle aynı tek yuvalı `ScorePop` ile gösteriyordu: altınla aynı anda gelince aynı şekil, aynı hareket, biri diğerini eziyordu (Yusuf: "garip duruyor"). Yusuf kademeyi tamamen kaldırmayı da düşündü.

## Karar
`CheerBadge` (`src/games/shell/hud.ts`): puan sayısının sağında (yer yoksa altında) altın (`warn`) hap, 120 ms büyüyerek belirir, 900 ms durur, puana doğru çekilerek solar; ikinci kademe metni değiştirir, bekleme yeniden başlar. `level` sesi ve 15 ms titreşim kaldı; konfeti yerine rozetten 5 parçacık kıvılcım. Oyun `ShellView.cheerLabel(text)` ile metin verir; puan/altın uçan etiketleri oyun alanında kaldı. 7 oyun taşındı, 32 oyun metinsiz kademe yayıyor (yalnız kıvılcım). HUD'suz oyunda rozet üst kenarda ortada. Yusuf önce/sonra karelerini görüp onayladı.

## Neden
Yer (HUD/alan), şekil (rozet/uçan sayı) ve renk olarak ayrışır, aynı anda olsa birbirini ezmez; Yusuf'un "yeni bilgi mevcut öğeye rozet, içerik kaymasın" tercihine uyar; beğenilmezse kabukta tek yerden kapanır, oyunlara dokunulmaz.

## Reddedilen alternatifler
- Kademeyi tamamen kaldırmak: "bir tur daha" hissinin ana kaynağı; önce sunumu düzeltip telefonda karar vermek daha ucuz. Oyun sonu "Usta / Hızlı" etiketleri ayrı, kalıyor.
- Oyun alanının üstünden kayan şerit: 45 oyunda yerleşim çakışması riski.

## Sonuçlar / riskler
Telefonda denenmedi. İstenirse kalan 32 oyuna birer etiket (sözlük anahtarı) eklenir; balance, bounce, right-door'da seviye etiketleri zaten var. Yayın c25be1e ([[2026-10-23-tussle-ses-seti-f-girdi-sesi-kademe-rozeti]]).

## İlgili
- [[2026-10-23-oyun-icinde-girdiye-ses-yok-olaya-ses]]
- [[2026-10-20-kademeli-rozetler-bronz-gumus-altin]]
