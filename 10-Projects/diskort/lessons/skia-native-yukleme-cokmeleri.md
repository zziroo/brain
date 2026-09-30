---
type: lesson
project: diskort
date: 2026-09-29
status: active
tags: [diskort, mobil, skia, android, cokme, ota]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl, 394744c4-d9f8-5503-a075-3edda0039f1c.jsonl
---

# Skia çökmeleri: Metro modül yükleme hatasını try/catch'e vermez; native çökme JS hata kaydı bırakmaz

## Ne oldu
"Native Skia Module failed to correctly install JSI Bindings" ölümcül hatası, özellikle OTA sonrası uygulama yeniden başlarken. Ayrıca bir HONOR/Android 16 telefonda profil teması seçince uygulama kapanıyor (#28/#29), başka bir Xiaomi telefonda çökmüyor.

## Bulgular
- React Native'in modül yükleyicisi, yükleme sırasında oluşan hatayı koddaki try/catch'e vermeden doğrudan "ölümcül" raporlayıp uygulamayı kapatıyor; korumamız hiç çalışmamıştı. Skia kurulumu, yeniden başlatmada eski JS motoru kapanırken çağrılırsa başarısız olabiliyor (kaynaktan okunarak; o çökmede tetikleyici cihazda kanıtlanamadı).
- Düzeltme (0.8.8): Skia'yı açılış ekranı kapanmadan yükleme; yükleme uygulama açıldıktan sonra, başarısızsa 5 sn sonra bir kez yeniden dene, oturumda en çok bir hata kaydı.
- Native çökmeler JS'e ulaşmadığı için hata kaydı gelmiyor; 0.8.10 APK'sıyla **yerel çökme raporlayıcı** (Kotlin) eklendi. Tombstone içeriğinin yazdırılabilir metinleri süreç belleği sızdırabilirdi, review ile kaldırıldı; sıkı ayrıştırma.
- Kök neden (0.8.11): seçimi kalkan renk kutucuğundan kenarlık kaldırılınca Android genişliği `NaN` alıyor; 0.8.12'de kutucuk boşalması düzeltildi. Bu, kullanıcının "seçenekler siliniyor" gözleminin de nedeniydi.
- Kotlin kodu yerelde derlenemedi (JDK/Android SDK yok), ilk derleme CI APK build'iydi.

## Ders
- Native kısım değişmediği sürece OTA yeterli; Skia eklemek parmak izini değiştirir ve yeni APK+IPA gerektirir.
- Bir cihaza özgü çökmeyi kanıtlamadan "düzeldi" deme: 0.8.7 düzeltmesi yığın izi olmadan yapılmış tahmindi ve yetmedi.

Benzer/ilgili not (başka ajan): [[rn-android-border-nan]]
