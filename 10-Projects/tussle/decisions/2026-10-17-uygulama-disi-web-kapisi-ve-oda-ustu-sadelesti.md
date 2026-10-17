---
type: decision
project: tussle
date: 2026-10-17
status: active
tags: [tussle, web, twa, kapi, oda, arayuz, birimler]
source: Claude Code oturumu 2026-10-17 "tussle: oda başlığı ve kapak sadeleştirme" (Yusuf: "tussle'ı komple webten erişimini kaldırsak", "yayınlayabilirsin full sorun değil")
---

# Karar: Tussle uygulama-içi oldu (tarayıcıya kapı sayfası); oda üst çubuğu ve ana kart sadeleşti, birimler yalnız oyun bağlamında

## Bağlam
Yusuf'un telefon ekranlarında oda sohbeti kaydırılınca üst taraf kalabalıktı (ad + sezon çipi + hediye/çan/dişli + yapışık bugün şeridi). Ana sayfa kartındaki "50 kesim" / "3 tur" gibi oyun birimleri kartlar arasında yabancı duruyordu. Aynı oturumda "web'i tamamen kaldıralım, uygulamaya taşıyalım" dedi.

## Karar
1. **Web kapısı (yayın `95033ba`).** "Kaldırmak" fiilen olmuyor: Android uygulaması TWA, yani sitenin kendisi; sunucu TWA ile tarayıcıyı ayıramaz. Onun yerine istemci tarafında kapı: tarayıcı ziyaretçisi `gate-screen` görür (marka, "Tussle uygulamada oynanır", kurulum adımları `install-ui`'dan, davet linkinde büyük oda kodu, gizlilik bağlantısı). Uygulama şu durumlarda açılır: `isNative`, `isTwa`, standalone/fullscreen display-mode (ana ekrana eklenmiş PWA ve bildirimden açılan TWA penceresi), dev host (localhost, 127.0.0.1, [::1], *.localhost, *.test), `?web=1` (sessionStorage'a yazılır). Dev host'ta `?gate=1` kapıyı önizler. Kural `src/client/gate-core.ts` (saf, testli), `main.ts` uygulamayı `bootApp()` içinde ancak kapı geçilince başlatır (socket, push, service worker açılmaz). Sunucu değişmedi; `/privacy` ve giriş akışları etkilenmez.
2. **Oda üst çubuğu (yayın `7c69e83`).** Çan kalktı; dişli herkese görünür ve `#/oda/<kod>/ayarlar` artık "Oda" sayfası: üyeye bildirim anahtarları (`roomPushCard`), üyeler, davet, odadan çık; kurucuya üstüne ayarlar. Kaydırıp sezon bandı geçince ad ve dişli gizlenir, tek sarı **sezon satırı** gelir (kapak küçük resmi → başa dön, sıra/puan/seri/gün kutuları/lider → sezon sayfası, ▶ veya yazı-tura). Eski `.room-strip`, `is-past-card`, `fitChip`, `season-chip` silindi.
3. **Birimler.** 23 oyun birimi kalıyor ama yalnız oyun adının yanında olduğu yerlerde: sonuç kartı, odanın bugün kartı ve sıralaması, akış satırları, profil rekorları. Oyunlar arası yüzeylerde (ana sayfa kartı, sezon satırı) sadece sıra ve durum ("Oynadın", "Öndesin", "Önde: X"). Sezon puanı zaten sıraya dayalı; uygulamanın ortak dili sıra.

## Reddedilenler
- Birimleri tümden kaldırmak: "47,3" ile "245" yan yana birimsiz okunmaz; oyun içinde "en iyin 23 kat" iyi his.
- Çanı üyeler sayfasına koymak: dişli herkese açılınca gereksiz.
- Web'i birkaç gün `?web=1` duyurusuyla açık tutmak: Yusuf "full sorun değil" dedi; eski web/PWA kullanıcıları ve eski web push abonelikleri kapıya düşer, kabul edildi.

## Sonuçlar ve notlar
- Tarayıcıda oynayan test düzeni (ajanlar) `?web=1` ya da localhost ile sürer; LAN'dan telefonla dev sunucuya girerken de `?web=1` gerekir.
- Ana sayfadaki kurulum kartı ve Ayarlar "Uygulama" satırı artık tarayıcıda hiç görünmez (TWA/native'de zaten gizli); kod duruyor.
- İnceleme bulgusu: bildirime dokununca `clients.openWindow` yeni pencere açıyor, referrer ve sessionStorage yok → standalone kuralı eklendi (doğrulandı, düzeltildi; [[2026-10-17-bildirimden-acilan-pencere-referrer-ve-sessionstorage-tasimaz]]). Oturum: [[2026-10-17-tussle-oda-ustu-sadelesme-ve-web-kapisi]].
- Eski/yeni görseller tohum veriyle puppeteer'dan alındı (scratch `shots.mjs`, `store/make-graphics.mjs` yaklaşımı); Yusuf yeni hâli telefonda henüz görmedi.
- Test: 1.855, tip temiz. Yedek `pre-95033ba.db`.
