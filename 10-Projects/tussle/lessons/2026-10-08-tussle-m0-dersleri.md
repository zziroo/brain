---
type: lesson
project: tussle
date: 2026-10-08
status: active
tags: [tussle, ders, ajan, mac, test]
source: oturum 2026-10-08
---

# Dersler: Tussle M0 inşası

- **Mac'te Xcode lisansı kabul edilmeden `python3` ve `git` çalışmıyor** (CLT shim "You have not agreed to the Xcode license" diyor; `git init -q 2>/dev/null` sessizce başarısız oldu, repo yok sanıldı). Yeni Mac oturumunda önce `git --version` ile doğrula; betikleri Node ile yaz.
- **Gömülü tarayıcı paneli gizliyken rAF 1–3 fps'e kısılıyor**: kare süresi ve his ölçümü orada anlamsız; işlev doğrulaması için yeter. Gerçek ölçüm iOS Simulator (gerçek WebKit) ya da telefon.
- **iOS Simulator + `xcrun simctl openurl`** PWA'yı gerçek WebKit'te test etmenin en ucuz yolu; panel izni verilince dokunma/yazma da çalışıyor. JSC ile V8 determinizmi burada doğrulandı.
- **Geri sayım sırasında dokunuşlar sim'e sızar** (tick 0'da): girdi katmanı `start()`'a kadar kapalı olmalı. İnceleme ajanı yakaladı; çekirdek yazarken gözden kaçmıştı.
- **GC sayan "sıfır tahsis" testleri hassas**: `step()` büyüyünce inline olmayan çağrılar sayı kutulayabiliyor; soğuk dalları ayrı metoda alınca geçti. Testi tek başına ve tam süitte birkaç kez koştur.
- **Çeldirici üretimi "hub" ipucu veriyor**: tüm yanlış şıklar doğru cevabın ±k'sı olunca hesap yapmadan tahmin %70. Pivot kuralı (yanlış şıkların komşuları) %28'e indirdi. Her bilgi oyununda bu testi yaz.
- **Hız sınırlayıcıda "dolunca yeni anahtarı reddet"** dürüst kullanıcıyı kilitler; doğru politika: boş ya da sınır altındaki anahtarı çıkar, sınırda olanı asla.
- Ajan dalgası: çekirdek tek ajan (sözleşmeyi yazar) → oyunlar + sunucu paralel (dikey dilim, stub klasörler önceden kayıtlı) → iki inceleme + şüpheci → düzeltme → ikinci inceleme. 11 ajan, ~2,5 saat, 211 test. Çakışma yalnız aynı test dosyasına iki ajan yazınca oldu (yeni dosya açarak çözüldü).
