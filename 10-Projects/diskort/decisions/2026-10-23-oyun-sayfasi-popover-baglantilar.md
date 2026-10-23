---
type: decision
project: diskort
date: 2026-10-23
status: active
tags: [diskort, etkinlik, oyun, masaustu]
source: 2026-10-23 yan oturumu "diskort: oyun sayfası (Steam/SteamDB bağlantıları)", commit 91183d0 (main'e f8739e8 ile birleşti), sürüm 0.12.0
---

# Oyun sayfası: algılanan oyuna tıklayınca bağlantı popover'ı, veri çekme yok

**Karar:** Masaüstünde algılanan bir oyuna tıklayınca küçük bir popover açılır (`ActivityPopover`): ad, ikon, geçen süre ve dış bağlantılar. Steam kütüphanesinden tanınan oyunlarda doğrudan Steam mağazası, SteamDB ve ProtonDB sayfası; diğerlerinde Steam/SteamDB araması. Her oyunda HowLongToBeat, YouTube, Twitch ve Google araması. Bağlantı mantığı tek yerde: `packages/client-core/src/activityLinks.ts`. Açılış yerleri: kendi etkinliği, üye listesi, DM, ses satırındaki oyun ikonu. Dış bağlantılar sistem tarayıcısında açılır.

**Protokol:** `Activity`/`ActivityReport`'a isteğe bağlı `steamAppId` (yalnız rakam, ≤10 hane; sunucu `presence.ts` geçersizi düşürür). Tarayıcı (`classify.ts`) oyunu Steam `appmanifest` kaydından eşlediyse doldurur; Epic/Battle.net/elle eklenen oyunda null. Eski istemciler bilinmeyen alanı yok sayar.

**Neden:** Yusuf "Steam linki bile yeterli, bağlantılı olabileceği her yere link" dedi; bir oyun sayfası için Steam'den veri çekmek (API, önbellek, oran sınırı) basitliğe aykırı. Bağlantılar sıfır sunucu maliyetiyle aynı işi görüyor.

**Reddedilen alternatifler:** Steam Store API'den açıklama/görsel çekip tam oyun sayfası (sunucu tarafı önbellek gerekir; ertelendi, gerekirse `steamAppId` zaten protokolde). Ayrı pencere yerine popover tercih edildi.

**Kapsam dışı:** Mobil arayüz; Mac'te oyun algılama (bugün yalnız Windows). Windows'ta elle doğrulama henüz yapılmadı.

İlgili: [[etkinlik-oyun-aktivitesi]].
