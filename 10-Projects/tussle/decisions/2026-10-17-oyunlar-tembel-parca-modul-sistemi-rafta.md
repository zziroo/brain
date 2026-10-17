---
type: decision
project: tussle
date: 2026-10-17
status: active
tags: [tussle, surum, ota, build, akicilik]
source: oturum 2026-10-17 gece (mobil-playus, yan oturum "sürüm ayrışması ve modüler oyunlar")
---

# Karar: sürüm ayrışmasına "yeniden başlat" kartı + tek komut yayın; oyunlar tek pakette kalır (tembel parçalar geri alındı, sunucudan yüklenen modül sistemi rafta)

## Bağlam
Yusuf: "oyun ekle çıkar yaparız, sıkıntılı durumları çözelim". Sorun: istemci (web, TWA, iOS OTA) ile sunucu farklı sürümde kalabiliyor; sunucunun verdiği günlük oyunu eski istemci tanımıyordu ("bilinmeyen oyun"), OTA yayını ayrı elle adımdı. Keşif (ajan haritası): ana paket 1,05 MB tek parça (46 sim + görünüm, 18 KB kit, 151 KB sözlük); sunucu 9 dosyada kayıt defterini kullanıyor; 649 oyun metni anahtarı sözlüklerde; kapaklar tek 2180 satırlık dosyada.

## Karar
1. **Kısa yol (commit `3d99a64`, dal `surum-ayrismasi`):** bilinmeyen oyun ya da farklı oyun sürümünde oda kartı "Yeni oyun geldi, yeniden başlat" kartına döner (`update-ui.ts`, `dayUpdateReason`). Tek dokunuş: web/TWA'da SW güncelle + yenile; iOS'ta inmiş Capgo paketine geç, yoksa `getLatest → download → set` (`applyOta`; karar saf fonksiyonlarda `ota-pick.ts`). Aynı derlemeye dönülürse "henüz hazır değil" (sessionStorage, 3 dk). Oyun ekranı bilinmeyen kimlikte kartı gösterir; 409 `attempt.version` → hazır kartında "Yeniden başlat". `deploy/release.sh`: yedek → sunucu → OTA paketi → OTA yayını; kirli ağaçta durur (`--allow-dirty`), `--skip-ota`.
2. **A yolu (yazıldı, geri alındı; Yusuf 18 Eki):** oyunları vite ile tembel parçalara bölmek (ana paket 1,05 MB → 530 KB, oyun başına parça, ön indirme) yazılıp review edildi (commit `f6468cb`, main'e alınmadı; reflog'da). Yusuf "başlangıçta yüklesin, sorun değil" dedi: tek paket bir kez iner, oyun başlangıcında yükleme sorusu hiç olmaz, kayıt defteri ikide kalır. Kazanç yarım saniyeydi, bedeli kalıcı karmaşıklık.
3. **B yolu (rafta):** kabukta oyun olmayan, sunucudan `/games/<id>-<hash>.js` yükleyen SDK'lı modül sistemi yapılmadı.

## Neden
- Yeni oyun yayını zaten mağaza gerektirmiyor: web/TWA yenilenince alır, iOS OTA ile dakikalar içinde. Eksik olan OTA'nın ayrı adım olması ve açık eski istemcinin kartıydı; ikisi kısa yolla kapandı. Akış artık: oyunu yaz, commit, `bash deploy/release.sh`.
- B'nin kazancı bugün küçük (iOS'ta OTA'sız oyun ekleme, ileride dışarıdan oyun), bedeli büyük (4–6 oturum, metin ve kapakların 46 klasöre dağılması, oyun başına derleme, önbellek katmanı) ve zayıf ağda oyun başında bekleme riski akıcılık kuralına ters.
- A'nın kazancı küçük (web/TWA ilk açılışta sıkıştırılmış 335 → 169 KB, iOS'ta yerel dosya), sadelik ağır bastı. İleride gerekirse `f6468cb` örnek alınabilir (ids/meta-registry/client-registry ayrımı, StartGate `prepare`, prefetch kuyruğu).

## Reddedilen alternatifler
- Sunucudan yüklenen modül sistemi (B): yukarıdaki bedel; dışarıdan oyun kabul edilecekse yeniden değerlendirilir.
- Tembel parçalar (A): yazıldı, Yusuf sadeliği seçti (üstte).
- Sunucu yanıtlarına "asgari istemci sürümü" başlığı: rev hash sıralanamaz, bundle sürümü istemciden gönderilmiyor; bilinmeyen oyun + sürüm farkı tetikleyicisi yeterli.

## Durum
Kısa yol yayında: `8a7c6d0` (18 Eki), OTA 0.20261017.2200 aynı komutla çıktı. A geri alındı.

## İlgili
- [[2026-10-15-ota-web-paketi-self-hosted-capgo]], [[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]], [[2026-10-17-android-twa-onerisi]]
