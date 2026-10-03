---
type: project
project: rehber-okuyucu
date: 2026-10-04
status: active
tags: [rehber-okuyucu, overview, steam, ai-motoru]
source: oturum 2026-10-03/04 (achievement-guide-formatter)
---

# Rehber Okuyucu: Steam rehberlerini okunur gösteren ve AI ile başarım kartlarına çeviren araç

> Not canlı gerçek değildir: sunucu ve depo durumunu işlem yapmadan önce doğrula.

## Nedir
Steam'in rehber görüntüleyicisi tek uzun sayfa; okurken sürekli aşağı yukarı gidiliyor. Araç bir Steam rehber linkini alır, sayfayı çekip blok modeline ayrıştırır ve okutur: sabit içindekiler, rehber içi arama, bölüm / liste maddesi / tablo satırı işaretleme, kaldığın yerden devam, görsel ızgarası. "AI düzenlemesi" sekmesi rehberi başarım bazlı kartlara çevirir: özet, uyarılar, yol haritası, etiketli kartlar, tek tek işaretlenen kontrol listeleri (toplanabilirler), rehberdeki sorunlar. Resmi başarım listesi varsa her başarıma kart açılır (rehber anlatmıyorsa boş gövdeli).

## Teknoloji
- Kaynak `C:\Users\yusuf\ZZ\zProjects\achievement-guide-formatter` (yerel git, remote yok, main). Node 24, bağımlılık yok, `node:sqlite`, ESM. Düzen: `src/`, `public/`, `test/` (79 test), `deploy/`, sözleşme `docs/SPEC.md`.
- HTML ayrıştırıcı elle yazıldı (`src/html.js`, `src/parse.js`); düğüm bütçesi 200k, derinlik 150, sayfa 3 MB.
- AI motoru: sunucu içinden `claude -p` başsız kip, araçsız, sahibin Max aboneliği (`CLAUDE_CODE_OAUTH_TOKEN`). Model talimatı `src/ai-prompt.md`. Neden: [[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]].
- Sahip girişi (`OWNER_PASSWORD`, en az 12 karakter): AI üretimini yalnız sahip başlatır; ziyaretçi rehber ekler ve okur.
- Arayüzde `innerHTML` yok, inline script/style yok (tools kökeni Ziroobank ile ortak): [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]].
- Elle müdahale CLI: `node src/cli.js list|show|claim|submit|fail|requeue|delete|stats|add|import-html`.

## Yayın (2026-10-04'ten beri)
https://tools.ziroo.net/rehber → konteyner `rehber` (127.0.0.1:8095, deneme 8096, `/opt/rehber`, veri `/opt/rehber/data`, env `/etc/rehber.env`), Caddy parçası `deploy/rehber.caddy` → `/opt/ziroo-sites/tools/rehber.caddy`. Betik `deploy/deploy.sh` (2026-10-04'te ilk kez çalıştı, sorunsuz; env dosyası `docker run` anında okunur, değiştirince betiği yeniden çalıştır). Araç listesi kartı ziroo-edge `c7782d9` (push edilmedi). Sunucu: [[sunucu-vps]].

## Kararlar
- [[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]]
- [[2026-10-04-ai-uretimini-yalniz-sahip-baslatir]]

## Dersler
- [[elle-yazilan-ayristirici-karesel-regex]]
- [[steam-rehber-sayfasi-hiz-siniri]]

## Güncel durum (2026-10-04)
Commit `cbf9a61`, yerelde çalışıyor (`.claude/launch.json`, `.env` gitignore'da). Yerelde üç Hollow Knight rehberi gerçek motorla üretildi (sonnet; 65 bölüm: ~95 sn, 11,5k giriş / 14,7k çıkış token). İnceleme kapısı: 4 tur, bulunan yüksek/orta bulguların hepsi düzeltildi.

## Sıradaki işler
- **Motor token bekliyor:** `/etc/rehber.env` içinde `ENGINE`, `REHBER_MODEL`, `OWNER_PASSWORD` (sunucuda üretildi), `STEAM_API_KEY` (steam-avgr'den kopyalandı) var; `CLAUDE_CODE_OAUTH_TOKEN` yok. Yusuf `claude setup-token` çıktısını ekleyecek, sonra `deploy.sh` yeniden çalışacak ve konteynerde ilk gerçek üretim denenecek.
- Canlıda doğrulandı (2026-10-04): imaj, sağlık, Caddy yolu, edge smoke testi, Steam'den canlı çekme, resmi başarım listesi (Hollow Knight 63).
- Doğrulanmadı: konteynerde token ile kimlik ve `--cap-drop ALL --pids-limit 256` altında CLI; çok büyük rehberde çıktı sınırı.
