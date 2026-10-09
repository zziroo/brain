---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, deneme, hile, adalet, sunucu]
source: oturum 2026-10-09 (mobil-playus: Parti B + C, deneme hakkı ayırma, şans hakkı, skor ölçüleri)
---

# Karar: Sayılan deneme "Başla"ya basınca sunucuda ayrılır; oyun içinde çıkış yok, yarım bırakılan deneme yanar

## Bağlam
Oyunu yarıda kapatmak deneme harcamıyordu; sonraki açılış aynı tohumu veriyordu (düzeni gör, çık, gerçek denemede tekrar oyna). Yusuf: "oyuna girince çarpı ile çıkamasın, uygulamadan çıkarsa aynı seed olmasın".

## Karar
- `POST /api/rooms/:code/start {requestId, dayIndex, gameVersion}` deneme k'yı atomik ayırır ve tohumu döner (migrasyon 7, `tries` tablosu). Gönderim yalnız ayrılmış, gönderilmemiş k için kabul edilir. requestId ile idempotent.
- Gün tohumu artık istemciye gitmez (`/today`'den kaldırıldı); tohum yalnız start yanıtında gelir. Deneme turu düz rastgele tohum.
- Sayılan koşuda çarpı gizli, geri tuşu/hash değişimi engellenir ("Oyun bitene kadar çıkamazsın" uyarısı). Başlangıç kartında çıkış serbest (henüz bir şey ayrılmadı).
- Yarım bırakılan deneme (sonraki deneme var, 15 dk geçti ya da gün bitti) tabloda 0 ve yalnız "oynadı" puanı alır; "son deneme sayılır" kipinde son deneme yarım kalırsa skor 0 olur (kötü denemeyi kapatıp iyisini koruma yolu kapalı).
- Sayfa gizlenince sim durur, gizli süre atılır (birden ileri sarma yok), basılı parmaklar için "up" günlüğe yazılır; dönüşte "Devam et" kartı.
- Bitmiş koşunun günlüğü göndermeden önce telefona yazılır (outbox); bağlantı yoksa odayı açınca / `online` olayında yeniden gönderilir.

## Neden
Stok istemciyle keşif-tekrar yolu kapanır; istemci tarafı tekrar oynatma modeli bozulmaz. Outbox, hak başta yandığı için bağlantı kopmasında dürüst sonucun kaybolmasını önler.

## Reddedilen alternatifler
- Hakkı gönderimde saymak (eski hal): yarıda kapatıp aynı düzeni tekrar oynamaya izin veriyor.
- Gün tohumunu istemcide tutup deneme turunu ondan uzak tutmak: tohum sızıntısı; sunucunun gönderdiği "kaçınma listesi" de aynı sızıntı olurdu.
- Yarım denemeye tablo puanı vermek: başlatıp bırakmak puan kazandırırdı.

## Sonuçlar / riskler
- Yanlışlıkla kapatan kişi hakkını kaybeder (bilinçli).
- Modifiye istemci tohumu startta alır ve çevrimdışı çözebilir; yalnız sunucu şüphe bayraklarıyla izlenir.
- Yayın anında yarıdaki denemeler sürüm farkıyla reddedilir.

## İlgili
- Eskittiği not: [[2026-10-09-deneme-basina-tohum]]
- [[2026-10-09-gizli-cekilisler-yalniz-tohumdan]]
- [[2026-10-09-sans-hakki-yazi-tura]]
