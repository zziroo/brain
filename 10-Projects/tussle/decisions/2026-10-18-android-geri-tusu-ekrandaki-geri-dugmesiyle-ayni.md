---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, gezinme, geri-tusu, capacitor]
source: oturum 2026-10-18 Android Capacitor'a dönüş (Faz 3); Yusuf "geri tuşu yaptığım geçişleri tersten sarıyor"
---

# Karar: Android geri tuşu ekrandaki geri düğmesiyle aynı işi yapar; ana sayfada uygulamayı arka plana alır

## Karar
- Her ekran `Screen.back()` tanımlar; ekrandaki geri düğmesi ve donanım geri tuşu aynı işlevi çağırır (ayrışamaz).
- Sıra: açık alt sayfa → ekranın yakalayıcısı (tanıtım slaytları) → puanlı koşu koruması → `back()`. Yalnız gerçek ana sayfa "kök": `App.minimizeApp()`, uygulama kapanmaz.
- Yönlendirici (`app.ts`): `history.state.t` iz listesi (yeniden yüklemede kalır); `backTo(hash)` en yakın önceki aynı ekran girişine `history.go(-n)`, yoksa üst ekranı yerinde açar; `goBack(fallback)`; `backPending` hızlı ikinci basışı yutar. Ekrandaki geri düğmeleri artık geçmişe giriş eklemiyor.
- Web/TWA'da tarayıcı geri tuşu tarayıcı geçmişi olarak kalır (CloseWatcher her basışı yakalayamıyor).
- Kod `368e5cf`, Yusuf telefonda doğruladı.

## Neden
Eski davranış (`history.back()` + ekran düğmelerinin `navigate` ile giriş eklemesi) gezilen her ekranı tersten sarıyordu, profile yeniden giriyor, sonunda uygulamadan çıkıyordu. Android kullanıcısı geri tuşunun "bir üst ekran" olmasını bekliyor.

## Reddedilen alternatifler
- Tarayıcı geçmişini olduğu gibi kullanmak: Yusuf'un şikâyeti tam buydu.
- Rota başına sabit üst ekran tablosu: ekran düğmesiyle ayrışabilirdi; tek `back()` işlevi seçildi.

## İlgili
- [[2026-10-17-twa-geri-tusu-acik-pencereyi-yakalamaz]]
- [[2026-10-13-android-kabuk-ve-durum-cubugu-seridi]]
