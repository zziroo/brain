---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, ui, gorsel, gecis, yukleme]
source: oturum "tussle: rozetler ve kapanış geçişleri" (2026-10-20), commit 81f1d48, 4ba4300, 9e03b31, a0a336f
---

# Karar: avatar düz kontur (gölgesiz), kapanışta düşüş korunur, soğuk açılışta iskelet, sezon sayfası morfsuz

## Kararlar
1. **Avatar ve şerit konturları** (81f1d48): her avatar düz kontur, **gölge yok** (gölge yalnız kartlarda ve bazı düğmelerde). `--avatar-line` = `--control-line` (yuvarlak düğmelerin çizgisi), iki temada. Boyuta göre 1,5–3 px, `.avatar` içte border. Oda kompakt şeridinde lider etiketi, süre çipi (artık soluk değil) 1,5 px `--control-line`; oynat düğmesi 2 px `--avatar-line` (şans parası kendi kenarını korur). Sezon bandı çipleri sabit güçlü `--band-line` (bant iki temada sarı kalır). Oyuncu kartında denemelerin altındaki "+P p · N hak kaldı / Hak bitti" satırı kaldırıldı (gereksiz, i18n anahtarları da).
2. **Kapanış geçişleri** (4ba4300): morf klibi hedefin düşüşünü (drop) korur (`dropOutsets`, `--vt-o0/1`), böylece düşüş sonda aniden çıkmaz; arka plan morfla aynı eğride 300 ms açılır; bugün tablosu çökerken kayan sohbete kartın yuvarlak altını, çizgisini ve düşüşünü taşıyan boş "kep" (`.chat-log.slide-cover::after`) + liste solması.
3. **Yükleme iskeleti** (9e03b31): soğuk açılışta ilk boyamadan iskelet gösterilir, içeriğe çapraz solar (sohbet balonları, profil bölümleri, Geçmiş ızgarası, alt sayfalar); önbellekli veri doğrudan uygulanır. Maskot yalnız 1000 ms sonra (`LOADER_SHOW_AFTER_MS` 180 → 1000; Yusuf onayladı, geri dönülebilir). `docs/VISUAL.md` §3 güncellendi (eski "iskelet çubuğu yok" kuralı yerine). Altyapı: `ui/loader.ts` `skeleton(shape)` + `swapIn()`, saf planlar `ui/skeleton-core.ts` (375 px ölçülü).
4. **Sezon sayfası morfsuz** (a0a336f): sarı banttan beyaz sayfaya paylaşılan öğe morfu tuhaf göründü (şekil/renk çok farklı); sade alt sayfa. Geçmiş gün kartı morfu kalır (aynı kapak = görsel bağ).

## Neden
Yusuf: avatar/çipte gölgeli kenar yanlış görünüyor; telefon kaydında düşüşün sonda "çakılması", sohbetin boş gelip patlaması, kart altının düz kesilmesi.

## Reddedilen alternatifler
- Gündüzde avatar için erik rengi kart çizgisi.
- Avatarlara gölge.
- Boş ekran + geç maskot (yüklemeler 180 ms penceresine denk gelince içerik patlıyordu).
- Sezon sayfasında morfu zorla ayarlamak.

## İlgili
- [[2026-10-18-cila-turu-kontrol-konturu-ters-bildirim-gece-cubugu-bekler]] · [[2026-10-19-maskot-yukleyici-karisik-havuz-uyku]] · [[2026-10-19-ekran-gecisi-itme-paylasilan-oge-sonra-doldur]]
- [[2026-10-20-kademeli-rozetler-bronz-gumus-altin]]
