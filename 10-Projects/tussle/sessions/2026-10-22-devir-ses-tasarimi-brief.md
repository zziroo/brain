---
type: session
project: tussle
date: 2026-10-22
status: open
tags: [tussle, ses, devir, brief]
source: Claude Code oturumu "tussle: arena oyunları kısa ve etkileşimli" (uzaktan kontrolde oturum başlatılamadı, brief buraya yazıldı)
---
# Devir notu: oyun sesleri elden geçirme (ses tasarımı turu)

Yeni oturum başlığı: `tussle: ses tasarımı`. Kendi worktree dalında (`ses-turu`), main'e merge yok; ana oturum arena işiyle birleştirecek.

## Bağlam
Oyun kullanıcılara çıkmaya yakın; Yusuf oyunlardaki TÜM seslendirmeyi detaylı elden geçirmek istiyor, gerekirse sıfırdan. Paralel oturum ARENA oyunlarına (`src/shared/arena/*`, `src/client/arena/*`) olay tabanlı geri bildirim (ses+parçacık+titreşim) ekliyor ve `src/client/audio/engine.ts`'e sentetik bir "thud" ekleyebilir. Bu yüzden: arena view dosyalarına ve `src/client/ui/arena-screen.ts`'e dokunma; `engine.ts`'te mevcut `SfxName` adlarını (click, success, fail, countdown, go, tick, whoosh) ve `audio.play(name, pitch)` imzasını koruyarak ekleme yap.

Mevcut durum: motor `src/client/audio/engine.ts` (216 satır, tamamen sentetik WebAudio: osilatör + gürültü tamponu), başlatma `src/client/audio/index.ts` (`initAudio`, ilk dokunuşta kilit açma). `SfxName` tanımı `src/games/view-api.ts:8`; oyunlar `host.sfx(name, pitch?)` / `host.haptic(ms)` (`view-api.ts:45-48`). Kullanım ~47 oyun dosyasında (`src/games/*/view.ts`): fail 58, click 48, success 47, whoosh 25, tick 21, go 12, countdown 5. Titreşim `src/client/haptics.ts`. Örnek ses dosyası yok.

Kısıtlar: akıcılık bir numaralı kural (ses gecikmesi hissedilmemeli), Yusuf sadelik sever (efekt dozu az), parti ortamında birkaç telefon yan yana çalar (rahatsız etmemeli), ses kapalıyken titreşimle anlam korunmalı. Test cihazı Android (Xiaomi 17 Pro, OnePlus), iOS cihazı yok; dinletmek için tarayıcı demo sayfası.

## Faz 1: Analiz ve öneri (salt okunur, rapor) — onay almadan faz 2'ye geçme
Önce `docs/kod-haritasi.md`, sonra engine.ts ve index.ts bütün; oyun kullanımlarını grep ile tara (oyun × olay: başla, isabet, hata, combo/seri, son 3 sn, bitiş, rozet → ne çalıyor / boş). Scratchpad'de küçük bir demo HTML ile mevcut 7 sesi ve önerilen yeni sesleri yan yana dinlenebilir yap; tarayıcıda açıp hata olmadığını doğrula (screenshot alma), Yusuf'a yolunu ver.

Rapor `docs/ses-tasarimi.md` (Türkçe, kısa, tablolu):
1. Mevcut 7 sesin niteliği (sentez tipi, süre, karakter) ve zayıf yanları.
2. Oyun bazlı ses haritası tablosu.
3. Seçenekler + öneri: (a) sentetik motoru yeniden tasarla (zarf, filtre, FM, küçük akor, pitch merdiveni ile combo, küçük rastgele varyasyon); (b) örnek tabanlı (CC0 paketler: Kenney, freesound; lisans, boyut, ilk açılış, iOS Safari çözme/gecikme, önbellek, OTA boyutu); (c) karma.
4. Ortak ses dili: 10–14 adlık palet (tap, pop, hit, miss, score, combo kademeli, countdown, go, tick-urgent, win, lose, badge, whoosh, thud…), karakter + kullanım yeri; eski 7 adın geriye uyumu ya da tek seferde taşıma önerisi.
5. Teknik: iOS sessiz anahtar (WebAudio / Capacitor native kategori), Android WebView gecikmesi, arka plana geçince susma, ses ayarının anında etkisi, loudness dengesi, aynı anda çok ses (limiter / aynı ad 60 ms kısıtı), ilk dokunuşta kilit açma (vault'ta "iPhone'da ilk dokunuşta ses" notunu grep et).
6. Müzik/ambiyans gerekli mi (gerekçeli öneri).
7. Faz 2 iş planı: adımlar, dosya listesi, sonnet'e verilebilecek mekanik kısımlar.

Bitişte Yusuf'a sor: hangi seçenek (a/b/c), palet onayı, müzik evet/hayır.

## Faz 2 (onaydan sonra)
Seçilen yaklaşım: motor, palet, `SfxName` genişletme, oyunların ses haritasını yeni palete taşıma (mekanik kısım sonnet ajanlarına oyun grupları hâlinde; arena dosyalarına dokunma), ayarlar, demo sayfası `scripts/` altında kalıcı, testler/tip denetimi temiz, kod haritası güncel. Ajan diff'leri `inceleme` ajanından geçsin. Dalda commit; main'e merge etme; bitişte dal adını ve engine.ts'te değişen imzaları yaz.

Bağlam kuralı: ≤500 satır dosya bütün, büyükse aralık; tekrar okuma yok; build/test çıktısı grep -iE "error|fail|warn" + tail -40; tarayıcıda read_page/javascript_tool, screenshot yok.
