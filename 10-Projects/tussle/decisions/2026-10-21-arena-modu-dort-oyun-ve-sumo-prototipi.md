---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, arena, canli-kapisma, oyunlar, karar]
source: Claude Code oturumu "tussle: arena oyunları seçimi" (2026-10-21)
---

# Arena (ortak dünya) modu: ilk dört oyun Sumo, Trails, Crown, Paint; önce Sumo prototipi

## Bağlam
DESIGN.md §5.2'deki "ortak dünya katmanı" (sunucu tek dünyayı simüle eder, herkes aynı arenada) 10 Ekim'den beri "sonra" listesindeydi. Yusuf: "ilk etapta 4 oyun ayarla, aynı arenada oynanacak; pazar araştırması yap, aklımda fikir yok." Pazar taraması (blog/mağaza sayfaları, zayıf kaynaklar) dört kalıp gösterdi: alandan düşürme (Bumper Balls, King of Opera), iz bırakan yılan/ışık izi (Slither, Snake.io, Tron), alan kapma (Paper.io, Hole.io), süre tutma/kapmaca (Fall Guys Tail Tag, BombSquad KotH). Playus'ta canlı arena yok (herkes aynı oyunu kendi başına oynuyor).

## Karar
- **Dört oyun (Yusuf onayı 2026-10-21):** Sumo (dokun = o yöne hamle, daralan platform, son kalan), Trails (kaydır = dön, iz duvar, son kalan), Crown (Sumo motoru, tacı en uzun taşıyan, 45 sn), Paint (Trails motoru, en çok kare boyayan, 45 sn). İki motor × iki skor türü (eleme + skor çifti). Belge: repo `docs/ARENA-GAMES.md`.
- **Model (repo `docs/ARENA-PLAN.md`):** sunucu otoritesi 30 Hz, istemci yalnız niyet gönderir (`ain`), sunucu 15 Hz snapshot (`ast`) yayınlar, istemci 100 ms geriden enterpolasyon + yerel "çömelme" ön izlemesi. Tekrar oynatma/doğrulama yok. Mevcut kapışma kartı aynen; arena kimlikleri ayrı kayıt defterinde (`src/shared/arena/registry.ts`), günlük havuza/partiye/Rastgele'ye girmez. Sezona sayılmaz (M1 kuralı).
- **Sumo prototipi yayında değil, main'de (`e9574bd`):** çıkan/kopan 3 sn sonra düşer (forfeit), takılma sonrası yetişme 6 tick ve ofset, sunucu yeniden başlayınca canlı arena maçları iptal. Hamle: `dashSpeed` 0,035, `friction` 0,93 (ilk 0,07/0,965 tek hamlede platformun çapı kadar kaydırıyordu; ajan buldu, düzeltildi).
- **Bu turda yok:** izleme, parti, rozet, kapak görseli (varsayılan kapak), istemci tahmini.

## Neden
- Elenen oyuncu uzun süre seyirci kalmasın diye eleme ve skor oyunları çift; iki motor sonraki oyunları ucuzlatır.
- Hiçbir oyunda 100 ms fark kazananı belirlemesin: girdi ayrık (yön/hamle), kurulum süresi gecikmeyi gizler.
- Sunucu otoritesi hile kapısını kapatır; sim zaten deterministik olduğu için izleme/tekrar sonra eklenebilir.

## Reddedilen alternatifler
- Zemin çökmesi (Hex-A-Gone tipi): çok sevilir ama gecikmede sinir bozucu (Fall Guys anketi). İkinci parti.
- Halat çekme (hızlı dokunma): gecikmesiz ama "aynı arenada" hissi zayıf. Parti Gecesi doldurucusu.
- Çarpışan Toplar: Sumo varyantı, ayrı oyun değil.
- Arena oyunlarını `src/games` kayıt defterine koymak: günlük havuza sızardı; ayrı defter seçildi.

## Sonuçlar / riskler
- Telefonda iki cihazla his teyidi yapılmadı (Claude tarayıcı + bot ile oynadı).
- Sunucu yeniden başlarsa canlı arena maçı kaybolur (bellekte); kabul.
- Aynı tick'te çıkan (outBy=0) gerçekten düşenin önüne geçebilir; prototipte kabul (§4.1).
- Çalışma kopyasında başka bir oturumun (swing silme, chain/cups/brake/stop-wheel) commit edilmemiş işi vardı; arena commit'i yalnız kendi hunk'larını aldı.

## İlgili
- [[2026-10-10-canli-kapisma-lobi-karti]], [[2026-10-11-canli-kapisma-tek-seferlik-kosu]], [[2026-10-10-tussle-canli-kapisma-m1]]
- [[2026-10-21-tussle-arena-sumo-prototipi]]
