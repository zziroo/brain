---
type: session
project: tussle
date: 2026-10-22
status: active
tags: [tussle, oturum, gecis, sistem-cubugu, sezon, oyuncu-karti, tasarim]
source: oturum 2026-10-22 (mobil-playus: geçiş çubuğu, sezon sayfası, oyuncu kartı, ⚔ dili)
---

# Oturum: geçişte çubuk yanıp sönmesi, sezon sayfası kayması, oyuncu kartı ve ⚔ sayfa dili

## İstek
Yusuf dört şey istedi: (1) ana ↔ oda geçişinde sistem çubuğunun yanıp sönmesi, (2) sezon sayfasında grafiğin geç yüklenip içeriği itmesi, (3) sezon sayfası üstünün ⚔ (Kapışma · Arena · Parti) sayfası diline çekilmesi, (4) o dilin uygulama geneline yayılması ("her ekran bir yerden çıkmış gibi kompakt ve uyumlu").

## Yapılanlar
- **Geçiş çubuğu (7cbd9e0).** Ölçüm OnePlus CPH2747'de (ikinci test cihazı; screenrecord yazamıyor, cihaz içi screencap bandı döngüsü ~4-8 fps, betikler repoda `scripts/dev/cubuk-olcum/`), Play 1.12'de: alt jest çubuğu temiz, üst durum çubuğu şeridi geçişte 1-3 kare (120-250 ms) kart içeriğiyle doluyordu. Kök neden: Android'e hiç çağrı gitmiyor; View Transition sırasında `html[data-native] body::before` üst şeridi ve alt inset bölgesi örtülmüyor, kayan ana ekran görüntüsü oradan görünüyor. Yusuf'un "arka planda kayan ana ekranın görünmesi" ipucu kök nedeni doğrudan verdi. Düzeltme: `.screen.vt-old/.vt-new` yakalamada alt inset + 48 px sayfa renginde `box-shadow` (görüntü çubuğun altına uzuyor), `body::before` kendi view-transition grubunda (`tussle-strip`, en üstte, animasyonsuz). Ayrıca `native.ts` `SystemBars.setStyle` yalnız değişen çubuğa gider, ardından PageColor yeniden uygulanır (Capacitor `setStyle` her çağrıda pencere zeminini `styles.xml` kremine sıfırlıyor; Gece'de sheet sonrası klavye açılırken krem kenar görülüyordu). Sonra ölçüm: üç turda (Gündüz, kaydırılmış ana ekran, Gece) sapma 0. Çürütülenler: gereksiz setStyle/theme-color, scrollTo/dvh, DisplayRate.
- **Sezon sayfası (7cbd9e0).** Grafik tek sabit 262 px kutu (iskelet + lejant + boş hâl aynı boy; önce liste 52,6 px kayıyordu, şimdi 0). Sezon verisi oda açılırken idle'da ön çekiliyor (`prefetchSeason`, `warmSeason`), oturum boyunca bellek önbelleği `{hist, stale}`; doğrulanmış skor bayat işaretler, sayfa bayatı hemen çizip yeniler; invalidation öncesi başlayan uçuştaki istek yeniden kullanılmaz (`inflightAt` epoch). Üst kısım ⚔ diline çekildi: lede (chip "N gün kaldı" + Gün x/y), `.live-rows` kutusu "Puanın" (sıra rozet olarak değerin yanında, 1. sarı). Ortak yapı taşları `src/client/ui/live-kit.ts`'e çıktı (`liveLede/liveRow/liveFold/liveLink/liveSend`), challenge-sheet ve party-sheet oradan.
- **"Geçmiş" konumu (4d7726b).** İki varyant yan yana gösterildi: A = `liveLink` satırı (kutu 137 px), B = lede ucunda 34 px pill (dokunma alanı 44 px, kutu 64 px, grafik 67 px yukarı). Yusuf ikisini de beğendi, kararı Claude'a bıraktı; B seçildi (tek bağlantı için satır fazla yer tutuyor; satır dili uzun listelerde). Alt yazı "Gün gün herkesin tablosu ve kazanan" (Yusuf: geçmiş herkesin tablosu, "sıran" kişisel okunuyordu) B'de aria-label'a indirgendi. Karar: [[2026-10-22-kilic-sayfa-dili-genel-sablon]].
- **Sezon geçmişi gün kartı (4d7726b).** Kart açılınca iskelet 66 px, tablo 354 px idi, tek karede 285 px sıçrıyordu. İskelet artık gerçek tablo biçiminde (başlık + o gün puan alan üye sayısı kadar satır, `boardSize`); yükseklik yine değişirse 220 ms ease (motionOff'ta anında); son 3 gün `requestIdleCallback` ile ön çekilir, bugünün tablosu 60 sn warm haritasında. Ölçüm sonra: gövde 353,8 px sabit.
- **Oyuncu kartı (4d7726b).** ⚔ şablonu: avatar + ad başlık, lede chip'leri (sen/Sahip/seri), Bugün kutusu (kapak, oyun, sıra rozeti, deneme satırları), Sezon kutusu (puan + sıra chip, Profili gör link satırı); kick ve fotoğraf bildirme sessiz küçük düğme (20 Eki kararı); kart 470 → 431 px; avatar morph yok ([[2026-10-22-oyuncu-kartinda-avatar-buyumesi-yok]]).
- Ayrıca: `scripts/dev/cubuk-olcum` README; `docs/gorsel-*/` gitignore'da (önce/sonra görüntüleri yerel).

## Yayınlar
- OTA 0.20261022.1024 (sunucu 4a09acd): geçiş + sezon sayfası + ipucu metni.
- Ardından 4d7726b yayınlandı (OTA 0.20261022.1041) (OTA sürümünü koordinatör tamamlayacak).

## Doğrulanmayanlar
- Telefon teyidi yok (Yusuf): geçiş çubuğu Xiaomi'de, sezon sayfası + Geçmiş pill, gün kartı açılışı, oyuncu kartı.

## Dersler
- "Yanıp sönme" türü şikâyette önce cihazda bant ölçümü (önce/sonra sayısal), kod teşhisiyle eşleştir; sahibin gözlemi (arkada kayan ekran) kök nedeni verdi. Yöntem: [[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]]; önceki geçiş işi [[2026-10-20-tussle-ilk-acilis-takilmasi-gecisler]].
- Yükleme kaymalarında ilke: iskelet gerçek içerikle piksel piksele aynı boy, veri mümkünse önceki ekranda ön çekilir, yükseklik değişmek zorundaysa kayar (animasyonlu).
- Büyük görsel değişiklikte eski/yeni ve varyantlar yan yana, karar Yusuf'ta; "ikisini de beğendim" derse Claude seçer ve gerekçesini yazar.

## Bağlam
- ⚔ sayfasının kaynağı: [[2026-10-21-tussle-roller-kapisma-1v1-arena-sekmesi]]; önceki oturum: [[2026-10-22-tussle-chain-tek-sure-four-arrows-double-tap-kalkti]].

## Kararlar
- [[2026-10-22-kilic-sayfa-dili-genel-sablon]]
