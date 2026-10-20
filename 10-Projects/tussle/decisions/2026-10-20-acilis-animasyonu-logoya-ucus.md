---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, acilis, animasyon, boot, splash]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi)"
---

# Karar: animasyonlu açılış = A "logoya uçuş", varsayılan (web / iOS / Android)

## Bağlam
Açılışta ikon yerinde solup ana sayfa geliyordu; Yusuf animasyonlu açılış istedi. Üç varyant yapıldı: A logoya uçuş, B dalga + yakınlaşma, C dağılma.

## Karar
- A seçildi ve her platformda varsayılan. Üç blok ana sayfa logosuna, hesapsızsa tanıtım dairesine (`.ob-boot-target`) uçar.
- 19 Eki kuralı korunur (ekran bir kez, dolu açılır): veri yoksa ikon nefes döngüsünde bekler (≤ 4 sn), veri gelince ~100 ms içinde çıkış (settle 90 ms).
- Açılış maskot yükleyicisi kaldırıldı (ajan kararı: A her açılışta oynadığı için devreye giremiyordu); ekran yükleyicileri ve parti lobisi maskotu duruyor.
- Telefonda uçuş donması düzeltmesi ve Android splash eşleşmesi: [[2026-10-20-android-splash-ilk-boyamaya-kadar-ve-web-boot-esit-boy]], ders [[2026-10-20-webview-raster-ucus-animasyonunda-gpu-donmasi]].
- Tanıtım yerleşimi aynı turda: alt ölü bölge (`--ob-dead`; düğme alttan 16 → ~92 px, hareket çubuklu telefonda ~116), içerik tek grup halinde ortada.

## Neden
- Yusuf A'yı seçti; ortak öğe hissi (ikon logoya dönüşür) uygulamanın geçiş diliyle aynı.

## Reddedilen alternatifler
- B dalga + yakınlaşma, C dağılma: Yusuf A'yı seçti.
- Açılışta maskot yükleyiciyi tutmak: A ile hiç görünmüyordu.

## Sonuçlar / riskler
- Oturumlu ana ekran yolu gerçek cihazda ölçülmedi (yalnız headless 6x CPU); iPhone'da (ikon düz renkten belirme) görülmedi. (doğrulanmadı)
- Bilinen açık: `android-twa` yedek kabuğunda `data-boot` ayarlanmıyor (Play'i etkilemiyor).

## İlgili
- [[2026-10-20-tussle-ayarlar-acilis-splash-android-apple]] · [[2026-10-17-acilis-tek-akis-ikon-yukleme-giris-formu-oda-sihirbazi-qr]] · [[2026-10-19-maskot-yukleyici-karisik-havuz-uyku]] (soğuk açılış maskotu kısmı değişti)
