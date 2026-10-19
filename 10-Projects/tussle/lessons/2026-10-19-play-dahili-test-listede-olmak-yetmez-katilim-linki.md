---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, ders, play, dahili-test, kapali-test]
source: yan oturum "mağaza derlemeleri" (2026-10-19, mobil-playus)
---

# Ders: dahili test listesinde olmak yetmez, katılım linki o hesapla kabul edilmeli

- Yusuf'un Gmail'i dahili test listesinde ("Tussle test", 1 kullanıcı) ve dahili kanalda 1.8 (vc 12) yayındaydı, ama Xiaomi'deki Play 1.7 verdi ve "Erken erişim" yazdı: telefonda kapalı test (alpha) programı geçerliydi, orada 1.8 hâlâ Google incelemesindeydi.
- Neden: dahili test katılım linki (https://play.google.com/apps/internaltest/4701679197682475885) bu hesapla hiç kabul edilmemişti. Telefonda üç Google hesabı var; Play'in seçili hesabı ve tarayıcıdaki hesap aynı olmalı. Linki kabul edince 1.8 dakikalar içinde geldi.
- Dahili kanalda inceleme yoktur, yükleme hemen dağıtılır; kapalı testte inceleme saatler sürebilir. Yeni bir derlemeyi hemen cihazda denemek için yol: dahili katılım linki + Play'de Güncelle.
- Teşhis: `adb shell dumpsys package net.ziroo.tussle | grep -E "versionCode|lastUpdateTime"`; Console > Yayın özeti "İncelenmekte olan değişiklikler" kapalı testin incelemede olup olmadığını söyler.

İlgili: [[2026-10-18-play-kapali-test-erisimi-katilimdan-sonra-gecikir]], [[2026-10-16-play-dagitim-ic-test-eposta-listesi-kapali-test-ertelendi]], oturum [[2026-10-19-tussle-magaza-derlemeleri-android-1-8-ios-build-8]].
