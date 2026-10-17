---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [android, twa, gezinme, geri-tusu]
source: tussle profil oturumu (2026-10-17)
---

# Ders: TWA'da geri tuşu açık pencereyi görmez; pencereler CloseWatcher ile yakalamalı

- Belirti: Android'de profil düzenleme penceresi açıkken geri tuşu doğrudan ana sayfaya attı (Yusuf, telefonda).
- Neden: web/TWA'da geri basışı sayfaya yalnız tarayıcı geçmişi ya da CloseWatcher "kapatma isteği" olarak gelir; sheet'ler hiçbirini dinlemiyordu.
- Çözüm (`a98a161`): `sheet.ts` açık pencere oldukça `back-intercept.ts`'e `setSheetBack` ile kaydolur; geri önce en üstteki pencereyi kapatır, sonra ekranın yakalayıcısı, en son tarayıcı geçmişi. Masaüstünde Esc'in keydown'ı `preventDefault` aldığı için çift kapanma olmaz.
- Aynı turda ekran geri düğmeleri: "önceki ekran" değişkeni yerine `history.state.d` derinlik sayacı. Derinlik > 0 ise `history.back()`, değilse yedeği `replace` ile aç; yoksa soğuk açılışta ana sayfanın üstüne kayıt birikip Android geri uygulamadan çıkmak yerine profile dönüyordu.
- Masaüstünde CloseWatcher davranışı gerçekçi denenemiyor; doğrulama telefonda yapılır.
- Uygulama içi tarayıcı bölmesi gizliyken rAF ve görünüm geçişleri durur, ajanlar headless Chrome ile doğruladı ([[2026-10-16-tanitim-animasyonu-gizli-bolmede-donar-headless-kayit]]).

## İlgili
- [[2026-10-17-tussle-profil]]
