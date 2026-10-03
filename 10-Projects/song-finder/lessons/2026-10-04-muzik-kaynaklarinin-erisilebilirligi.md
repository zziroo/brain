---
type: lesson
project: song-finder
date: 2026-10-04
status: active
tags: [song-finder, ders, api, deezer, eksi, reddit]
source: oturum 2026-10-03/04 (song-finder), ev IP'sinden denendi
---

# Müzik verisi için hangi kaynak anahtarsız çalışıyor, hangisi kapalı (2026-10 itibarıyla)

- **Çalışan, anahtarsız:** Deezer API (serbest metin arama, `track/<id>`, `artist/<id>/radio` ve `/related`; 30 sn önizleme URL'leri imzalı ve süreli), iTunes Search, YouTube oEmbed, Spotify embed sayfası (`open.spotify.com/embed/track/<id>` içinde ad + sanatçı), ListenBrainz labs (bazen 503/yavaş, süre sınırı koy).
- **Çalışmayan:** Odesli/song.link açık API (401, kaldırılmış); Deezer gelişmiş arama sözdizimi (`artist:"x" track:"y"` boş döner); Deezer `artist/<id>/top` (boş); Reddit `.json` (403); PullPush Reddit arşivi (429, otomatik kullanımı reddediyor).
- **Ekşi Sözlük:** `curl` ile 200 dönüyor ama Node istekleri (fetch/https/http2) Cloudflare bot kontrolüne takılıyor (403). curl'ün geçmesi uygulamanın da geçeceğini göstermez; denemeyi uygulamanın kendi istemcisiyle yap.
- **Last.fm:** ücretsiz API anahtarı gerekir.
- Claude'un WebFetch'i Reddit ve Ekşi'de engelleniyor; "topluluk önerisi" kaynağı pratikte arama özetlerine kalıyor.

Bağlantı: [[10-Projects/song-finder/_overview|Song Finder]]
