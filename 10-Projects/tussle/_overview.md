---
type: project
project: tussle
date: 2026-10-09
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: oturum 2026-10-09 (mobil-playus: sohbet merkezli oda, kit, Parti A)
---

# Tussle: arkadaşlarla günlük mini oyun kapışması (Playus'un hafif rakibi)

> Durum kaynağı bu sayfa; canlı gerçek değildir, işlem öncesi repo/sunucudan doğrula.

## Nedir
Playus (`club.playus`, günlük 1 dk mini oyun + grup sezonu) benzeri ama **hiç kasmayan**, odası tamamen ayarlanabilir, canlı kapışma planlı bir mobil web oyunu. Hedef önce arkadaş grubu, sonra App Store + Google Play (global, ad Tussle). Repo `~/ZZ/zProjects/mobil-playus` (git, main; GitHub özel `zziroo/tussle`). Dokümanlar: `docs/DESIGN.md` (ürün), `docs/M0-PLAN.md` (teknik sözleşme), `docs/GAME-CONTRACT.md` (oyun ekleme), `docs/ARCHITECTURE.md`, `docs/POLISH.md`, `docs/AUTH-SETUP.md`, `docs/VISUAL.md` (görsel yönerge "Şeker Dükkanı").

## Teknoloji
- İstemci: saf TS + Vite + Canvas 2D, framework yok; menüler DOM (rAF yalnız oyunda). PWA (manifest + SW; SW `/api`'yi hiç önbelleklemez).
- Oyun sözleşmesi: 60 Hz sabit adım deterministik sim (`sim.ts`, DOM'suz) + `view.ts`; sim'de `Math.sin/cos/pow/hypot/random/Date` yasak (`shared/dmath`, `shared/rng`); adım başına sıfır tahsis; varsayılan 60 kare sınırı, "Yüksek kare hızı" ayarı.
- Sunucu: Node 24 + `ws` + `node:sqlite`, tek konteyner; girdi günlüğü sunucuda tekrar oynatılır, skor sunucuda hesaplanır (hile ve tekrar izleme). Oda kodu (4 harf), günün oyunu `mixSeed(oda, gün, sezon)`, deneme hakkı, sezon, sohbet + otomatik akış satırları, misafir kimliği + Google/Apple bağlama (JWT doğrulama `node:crypto`), günlük `VACUUM INTO` yedek.
- Oyunlar (10): M0 dörtlüsü (Refleks Işığı, Kule, Hızlı Matematik, Bıçak At) + Parti A (Renk Eşleşti, Çift Dokun, Işık Sırası, Terazi, Zıpla, Kutu Seç). Varyantlı; **oda parametresi yok**, denge kodda. Üretim kiti: `src/games/shell`, `npm run new-game`, `docs/GAME-CONTRACT.md`, yol haritası `docs/GAMES-ROADMAP.md`.
- i18n: TR/EN (`src/client/i18n`, `docs/I18N.md`); sunucu hata kodları; akış satırları yapısal.

## Güncel durum (2026-10-09; canlıdan doğrula)
**Yayında:** https://tussle.ziroo.net (VPS konteyner `tussle`, 127.0.0.1:8087, `/opt/tussle`, Caddy `hosts/tussle.caddy`, veri `/opt/tussle/data`, sırlar `/opt/tussle/.env`). Deploy: `bash deploy/deploy.sh`. Son yayın `bffcca0` (2026-10-09): oda ekranı **sohbet merkezli** (podyum şeridi, Tablo/Sezon/Üyeler alt sayfa, tepki + yanıt + emoji paneli, sezon çizgi grafiği, oyuncu kartı), **hareket paketi**, **TR/EN dil ayarı**, günün oyununa **deneme turu** (geçmiş gün antrenmanı kalktı), host paneli yeni dilde ve "hariç tutma" havuzu, **oyun üretim kiti**, **Parti A: 6 yeni oyun** (10 oyun), **deneme başına tohum** (ezber kapandı), günün oyunu rotasyonu (7 gün tekrar yok, aynı tür ≤2 gün). DB migration 4–6 uygulandı. 500 test yeşil. Google/Apple girişi kodda hazır, env yok (Yusuf OAuth client + Services ID, `docs/AUTH-SETUP.md`).

Gerçek telefon: hiçbir şey bu turdan sonra görülmedi. Önceki bilinen: 120 Hz'de dokunuşta kaçan kare (çözüm Capacitor'da sabit kare hızı), titreşim Xiaomi/Chrome'da hissedilmiyor.
Doğrulanmayanlar: klavye açıkken gönderme çubuğu (iOS/Android), uzun basma/sağa kaydırma jestleri, alt sayfa çekme (`pan-down` Android, iOS yalnız tutamak), View Transitions görünümü, Gece teması, İngilizce mod, 6 yeni oyun (özellikle Terazi'nin ilk sorusu anlaşılıyor mu, Çift Dokun tek elle, Zıpla 60/120 Hz), PWA ikon yenilenmesi, SW kaydı.

### Sıradaki işler
1. **Telefon turu** (yukarıdaki liste) + arkadaşlarla gerçek gün; açık sayfayı bir kez yenile (eski sayfa "yenile" hatası alır).
2. **Parti B** (6 oyun, karışık tür, basit + "bir tur daha", özgün-ama-basit serbest): listeyi Yusuf'a gösterip başla. Bütçe: parti ≈ haftalık limitin %5–7'si; 2026-10-09 itibarıyla hafta %80'de, büyük ihtimalle 2026-10-12 sonrası.
3. Kit açıkları: HUD rozeti metne göre genişlesin, `gradeSticker` meta/view hook'u olsun, `TextLabel.set` params tahsisi, GameClock'tan süre düşme yardımcısı, seçim düğmeleri yardımcısı, ScorePop tek pop tutuyor.
4. Sohbete GIF (Tenor/GIPHY anahtarı); sunucu takip: deneme başına skorlar, diğer oyuncuların serisi (oyuncu kartı için).
5. Canlı kapışma (M1) havuz 15–20 olunca: sohbetten kapışma kartı, 2–4 kişi ([[2026-10-09-oyun-uretim-kiti-ve-partiler]]). Sonra Parti Gecesi (M2).
6. Capacitor kabukları (sabit kare hızı) → kapalı test + TestFlight → mağaza; havuz 25+.
7. Ertelenen teknik: ID token nonce, CSP (satır içi tema + dil betiklerinin hash'i), pasif sözlük tembel yükleme (3. dilde), tepki toggle'ını idempotent yapma, `GET me` 30 odada ağırlaşabilir.

## Önemli kararlar
- [[2026-10-08-web-cekirdegi-capacitor-ve-ad-tussle]]
- [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]
- [[2026-10-08-gorsel-dil-neon-oyuncak-koyu-varsayilan]]
- [[2026-10-08-kule-salinim-parametresi-ve-migrasyon]]
- [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]] (neon oyuncak kararını geçersiz kıldı)
- [[2026-10-08-font-nunito-tek-aile]]
- [[2026-10-08-marka-maskotu-uclu-blok-ve-ikon]]
- [[2026-10-08-oyun-bitis-kuyrugu-runner]]
- [[2026-10-09-oda-parametreleri-kaldirildi-varyantlar-kalir]]
- [[2026-10-09-oda-ekrani-sohbet-merkezli]]
- [[2026-10-09-dil-altyapisi-tr-en]]
- [[2026-10-09-havuz-haric-tutma-listesi]]
- [[2026-10-09-oyun-uretim-kiti-ve-partiler]]
- [[2026-10-09-deneme-basina-tohum]]

## Dersler
- [[2026-10-08-tussle-m0-dersleri]]
- [[2026-10-08-cila-turu-dersleri]]
- [[2026-10-08-ui-yenileme-dersleri]]
- [[2026-10-09-parti-a-dersleri]]

## Oturumlar
- [[2026-10-08-tussle-tasarim-ve-m0-yayin]]
- [[2026-10-08-tussle-cila-turu-ve-tema]]
- [[2026-10-08-tussle-ui-yenileme-seker-dukkani]]
- [[2026-10-09-tussle-sohbet-merkezli-oda-kit-ve-parti-a]]

## İlgili
Aynı VPS ve Caddy: [[10-Projects/kapis/_overview|KAPIŞ]] (ws sunucu kalıbı buradan), [[10-Projects/diskort/_overview|Diskort]]. Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]].
