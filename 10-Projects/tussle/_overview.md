---
type: project
project: tussle
date: 2026-10-08
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: oturum 2026-10-08 (mobil-playus, M0 inşa ve yayın)
---

# Tussle: arkadaşlarla günlük mini oyun kapışması (Playus'un hafif rakibi)

> Durum kaynağı bu sayfa; canlı gerçek değildir, işlem öncesi repo/sunucudan doğrula.

## Nedir
Playus (`club.playus`, günlük 1 dk mini oyun + grup sezonu) benzeri ama **hiç kasmayan**, odası tamamen ayarlanabilir, canlı kapışma planlı bir mobil web oyunu. Hedef önce arkadaş grubu, sonra App Store + Google Play (global, ad Tussle). Repo `~/ZZ/zProjects/mobil-playus` (git, main). Dokümanlar: `docs/DESIGN.md` (ürün), `docs/M0-PLAN.md` (teknik sözleşme), `docs/GAME-CONTRACT.md` (oyun ekleme), `docs/ARCHITECTURE.md`, `docs/POLISH.md`, `docs/AUTH-SETUP.md`.

## Teknoloji
- İstemci: saf TS + Vite + Canvas 2D, framework yok; menüler DOM (rAF yalnız oyunda). PWA (manifest + SW; SW `/api`'yi hiç önbelleklemez).
- Oyun sözleşmesi: 60 Hz sabit adım deterministik sim (`sim.ts`, DOM'suz) + `view.ts`; sim'de `Math.sin/cos/pow/hypot/random/Date` yasak (`shared/dmath`, `shared/rng`); adım başına sıfır tahsis; varsayılan 60 kare sınırı, "Yüksek kare hızı" ayarı.
- Sunucu: Node 24 + `ws` + `node:sqlite`, tek konteyner; girdi günlüğü sunucuda tekrar oynatılır, skor sunucuda hesaplanır (hile ve tekrar izleme). Oda kodu (4 harf), günün oyunu `mixSeed(oda, gün, sezon)`, deneme hakkı, sezon, sohbet + otomatik akış satırları, misafir kimliği + Google/Apple bağlama (JWT doğrulama `node:crypto`), günlük `VACUUM INTO` yedek.
- Oyunlar (M0): Refleks Işığı, Kule, Hızlı Matematik, Bıçak At; her biri varyantlı ve host panelinde parametreli.

## Güncel durum (2026-10-08; canlıdan doğrula)
**Yayında:** https://tussle.ziroo.net (VPS konteyner `tussle`, 127.0.0.1:8087, `/opt/tussle`, Caddy `hosts/tussle.caddy`, veri `/opt/tussle/data`, sırlar `/opt/tussle/.env`). Deploy: `bash deploy/deploy.sh`. Son yayın `710dd91`, 211 test yeşil. Google/Apple girişi kodda hazır, env yok (Yusuf OAuth client + Services ID oluşturacak, `docs/AUTH-SETUP.md`). iOS Simulator'da gerçek WebKit ile uçtan uca doğrulandı (iPhone skoru = sunucu tekrarı).

Gerçek telefon (Xiaomi 17 Pro, Chrome): oyun 0,6 ms/kare; dokunuşta kaçan kare telefonun 60↔120 Hz geçişinden (sabit 60 Hz ile kayboldu), çözüm mağaza sürümünde sabit kare hızı. Doğrulanmayanlar: Android titreşim, 120 Hz algılama, SW kaydı (gömülü panelde başarısızdı), Google/Apple gerçek giriş, arkadaşlarla oyun.

### Sıradaki işler
1. Görsel yönerge + arayüz ve 4 oyuna cila turu (Yusuf görsel yönü Claude'a bıraktı; "oyuncak" yumuşak şekiller, yüzler, squash-stretch, bütçeli parçacık).
2. Kule zorluk ayarı ve `docs/POLISH.md` maddeleri; gerçek telefon ölçümü (`?debug=1`).
3. Canlı kapışma (M1 hayalet katmanı), sonra Parti Gecesi (M2).
4. Capacitor kabukları → Google kapalı test (12 kişi, 14 gün) + TestFlight → mağaza listeleri (ikon, ekran görüntüsü, gizlilik politikası), paylaşım kartı, puan isteme.
5. Ertelenen güvenlik: ID token nonce, CSP.

## Önemli kararlar
- [[2026-10-08-web-cekirdegi-capacitor-ve-ad-tussle]]
- [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]

## Dersler
- [[2026-10-08-tussle-m0-dersleri]]

## Oturumlar
- [[2026-10-08-tussle-tasarim-ve-m0-yayin]]

## İlgili
Aynı VPS ve Caddy: [[10-Projects/kapis/_overview|KAPIŞ]] (ws sunucu kalıbı buradan), [[10-Projects/diskort/_overview|Diskort]]. Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]].
