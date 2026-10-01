---
type: decision
project: diskort
date: 2026-10-02
status: active
tags: [diskort, dm, ses, arama]
source: Claude Code oturumu 2026-10-01/02 (DM arama + engelleme, 0.9.6)
---

# Karar: DM'de arama çalar (30 sn, pencere + zil), cevapsızsa konuşmaya kayıt düşer; mobilde kapalıyken yalnız bildirim

## Bağlam
Yusuf DM'de arama ve yayın açma istedi ("sistemi sen kur"). DM'ler zaten kanal, LiveKit oda adı yalnız kanal kimliğine bağlı (`ch_<id>`), yani altyapı hazırdı; eksik olan izinler, katılma rotası ve "çalma" kavramıydı.

## Karar
- **Çalma:** arama başlayınca diğer katılımcılara (grup DM'de herkese) kabul/reddet penceresi + zil (`ring`), arayana bekleme sesi (`ringback`). Kişi başına 30 sn; katılınca/reddedince/süre dolunca biter. Aramadaki biri yeniden çalabilir.
- **Arama kaydı:** konuşmaya `type: 'call'` mesajı ("arama başlattı · süre" ya da "Cevapsız arama"); düzenlenemez. Eski istemciler düz metin görür.
- **Mobil, uygulama kapalıyken:** yalnız normal bildirim (Android `diskort-call` kanalı). OTA ile gelsin diye yerel kod yok.
- **DM'de yayın:** sunucu ses kanallarındakiyle aynı (DM izinlerine CONNECT/SPEAK/STREAM eklendi; salt okunur DM'de yok).
- Teknik seçimler (Claude): çalma LiveKit `participant_joined` webhook'uyla başlar (jeton alıp bağlanmayan çaldırmaz); Rahatsız Etmeyin'deki kişi çalınmaz; aynı kişi 30 sn içinde kimse açmamış aramayı yeniden başlatırsa eski kayıt sessizce açılır (spam önleme), açılmış aramadan sonraki geri arama normal çalar; istemci zili bağlantı yokken ve 30+5 sn sonra kendisi susturur. Ayrıntı: repo `docs/direkt-mesajlar.md`.

## Neden
Yusuf'un seçimi (önerilen seçenekler). Discord'a benzer beklenti; çalma olmadan DM araması fark edilmez. Mobilde tam ekran arama yeni APK/IPA ve iOS'ta CallKit gerektirir; ilk sürüm OTA ile hızlı çıksın.

## Reddedilen alternatifler
- Çalmasız, sesli kanal gibi "Aramaya katıl": daha basit ama arama fark edilmez.
- Mobilde tam ekran gelen arama (Android full-screen intent, iOS CallKit): şimdilik değil; yerel kod + yeni APK/IPA ister. Sonra düşünülebilir.

## Sonuçlar / riskler
- Arama başka cihazda açılınca telefondaki "Seni arıyor" bildirimi kalkmıyor (konuşma okununca kalkar); düzeltmesi muhtemelen yerel kod ister.
- Bire bir aramada karşı taraf ayrılınca kişi odada tek kalır (otomatik ayrılma yok).
- Bir kişi tek ses odasında: DM aramasına girmek sunucu ses kanalından çıkarır.
- Telefonda hiç denenmedi (unverified).

## İlgili
- [[engelleme-dm-ve-arama]], [[dm-aramalari-yonetimde-ozel]], [[dm-sunucu-ayrimi]], [[2026-10-02-dm-arama-engelleme-ve-0-9-6]]
