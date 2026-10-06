---
type: decision
project: silksong-mod
date: 2026-10-06
status: active
tags: [silksong, mod, bepinex, kayit, guvenlik]
source: Windows oturumu 2026-10-06 (repo silksong-mod, commit 39675d5)
---

# Modlu oyunun kayıt yolu, mod kopyasının diskteki Assembly-CSharp.dll'ine gömülü olarak yönlendirilir

**Karar:** Modlu oyun ayrı bir kopyada çalışır (`D:\SilksongMod\Hollow Knight Silksong`). O kopyanın `Managed\Assembly-CSharp.dll` dosyasındaki tüm `Application.persistentDataPath` okumaları (5 yer) bir install aracıyla diskte yeniden yazılır ve `...\Hollow Knight Silksong\_SunkenForgeMod\` klasörüne gider. Orijinal dosya `.orig` olarak saklanır; hash ve MVID bir manifestte tutulur. BepInEx patcher'ı ve eklenti bunu yalnızca doğrular; doğrulanamazsa oyunu kayda dokunmadan öldürür.

**Neden:**
- Kullanıcının kendi kaydı en önemli kısıt. Yönlendirmenin BepInEx'in yüklenmesine bağlı olmaması gerekiyordu.
- BepInEx 5 preloader'ı patch/load hatalarını yutuyor; Unity bu durumda orijinal DLL'i yüklüyor ve oyun sessizce gerçek kayıtlarla açılıyor (bkz. [[2026-10-06-bepinex-preloader-hatayi-yutar]]). Diske gömülü yama bu açığı kapatıyor: doorstop kapalı olsa da kopya her zaman yönlendirilmiş çalışır.
- İlk çalıştırmada doğrulandı: `SAVE REDIRECT ACTIVE`, gerçek `1047276770\` klasörü yedekle birebir aynı kaldı.

**Reddedilen alternatifler:**
- *Eklentide Harmony transpiler:* chainloader `DesktopPlatform.Awake`'ten sonra yüklenebilirdi; yükleme sırası garanti değil.
- *BepInEx preloader ile bellekte yama:* sıra sorununu çözüyor ama BepInEx hata verirse fail-open (vanilla oyun, gerçek kayıt). İnceleme bunu HIGH buldu.
- *Modu Steam kurulumuna kurmak:* Steam güncellemesi modu bozar, vanilla oyun da modlu olur. Kopya tercih edildi.
- *Steam Cloud'u kapatmak:* gerekmedi; mod kayıtları farklı yolda, bulutta fazladan dosya olarak görünse de gerçek dosyaların üzerine yazılmaz.

Kalan, kabul edilen yalıtımsızlıklar: PlayerPrefs (registry ayarları), Unity `Player.log`, Addressables önbelleği.
