---
type: decision
project: diskort
date: 2026-09-27
status: active
tags: [mobil, ota, expo]
source: C--dev-diskort 126a55f0 (2026-09-27)
---

# Karar: Mobil JS güncellemeleri expo-updates protokolüyle kendi sunucumuzdan, imzalı ve zorunlu OTA olarak gelir.

## Bağlam
APK derlemesi ~9,5 dk ve her seferinde sıfırdan; kullanıcı "masaüstü ve mobili bu şekilde güncelliyor olalım" dedi.

## Karar
Expo Updates protokol v1'i sunucuda uygulandı; manifest RSA-SHA256 ile imzalı; runtimeVersion @expo/fingerprint ile hesaplanır (yalnızca yerel/native değişimde değişir). Native değişiklik yoksa CI önceki APK'ları yeniden kullanır. Hızlı test derlemesi de eklendi.

## Neden
- JS değişikliği için yeni APK gerekmez, telefona kablosuz gelir.
- Kendi sunucumuz: dış hizmet bağımlılığı ve ücret yok.

## Reddedilen alternatifler
- Her değişiklikte yeni APK: derleme süresi darboğaz.
- Derlemeyi kullanıcının PC'sinde yapmak: kullanıcı önce istedi, sonra vazgeçti ("kurma, bu şekilde testlere devam ederiz").

## Sonuçlar / riskler
Yeni native bağımlılık (örn. DPDFNet) yine yeni APK gerektirir. OTA imzalama özel anahtarı kullanıcının yedek klasöründe (konum burada tutulmaz).

## İlgili
- [[2026-09-27-ota-ses-filtresi-roller-dm]]
- Aynı konuda memory kaynaklı not: [[mobil-ota-guncelleme]]
