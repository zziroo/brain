---
type: session
project: tussle
date: 2026-10-23
status: done
tags: [tussle, oyun-ici, keep-up, balance, stack, hud, yayin]
source: Claude Code oturumu "tussle: oyun turu kalan işler" (2026-10-23 akşam); önceki [[2026-10-23-tussle-oyun-ici-duzenleme-turu-telefon-notlari]]
---

# Oturum: oyun turunun kalan işleri + Yusuf'un telefon notları (keep-up, balance, stack, avatar)

Yayında: sunucu `dd9ff50`, OTA 0.20261023.1745, DB 31 (yedek `pre-dd9ff50.db`). İki commit: `e9b6573` küçük işler, `dd9ff50` oyun değişiklikleri. Typecheck temiz, 185 dosya / 2701 test, inceleme bulgusuz, tarayıcı kontrolü (Sonnet ajanı) temiz. Telefonda denenmedi.

## Yapılan
- **Küçük işler (e9b6573):** balance ve right-door sonuç ekranındaki "Seviye" satırı + i18n anahtarları kalktı; `hud.ts` skor sağ sınırı artık o karedeki gerçek hap genişliğinden (haplar skordan önce çizilir); 38 sim'den ölü `EV_SHELL_CHEER` push'ları, `CHEER_EVERY` ve yalnız bunun için tutulan yereller silindi (skor/tick/RNG aynı; 5 golden'da yalnız olay sayısı/hash yeniden kesildi), sabit `sim-kit`ten gitti, GAME-CONTRACT'ta 103 emekli.
- **Yusuf'un kayıtları sunucudan indirilip yerelde yeniden oynatıldı** (practice_runs; esbuild ile `replayWithState` scratch scripti): balance 58 sn koşusunda 453 dokunuş, zirve 13/sn, %96 aynı tarafa ardışık (iki parmak davulu); keep-up'ta 135 dokunuşun 4'ü ıska, 3'ünde parmak topun 0,16-0,20 alan genişliği altında (4-5 tick gecikme/öngörü), her ıska koşuyu bitiren dokunuş.
- **Keep-up v4:** isabet kapsülü (önceki → şimdiki → LEAD 5 tick öngörü, uç zeminde kırpılı), HIT_SLOP 0.06; prev-kopya dokunuşlardan sonra fiziğe taşındı (v1-v3'te isabet testindeki "önceki konum" hep şimdikiyle aynıydı, gizli hata); zorluk top sayısından: G_GROW 2.5→0.6, G_HALF 35→60, R_HALF 45; "tam orta" tamamen kalktı; çıkartma eşikleri 25/50 → 80/140; howTo "kenarından vurursan yana kaçar". Karar [[2026-10-23-keep-up-isabet-kapsulu-zorluk-top-sayisindan-tam-orta-yok]].
- **Balance v7:** itiş = push·min(1, gap/8) (FULL_GAP 8; 10 denendi, skilled PD 29→18 sn düşüyordu). Karar [[2026-10-23-balance-azalan-itis-iki-parmak-davulu]].
- **Stack:** `EV_TURN` olayı (sürüm artmadı), kenar tamponları (kayan blok hizasında, kuleyle yükselir, kaide rengi), dönüşte 120 ms yassılma + `tick`, howTo "Blok kenarda geri döner; dokun, düşsün. Taşan kısım kesilir!". Karar [[2026-10-23-stack-kenar-donusu-olay-tampon-metin]].
- **Avatar geçişi kalktı:** ana ekran avatarı → profil avatarı paylaşımlı öğe eşlemesi (home.ts, profile.ts, `avatarKey` shared-el'den silindi); Yusuf: "çok sol sağ yapıyor". Oda kapağı → oda geçişi duruyor.
- **DB göç 31:** eski dev veritabanında `practice_runs.bytes` yoktu (21. adım CREATE IF NOT EXISTS, sütun sonradan eklenmişti) → antrenman POST 500. PRAGMA korumalı ADD COLUMN; üretim etkilenmedi. Ders [[2026-10-23-create-if-not-exists-goce-sonradan-eklenen-sutun-eski-db-de-yok]].

## Ders
- Bot tabloları isabet alanına (LEAD) duyarsız: botların dokunuş hızı sınırlı, koşu "top sayısı > dokunuş hızı" noktasında bitiyor. Kapsül/alan kararlarında telefon kayıtları belirleyici, botlar yalnız yerçekimi/top eğrisini ölçer.
- Sunucudaki practice_runs kayıtları yerelde yeniden oynatılınca "hissettim" notları sayıya dönüyor (dokunuş aralığı histogramı, ıska dy'si). Yöntem scratch scriptteydi; tekrar gerekirse `scripts/mini-replay-check.mjs`'in esbuild kalıbı + `src/games/<id>/sim.ts` state sabitleri.

## Açık / doğrulanmadı
- Telefonda hiçbiri denenmedi: keep-up kapsül hissi ve 90 sn tavana vurma sıklığı (iyi bot %21), balance davulla ~30 sn / tek parmak aynı, stack tamponların okunuşu (tampon bloğun önünde; blok son %2 tamponun altına giriyor), yassılma dozu (0.9; az bulunursa 0.94).
- Keep-up'ta yana sapma `off` topun şimdiki x'inden; öngörü ucuna dokununca ters sekme olasılığı (inceleme notu), şikâyet gelirse kapsülün en yakın noktasının x'i.
- Ses yoğunluğu sadeleştirme turu ayrı oturum (Yusuf). Diğer tek "ipucu" kalıntısı: flutter "Dokun!".
