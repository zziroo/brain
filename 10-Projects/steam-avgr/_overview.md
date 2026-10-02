---
type: project
project: steam-avgr
date: 2026-10-03
status: active
tags: [steam-avgr, overview, steam]
source: oturum 2026-10-02 (steam-avgr-calculator)
---

# Steam AGCR Paneli: Steam'deki ortalama oyun tamamlama oranının nereden geldiğini gösteren herkese açık web paneli

> Not canlı gerçek değildir: sunucu ve konteyner durumunu işlem yapmadan önce doğrula.

## Nedir
Yusuf'un eski Google Sheets + Apps Script hesaplayıcısının (`script.py`, yavaş, oyunları tek tek çekiyordu) yerine geçen panel. Herkes SteamID / vanity / profil linki girip kullanabilir. Steam profilindeki AGCR ile hesaplananı karşılaştırır, oyun başına katkı, "şunu bitirirsem" hesabı, en ucuz bitirilecek oyunlar, elle eksik oyun ekleme ve oyun hariç tutma (localStorage) sunar.

## Teknoloji
- Kaynak `C:\Users\yusuf\ZZ\zProjects\steam-avgr-calculator\app` (git yok). Node 22, bağımlılık yok (`server.js` + `public/`), Dockerfile.
- Hız: `IPlayerService/GetTopAchievementsForGames` ile 20 oyun/istek, paralel; ~2,5 sn soğuk. Sonuç 10 dk önbellek.
- Sınırlar: IP başına 20 istek/dk, aynı anda 4 hesaplama, 15000 oyun üstü red, önbellek 200 kayıt.
- Yayın: https://diskort.ziroo.net/tools/steam → konteyner `steam-avgr` (127.0.0.1:8090), Caddy yolu `/opt/ziroo-sites/steam.caddy` ([[2026-10-02-caddy-ortak-site-klasoru]]). Key sunucuda `/etc/steam-avgr.env`. Ayrıntı: [[sunucu-vps]].

## Kararlar
- [[2026-10-02-caddy-ortak-site-klasoru]]
- Eski script'teki oyun gizleme (access token ile) taşınmadı.

## Oturumlar
- [[2026-10-02-steam-agcr-paneli-yayinda]]

## Güncel durum (2026-10-03)
Yayında. Yusuf'un hesabı: Steam 192 oyun / 133 tam / 6761 başarım / %86; panel 196 / 134 / 6825 / %86,13. 2 fark "unvetted" oyun (Bloody Hell, KANNAGI USAGI), kalan 2 oyun ve 64 başarım açıklanmadı. Eski script'te elle eklenen oyunlar (Awaria, RISK...) `include_played_free_games=1` ile API'den geliyor.

## Sıradaki işler
- Doğrulanmadı: başka hesaplar, gizli profil, vitrini olmayan profil; hariç tut / ekle / what-if butonları tarayıcıda tıklanmadı; 503 ve 15000 sınırı, SSE kopma ve ping denenmedi; `GetTopAchievementsForGames` yalnız bir oyunda `GetPlayerAchievements` ile karşılaştırıldı.
- Yusuf karar verdi: eski API key kullanılmaya devam. Öneri duruyor: `script.py`'deki access token/sessionid'yi Steam'den çıkış yaparak geçersiz kılmak.
- Caddy'yi ayrı edge projesine taşımak (ertelendi, ayrı iş).
