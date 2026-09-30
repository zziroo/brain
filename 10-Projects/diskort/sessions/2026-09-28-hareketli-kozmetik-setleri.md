---
type: session
project: diskort
date: 2026-09-28
status: done
tags: [diskort, kozmetik, skia, yayin, surum]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl ("diskort gelistirmeye devam"; 012218c9-...jsonl aynı konuşmanın ilk 85 turluk kopyası, ayrıca işlenmedi)
---

# Oturum: hareketli kozmetik setleri, yayın izleyicileri ve 0.8.4-0.8.6

## Ne yapıldı
- **Faz 1 vitrin:** altı set (Karadelik, Sakura, Kuzey Işıkları, Ateşböceği Ormanı, Kristal Buz, Neon Yağmur) için gizli Artifact vitrini yapıldı. Kullanıcı hepsini herkese ücretsiz yapmayı seçti: [[kozmetik-setleri-ucretsiz]].
- **Faz 2 masaüstü:** ortak model, sunucu, WebGL çizimi, isim plakası alanı (şema 21→22). Review: performans bulgusu (sesli görüşmede 60 fps avatar) düşük hıza çekildi. **0.8.4** (sunucu DB yedeği alındı, şema 22).
- **İsim plakası okunabilirliği:** Discord örneğine göre sol taraf koyu/sakin, görseller sağda ([[isim-plakasi-okunabilirlik]]).
- **Faz 3 telefon (Skia):** `@shopify/react-native-skia` 2.6.2, GLSL→SkSL çevirici. Review orta perf bulguları (ayarlarda ~20 eşzamanlı önizleme → ~5) düzeltildi.
- **Eski sistemler kaldırıldı:** çerçeve, eski avatar süsleri, kar/ışıltı/yapraklar: [[profil-cercevesi-ve-eski-efektler-kaldirildi]] (şema 23). **0.8.5** (yeni APK+IPA, çünkü Skia native).
- **Yayın izleyicileri:** yayını izleyenlerin avatarları (en çok 3 yuvarlak + "+N"), hover/tık ile "İZLEYİCİLER — N" listesi. Review: izleme listesi cihaz başına tutulmalı (masaüstü/telefon birbirini silmesin), düzeltildi.
- **Yayın arayüzü** Discord'a bakılarak iyileştirildi: [[yayin-arayuzu-discord-tarzi]]. Telefonda yayın ayrı kart + sade hizalama. **0.8.6**.
- Kullanıcı Discord'da oturum açıp (uygulama içi tarayıcı) referans baktırdı: [[discord-referans-davranis-kurali]].
- Kendi başına eklenen "Etkinlik" bölümü ve "kanal durumu" kullanıcı istemediği için silindi: [[sade-arayuz-tercihi]].

## Alınan kararlar
[[kozmetik-setleri-ucretsiz]], [[isim-plakasi-okunabilirlik]], [[profil-cercevesi-ve-eski-efektler-kaldirildi]], [[yayin-arayuzu-discord-tarzi]], [[sade-arayuz-tercihi]]

## Öğrenilenler
[[discord-referans-davranis-kurali]], [[ajan-calisma-tuzaklari]]

## Açık kalanlar
- Yayın/plaka arayüzleri cihazda değil, yerel test ve ajan ekran görüntüleriyle doğrulandı; telefon tarafı "cihazda denenmedi" notuyla çıktı.
- Eski APK'lar (0.8.4 ve altı) retire edilen efektleri gösterir/boş işlem yapar (review düşük bulgu).
