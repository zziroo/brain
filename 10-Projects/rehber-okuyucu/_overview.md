---
type: project
project: rehber-okuyucu
date: 2026-10-09
status: active
tags: [rehber-okuyucu, overview, steam, ai-motoru]
source: oturum 2026-10-03/04/05 (achievement-guide-formatter)
---

# Rehber Okuyucu: Steam rehberlerini okunur gösteren ve AI ile başarım kartlarına çeviren araç

> Not canlı gerçek değildir: sunucu ve depo durumunu işlem yapmadan önce doğrula.

## Nedir
Steam'in rehber görüntüleyicisi tek uzun sayfa; okurken sürekli aşağı yukarı gidiliyor. Araç bir Steam rehber linkini alır, sayfayı çekip blok modeline ayrıştırır ve okutur: sabit içindekiler, rehber içi arama, bölüm / liste maddesi / tablo satırı işaretleme, kaldığın yerden devam, görsel ızgarası. "AI düzenlemesi" sekmesi rehberi başarım bazlı kartlara çevirir: özet, uyarılar, yol haritası, etiketli kartlar, tek tek işaretlenen kontrol listeleri (toplanabilirler), rehberdeki sorunlar. Resmi başarım listesi varsa her başarıma kart açılır (rehber anlatmıyorsa boş gövdeli). İkinci kaynak türü "AI araştırması": oyun linki verilir, AI web'den kendi rehberini yazar, aynı hattan kartlara dönüşür.

## Teknoloji
- Kaynak `C:\Users\yusuf\ZZ\zProjects\achievement-guide-formatter` (Windows) ve `/Users/ziroo/ZZ/zProjects/achievement-guide-formatter` (Mac; yerel git, remote yok, main). Node 24, bağımlılık yok, `node:sqlite`, ESM, şema v6. Düzen: `src/`, `public/`, `test/` (157 test, çalıştırma `node --test test/*.test.js`), `deploy/`, sözleşme `docs/SPEC.md`.
- HTML ayrıştırıcı elle yazıldı (`src/html.js`, `src/parse.js`); düğüm bütçesi 200k, derinlik 150, sayfa 3 MB.
- AI motoru: sunucu içinden `claude -p` başsız kip, araçsız, kimlik 2026-10-09'dan beri Console API anahtarı `rehber-prod` (`ANTHROPIC_API_KEY`, `/etc/rehber.env`); anahtar yoksa abonelik belirtecine (`CLAUDE_CODE_OAUTH_TOKEN`) döner: [[2026-10-09-motor-kimligi-uygulama-basina-console-api-anahtari|karar]]. Model talimatı `src/ai-prompt.md`; araştırma aşaması `src/research-prompt.md` (yalnız WebSearch/WebFetch). CLI'ye giden metinde `@` → `＠`. Neden: [[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]].
- Sahip girişi (`OWNER_PASSWORD`, en az 12 karakter): AI üretimini yalnız sahip başlatır; ziyaretçi rehber ekler ve okur.
- Arayüzde `innerHTML` yok, inline script/style yok (tools kökeni Ziroobank ile ortak): [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]].
- Elle müdahale CLI: `node src/cli.js list|show|claim|submit|fail|requeue|delete|stats|add|import-html|research|cancel`.

## Yayın (2026-10-04'ten beri)
https://tools.ziroo.net/rehber → konteyner `rehber` (127.0.0.1:8095, deneme 8096, `/opt/rehber`, veri `/opt/rehber/data`, env `/etc/rehber.env`), Caddy parçası `deploy/rehber.caddy` → `/opt/ziroo-sites/tools/rehber.caddy`. Betik `deploy/deploy.sh` (2026-10-04'te ilk kez çalıştı, sorunsuz; env dosyası `docker run` anında okunur, değiştirince betiği yeniden çalıştır). Araç listesi kartı ziroo-edge `c7782d9` (push edilmedi). Sunucu: [[sunucu-vps]].

## Kararlar
- [[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]]
- [[2026-10-04-ai-uretimini-yalniz-sahip-baslatir]]
- [[2026-10-04-walkthrough-rehberde-adimlar-yol-haritasinda]]
- [[2026-10-05-her-bilgi-tek-yerde]]
- [[2026-10-05-basarim-adlari-steamden-resmi-haliyle]]
- [[2026-10-05-ai-arastirmasi-iki-asamali]]
- [[2026-10-05-uretim-iptali]]

## Dersler
- [[elle-yazilan-ayristirici-karesel-regex]]
- [[steam-rehber-sayfasi-hiz-siniri]]
- [[buyuk-rehberde-model-kisaltiyor]]
- [[claude-cli-cikis-sinirinda-yeni-iletiyle-devam-eder]]
- [[yayin-oncesi-kuyruk-kontrolu-ayri-adim]]
- [[turkce-sayfada-ingilizce-buyuk-harf-i]]
- [[claude-cli-gizli-max-turns-bayragi]]
- [[2026-10-04-bassiz-claude-at-dosya-anmalarini-acar]] (Song Finder; bu projede de doğrulandı)

## Oturumlar
- [[2026-10-04-ilk-surum-ve-yayin]]
- [[2026-10-05-kalite-dil-arastirma-iptal]]
- [[2026-10-09-api-anahtarina-gecis-ve-sonnet|2026-10-09 API anahtarına geçiş ve Sonnet]] (Song Finder ile ortak oturum)

## Güncel durum (2026-10-09)
- **2026-10-09:** motor kimliği Console API anahtarı `rehber-prod`, `REHBER_MODEL=sonnet` (opus'tan çekildi; araştırma modeli boş olduğu için o da sonnet), yayında `c695e5a`. Sonnet ile kart kalitesi henüz denenmedi; düşerse yalnız bu araç Opus'a döner.
- **2026-10-05 akşam:** arayüz neon temada (`6239cde`); arayüzde "sahip" yerine "admin", bilgi etiketleri büyük harfe çevrilmiyor (`a5114d9`). Yayında; DB yedeği `/opt/rehber/backup/20261005-190742` ([[2026-10-05-araclarin-arayuzu-neon-temaya-gecti]]).
Yayında, commit `fb767ec` (son DB yedeği `/opt/rehber/backup/20261005-180314`). Motor o tarihte `opus` (2026-10-09'dan beri `sonnet`), günlük sınır 30. Canlıda 6 rehber + 1 AI araştırması (Wolfenstein II, `app612880`, İngilizce, hazır; yol haritası zayıftı → araştırma istemine oynanış sırası eklendi, yeniden araştırma bekliyor). Witcher 3 artık hazır (Yusuf yeniden üretmiş). Bu oturumda yayına girenler: her bilgi tek yerde + tek Dikkat paneli + nedenli Dikkat maddeleri, Özgün/TR/EN çıktı ve Steam resmi başarım adları (okuyucuda dil seçimi), AI araştırması, üretim iptali, `@` genişletmesinin kapatılması, İngilizce belgede "İ" büyük harf düzeltmesi.

## Sıradaki işler
- Yusuf yeni kuralları deneyecek: Wolfenstein II'yi "Yeniden araştır" (oynanış sırası → görev görev yol haritası beklenir); yeni istemle normal rehber üretimi (tekrar ve Dikkat maddeleri).
- Doğrulanmadı (`status: unverified`): yeni istemlerin gerçek çıktıya etkisi; gerçek `claude` süreciyle iptal; okuyucudaki başarım dili seçicisinin son düzeltmeleri (yalnız ilk sürüm canlıda denendi); gizli başarımlarda kart açıklaması; araştırmada `error_max_turns` alt tipinin gerçek davranışı.
- Altyapı (ayrı iş): AI araştırmasında WebFetch aynı Docker ağındaki diğer konteynerlere ulaşabilir; `rehber` konteynerini ayrı ağa almak.
- Karar bekleyen (önceki oturumdan): Opus belgelerde görselleri az kullanıyor (talimat ayarı önerildi). Kart açıklamasının resmi açıklama olması (çevirisi olmayan oyunda Türkçe belgede İngilizce açıklama) Yusuf'a bildirildi, yanıt yok.
- Bir hafta sonra Console Usage'da `rehber-prod` harcamasına bak.
- Bu deponun remote'u yok (GitHub'a gönderilmedi). ziroo-edge `c7782d9` 2026-10-05 akşamı itibarıyla push edilmiş.
