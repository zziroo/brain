---
type: decision
project: tussle
date: 2026-10-08
status: active
tags: [tussle, platform, pwa, capacitor, isim]
source: oturum 2026-10-08 (mobil-playus tasarım)
---

# Karar: tek web çekirdeği (PWA şimdi, Capacitor ile mağaza sonra); ad Tussle

## Bağlam
Yusuf Playus benzeri, hiç kasmayan, arkadaşlarla başlayıp mağazaya çıkacak global bir oyun istedi. 120 Hz şart değil. Mac'te Flutter yok; Apple Developer hesabı var (Diskort için alınmıştı).

## Karar
Oyun çekirdeği DOM'dan bağımsız saf TS + Canvas 2D; aynı paket `tussle.ziroo.net`'te PWA ve Capacitor kabuğunda mağaza uygulaması. Native ekler (haptik, push, paylaşım) yalnız kabukta. Varsayılan 60 kare sınırı, ekran destekliyorsa "Yüksek kare hızı" ayarı. Ad **Tussle** (dostça boğuşma); Türkçe/İngilizce alt başlık yerelleştirilir.

## Neden
- Playus'un derdi kare hızı değil kare maliyeti; menüde çizim döngüsü olmayan Canvas çekirdeği en hafif yol.
- Yusuf'un mevcut kalıbı (KAPIŞ: TS + Node ws + VPS + Caddy) aynen kullanılıyor; arkadaşlar link ile hemen giriyor.
- Global hedefte "Panayır" ı harfi ve anlamsızlığıyla zayıf; Tussle kısa, her dilde söylenir, mağazada bare adıyla boş.

## Reddedilen alternatifler
- Flutter + Flame / Godot: tek gerekçe iPhone'da 120 Hz'di; Yusuf 120'yi şart olmaktan çıkardı. Yeni dil ve araç zinciri.
- Unity: ağır, ısınma (Playus'un sorunu).
- Adlar: Panayır (Türkiye dışı zayıf), Meydan/Dakika (genel), Kapışma (KAPIŞ'a yakın), Rakip (Mini Rival var), Dustup/Kerfuffle/Bout (ikinci sırada kaldı).

**Ek (2026-10-18):** "iPhone'da 120 Hz için Flutter/Godot gerekir, WKWebView 60'ta" varsayımı yanlıştı: WKWebView iOS 15'ten beri 120 Hz çizebiliyor, yalnız uygulamanın Info.plist'ine `CADisableMinimumFrameDurationOnPhone = YES` konması şart (varsayılan 60 kilidi). Anahtar `ab842fd` ile eklendi; cihazda henüz ölçülmedi (Yusuf'ta iOS cihaz yok).
