---
type: decision
project: diskort
date: 2026-10-15
status: active
tags: [ui, ses-kanali, geri-bildirim]
source: geri bildirim #35 (Yusuf, masaüstü 0.11.0); diskort oturumu 2026-10-15; commit efd51f0
---

# Karar: Ses kanalının ne zamandır dolu olduğu girmeden de görünür; yayın açanlar üye listesinde ve sahnede üste alınır

## Bağlam
Kenar çubuğundaki süre sayacı yalnız içinde bulunulan kanalda gösteriliyordu; sahne kutucukları ve kanal üye satırları katılış sırasındaydı, yayın açan kişi yerinde kalıyordu (geri bildirim #35).

## Karar
- `ElapsedTime` dolu her ses kanalında gösterilir (içerideki en eski katılım).
- Yayın açanlar öne, gerisi katılış sırasında: client-core `streamersFirst` yardımcısı, kenar çubuğu `VoiceChannelItem` ve sahne `VoiceStage` kullanır. Sahne kendi yayın listesini (kendisi için `sharing`, başkaları için `streams`) ölçüt alır; kenar çubuğu sunucunun `streaming` bayrağını.
- Yalnız masaüstü; mobil değişmedi.

## Neden
Yusuf kanala girmeden ne kadardır oda açık görmek ve yayın açanı hemen üstte görmek istedi; değişiklik küçük, sahne şerit sırası (`orderStrip`) yalnız ilk sırayı alır, sonradan sıçramaz.

## Reddedilen alternatifler
- Sıra değişimine animasyon eklemek: `usePresenceList` yalnız giriş/çıkışı canlandırır; liste anında yeniden dizilir, kabul edildi.
- Ortak saniye sayacı (her kanal kendi `setInterval`'ını kurar): birkaç kanal için gereksiz.

## Sonuçlar / riskler
- Kendi yayınını açarken kenar çubuğu ile sahne bir an farklı sırada olabilir (sunucu bayrağı gecikir), kendiliğinden düzelir.
- Sürümle çıkınca geri bildirim #35 "tamamlandı" yapılır (şu an "planlandı").

## İlgili
- [[sahne-izgarada-coklu-yayin]] · [[yayin-arayuzu-discord-tarzi]] · [[geri-bildirim-inceleme]]
