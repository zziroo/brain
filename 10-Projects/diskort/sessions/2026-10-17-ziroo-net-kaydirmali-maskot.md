---
type: session
project: ziroo-edge
date: 2026-10-17
status: done
tags: [marka, maskot, ziroo-net, ana-sayfa, animasyon]
source: oturum "ziroo-edge: 2D kaydırmalı Ziroo ana sayfa" (2026-10-16/17; "marka: Ziroo maskotu" oturumundan başlatıldı)
---

# Oturum: ziroo.net ana sayfasına kaydırmalı 2D Ziroo

## Ne yapıldı
- 3D denemenin etkileşimi SVG ile yeniden kuruldu. Akış: Giriş (ZIROO yazısının iki O'su gözlere dönüşür), Oyunlar, Diskort, Araçlar, HADİ BAŞLA ve sonunda kapılar.
- Çizim stili için sitede Neon ile koyu çizgi yan yana denendi; kullanıcı koyu çizgiyi seçti.
- Kullanıcı geri bildirimiyle sekiz tur yapıldı, her tur ayrı bir review ajanından geçti:
  - v2: yazı ile karakter tek kompozisyonda.
  - Mobil takılma giderildi.
  - Unbounded fontu ve çizilerek gelen harfler.
  - Geçişleri Ziroo yapıyor: eski başlığı dağıtıp yenisini yazıyor.
  - Hız ve sekme ayarları.
  - Ziroo HADİ BAŞLA'nın arkasından bakıyor.
  - Okuma molası ve İ'nin noktası Ziroo'nun eli.
  - Kapı koridoru ve kapı görevlisi Ziroo.
- ziroo.net'e dört kez kullanıcı onayıyla yayınlandı, son yayın `76d2f09`. `deploy-www.sh home` artık `home.js`, font ve lisans dosyasını da yayınlıyor.

## Alınan kararlar
- [[decisions/2026-10-16-ziroo-net-kaydirmali-2d-maskot]]: bütün tasarım kararları, neden ve reddedilen alternatifler.

## Öğrenilenler
- [[lessons/mobilde-buyuk-olceklenen-katman-ve-durmayan-dongu-kasar]]
- [[lessons/animation-kisayolu-duraklatma-kuralini-ezer]]
- [[lessons/background-clip-text-harf-kutusu-disini-boyamaz]]
- [[lessons/gizli-onizleme-panelinde-animasyon-durur-ve-gorunum-0x0]]
- [[lessons/scratchpad-yeniden-baslatmada-silinir]]

## Açık kalanlar
- Safari ve iOS'ta hiç denenmedi: çizgi animasyonu, clip-path, svh.
- Gerçek kaydırma hissi ve fps'i kullanıcı deneyecek.
- Fareyle kapıya gelme ve klavyeyle kapıya geçme gizli panelde denenemedi.
- Halka göz ayarı açık, `home.js`'teki `EYE` nesnesinde.
- Fareyle kapıya gelinince Ziroo'nun kapıyı açması 0,7–1 saniye sürüyor.
