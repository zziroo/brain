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
- Kaynak `C:\Users\yusuf\ZZ\zProjects\achievement-guide-formatter` (yerel git, remote yok, main). Node 24, bağımlılık yok, `node:sqlite`, ESM. Düzen: `src/`, `public/`, `test/` (104 test), `deploy/`, sözleşme `docs/SPEC.md`.
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
- [[2026-10-04-walkthrough-rehberde-adimlar-yol-haritasinda]]

## Dersler
- [[elle-yazilan-ayristirici-karesel-regex]]
- [[steam-rehber-sayfasi-hiz-siniri]]
- [[buyuk-rehberde-model-kisaltiyor]]
- [[claude-cli-cikis-sinirinda-yeni-iletiyle-devam-eder]]

## Oturumlar
- [[2026-10-04-ilk-surum-ve-yayin]]

## Güncel durum (2026-10-04)
Yayında, commit `b017f55`. Motor `opus`, çıkış sınırı ayarı 128000 (`/etc/rehber.env`; değişince `deploy.sh`). Canlıda iki rehber: Mr Mushroom (hazır, Sonnet) ve Witcher 3 (**AI durumu başarısız**; ekranda eski Opus belgesi duruyor: 78 kart, 321 madde, adımlar kartlarda tek liste halinde). Yol haritası bağlama yapısı ve kullanım sayfası yayında. Bu oturumda Witcher için dört büyük üretim yapıldı; ikisi boşa gitti.

## Sıradaki işler
- **Witcher 3'ü yeniden üretmek Yusuf'un onayını bekliyor** (tek deneme, tahmin 80-100 bin çıkış token'ı). Bu, hem ileti birleştirme düzeltmesinin hem yol haritası yapısının ilk gerçek sınavı olacak. Başarısız olursa ham çıktı `/opt/rehber/data/debug/` altında.
- Birleştirme tutmazsa: büyük rehberler için parçalı üretim (önce iskelet, sonra adım adım).
- **Token yenileme:** `CLAUDE_CODE_OAUTH_TOKEN` ekran görüntüsüyle sohbete düştü. Yusuf'a sıra verildi (yenisini üret, sunucuya yaz, yeniden yayınla, sonra claude.ai'da yalnız `user:inference` yetkili eski satırı iptal et); yaptığı doğrulanmadı.
- Karar bekleyen: tek başarımlık rehberde 62 boş kart (öneriye yanıt yok); Opus belgede 83 görselden yalnız 3'ünü kullandı (talimat ayarı önerildi).
- Ayrı incelemeden geçmeyenler: bilinmeyen alanların atılması, tamlık kuralı, sarmalayıcı açma, kesilme/birleştirme düzeltmesi, ham çıktı saklama, üç arayüz düzeltmesi (`0be96ef`).
- Doğrulanmadı: gerçek üretimde ileti birleştirme; Opus'un model çıkış sınırı; düşünme token'larının büyük rehberdeki payı; kullanım sayfasının canlıda gerçek veriyle görünümü.
- ziroo-edge `c7782d9` push edilmedi; bu deponun remote'u yok.
