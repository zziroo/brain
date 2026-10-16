---
type: session
project: tussle
date: 2026-10-16
status: done
tags: [tussle, google-play, kapali-test, yedek, oturum]
source: Claude Code oturumu 2026-10-16 "tussle: Play kapalı test durumu" (mobil-playus)
---

# Oturum: kapalı test onaylandı; yedek budama, Mac aynası ve Türkçe Play girişi

## Ne yapıldı
- Play Console (Chrome, Yusuf'un oturumu): kapalı test **onaylandı ve yayında**. "Kapalı test - Alpha" etkin, sürüm 2 (1.0), 178 ülke, Yayın özetinde bekleyen yok (son yayın 16 Ekim). Katılım linkleri Console'dan doğrulandı: web `play.google.com/apps/testing/net.ziroo.tussle` ("Become a tester" görünüyor), Android `play.google.com/store/apps/details?id=net.ziroo.tussle`. Panelde "şu an 0 test kullanıcısı kayıtlı".
- Arkadaş akışı Yusuf'a anlatıldı: önce gruba katıl, sonra katılım linki, sonra kur; tek adım yok (açık test 12 kişi şartına sayılmaz, e-posta listesi grubu atlar ama mail toplatır). Grupta kalındı.
- Canlı doğrulama: sunucu `114db8f`, OTA 0.20261016.1119, Caddy'de `log` yok.
- Yedek tutma gizlilik sözüne bağlandı ([[2026-10-16-yedek-tutma-sureleri-gizlilik-sozune-baglandi]]): Tussle `bca6281`, Diskort `3ddcc48`; sunucuda ve Mac'te denendi.
- Play mağaza girişi: kısa açıklama iki dilde "no ads/reklam yok" → "season points/sezon puanı" ([[2026-10-16-play-kisa-aciklamada-no-ads-tanitim-uyarisi]]); **Türkçe (tr-TR) giriş eklendi** (ad aynı, metinler `store/listing.md` bölüm 3, grafikler varsayılandan); 2 değişiklik incelemede. Tussle `dbfbfc4`. İki repo GitHub'a gönderildi.

## Açık kalan
- Yusuf: 3 adımlı mesajı 14-15 arkadaşa at; 12 kişi katılınca 14 gün.
- Mağaza girişi incelemesi; sonra Play'de kısa açıklama uyarısının kalktığına bak.
- Play "Yapay zekayla üretilmiş öğe beyanı" varsayılan "Öğeleri etiketleme"de kaldı; metinler Claude yazımı. Etiketleme gerekip gerekmediği Yusuf'un kararı.
- Diskort Windows `pull-db-backups.ps1` Tussle'ı çekmiyor (Mac yeterliyse gerek yok).
