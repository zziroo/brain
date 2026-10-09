---
type: project
project: tussle
date: 2026-10-09
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: oturum 2026-10-09 (mobil-playus: Parti B + C, deneme hakkı ayırma, şans hakkı, skor ölçüleri)
---

# Tussle: arkadaşlarla günlük mini oyun kapışması (Playus'un hafif rakibi)

> Durum kaynağı bu sayfa; canlı gerçek değildir, işlem öncesi repo/sunucudan doğrula.

## Nedir
Playus (`club.playus`, günlük 1 dk mini oyun + grup sezonu) benzeri ama **hiç kasmayan**, odası tamamen ayarlanabilir, canlı kapışma planlı bir mobil web oyunu. Hedef önce arkadaş grubu, sonra App Store + Google Play (global, ad Tussle). Repo `~/ZZ/zProjects/mobil-playus` (git, main; GitHub özel `zziroo/tussle`). Dokümanlar: `docs/DESIGN.md` (ürün), `docs/M0-PLAN.md` (teknik sözleşme), `docs/GAME-CONTRACT.md` (oyun ekleme), `docs/ARCHITECTURE.md`, `docs/POLISH.md`, `docs/AUTH-SETUP.md`, `docs/VISUAL.md` (görsel yönerge "Şeker Dükkanı").

## Teknoloji
- İstemci: saf TS + Vite + Canvas 2D, framework yok; menüler DOM (rAF yalnız oyunda). PWA (manifest + SW; SW `/api`'yi hiç önbelleklemez).
- Oyun sözleşmesi: 60 Hz sabit adım deterministik sim (`sim.ts`, DOM'suz) + `view.ts`; sim'de `Math.sin/cos/pow/hypot/random/Date` yasak (`shared/dmath`, `shared/rng`); adım başına sıfır tahsis; varsayılan 60 kare sınırı, "Yüksek kare hızı" ayarı.
- Sunucu: Node 24 + `ws` + `node:sqlite`, tek konteyner; girdi günlüğü sunucuda tekrar oynatılır, skor sunucuda hesaplanır (hile ve tekrar izleme). Oda kodu (4 harf), günün oyunu `mixSeed(oda, gün, sezon)`, deneme hakkı, sezon, sohbet + otomatik akış satırları, misafir kimliği + Google/Apple bağlama (JWT doğrulama `node:crypto`), günlük `VACUUM INTO` yedek.
- Oyunlar (22): M0 dörtlüsü + Parti A (6) + Parti B (Sek Sek, Karşıya Geç, Sayı Zinciri, Farklı Olan, Yüksek mi Alçak mı, Hızlı Fren) + Parti C (Top Nerede, Kart Çevir, Şeker Avı, Balon, Şeker Yağmuru, Denge). Varyantlı; **oda parametresi yok**, denge kodda. Meta: `gesture` (hayalet el), `score {unit, decimals, better}` (doğal ölçü). Üretim kiti: `src/games/shell`, `npm run new-game`, `docs/GAME-CONTRACT.md`, yol haritası `docs/GAMES-ROADMAP.md`.
- i18n: TR/EN (`src/client/i18n`, `docs/I18N.md`); sunucu hata kodları; akış satırları yapısal.

## Güncel durum (2026-10-09; canlıdan doğrula)
**Yayında:** https://tussle.ziroo.net (VPS konteyner `tussle`, 127.0.0.1:8087, `/opt/tussle`, Caddy `hosts/tussle.caddy`, veri `/opt/tussle/data`, sırlar `/opt/tussle/.env`). Deploy: `bash deploy/deploy.sh`. Son yayın `9dab21c` (2026-10-09), DB sürümü 10 (migrasyon 7 deneme ayırma, 8 şans hakkı, 9 günün kuralları, 10 skor yeniden hesaplama). Yayın öncesi yedekler `/opt/tussle/data/pre-037f08d.db`, `pre-9dab21c.db`. 857 test yeşil.
- Başlangıç: kartta hayalet el + renkli hareket kelimeleri, yalnız "Başla" düğmesi, sonra sahanın üstünde 3-2-1.
- Deneme "Başla"da sunucuda ayrılır; oyunda çıkış yok; gün tohumu istemciye gitmez; outbox; şans hakkı (yazı tura).
- Puanlama sabit (en iyi, 10/7/5/3); deneme sayısı + şans hakkı günün ilk denemesinde donar.
- Skor doğal ölçü (ms, kat, tur, sn, adım, şeker, top; diğerleri puan + ikincil ölçü).
- Google/Apple girişi kodda hazır, env yok (`docs/AUTH-SETUP.md`).

Gerçek telefon: Parti B'nin ilk hali görüldü (geri bildirimle Sek Sek, Hızlı Fren, Top Nerede, Şeker Yağmuru, Karşıya Geç ipucu düzeltildi). **Bu son yayının hiçbir parçası telefonda görülmedi.**
Doğrulanmayanlar: hayalet el boyutu/hızı, 3-2-1 animasyonu, Android geri tuşu ve arka plan/kapatma akışı, outbox (uçak modu), şans hakkı para dönüşü (iOS), Sek Sek sis + top gecikmesi, Hızlı Fren hızlanması, Top Nerede hızı, Şeker Yağmuru başparmak hissi, Balon sertliği (iyi oyuncu balonların ~yarısını patlatıyor), Kart Çevir 0,6 sn, Denge/Şeker Avı genel his, 120 Hz akıcılık.

### Sıradaki işler
1. **Telefon turu** (yukarıdaki liste); hak harcamadan deneme: `https://tussle.ziroo.net/#/oyun/<id>`.
2. Şeker Yağmuru kapağı (sepet artık yukarıda; kapakta altta).
3. Görünümü yetişkinleştirme (konuşuldu, ertelendi): önce palet + yazı tipi + kabukta yüz aç/kapa ile 2–3 oyunda örnek; sonra partiler halinde. Maliyet: renk/yazı ucuz, yüzler ≈ bir parti.
4. Kit açıkları: HUD rozeti metne göre genişlesin, `gradeSticker` hook'u, `TextLabel.set` tahsisi, seçim düğmeleri yardımcısı, ScorePop tek pop; 360×640'ta skor çarpıyla çakışıyor.
5. Şüpheli koşu bayrakları (kutu, yuksek, refleks) hiçbir yerde kullanılmıyor; istenirse tablodan ayırma.
6. Sohbete GIF; canlı kapışma (M1, havuz 22 ≥ 15–20 şartı sağlandı); sonra Parti Gecesi (M2).
7. Capacitor kabukları → TestFlight → mağaza (havuz 25+).
8. Ertelenen teknik: ID token nonce, CSP, pasif sözlük tembel yükleme, tepki toggle idempotent, `GET me` 30 odada.

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
- [[2026-10-09-deneme-basina-tohum]] (eskidi)
- [[2026-10-09-deneme-hakki-baslangicta-ayrilir]]
- [[2026-10-09-gizli-cekilisler-yalniz-tohumdan]]
- [[2026-10-09-sans-hakki-yazi-tura]]
- [[2026-10-09-puanlama-sabit-gunun-kurallari-donar]]
- [[2026-10-09-skor-dogal-olcu]]
- [[2026-10-09-baslangic-karti-basla-dugmesi-ve-sayac]]
- [[2026-10-09-sure-siniri-yerine-sonsuz-hizlanan]]

## Dersler
- [[2026-10-08-tussle-m0-dersleri]]
- [[2026-10-08-cila-turu-dersleri]]
- [[2026-10-08-ui-yenileme-dersleri]]
- [[2026-10-09-parti-a-dersleri]]
- [[2026-10-09-parti-b-c-dersleri]]

## Oturumlar
- [[2026-10-08-tussle-tasarim-ve-m0-yayin]]
- [[2026-10-08-tussle-cila-turu-ve-tema]]
- [[2026-10-08-tussle-ui-yenileme-seker-dukkani]]
- [[2026-10-09-tussle-sohbet-merkezli-oda-kit-ve-parti-a]]
- [[2026-10-09-tussle-parti-b-c-deneme-hakki-ve-skor]]

## İlgili
Aynı VPS ve Caddy: [[10-Projects/kapis/_overview|KAPIŞ]] (ws sunucu kalıbı buradan), [[10-Projects/diskort/_overview|Diskort]]. Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]].
