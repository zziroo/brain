---
type: project
project: song-finder
date: 2026-10-05
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
- Motor: başsız Claude Code CLI (`claude -p --restricted`, yalnız WebSearch/WebFetch). Kimlik 2026-10-09'dan beri Console API anahtarı `song-finder-prod` (`ANTHROPIC_API_KEY`, `/etc/song-finder.env`); anahtar yoksa abonelik belirtecine döner: [[2026-10-09-motor-kimligi-uygulama-basina-console-api-anahtari]]. Arama başına yaklaşık 45-60 bin token; yerelde 3-5 dakika, canlıda 7-9 dakika.
- Ses: `Xenova/larger_clap_music_and_speech` (q8, 78 MB) + ffmpeg, ayrı alt süreçte, yaklaşık 380 MB bellek, parça başına ~1,2 sn; önbellek `DATA_DIR/audio-cache`.
- Tek bağımlılık `@huggingface/transformers` (steam-avgr'deki sıfır bağımlılık kuralı bu özellik için bilerek bozuldu).

## Kararlar
- [[2026-10-04-song-finder-ses-olcumu-ve-motor-secimi]]
- [[2026-10-09-motor-kimligi-uygulama-basina-console-api-anahtari]]
- [[2026-10-04-yayinda-token-ve-parola-rehber-okuyucu-ile-ortak]]

## Öğrenilenler
- [[2026-10-04-bassiz-claude-at-dosya-anmalarini-acar]]
- [[2026-10-04-muzik-kaynaklarinin-erisilebilirligi]]
- [[2026-10-04-deneme-ve-ajan-tuzaklari]]

## Oturumlar
- [[2026-10-04-ilk-surum-ses-olcumu-ve-yayin]]

## Yayın (2026-10-04'ten beri)
https://tools.ziroo.net/song-finder → konteyner `song-finder` (127.0.0.1:8092, kaynak `/opt/song-finder/src`, veri `/opt/song-finder/data`), Caddy parçası `/opt/ziroo-sites/tools/song-finder.caddy`. Betik `app/deploy/deploy.sh` (Git Bash'ten, proje kökünden). Konteyner salt okunur, `--memory 1500m --cpus 1 --pids-limit 256`. Env dosyaları `docker run` anında okunur; değiştirince betiği yeniden çalıştır.
- Sırlar sunucuda: `/etc/song-finder.env` (`ANTHROPIC_API_KEY` = song-finder-prod; `APP_PASSWORD`: Rehber Okuyucu'nun parolasıyla aynı değer; `LASTFM_API_KEY`). `/etc/claude-token.env` (eski abonelik belirteci) hâlâ `--env-file` ile veriliyor ama kod geçirmiyor; temizlik bekliyor.
- İlk canlı arama (Rick Astley linki): 524 sn (yerelde ~4 dk), parça başına ses ölçümü 2,8 sn (yerelde 1,3), bellek tepe ~690 MB, yük ortalaması ~1,0; LiveKit'in CPU'su etkilenmedi (o sırada Diskort'ta görüşme olup olmadığı bilinmiyor).

## Güncel durum (2026-10-04)
- **2026-10-05:** arayüz neon temada, yayında `bbb2659` ([[2026-10-05-araclarin-arayuzu-neon-temaya-gecti]]).
Yayında, commit `218b5ee`: keşif odaklı sürüm. Sonuçlar dört bilinirlik etiketiyle (keşif / az bilinen / bilinen / çok bilinen; Deezer şarkı `rank` + sanatçı `nb_fan`, `app/lib/popularity.js`) iki bölüme ayrılır: "Keşifler" (yalnız az bilinen, hedef 25) ve "Bilinen benzerler" (en fazla 6); sonuç sayfasında istemci tarafı bilinirlik kaydırıcısı. Topluluk işçisi kaldırıldı. Ses ölçümü 70 parça / 240 sn. Modeller sunucuda `opus` (`/etc/song-finder.env`). Kullanım sayfası `usage.html`. 110 test.
- Canlı ölçüm (Radiohead – Reckoner, opus): 236 sn, 59 ölçüm (~3 sn/parça); ana liste yalnız 12 şarkı, benzerlik %62-73 (yerelde Duman 25 şarkı, %70+).

## Sıradaki işler
- Yusuf birkaç şarkıyla deneyip öneri kalitesini değerlendirecek (karar onda).
- Eski abonelik belirteci (daha önce ekran görüntüsüyle sohbete düşmüştü) artık kullanılmıyor; iptali ve env dosyalarından silinmesi bekliyor (bkz. 2026-10-09 kararındaki temizlik listesi).
- Doğrulanmadı: kullanım sayfasının canlıdaki görünümü (koordinatör parolayı girmediği için bakmadı); başarısız aramanın kullanım kaydı; Diskort'ta görüşme varken ses ölçümünün etkisi.
- Depo GitHub'a gönderilmedi (remote yok). ziroo-edge `c7782d9` ve `8b7adf6` 2026-10-05 akşamı itibarıyla push edilmiş.
- Bilinen sınırlar (keşif sürümü): Deezer `rank` bugünkü dinlenmeye bakar, bir zamanların hitleri "az bilinen" görünebilir (6 Underground, Novocaine For The Soul, Cigarette Daydreams); ikinci ölçü (yayın yılı / Last.fm dinlenme) önerildi, karar yok. Bazı türlerde ana liste 25'e ulaşmıyor. Arama sürerken `/api/preview` "Deezer sırası dolu" diyebilir. Deezer verisi eksik aramalar önbelleğe alınmaz.
- Bilinen zayıflıklar: topluluk kaynağı neredeyse boş; listeler hâlâ çoğunlukla aynı sahneden; eski/alışılmadık kayıtlarda ses puanları düşük çıkıyor (eşik aramaya göre uyarlanıyor); işçi bağlamında hesap e-postası görünüyor (düşük risk, giderilmedi).
