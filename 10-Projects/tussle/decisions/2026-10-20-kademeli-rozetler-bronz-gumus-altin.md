---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, rozet, profil, denge]
source: oturum "tussle: rozetler ve kapanış geçişleri" (2026-10-20), commit 0787aa4
---

# Karar: 10 kademeli rozet (Bronz/Gümüş/Altın), eşikler tahmin; sunucu geçmişten hesaplar

## Karar
- 10 rozet, 4×3 ızgara, son 2 yuva "Yakında" (canlı modlar için ayrıldı: herkesin aynı anda oynadığı canlı oyun). Tek tablo `shared/badges.ts` `BADGE_TABLE`.
- Eşikler (Bronz/Gümüş/Altın): Seri 7/30/100 gün; Günün birincisi 3/10/30; Kapışma 5/30/100 galibiyet; Parti 3/15/50 birincilik (yalnız 3+ kişilik partiler); Sezon: podyum / galibiyet / 3 galibiyet; Kaşif 10/25/40 oyun; Rekortmen 10/40/100 kişisel rekor; Şanslı 1/5/15 kazanılan yazı-tura; Son dakika 1/5/15 (sayılan koşu günün son saatinde); Ev sahibi 4/8/15 üye (sahibi olunan odada).
- Denge kuralı: Bronz ~ilk hafta, Gümüş 1–2 ay, Altın ~6 ay. Kapışma hızlı (1v1'de ~%50), parti uzun (~1/N) olduğu için parti eşikleri daha düşük.
- Sunucu rozetleri profil geçmişinden hesaplar (yeni tablo yok); her kademenin gerçek kazanma tarihi türetilir (gün kapanışı, ended_at, sezon sonu, N. katılım). Rozet için rakip gerekir (tek kişilik gün/sezon sayılmaz); işaretli (hileli) koşular hiç sayılmaz.
- Görünüm: **A varyantı** (rozet kendi rengini korur; kademe = metal çerçeve + 3 nokta; gümüş açık tema için koyulaştırıldı). Detay: dokununca çapalı popover (yeni yeniden kullanılabilir `ui/popover.ts`: aynı anda bir tane, altta, yer yoksa üstte, dış dokunuş/Esc/geri/kaydırma ile kapanır), alt sayfa değil. Popover'da kademe, tarih, nasıl kazanılır, sonraki kademeye ilerleme ve üç adım.
- Profil istatistikleri: Oynanan gün, En uzun seri (Şu an N gün), Günlük birincilik, Galibiyet (Kapışma w/p, Parti w/p), Podyum, En sevdiği oyun; Oda kutusu kalktı, "N ortak oda" başlık satırına girdi. Parti istatistiği 3+ kişilik; kapışma galibiyetinde işaretli koşular düşer.

## Neden
- Parti yalnız 3+ ise 2 kişilik parti ucuz kapışma olmaz.
- Kaşif sabit 40 (havuz büyüyeceği için "tüm oyunlar" hedefi kayardı).
- Rakipsiz günler/sezonlar sayılırsa rozet bedava olurdu.
- Tarihleri geçmişten türetmek yeni tablo ve göç gerektirmedi.
- A varyantı: rozetler birbirinden ayırt edilebilir kalır.

## Reddedilen alternatifler
- B varyantı (hepsi metal): rozetler birbirinden ayırt edilemiyordu.
- Hediye rozeti: ücretli, "satın alınmış" hissi verir.
- Sezon sonu esprili ödüller: sonraya, oda düzeyinde.
- Birleşik galibiyet oranı: ~%50 ve ~%20 şansı karıştırır.
- Alt sayfa ile rozet detayı: popover daha hafif.

## Açık / sonra
- **Eşikler tahmindir** (canlı veri okunamadı); veri birikince yeniden ayarla.
- Ev sahibi üyeler ayrılınca düşebilir (üyelik geçmişi yok); kazanılan kademeleri kalıcılaştırmak sonra düşünülebilir.
- Telefon teyidi: rozet popup'ı (iPhone çentiği, Android geri tuşu).

## İlgili
- [[2026-10-20-oyuncu-karti-denemeler-profil-baglantisi]] · [[2026-10-17-profil-ekrani-kapsami]]
- [[2026-10-20-gorsel-kurallar-kontur-kapanis-gecisi-iskelet]]
