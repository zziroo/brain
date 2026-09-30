---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [diskort, ios, dagitim]
source: memory diskurt-project.md, diskort-ios.md
---

# iOS, Apple Developer hesabıyla Ad Hoc OTA (itms-services) olarak kendi sitemizden dağıtılır

## Karar
Apple Developer hesabı alındı; 0.8.1'den beri canlı. Kurulum kendi sitemizden (itms-services, UDID kaydı), inceleme ve TestFlight yok. Yeni cihaz ekleme otomatik ([[ios-cihaz-ekleme]]). Sertifika/profiller 2027-09-27'de sona erer (yenileme gerekir).

## Neden
iOS'ta ücretsiz sideload eşdeğeri yok; Ad Hoc, inceleme ve TestFlight'sız dağıtım sağlıyor.

## Reddedilen alternatifler
Ücretsiz sideload; App Store / TestFlight (kaynakta açıkça konuşulmamış, Ad Hoc'un avantajı olarak "no review/TestFlight" deniyor).

## Sonuçlar / riskler
Herkese açık IPA, UDID listesini gömüyor (düşük risk, bilinen). Açık öneri: "IPA yalnız kendi sunucumuzdan". Gizli dosyalar `OneDrive\Yedekler\Diskort\ios-imza\` içinde (içerik ASLA yazılmaz).

## İlgili
- [[mobil-ota-guncelleme]], [[_overview]]
