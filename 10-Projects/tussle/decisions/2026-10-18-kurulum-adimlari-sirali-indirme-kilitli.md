---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, kurulum-karti, kapali-test, web]
source: oturum 2026-10-18 akşam "tussle: kurulum kartı adımları" (ziroo-edge oturumunun başlattığı yan oturum), commit `202c2ec`
---

# Karar: kurulum kartında adımlar sıralı, indirme adımı 1 ve 2 bitene kadar kilitli

## Bağlam
Arkadaşlar tussle.ziroo.net'teki "Tussle'ı uygulama olarak kur" kartında 1. (Google grubu) ve 2. (Play'de test kullanıcısı ol) adımı atlayıp doğrudan "Google Play'den indir"e bastı. Kapalı testte grup + opt-in olmadan Play uygulamayı göstermiyor. Sebep: son düğme hep vurguluydu (`btn-primary`), ilk ikisi sönük düz düğmeydi; adım gibi görünmüyorlardı. Aynı gün ziroo.net'teki Tussle kapısı ara sayfa yerine doğrudan tussle.ziroo.net'e yönlendirildi (ziroo-edge), kart tek kurulum anlatımı oldu.

## Karar
- Büyük, renkli numara rozeti (34 px) ve her adımın altında bir açıklama satırı (`install.*Hint`, TR + EN).
- Vurgu sıradaki bitmemiş adımda (dolu mavi rozet + birincil düğme); biten adımda onay işareti.
- Takip edilmeyen indirme adımı, önceki takip edilen adımlara basılana kadar kilitli: `aria-disabled`, href yok (uzun basma/yeni sekme de atlatmaz), basınca "Önce 1. ve 2. adımı yap." uyarısı sallanır. Kilit aynı kartta anında açılır.
- Aynı kural iOS TestFlight iki adımında; tek mağaza adımı (`stage: 'store'`) hiç kilitlenmez. Mantık saf `stepStates()` (src/client/ui/install-ui.ts), testli.
- Dokunuşlar localStorage'a ek olarak kart içinde bellekte tutulur: depolama kapalıysa da kilit kalıcı olmaz.

## Neden
Atlamanın sebebi görsel hiyerarşiydi; vurguyu sıradaki adıma taşımak ve indirmeyi gerçekten kilitlemek atlamayı imkânsız kılıyor. Depolama silinirse 1-2'ye yeniden basmak iki dokunuş, zararsız.

## Reddedilen alternatifler
- "Zaten yaptım" bağlantısı (görev bunu isteğe bağlı bırakmıştı): tam da atlayan kişilere yeni bir atlama yolu açardı; bellekteki kopya takılma riskini zaten kapatıyor.
- Yalnız görsel düzen (kilitsiz): son düğmeye basma alışkanlığını durdurmaz.

## Sonuçlar / riskler
- Kilit yalnız yönlendirme: biri adıma basıp sayfayı hemen kapatırsa yine "yapılmış" sayılır. Play'de opt-in gerçekten tamamlandı mı bilinmez.
- Telefonda gerçek bir arkadaşla denenmedi (tarayıcıda telefon boyutunda doğrulandı).

## İlgili
- [[2026-10-16-kapali-test-google-grubuyla-acildi-mail-toplanmaz]]
- [[2026-10-17-uygulama-disi-web-kapisi-ve-oda-ustu-sadelesti]]
- Oturum: [[2026-10-18-tussle-kurulum-adimlari-sirali]]
