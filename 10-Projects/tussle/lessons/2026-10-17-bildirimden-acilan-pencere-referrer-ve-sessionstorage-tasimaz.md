---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [tussle, twa, push, kapi, sessionstorage]
source: Claude Code oturumu 2026-10-17 "tussle: oda başlığı ve kapak sadeleştirme" (inceleme ajanı bulgusu)
---

# Ders: bildirime dokununca açılan pencere referrer ve sessionStorage taşımaz; TWA tespiti tek başına referrer'a dayanamaz

## Ne oldu
Web kapısı ilk hâlinde "uygulama mı" kararını `isNative || isTwa` ile veriyordu. `isTwa`, Chrome'un TWA açılışında verdiği `android-app://net.ziroo.tussle/` referrer'ına ve sekmenin sessionStorage işaretine bakar. Service worker'ın `notificationclick` işleyicisi, uygulama kapalıyken `clients.openWindow(url)` çağırır: bu yeni bir tarama bağlamıdır, referrer boş, sessionStorage boş. Sonuç: Play uygulamasındaki kullanıcı bildirime dokununca kapı sayfasına düşerdi. İnceleme ajanı buldu, skeptik doğruladı (CONFIRMED), düzeltildi.

## Çözüm
`gateDecision` standalone girdisi aldı: `matchMedia('(display-mode: standalone)')` ya da `fullscreen`, iOS'ta `navigator.standalone`. TWA ve ana ekrana eklenmiş PWA bu modda çalışır. Referrer yolu yedek olarak duruyor.

## Uygulama
- Yeni pencere/sekme açan her yol (bildirim tıklaması, `target=_blank`, paylaşım geri dönüşü) sekmeye bağlı işaretleri sıfırlar; platform tespiti için `display-mode` ya da URL parametresi gibi bağlamdan bağımsız bir sinyal kullan.
- Kapı ya da platform kararı veren kodu review'a verirken "uygulama kapalıyken bildirim" senaryosunu açıkça sor.

Bkz. [[2026-10-17-uygulama-disi-web-kapisi-ve-oda-ustu-sadelesti]], [[2026-10-17-twa-bildirim-devri-izinsiz-uygulama-chromeyi-de-kilitler]].
