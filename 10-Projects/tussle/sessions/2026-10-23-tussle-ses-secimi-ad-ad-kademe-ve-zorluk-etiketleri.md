---
type: session
project: tussle
date: 2026-10-23
status: done
tags: [tussle, ses, hud, oyun-ici, yayin]
source: Claude Code oturumu "tussle: ses seçimi ad ad, kademe rozeti kalkıyor" (2026-10-23 öğleden sonra); önceki [[2026-10-23-tussle-ses-seti-f-girdi-sesi-kademe-rozeti]]
---

# Oturum: ses seçimi ad ad, oyun içi kademe geri bildirimi ve zorluk etiketleri kalktı (iki yayın)

## Yapılan
- **Ses seçimi ad ad** (`1701b9d`, `7a76c5d`; yayın sunucu 7a76c5d, OTA 0.20261023.1208, SW v8): `recete.js` `PICK` tablosu, setler `cekirdek.js`'ten içe aktarır, 8 WAV değişti; hit/miss A'nın kısaltılmışı (98/92 ms). [[2026-10-23-ses-secimi-ad-ad-pick-tablosu-hit-miss-kisa]]
- **Kademe geri bildirimi kalktı** (`75e8c14`): kabuk `EV_SHELL_CHEER`'e tepki vermez (level sesi, titreşim, kıvılcım, `CheerBadge` yok); 7 oyundaki milestone etiketleri, trace/chop milestone sesi, 8 i18n anahtarı silindi; sim'ler değişmedi. Tur/seviye geçişi `level` sesleri ve oyun sonu çıkartmaları ("Usta!") duruyor.
- **Zorluk/aşama etiketleri kalktı** (`9e86378`; yayın sunucu 9e86378, OTA 0.20261023.1425): keşif ajanı 40 oyunu taradı, üç grup çıktı; Yusuf yalnız A grubunu onayladı: knife-toss, right-door, bounce, balance, brake, lights, odd-one-out, pinata'da "Aşama/Hız/Rüzgâr/Tur n", "n. piñata", hızlanma afişleri ve brake ibresinin altındaki "Hız n"; 11 i18n anahtarı. Kalan: kombo ×n, n/toplam sayaçları. GAME-CONTRACT güncel. [[2026-10-23-oyunda-tek-olcu-skor-kademe-ve-zorluk-etiketi-yok]]
- Her parti: inceleme ajanı bulgusuz, typecheck temiz, 2693 test geçti. Ders: [[2026-10-23-wav-render-yuvarlama-oynakligi-degismeyen-dosyayi-geri-al]].

## Açık / doğrulanmadı
- Telefonda dinlenmedi ve bakılmadı: kısa hit/miss hissi, lights/odd-one-out istem yazısı ortalandı, knife-toss/bounce/balance HUD'da eski etiketin boşluğu.
- Öneri (karar yok): `level` adı paletten çıkıp bilgi veren evre geçişleri `pop`, kutlama olanlar sessiz olabilir.
- Sim'ler hâlâ `EV_SHELL_CHEER` yayıyor (sessiz); temizlik ileride.
