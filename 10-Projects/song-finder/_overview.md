---
type: project
project: song-finder
date: 2026-10-04
status: active
tags: [song-finder, overview, muzik]
source: oturum 2026-10-03/04 (song-finder)
---

# Song Finder: link verilen şarkıya sesi gerçekten benzeyen şarkıları bulan kişisel web aracı

> Not canlı gerçek değildir: depo ve sunucu durumunu işlem yapmadan önce doğrula.

## Nedir
Spotify / YouTube / Apple Music / Deezer linki ya da "Sanatçı - Şarkı" alır, yaklaşık 15 öneriyi kart olarak verir (neden benzer, ses benzerliği yüzdesi, 30 sn önizleme, Spotify/YouTube linkleri). Amaç "aynı janr, aynı sanatçı" listesi değil, kulağa gerçekten benzeyenler. Yalnız Yusuf arar (parola), sonuç sayfaları linkle paylaşılabilir.

## Teknoloji
- Kaynak `C:\Users\yusuf\ZZ\zProjects\song-finder` (yerel git, main, ilk commit `66e59e5`; GitHub'a gönderilmedi). Node, `app/` altında; yerelde `node --env-file-if-exists=.env app/server.js` (`.env` proje kökünde, `.env.example` var).
- Akış: link çözme (Spotify embed sayfası, YouTube oEmbed, Deezer/iTunes) → adaylar (ListenBrainz, isteğe bağlı Last.fm, web araması yapan "topluluk" işçisi, "karakter" işçisi, Deezer sanatçı radyosu havuzu) → Deezer'da doğrulama → CLAP ile ses benzerliği ölçümü → sıralama.
- Motor: başsız Claude Code CLI (`claude -p --restricted`, yalnız WebSearch/WebFetch), Max aboneliğiyle. Arama başına yaklaşık 45-60 bin token, 3-5 dakika.
- Ses: `Xenova/larger_clap_music_and_speech` (q8, 78 MB) + ffmpeg, ayrı alt süreçte, yaklaşık 380 MB bellek, parça başına ~1,2 sn; önbellek `DATA_DIR/audio-cache`.
- Tek bağımlılık `@huggingface/transformers` (steam-avgr'deki sıfır bağımlılık kuralı bu özellik için bilerek bozuldu).

## Kararlar
- [[2026-10-04-song-finder-ses-olcumu-ve-motor-secimi]]

## Öğrenilenler
- [[2026-10-04-bassiz-claude-at-dosya-anmalarini-acar]]
- [[2026-10-04-muzik-kaynaklarinin-erisilebilirligi]]

## Güncel durum (2026-10-04)
Yerelde çalışıyor, 88 test geçiyor, iki tur güvenlik incelemesinden geçti (kritik/yüksek bulgu yok, bulunanlar düzeltildi). Yayında değil.

## Sıradaki işler
- Yusuf birkaç şarkıyla deneyip öneri kalitesini değerlendirecek (karar onda).
- Last.fm API anahtarı (Yusuf alıyordu; kök `.env` içine `LASTFM_API_KEY`).
- Yayın: tools.ziroo.net/song-finder. Docker imajı hiç derlenmedi; VPS'te hız/bellek ölçülmedi (Diskort'la paylaşımlı, `--memory 1500m --cpus 1` denenmemiş başlangıç değerleri). `APP_PASSWORD` en az 16 karakter; Claude token'ı Yusuf `claude setup-token` ile üretip sunucuda env dosyasına koyacak.
- Bilinen zayıflıklar: topluluk kaynağı neredeyse boş; listeler hâlâ çoğunlukla aynı sahneden; eski/alışılmadık kayıtlarda ses puanları düşük çıkıyor (eşik aramaya göre uyarlanıyor); işçi bağlamında hesap e-postası görünüyor (düşük risk, giderilmedi).
