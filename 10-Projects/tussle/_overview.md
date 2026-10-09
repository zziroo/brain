---
type: project
project: tussle
date: 2026-10-09
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: oturum 2026-10-09 (mobil-playus: Parti D-E-F, canlandırma, beceri öncelikli havuz)
---

# Tussle: arkadaşlarla günlük mini oyun kapışması (Playus'un hafif rakibi)

> Durum kaynağı bu sayfa; canlı gerçek değildir, işlem öncesi repo/sunucudan doğrula.

## Nedir
Playus (`club.playus`, günlük 1 dk mini oyun + grup sezonu) benzeri ama **hiç kasmayan**, odası tamamen ayarlanabilir, canlı kapışma planlı bir mobil web oyunu. Hedef önce arkadaş grubu, sonra App Store + Google Play (global, ad Tussle). Repo `~/ZZ/zProjects/mobil-playus` (git, main; GitHub özel `zziroo/tussle`). Dokümanlar: `docs/DESIGN.md` (ürün), `docs/M0-PLAN.md` (teknik sözleşme), `docs/GAME-CONTRACT.md` (oyun ekleme), `docs/ARCHITECTURE.md`, `docs/POLISH.md`, `docs/AUTH-SETUP.md`, `docs/VISUAL.md` (görsel yönerge "Şeker Dükkanı").

## Teknoloji
- İstemci: saf TS + Vite + Canvas 2D, framework yok; menüler DOM (rAF yalnız oyunda). PWA (manifest + SW; SW `/api`'yi hiç önbelleklemez).
- Oyun sözleşmesi: 60 Hz sabit adım deterministik sim (`sim.ts`, DOM'suz) + `view.ts`; sim'de `Math.sin/cos/pow/hypot/random/Date` yasak (`shared/dmath`, `shared/rng`); adım başına sıfır tahsis; varsayılan 60 kare sınırı, "Yüksek kare hızı" ayarı.
- Sunucu: Node 24 + `ws` + `node:sqlite`, tek konteyner; girdi günlüğü sunucuda tekrar oynatılır, skor sunucuda hesaplanır (hile ve tekrar izleme). Oda kodu (4 harf), günün oyunu `mixSeed(oda, gün, sezon)`, deneme hakkı, sezon, sohbet + otomatik akış satırları, misafir kimliği + Google/Apple bağlama (JWT doğrulama `node:crypto`), günlük `VACUUM INTO` yedek.
- Oyunlar (40 kayıtlı, 36 günlük havuzda): M0 dörtlüsü + Parti A–C (18) + Parti D (Doğru Kapı, Örüntü, İp Atla, Fırlat, Çarkı Durdur, Hazine Haritası) + Parti E (Şeker Vinci, Gizli Geçit, Piñata; Plinko, Zar Kulesi, Salyangoz havuz dışı) + Parti F (Şifre Kır, Kaç Tane, Çizgi Takip, Bardak Doldur, Şeker Ritmi; Jeton İtici havuz dışı). Havuz dışı liste `src/shared/pool.ts` `OFF_POOL`. Varyantlı; **oda parametresi yok**, denge kodda. Meta: `gesture` (hayalet el), `score {unit, decimals, better}` (doğal ölçü). Üretim kiti: `src/games/shell`, `npm run new-game`, `docs/GAME-CONTRACT.md`, yol haritası `docs/GAMES-ROADMAP.md`.
- i18n: TR/EN (`src/client/i18n`, `docs/I18N.md`); sunucu hata kodları; akış satırları yapısal.

## Güncel durum (2026-10-09; canlıdan doğrula)
**Yayında:** https://tussle.ziroo.net (VPS konteyner `tussle`, 127.0.0.1:8087, `/opt/tussle`, Caddy `hosts/tussle.caddy`, veri `/opt/tussle/data` (konteyner içinde `/data`), sırlar `/opt/tussle/.env`). Deploy: `bash deploy/deploy.sh`. Son yayın `4576161` (2026-10-09), DB sürümü 10. Yayın öncesi yedekler `/opt/tussle/data/pre-*.db` (son: `pre-4576161.db`; alma: `docker exec tussle node -e` ile `VACUUM INTO`). 1.279 test yeşil.
- Havuz beceri öncelikli: anlık kontrol, sonuç oyuncunun elinde; şans/izleme oyunları `OFF_POOL`'da (linkle oynanır). [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]]
- E+F oyunları tarayıcıda canlandırıldı (sahne, karakter, ödül anı). Görsel tarz: ilk oyunlar gibi devam; tüm oyunların teması sonra toptan düzenlenebilir (Yusuf, limit yenilenince).
- Şüpheli koşu bayrakları: kutu, yuksek, refleks, gecit, plinko, hazine, sifre, katane (saklanıyor, hiçbir yerde gösterilmiyor).
- Google/Apple girişi kodda hazır, env yok (`docs/AUTH-SETUP.md`).

**Telefonda hiç görülmedi:** D, E, F partilerinin tamamı (yeni Vinç kuralı dahil) ve önceki turun listesi (hayalet el, 3-2-1, Android geri, outbox, şans hakkı, 120 Hz).

### Sıradaki işler
1. **Telefon turu**: D/E/F oyunları + önceki liste; hak harcamadan `https://tussle.ziroo.net/#/oyun/<id>`. Bakılacaklar: Fırlat hassasiyeti, İp Atla ilk oyuncu süresi, Şeker Ritmi geniş şeker/sıçrama, Vinç bantları, Çizgi Takip zorluk.
2. **Kapaklar**: D/E/F'nin havuzdaki 14 oyunu yer tutucu kapakta (kapı, örüntü, ipatla, firlat, cark, hazine, vinc, gecit, pinyata, sifre, katane, cizgi, doldur, ritim). Kapak koordinatör işi (paylaşılan `covers-core.ts` + `theme.css`, docs/VISUAL.md §4.1); Yusuf'a 48 px önizlemeyle tur tur göster. Toptan tema değişikliği yakınsa ona bırak.
3. **Parti G** (haftalık limit sıfırlanınca, ~2026-10-12): bilinen beceri oyunları, ilk oyunların tarzında, ajanlar tarayıcıda oynar. Adaylar: Kanat Çırp (Flappy), Şeker Kes (Fruit Ninja), Spiral Kule (Helix), Renk Geçidi (Color Switch), Yılan, Tuğla Kır.
4. **Canlı kapışma (M1)**: sohbetten kapışma kartı, 2–4 kişi (bütçe sıfırlanınca).
5. Tema toptan düzenleme (Yusuf kararı, sonra). Jeton İtici kural yeniden tasarımı (tek şerit baskın).
6. Kit/teknik: seçim düğmeleri yardımcısı; bayrakları tabloda ayırma (istenirse); Capacitor → TestFlight → mağaza; ertelenenler (ID token nonce, CSP, sözlük tembel yükleme, tepki toggle idempotent, `GET me` 30 oda).

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
- [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]]
- [[2026-10-09-ajanlar-tarayicida-oynar]]

## Dersler
- [[2026-10-08-tussle-m0-dersleri]]
- [[2026-10-08-cila-turu-dersleri]]
- [[2026-10-08-ui-yenileme-dersleri]]
- [[2026-10-09-parti-a-dersleri]]
- [[2026-10-09-parti-b-c-dersleri]]
- [[2026-10-09-parti-d-e-f-dersleri]]

## Oturumlar
- [[2026-10-08-tussle-tasarim-ve-m0-yayin]]
- [[2026-10-08-tussle-cila-turu-ve-tema]]
- [[2026-10-08-tussle-ui-yenileme-seker-dukkani]]
- [[2026-10-09-tussle-sohbet-merkezli-oda-kit-ve-parti-a]]
- [[2026-10-09-tussle-parti-b-c-deneme-hakki-ve-skor]]
- [[2026-10-09-tussle-parti-d-e-f-ve-canlandirma]]

## İlgili
Aynı VPS ve Caddy: [[10-Projects/kapis/_overview|KAPIŞ]] (ws sunucu kalıbı buradan), [[10-Projects/diskort/_overview|Diskort]]. Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]].
