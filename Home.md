---
type: home
date: 2026-10-17
---

# Home: ikinci beyin haritası

Buradan başla. Her şey buradan ya da bir projenin `_overview.md` dosyasından bulunabilmeli.

## Projeler
- [[10-Projects/tussle/_overview|Tussle]]: arkadaşlarla günlük mini oyun kapışması, Playus'un hafif rakibi (TS + Canvas PWA, Node ws, sunucuda tekrar oynatma), tussle.ziroo.net; mağaza hedefi
- [[10-Projects/bal-vadisi/_overview|Bal Vadisi]]: 2D arı/çayır temalı incremental oyun (Canvas, derleme yok), games.ziroo.net/bal-vadisi
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]: fenerle karanlık vadiye koşular yapılan koşu-tabanlı incremental oyun (Canvas, derleme yok), games.ziroo.net/isik-bekcisi
- [[10-Projects/diskort/_overview|Diskort]]: sesli sohbet uygulaması (Windows-first, kendi sunucusu)
- [[10-Projects/kul-tahti/_overview|Kül Tahtı]]: tarayıcıda souls-like 3D boss savaşı demosu (Three.js, derleme yok)
- [[10-Projects/kapis/_overview|KAPIŞ]]: tarayıcıda Overwatch tarzı 3D hero-shooter, arkadaş grubu için (three.js + Node ws, otoriteli sunucu)
- [[10-Projects/trencheck/_overview|Trencheck]]
- [[10-Projects/voice-detector/_overview|Voice Detector]]
- [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]]: oyun lokalizasyon dosyaları ↔ Excel masaüstü aracı (Electron), tools.ziroo.net/ceviri-araci
- [[10-Projects/steam-avgr/_overview|Steam AGCR Paneli]]: Steam ortalama tamamlama oranı paneli, tools.ziroo.net/steam-avgr
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]: Steam rehberlerini okunur gösterir, AI ile başarım kartlarına çevirir, tools.ziroo.net/rehber
- [[10-Projects/ziroobank/_overview|Ziroobank]]: arkadaş grubu taksit takibi (eski Google Sheet), tools.ziroo.net/ziroobank
- [[10-Projects/song-finder/_overview|Song Finder]]: link verilen şarkıya sesi gerçekten benzeyen şarkıları bulan kişisel araç (tools.ziroo.net/song-finder)
- [[10-Projects/pano/_overview|Pano]]: bütün Claude Code geçmişinin (Mac + Windows) animasyonlu dashboard'u; token, maliyet, oturum oynatıcı, akışlar. `/pano`, claude.ai'de özel Artifact kopyası
- [[10-Projects/kripto-bot/_overview|Kripto Bot]]: Binance Global'de ~500 USD ile otonom spot trading botu (Python + ccxt önerisi); karar kodda, Claude kurucu ve salt okunur gözetmen; henüz kod yok
- [[10-Projects/pdf-ceviri/_overview|PDF Çeviri Düzeltici]]: Trados'un bozuk Türkçe DOCX'ini orijinal PDF düzenine yerleştirir, tools.ziroo.net/pdf-ceviri
- [[10-Projects/silksong-mod/_overview|Silksong modu]]: Hollow Knight: Silksong için özgün boss modu, Team Cherry kalitesi hedefi
- [[10-Projects/ziroo-edge/_overview|ziroo-edge]]: sunucunun giriş kapısı (Caddy), ziroo.net ana sayfası, tools/games listeleri, ops katmanı (Uptime Kuma, Netdata)
- [[10-Projects/marka/_overview|Marka]]: ziroo markası ve Ziroo maskotu (süzülen sıfır, halka gözler); kod klasörü yok

## Altyapı
- [[10-Projects/ziroo-edge/_overview|ziroo-edge]]: sunucunun giriş kapısı (Caddy), joker DNS ve tools/games alt alan adları, ziroo.net ana sayfası ve listeler, makine izleme `ops.ziroo.net` (Uptime Kuma + Netdata)
- [[vps-makinesi]]: paylaşılan VPS: makine, `ssh vps` erişimi, bakım, DNS, projelerin yerleşimi, izleme (Diskort'a özgü kısım: [[sunucu-vps]])
- [[proje-altyapi-standardi|Proje altyapı standardı]]: her uygulama ne sunar (/healthz, konteyner, yedek, admin paneli bölümleri), Kuma'ya nasıl kaydedilir, makine bilgisi nerede durur
- **Felaket kurtarma (yedek + kasa):** [[2026-10-17-felaket-kurtarma-yedegi]]
- `20-Areas/altyapi/` kararları: [[sunucu-lightnode-istanbula-tasindi]] · [[ssh-yalnizca-anahtar-ile]] · [[2026-10-15-sunucu-bakim-penceresi-07-30]] · [[2026-10-16-ziroo-net-posta-catch-all-ayri-kural-yok]]

## Alanlar
- [[20-Areas/working-rules/_index|Çalışma kuralları]]: Claude ile nasıl çalışıyoruz (orkestrasyon, inceleme kapısı, karar dağılımı)
- [[mac-gecisi-kontrol-listesi]]: **Windows → Mac geçişi (2026-10-05).** Mac'teki ilk oturum bu listeyi işler
- [[2026-10-07-windows-makinesi-yalniz-silksong-icin]]: **Windows makinesi 2026-10-07'den beri yalnız Silksong modu (LoRA eğitimi) için**; diğer işler Mac'te
- [[xiaomi-17-pro]]: Yusuf'un telefonu (Çin modeli, xiaomi.eu ROM, 2026-10-14'ten beri); durum, runbook; bildirim gecikmesi 2026-10-15'te Shizuku + FCM Fix ile çözüldü; açık iş: gerçek IMEI'nin BTK kaydı

## Kaynaklar
- `30-Resources/`: kalıcı bilgi ve rehberler
- [[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]]: koşu-tabanlı incremental türünün kalıbı (Shelldiver, Rock Bottom) ve oyuncu şikâyetleri
- [[30-Resources/oyun-tasarimi/_index|Oyun tasarımı dersleri]]: döngüler, zorluk, his, tempo; Işık Bekçisi örnekleriyle
- [[genex-desktop-oyunu-insansiz-dogrulama-yontemleri]]: Genex Desktop (AI ile oyun yapan uygulama) oyunu insan oynamadan nasıl doğruluyor: test kancası, hareket şeridi, kör hakemler, saçma kontrol maddesi
- [[2026-10-05-windows-donemi-token-ozeti]]: Windows dönemi Claude kullanımı (API karşılığı yaklaşık 3.713 $, model ve proje bazında)
- [[2026-10-10-ajan-token-analizi]]: ajan maliyetinin kaynağı bağlam boyutu; son 7 gün karşılaştırması ve efor (2026-10-10)
- [[2026-10-06-graphify-ve-ponytail-incelemesi]]: Graphify tek projede ölçerek denenebilir (henüz denenmedi); Ponytail yerine CLAUDE.md kuralı
- [[2026-10-09-context-mode-incelemesi]]: Context Mode eklentisi kurulmadı (alt ajanları engelliyor, auto mode ile çakışıyor); yalnız MCP olarak denenebilir

## Arşiv
- [[90-Archive/old-claude-memory/_index|Eski Claude hafıza klasörleri]]

## Bakım
- Yapı ve yazma kuralları: [[CLAUDE]]
