---
type: decision
project: song-finder
date: 2026-10-04
status: active
tags: [song-finder, karar, clap, claude-cli]
source: oturum 2026-10-03/04 (song-finder)
---

# Benzerlik, modelin ezberine değil ölçülen ses benzerliğine dayanır; motor Max aboneliğiyle başsız Claude CLI

## Karar
1. Adaylar birkaç kaynaktan toplanır ama sıralamayı CLAP ile ölçülen ses benzerliği yönlendirir (30 sn önizleme, seed'e kosinüs).
2. Motor: başsız `claude` CLI, Yusuf'un Max aboneliği. Site parolalı, yalnız Yusuf arar.
3. Sonuç sayfaları tahmin edilemez linkle girişsiz okunur (`SHARE_RESULTS=1`), arama ve geçmiş giriş ister.

## Neden
- İlk sürüm (yalnız model + web araması) tam istenmeyen şeyi verdi: Duman → Türkçe rock'ın bilinenleri, Rick Astley → aynı prodüktör ekibi. Ölçüm ekleyince yavaş baladlar gibi kulağa benzemeyenler düştü.
- CLAP ayırt ediyor: aynı kaydın başka miksi 0,96, benzerler 0,75-0,95, alakasız türler çoğunlukla 0,5 altı.
- Abonelik: ek ücret yok; araç tek kullanıcılı olduğu için uygun.

## Reddedilen alternatifler
- Spotify öneri / ses özelliği API'leri: yeni uygulamalara kapalı.
- `Xenova/clap-htsat-unfused`: alakasız parçalar 0,28-0,90 arası çıktı, ayırt etmiyor.
- Karakter işçisinde Opus: tek şarkılık denemede Sonnet'ten iyi değildi, daha pahalı.
- Herkese açık site: aboneliği başkalarına sunmak uygun değil, API anahtarı ve harcama sınırı gerekirdi. Kod motoru değiştirmeye hazır.
- Giriş için "fren açıkken 2 saniyede tek deneme": yeni cihazdan girişi kilitleme kaldıracı olurdu; yerine en az 16 karakter parola zorunlu ve IPv6'da /64 başına sınır.
- Ekşi ve Reddit'i bot kontrolünü aşarak okumak: yapılmadı, bkz. [[2026-10-04-muzik-kaynaklarinin-erisilebilirligi]].

Bağlantı: [[10-Projects/song-finder/_overview|Song Finder]]
