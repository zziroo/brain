---
type: project
project: tussle
date: 2026-10-08
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: oturum 2026-10-08 gece (mobil-playus, UI yenileme Şeker Dükkanı)
---

# Tussle: arkadaşlarla günlük mini oyun kapışması (Playus'un hafif rakibi)

> Durum kaynağı bu sayfa; canlı gerçek değildir, işlem öncesi repo/sunucudan doğrula.

## Nedir
Playus (`club.playus`, günlük 1 dk mini oyun + grup sezonu) benzeri ama **hiç kasmayan**, odası tamamen ayarlanabilir, canlı kapışma planlı bir mobil web oyunu. Hedef önce arkadaş grubu, sonra App Store + Google Play (global, ad Tussle). Repo `~/ZZ/zProjects/mobil-playus` (git, main; GitHub özel `zziroo/tussle`). Dokümanlar: `docs/DESIGN.md` (ürün), `docs/M0-PLAN.md` (teknik sözleşme), `docs/GAME-CONTRACT.md` (oyun ekleme), `docs/ARCHITECTURE.md`, `docs/POLISH.md`, `docs/AUTH-SETUP.md`, `docs/VISUAL.md` (görsel yönerge "Şeker Dükkanı").

## Teknoloji
- İstemci: saf TS + Vite + Canvas 2D, framework yok; menüler DOM (rAF yalnız oyunda). PWA (manifest + SW; SW `/api`'yi hiç önbelleklemez).
- Oyun sözleşmesi: 60 Hz sabit adım deterministik sim (`sim.ts`, DOM'suz) + `view.ts`; sim'de `Math.sin/cos/pow/hypot/random/Date` yasak (`shared/dmath`, `shared/rng`); adım başına sıfır tahsis; varsayılan 60 kare sınırı, "Yüksek kare hızı" ayarı.
- Sunucu: Node 24 + `ws` + `node:sqlite`, tek konteyner; girdi günlüğü sunucuda tekrar oynatılır, skor sunucuda hesaplanır (hile ve tekrar izleme). Oda kodu (4 harf), günün oyunu `mixSeed(oda, gün, sezon)`, deneme hakkı, sezon, sohbet + otomatik akış satırları, misafir kimliği + Google/Apple bağlama (JWT doğrulama `node:crypto`), günlük `VACUUM INTO` yedek.
- Oyunlar (M0): Refleks Işığı, Kule, Hızlı Matematik, Bıçak At; her biri varyantlı ve host panelinde parametreli.

## Güncel durum (2026-10-08 gece; canlıdan doğrula)
**Yayında:** https://tussle.ziroo.net (VPS konteyner `tussle`, 127.0.0.1:8087, `/opt/tussle`, Caddy `hosts/tussle.caddy`, veri `/opt/tussle/data`, sırlar `/opt/tussle/.env`). Deploy: `bash deploy/deploy.sh`. Son yayın `0404284` (2026-10-08 gece): görsel kimlik **"Şeker Dükkanı"** (krem zemin, konturlu sticker kartlar, magenta tek düğme; Gündüz varsayılan, Gece seçenek), Nunito, 4 SVG oyun kapağı + maskotlar, marka üçlüsü (ikon + uygulama içi, ruh hâlleri ve yükleme animasyonu), ekranlar baştan (ana sayfa tek `GET me`, oda konuşma balonu + podyum, alt sayfalar, sonuç kartı skor sayma), oyun bitiş kuyruğu, sunucu oda özeti + sezon önbelleği. 268 test yeşil. Google/Apple girişi kodda hazır, env yok (Yusuf OAuth client + Services ID oluşturacak, `docs/AUTH-SETUP.md`).

Gerçek telefon (Xiaomi 17 Pro, Chrome, önceki tur): 60 Hz kilitli ekranda sorunsuz; 120 Hz'de dokunuşta kaçan kare (telefonun 60↔120 geçişi, çözüm mağaza sürümünde sabit kare hızı). **Yeni arayüz telefonda hiç görülmedi.** Doğrulanmayanlar: Türkçe karakterler gerçek cihazda, alt sayfa klavye/aşağı çekme, PWA ikonunun yenilenmesi (ana ekrandan silip eklemek gerekebilir), Android titreşim, SW kaydı, Google/Apple gerçek giriş, Kule'nin elle zorluğu.

### Sıradaki işler
1. Telefonda yeni arayüz turu (Gündüz/Gece, Türkçe karakter, sheet'ler, oyun bitişleri); arkadaşlarla gerçek gün; `docs/POLISH.md` kalanları.
2. UI eksikleri: oyuncu detay alt sayfası (podyum/tabloya tıklayınca), Sezon sekmesinde çizgi grafik, host paneli içeriğinin yeni dile geçmesi.
3. Canlı kapışma (M1 hayalet katmanı), sonra Parti Gecesi (M2).
4. Capacitor kabukları (sabit kare hızı burada) → Google kapalı test (12 kişi, 14 gün) + TestFlight → mağaza listeleri, paylaşım kartı, puan isteme.
5. Pazarlama planı (sohbette uzlaşıldı, karar değil): yumuşak çıkış TR, uygulama içi viral döngü, ASO, kısa dikey videolar.
6. Ertelenen güvenlik: ID token nonce, CSP (satır içi tema betiğinin hash'i gerekir). Titreşim Xiaomi/Chrome'da hissedilmedi. `GET me` 30 odada ağırlaşabilir (sezon önbelleği var, gün satırı okuma; gerekirse ileri önbellek).

## Önemli kararlar
- [[2026-10-08-web-cekirdegi-capacitor-ve-ad-tussle]]
- [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]
- [[2026-10-08-gorsel-dil-neon-oyuncak-koyu-varsayilan]]
- [[2026-10-08-kule-salinim-parametresi-ve-migrasyon]]
- [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]] (neon oyuncak kararını geçersiz kıldı)
- [[2026-10-08-font-nunito-tek-aile]]
- [[2026-10-08-marka-maskotu-uclu-blok-ve-ikon]]
- [[2026-10-08-oyun-bitis-kuyrugu-runner]]

## Dersler
- [[2026-10-08-tussle-m0-dersleri]]
- [[2026-10-08-cila-turu-dersleri]]
- [[2026-10-08-ui-yenileme-dersleri]]

## Oturumlar
- [[2026-10-08-tussle-tasarim-ve-m0-yayin]]
- [[2026-10-08-tussle-cila-turu-ve-tema]]
- [[2026-10-08-tussle-ui-yenileme-seker-dukkani]]

## İlgili
Aynı VPS ve Caddy: [[10-Projects/kapis/_overview|KAPIŞ]] (ws sunucu kalıbı buradan), [[10-Projects/diskort/_overview|Diskort]]. Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]].
