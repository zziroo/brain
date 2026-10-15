---
type: lesson
project: kisisel
date: 2026-10-14
status: active
tags: [cihaz, android, adb, xiaomi, yedekleme]
source: Oturum "kişisel: Xiaomi 17 Pro xiaomi.eu kurulumu" (2026-10-14)
---

# Dersler: Android cihaz teşhisi ve ROM kurulumu (Xiaomi 17 Pro)

1. **Cihazda ne yapıldığını adb ile çıkarmak mümkün, root gerekmez.** `getprop` ile bölüm bazlı fingerprint'ler (system/vendor/odm/product/mi_ext) karşılaştırılır; tek bölümün farklı sürüm söylemesi o bölümün değiştirildiğini gösterir. `mount | grep overlay` mi_ext overlay'ini, `ls /dev/block/mapper` bölüm düzenini verir.
2. **Gizli root'u logcat ele verir.** `su` yokken bile `zygiskd` süreçleri ve `zygisk-core64: [paket] is on the denylist` satırları root'u (ve türünü: `PROCESS_ROOT_IS_KSU`) gösterir; `getprop | grep ksu_bootstrap` KernelSU'yu doğrular.
3. **"Güncelleme yok" teşhisi için Güncelleyici'yi açıp logcat'te `Updater2` satırlarına bak.** Sunucuya hangi cihaz/sürümle sorulduğu ve dönen `Latest/Current/Incremental` alanları orada; boş dönüyorsa cihaz kimliği sunucuda yok demektir.
4. **Google cihaz yedeği "veriler yedeklenemedi" diyorsa `adb shell bmgr backupnow --all` çalıştır.** Paket paket sonuç basar; tek bir uygulama (burada Reddit) "Transport error" verip bütün turu düşürebiliyor. O uygulamayı `pm disable-user` ile geçici kapatıp yedeği alıp geri açmak çözüyor. "Transport rejected package" satırları verisi olmayan sistem paketleri, zararsız.
5. **Fastboot ile tam silmeden sonra kurulum sihirbazının eski ekran kilidini sorması ve eski Google hesaplarını önermesi FRP'dir, verinin kalmış olması değil.** Hesap kimlikleri `frp` bölümünde tutulur; flaş bu bölüme dokunmaz. `erase metadata` şifreleme anahtarlarını sildiği için eski veri okunamaz.
6. **Yeni kurulumda adb kapalıdır.** Açılışı adb ile izleyen döngü zaman aşımına düşer; USB hata ayıklama açılana kadar kontroller kullanıcıda.
7. **SourceForge dosya özetleri** listeleme sayfasının HTML'ine gömülü JSON'da (`"sha1"`, `"md5"`); `/list` ucu 404 veriyor.
8. **Xiaomi fastboot betiklerinde "skip copying ... avb footer" uyarıları normaldir**; izlenecek kelimeler `FAILED` ve `error`.
9. **Kutudaki IMEI ile cihazın bildirdiği IMEI farklıysa IMEI yazılmıştır.** e-Devlet'teki "ithalat yoluyla kayıtlı" ibaresi numaraya aittir, cihaza değil. Bu alanda yardımın sınırı: koruma/yeniden yazma yok, meşru kayıt yolu anlatılır.

## İlgili
- [[xiaomi-17-pro]]
- [[2026-10-14-xiaomi-17-pro-xiaomieu-secimi]]
