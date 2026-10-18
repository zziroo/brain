---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, gorsel, tema, cila]
source: oturum 2026-10-18 "tussle: cila turu (tema, ekranlar)"; commit 949a453, 6e62748
---

# Karar: cila turu: kontroller iki temada konturlu, bildirim ters renk, gece Android gezinme çubuğu Chrome düzeltene kadar bekler

## Bağlam
Yusuf: "açık temada geri tuşu, hediye tuşu, alttan çıkan 'gönderildi' bildirimi belli olmuyor; genel geniş kapsamlı cila". Keşif: statik kontrast taraması + iki tarayıcı ajanı (oda dışı / oda-parti-oyun), 30 bulgu, 13 başlık. Yusuf hepsini seçti.

## Karar
- Yeni tokenlar: `--control-line` (gece #5f6773, gündüz #8a7690) bütün ikincil/hayalet/tehlike düğmeleri, giriş alanları, anahtarlar için 1,5 px; `--good-text/--bad-text/--warn-text` (gündüzde koyu yazı tonları, dolgular aynı).
- Yuvarlak ikon tuşları (geri, hediye, dişli, sayfa X, oyun X) tek stil: yüzey dairesi + 2 px kontur. `.btn-light` artık sabit beyaz değil (gecede parlak disk, gündüzde krem üstünde kayboluyordu).
- Bildirim (toast) ters renkli hap, tek satır, sohbet yazma alanının/sayfa düğmesinin üstüne kalkar.
- Seçili hâl her yerde sarı dolgu; odak halkası yalnız `:focus-visible`, programatik `focus()` çağrıları kaldırıldı (dokunmatik uygulama; Yusuf: "klavyeyi düşünme, web ara kabuk").
- Oyunlarda gündüz zemin kum rengi (`theme.edge`): zipla, kule, havada, kanat, pinyata, doldur, bambu, kes, jetpack.
- theme-color üstüne bindirme yığını (`theme-apply.ts pushThemeColor`): tanıtım slaytı rengi, alt sayfa açıkken karartılmış çubuk, oyun ekranı zemini; iOS şeridi `--status-strip`.
- Gece temasında Android TWA gezinme çubuğunun beyaz kalması: **bekler** (Chrome 154/155 TWA'nın verdiği çubuk rengini yok sayıyor, android-browser-helper#636).

## Reddedilen alternatifler
- Telefonun karanlık moduna göre çubuk (COLOR_SCHEME_SYSTEM + `*_DARK` manifest değerleri, yeni Play sürümü): uygulama teması telefonla farklıysa krem sayfanın altında siyah çubuk çıkar (ilk TWA sürümünde tam bu yüzden açık moda sabitlendi).
- Sayfadan native'e tema aktarımı (postMessage kanalı): mimari değişiklik, küçük kazanç.

## Sonuçlar / açık kalanlar
- Chrome 1,5 px konturu 1 px'e yuvarlıyor; Xiaomi'de ikincil düğmeler hafif kalırsa 2 px tek satır.
- Görülmedi: parti lobisi, host paneli, izleme ekranı, `.today-gift-btn` (tohumda ulaşılamadı); telefonda bakılmalı.
- Düşük kalanlar: 'sistem' teması oyun/sayfa açıkken değişirse çubuk eski renkte kalır; iç içe sayfalar ters sırayla kapanırsa çubuk iki kat koyu kalır.
- Mağaza görselleri ve Apple ürün inceleme görüntüsü yenilendi; konsola yükleme Yusuf'ta.
- Yayın: `6e62748`, OTA 0.20261018.1044 (18 Eki öğleden sonra), yedek `pre-6e62748.db`.

## İlgili
- [[2026-10-18-android-twa-kalir-web-izleri-kodda-kapatilir]]
