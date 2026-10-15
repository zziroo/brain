---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, izleme, canli, gunluk, protokol, adalet]
source: oturum 2026-10-15 (mobil-playus: Yayın 3 izleme)
---

# Karar: izleme girdi akışıyla yapılır, tohum ortak kalır, günlükte kendi denemen bitince izlersin

## Bağlam
Arkadaş geri bildiriminin kalan maddesi: kaybedince diğer oyuncuları izleyebilmek. Yusuf bunu genişletti: normal zamanda da bir arkadaş günlük denemesini oynuyorsa izlenebilsin mi? Günün tohumu oda geneli ve deneme sırasına göre türetiliyor (herkesin k. denemesi aynı yerleşim), tasarım bu yüzden tohumu deneme başlayana kadar gizliyordu.

## Karar
- Video yok: oynayan istemci girdilerini 250 ms parçalarla WebSocket'e akıtır (`inp`), sunucu koşu başına tampon tutar ve izleyenlere röle eder; izleyici aynı tohumla sim'i kendi cihazında ~1,5 sn geriden koşturur. Aynı dikiş kapışma, parti ve günlük denemeye hizmet eder (koşu anahtarı `m:<maç>:<kullanıcı>:<deneme>` / `d:<gün>:<kullanıcı>:<k>`).
- Tohum ortak kalır. Günlükte kural: **kendi k. denemen sunucuya gönderilmişse** o k'deki koşu izlenebilir (rezerve edilmiş ama bitmemiş deneme yetmez). Maçta katılımcı yalnız kendi koşusu bitince/çekilince, katılımcı olmayan hemen izler.
- İzleyicinin aldığı hiçbir şey skor kaynağı değildir; skor yine gönderilen günlüğün sunucuda tekrar oynatılmasıyla hesaplanır.

## Neden
- Deterministik sim zaten var; birkaç KB trafikle birebir görüntü, "hiç kasmama" kuralına uyuyor.
- Ortak tohum sıralamanın anlamını koruyor (aynı yerleşimde skor karşılaştırması, canlı şerit ve "geçtin" işaretleri buna dayanıyor). Kural, önizleme avantajını kapatıyor.

## Reddedilen alternatifler
- Playus gibi herkese özel tohum (Yusuf "belki"): izleme sorununu tamamen çözer ama farklı yerleşimlerde skor karşılaştırması adaletsiz; istenirse sonra tek oda ayarı olarak eklenebilir.
- Günün tüm hakları bitince izleme: daha katı, daha az izleme.
- Serbest izleme: en sosyal, skor yarışını zedeler.
- Skor paketi gibi yalnız skor rölesi: izleme hissi vermez.

## Sonuçlar / riskler
- Günlük oyun ekranı artık oda soketine abone kalıyor (akış için gerekli): oyuncu günlük oynarken odada "mevcut" sayılır, açık kapışma/parti kartı o sırada başlarsa kaçırabilir (eskiden 20 sn sonra koltuğu düşüyordu). Isırırsa günlük ekranda `match`/`party` olayına toast ucuz çözüm.
- Düşür/başlat döngüsüne anahtar başına 2 sn bekleme; `watch` için ayrı kova (1/sn); hata çerçeveleri anahtar taşır.
- Teknik sözleşme `docs/SPECTATE-PLAN.md`.

## İlgili
- [[2026-10-15-yayin-1-kural-ve-denge-turu-arkadas-geri-bildirimi]]
- [[2026-10-15-tussle-yayin-3-izleme]]
