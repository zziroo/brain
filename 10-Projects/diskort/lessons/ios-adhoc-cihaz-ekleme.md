---
type: lesson
project: diskort
date: 2026-09-29
status: active
tags: [diskort, ios, adhoc, dagitim]
source: 394744c4-d9f8-5503-a075-3edda0039f1c.jsonl, a102c509-71f9-477d-866e-56a7e29efc62.jsonl (gözcü oturumunda aynı teyit)
---

# iPhone'a yeni cihaz eklemek: IPA yeniden derlenir, indirme bağlantısı doğru dosyayı göstermeli, geliştirici modu açılmalı

- Cihaz `/udid` sayfasından kaydolur, onaylanınca IPA kendiliğinden yeniden derlenir ("Arşivle ve Ad Hoc IPA çıkar" 10-15 dk). Yeni cihaz eklemek eski profili geçersiz kılmaz; eski kurulumlar çalışır. Sertifika ve profil 2027-09-27'de dolar; imza dosyaları `OneDrive\Yedekler\Diskort\ios-imza\` içinde (yalnız yer).
- Yeni IPA, sürüme ikinci dosya olarak (`Diskort-0.8.12-ios.ipa`) eklenmişti, indirme sayfası eski `Diskort-0.8.5-ios.ipa`'yı veriyordu; bağlantı düzeltildi. İçindeki profil açılıp iki cihazın da tanımlı olduğu kontrol edildi.
- Kullanıcı "yükle'ye basınca bir şey olmuyor" dedi: olası nedenler Safari dışı tarayıcı veya iOS Geliştirici Modu kapalı. Geliştirici modu ciddi zarar vermez; Apple uyarı gösterir, yalnız cihaza özel imzalı uygulamalar çalışır. Sonunda kullanıcı 0.8.13'e bağlandı.

Benzer/ilgili not (başka ajan): [[ios-ad-hoc-dagitim]]
