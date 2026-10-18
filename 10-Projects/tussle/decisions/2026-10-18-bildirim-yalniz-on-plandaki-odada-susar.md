---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, bildirim, push, soket, android, xiaomi]
source: oturum "tussle: Android bildirim dengesizliği" (2026-10-18 gece), commit `9c9e328`, yayın `7958b67` + OTA 0.20261018.1857
---

# Karar: Oda bildirimi yalnız o oda ön planda açıkken susturulur; istemci soketi kendini yoklar

## Bağlam
Yusuf (Xiaomi 17 Pro, Android): odanın içindeyken o odanın bildirimleri geliyor; bazen hiç bildirim gelmiyor, uygulamaya girince gelmeye başlıyor. Sunucu "odadaki" üyeye push atmıyordu (`push.present` = `hub.isPresent`: soket odaya abone mi). İki açık vardı:
- Capacitor Android WebView arka planda çalışmaya devam ediyor; uygulama bir odada arka plana alınınca soket açık ve abone kalıyordu → sunucu kullanıcıyı odada sanıp bildirimleri yutuyordu.
- İstemcinin uygulama düzeyinde nabzı yoktu; dönüşte/ağ değişince yarı açık soket "bağlı" sanılıyordu, sunucu ise aboneliği düşürmüştü → push gidiyor, Android eklentisi ön planda da gösteriyor (`presentationOptions`).
Canlı DB'de cihaz kayıtları sağlıklı, sunucu loglarında FCM hatası yoktu.

## Karar
- Yeni istemci mesajı `{ t: 'away', on: 0|1 }` (görünürlük + Capacitor `appStateChange`, tekrarsız). Hub bağlantı başına `away` tutar; `isActive` = abone ve ön planda. **Push `isActive`'e bakar; canlı maç/parti koltuk varlığı `isPresent`'te kalır** (oyun davranışı değişmedi).
- `LiveSocket` nabzı: açık + odada + ön planda iken 25 sn'de bir `ping`, 10 sn içinde hiçbir mesaj yoksa soket düşürülüp normal yoldan yeniden bağlanır (auth + sub + onReconnect tazeleme). Ön plana dönüşte hemen ping.
- Oda ayarları (`/ayarlar`) ve deneme (`/deneme`) ekranları da odaya abone kalır ("odadayım" sayılır).
- Web'de arka plandaki sekme artık o odanın push'unu alır (önceden yutuluyordu).

## Neden
- "Odadayım" = o odayı şu an ekranda görmek; arka planda açık soket bunu ifade etmiyor.
- Ayrı bayrak, koltuk/parti varlığını bozmadan yalnız bildirimi düzeltir; eski istemci (away göndermez) bugünkü gibi davranır.

## Reddedilen alternatifler
- Gizlenince soketi kapatmak: parti/canlı maç koltuğu süre sonunda düşerdi.
- Android'de ön plan bildirimini kapatmak (`presentationOptions`): ayar platforma göre ayrılamıyor, iOS'u da etkilerdi; asıl sorun sunucunun yanlış varlık bilgisiydi.
- Bağlanırken (CONNECTING) takılan soket için zaman aşımı: inceleme orta buldu, şüpheci ajan düşük'e indirdi (platform zaman aşımıyla kendini kapatıyor, dar durum); şimdilik yok.

## Açık kalanlar
- Gerçek cihazda doğrulama: uygulama odada arka plandayken başka hesaptan mesaj → bildirim gelmeli; odada ön plandayken gelmemeli.
- Xiaomi otomatik başlatma/pil kısıtı ayrı sorun (uygulama öldürülünce FCM uyandıramıyor): kullanıcı ayarı + uygulama içi rehber kartı yan oturumda yapılıyor (yerel eklenti → yeni mağaza derlemesi gerekir).

İlgili: [[2026-10-18-twa-den-native-e-geciste-chrome-web-push-kaydi-kalir]], [[2026-10-18-yayin-temiz-worktree-den-yan-oturum-ayni-klasorde]].
