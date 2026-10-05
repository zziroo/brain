---
type: project
project: steam-avgr
date: 2026-10-05
status: active
tags: [steam-avgr, overview, steam]
source: oturumlar 2026-10-02/03 (steam-avgr-calculator)
---

# Steam AGCR Paneli: Steam'deki ortalama oyun tamamlama oranının nereden geldiğini gösteren herkese açık web paneli

> Not canlı gerçek değildir: sunucu ve konteyner durumunu işlem yapmadan önce doğrula.

## Nedir
Yusuf'un eski Google Sheets + Apps Script hesaplayıcısının yerine geçen panel. Herkes SteamID / vanity / profil linki girip kullanabilir. Steam profilindeki AGCR ile hesaplananı karşılaştırır (herkese açık ve "tümü" görünümü), en çok düşüren oyunlar, "şunu bitirirsem" hesabı, en ucuz hedefler (kalan başarım ya da tahmini süreye göre), AppID ile oyun ekleme, elle oyun ekleme, oyun hariç tutma (localStorage). Tasarım ziroobank tarzında.

## Teknoloji
- Kaynak `C:\Users\yusuf\ZZ\zProjects\steam-avgr-calculator\app`, GitHub `yusufholat/steam-avgr-calculator` (private, main). Node 22, bağımlılık yok, Dockerfile. README endpoint ve env'leri anlatır.
- Hız: `IPlayerService/GetTopAchievementsForGames` 20 oyun/istek, paralel. Sahip profili ~4-6 sn soğuk, önbellek 10 dk.
- Gizli oyun tespiti: `GetPlayerAchievements` "Profile is not public" → gizli. Key'i harcadığı için yalnız `OWNER_STEAMID` hesabında çalışır.
- Süreler: Steamhunters `api/apps/<id>` (medyan) ve `/achievements` (oranlar); kalan süre = medyan × Σ(-ln p, kilitli) / Σ(-ln p, tümü), alınamazlar hariç. Sunucuda 7 gün önbellek, eşzamanlılık 4.
- Yayın: https://tools.ziroo.net/steam-avgr (2026-10-03'ten beri; eski `diskort.ziroo.net/tools/steam` 301 ile yönlenir, [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]) → konteyner `steam-avgr` (127.0.0.1:8090), Caddy yolu `/opt/ziroo-sites/tools/steam-avgr.caddy`. Env `/etc/steam-avgr.env` (STEAM_API_KEY, OWNER_STEAMID). Güncelleme: kaynağı `/opt/steam-avgr`'a kopyala, `docker build -t steam-avgr .`, konteyneri aynı parametrelerle yeniden çalıştır (`--read-only --memory 256m -p 127.0.0.1:8090:8080`). Ayrıntı: [[sunucu-vps]].

## Kararlar
- [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]
- [[2026-10-02-caddy-ortak-site-klasoru]]
- Eski script'teki oyun gizleme (access token ile) taşınmadı.
- Kullanıcıdan token / Web API key istenmez (hesap çalma dolandırıcılığına benzer). "Steam ile giriş" (OpenID) yalnız kimlik verir, gizli ya da aile oyunlarını açmaz.
- HLTB yerine Steamhunters (resmi olmayan ama açık JSON API; HLTB'nin API'si yok).

## Bilinenler (Steam davranışı)
- API key sahibinin gizli oyunları `GetOwnedGames`'te görünür (Knockout City); bazı gizli oyunlar hiç gelmez (MultiVersus 1818750), `GetTopAchievementsForGames` ise verir.
- Steam kısıtlı/"unvetted" uygulamaları (Bloody Hell, KANNAGI USAGI) sahip görünümünde de saymaz; panel varsayılan hariç tutar.
- Profildeki AGCR aşağı yuvarlanır (floor), sayısal olarak doğrulandı.
- Aile Paylaşımı oyunları `GetOwnedGames`'te yok; `IFamilyGroupsService` Web API key'i kabul etmez (401), yalnız kullanıcı token'ı ile çalışır.

## Oturumlar
- [[2026-10-02-steam-agcr-paneli-yayinda]]

## Güncel durum (2026-10-03)
- **2026-10-05:** arayüz neon temada, altta Araçlar'a dönüş linki; yayında `b9ff4c3` ([[2026-10-05-araclarin-arayuzu-neon-temaya-gecti]]).
Yayında, commit `e7b9fa4`. Yusuf'un hesabı (kısıtlılar hariç, MultiVersus eklenmiş): panel tümü 195 / 132 / 6819 / %85,66, herkese açık %86,43; Steam sahip görünümü 197 / 133 / 6855 / %85, herkese açık 192 / 133 / 6761 / %86. Kalan 2 oyun büyük olasılıkla aile oyunları (biri 2/2, biri 34 açık ve bitmemiş); Yusuf kendisi ekleyecek.

## Sıradaki işler
- **Aile oyunları (ertelendi, Yusuf "şimdilik kalsın"):** SteamDB tarzı, büyük olasılıkla eklentiyle. Öneri: Steam mağaza sayfasında çalışan bookmarklet/userscript, sayfanın kendi token'ıyla aile kütüphanesini okur, panele yalnız AppID listesi gönderir. Önce Yusuf'un Chrome'unda izinle fizibilite denemesi.
- Alternatif (önerildi, karar yok): aile üyelerinin SteamID'lerinden herkese açık kütüphaneleri tarayıp başarımlı oyunları bulmak; "Steam ile giriş" ile ayarları sunucuda saklamak.
- Doğrulanmadı: başka kullanıcıların gizli oyunlarının görünmediği; başka hesaplar uçtan uca; istemcinin 429 sonrası tekrar denemesi; 503/15000 sınırları; Steamhunters'ta medyanı boş gelen oyunlar (Terraria, Voidigo, Wallpaper Engine) veri yokluğu mu hata mı.
- **Hata (açık):** profil değiştirince süreler yüklenmiyor; Yusuf kendi Steam oturumunda yaptıracak. Script anahtarları Apps Script Script Properties'e taşındı (değerler yerel gitignore'lu `.env`'de).
- Eski API key kullanılmaya devam (Yusuf kararı). Öneri: eski script'teki access token/sessionid'yi Steam'den çıkış yaparak geçersiz kılmak.
