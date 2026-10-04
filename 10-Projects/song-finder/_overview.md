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
- Kaynak `C:\Users\yusuf\ZZ\zProjects\song-finder` (yerel git, main; GitHub'a gönderilmedi, remote yok). Node, `app/` altında; yerelde `node --env-file-if-exists=.env app/server.js` (`.env` proje kökünde, `.env.example` var).
- Akış: link çözme (Spotify embed sayfası, YouTube oEmbed, Deezer/iTunes) → adaylar (ListenBrainz, isteğe bağlı Last.fm, web araması yapan "topluluk" işçisi, "karakter" işçisi, Deezer sanatçı radyosu havuzu) → Deezer'da doğrulama → CLAP ile ses benzerliği ölçümü → sıralama.
- Motor: başsız Claude Code CLI (`claude -p --restricted`, yalnız WebSearch/WebFetch), Max aboneliğiyle. Arama başına yaklaşık 45-60 bin token; yerelde 3-5 dakika, canlıda 7-9 dakika.
- Ses: `Xenova/larger_clap_music_and_speech` (q8, 78 MB) + ffmpeg, ayrı alt süreçte, yaklaşık 380 MB bellek, parça başına ~1,2 sn; önbellek `DATA_DIR/audio-cache`.
- Tek bağımlılık `@huggingface/transformers` (steam-avgr'deki sıfır bağımlılık kuralı bu özellik için bilerek bozuldu).

## Kararlar
- [[2026-10-04-song-finder-ses-olcumu-ve-motor-secimi]]
- [[2026-10-04-yayinda-token-ve-parola-rehber-okuyucu-ile-ortak]]

## Öğrenilenler
- [[2026-10-04-bassiz-claude-at-dosya-anmalarini-acar]]
- [[2026-10-04-muzik-kaynaklarinin-erisilebilirligi]]
- [[2026-10-04-deneme-ve-ajan-tuzaklari]]

## Oturumlar
- [[2026-10-04-ilk-surum-ses-olcumu-ve-yayin]]

## Yayın (2026-10-04'ten beri)
https://tools.ziroo.net/song-finder → konteyner `song-finder` (127.0.0.1:8092, kaynak `/opt/song-finder/src`, veri `/opt/song-finder/data`), Caddy parçası `/opt/ziroo-sites/tools/song-finder.caddy`. Betik `app/deploy/deploy.sh` (Git Bash'ten, proje kökünden). Konteyner salt okunur, `--memory 1500m --cpus 1 --pids-limit 256`. Env dosyaları `docker run` anında okunur; değiştirince betiği yeniden çalıştır.
- Sırlar sunucuda: `/etc/claude-token.env` (`CLAUDE_CODE_OAUTH_TOKEN`; ortak dosya olarak açıldı, şimdilik yalnız song-finder okuyor, Rehber Okuyucu hâlâ `/etc/rehber.env` içindeki kopyayı kullanıyor) ve `/etc/song-finder.env` (`APP_PASSWORD`: Rehber Okuyucu'nun parolasıyla aynı değer; `LASTFM_API_KEY`).
- İlk canlı arama (Rick Astley linki): 524 sn (yerelde ~4 dk), parça başına ses ölçümü 2,8 sn (yerelde 1,3), bellek tepe ~690 MB, yük ortalaması ~1,0; LiveKit'in CPU'su etkilenmedi (o sırada Diskort'ta görüşme olup olmadığı bilinmiyor).

## Güncel durum (2026-10-04)
Yayında, commit `0596358`. Sahibe özel kullanım sayfası `usage.html` (arama başına model, token, süre, tahmini maliyet; kayıt `DATA_DIR/usage.jsonl`, başarısız aramalar dahil). Giriş parolası Rehber Okuyucu ile aynı değere ayarlandı (iki dosyada ayrı kopya). Araç listesi kartı ziroo-edge `8b7adf6` (push edilmedi). 96 test geçiyor, iki tur güvenlik incelemesinden + kullanım sayfası incelemesinden geçti (kritik/yüksek bulgu yok, bulunanlar düzeltildi). Last.fm kaynağı çalışıyor.

## Sıradaki işler
- Yusuf birkaç şarkıyla deneyip öneri kalitesini değerlendirecek (karar onda).
- Token yenileme: kullanılan token daha önce bir ekran görüntüsüyle sohbete düşmüştü; Yusuf "sonra değiştiririm" dedi. Değişince hem `/etc/claude-token.env` hem `/etc/rehber.env` güncellenmeli ve iki konteyner yeniden başlatılmalı. Rehber Okuyucu'yu ortak dosyaya geçirmek o projenin oturumunda yapılacak.
- Doğrulanmadı: kullanım sayfasının canlıdaki görünümü (koordinatör parolayı girmediği için bakmadı); başarısız aramanın kullanım kaydı; Diskort'ta görüşme varken ses ölçümünün etkisi.
- Depo GitHub'a gönderilmedi; ziroo-edge'de iki commit (`c7782d9`, `8b7adf6`) push edilmedi.
- Canlıda arama ~9 dk; hızlandırmak için `AUDIO_MAX_TRACKS` düşürülebilir.
- Bilinen zayıflıklar: topluluk kaynağı neredeyse boş; listeler hâlâ çoğunlukla aynı sahneden; eski/alışılmadık kayıtlarda ses puanları düşük çıkıyor (eşik aramaya göre uyarlanıyor); işçi bağlamında hesap e-postası görünüyor (düşük risk, giderilmedi).
