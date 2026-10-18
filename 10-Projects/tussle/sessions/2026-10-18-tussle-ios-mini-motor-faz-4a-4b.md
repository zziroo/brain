---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ios, mini-motor, javascriptcore, coregraphics, faz-4]
source: oturum 2026-10-18 akşam (mobil-playus, "tussle: durum ve kalan işler"), Yusuf 1 saat yokken
---

# iOS mini motor Faz 4a-4c bitti, main'e birleşti (`0d633ef`, yerel); cihaz denemesi (Faz 4d) TestFlight build 6 bekliyor

Önceki: [[2026-10-18-mini-motor-faz-devir-notu]] (Faz 4 gerekenleri). Karar: [[2026-10-18-android-mini-oyun-motoru]].

## Faz 4a (commit `4e2a785`, inceleme düzeltmeleri `9b96094`)
- `ios/App/App/Mini/MiniEngine.swift` (JavaScriptCore ana bilgisayarı: `__hostMeasure/Haptic/Sfx/Log`, Int8Array'i kopyasız okur) + `MiniPainter.swift` (CoreGraphics + CoreText ressamı, Painter.kt'nin karşılığı) + macOS CLI `ios-mini/` (`build.sh`, `main.swift`: `replay-check`, `parity`, `selftest`).
- **replayCheck 46/46** (koordinatör yeniden çalıştırıp doğruladı). **Parite 50/52**, ortanca en kötü kare %0,05; kalan 2 = renk ✓/✗ yedek glif (Chrome Mac ≠ CoreText; CoreText iOS WebView'in bugünkü hâli). Mac'te kare boyama ~2,3 ms.
- Ressam düzeltmeleri: döşenmiş satırlarda dikiş (Skia AA'sız resim çizimi taklidi: piksel merkezine oturan kırpma + 1 tekselli kenarlı önbellek kopya), gradyan metin tüm tuvali boyuyordu (glif konturları).
- İnceleme (opus) iki orta bulgu → sınama (sonnet) ikisini de **düşüğe indirdi**, düzeltildi: RECT op 47 negatif genişlikte üçgen çiziyordu; komut akışında sınır denetimi yoktu (`-O` ile OOB okuma, negatif sayıda çökme) → opcode başına işlenen sayısı tablosu, `paint()` `Bool` döner, CLI selftest 186 kesik önek + 12 bozuk akışta çökmez.
- PROTOCOL.md belirsizlikleri (sözleşme değişmedi): §3.4 DRAW_IMAGE kenar kaplaması, §5 metin gradyanı, harf aralığında sondaki boşluk, §1 `__hostLog` çok argümanlı.

## Faz 4b (`7520b02`; ajanın commit'i sınıflandırıcıya takıldı, Yusuf onayıyla koordinatör commit'ledi)
- `ios/App/App/MiniGamePlugin.swift` (Capacitor `MiniGame`: prepare/run/start/layout/setPass/resume/stop; olaylar chunk/paused/done/error; CADisplayLink'li ayrı iş parçacığı; BGRA bitmap → layer contents; dokunsal tablo; ses taslak), `SceneDelegate.swift` (`TussleBridgeViewController` eklentiyi kaydeder, `TussleWindow.hitTest` dokunuş yönlendirme), `project.pbxproj` (Mini grubu, Nunito `../../android/...` tek kopya), `src/client/native-game.ts` (iOS da; `Capacitor.isPluginAvailable('MiniGame')` kapısı → eklentisiz eski iOS yapısı OTA ile gelen istemcide WebView yolunda kalır).
- Simülatör (iPhone 17, iOS 27): BUILD SUCCEEDED, paket 25,6 ms'de yüklendi (46 oyun), build id istemciyle aynı → yerel yol açılıyor. **Oyun henüz oynatılmadı:** oda adı alanına simülatör aracının yapıştırması WKWebView'e ulaşmadı; JS ile sürme düzeneği sınıflandırıcıya takıldı.

## Faz 4c'ye kalan
Simülatörde tam oyun (zipla/hedef): yerel çizim, dokunuş, kapat X, sonuç kartı, paint ms; ses (Sfx.kt → AVAudioEngine); simülatörde replayCheck + parite; klavye/safe area yerleşimi; TestFlight `CURRENT_PROJECT_VERSION` 5 → 6. Bu çalışma ağacında `cap sync` değil `cap copy` (sync `CapApp-SPM/Package.swift`'i sembolik bağ yollarıyla bozar).

## Faz 4b incelemesi (commit'siz diff, opus, salt okuma)
Kritik/yüksek yok. **Orta (performans):** her kare tam bitmap iki kez kopyalanıyor (`MiniGamePlugin.swift` ~731-748: yeniden kullanılan bağlam + `makeImage` yazınca-kopyala, sonra CA'nın IOSurface olmayan resmi kopyalaması; 3x'te ~9 MB/kopya, 120 Hz'de 1-2 GB/s; istatistikte "paint" sayılıyor). Düzeltme: 2-3 IOSurface halkası ve `layer.contents = IOSurface` (en az: 2-3 CGContext döndür). Önce cihazda ölç. Sınama ajanı çalıştırılmadı: düzeltme Faz 4c'de ölçümle birlikte yapılacak.
Düşükler (4c'de): koşu üretim numarası (zaman aşımından sonra `stop` ardından geç gelen `run` → `show()` WebView'i saydam bırakır, Android'de de aynı; geç kare `hide()` sonrası katmana düşer); sayfa yeniden yüklenip `prepare()` gelmezse eski durum kalır (gezinmede `stopNow`); `run/resize`'ı string yerine `e.call(...)` ile ver; `isPluginAvailable === false` dalına test; haptik `prepare()`. Doğru bulunanlar: enjeksiyon yok (JSON metni + yalnız `capacitor://localhost`), paket yolu, iş parçacığı ayrımı, hitTest/CANCEL, eski iOS/Android yapılarının WebView'de kalması, pbxproj Nunito yolu temiz checkout'ta bulunur.

## Faz 4c (`7a797be`, `f54fa68`, `6134268`, inceleme düşükleri `9553e1e`; main'e birleşme `0d633ef`)
- Simülatörde uçtan uca: zipla 60 fps + sonuç kartı + Tekrar dene; hedef dokunuş + süre doldu + kapat X (WebView zemini geri geldi); basket sürükleme + oyun ortası X; yilan çizim + done. Uygulama içi replayCheck 46/46.
- Yalnız DEBUG başlatma argümanları: `-TussleStartHash /oyun/<id>` (oda kurmadan oyunu açar; simülatörde WKWebView'e yazı girilemiyordu), `-TussleMiniReplayCheck YES` (`Documents/mini-replay.jsonl`). Release'te derlenmez (inceleme doğruladı).
- IOSurface halkası (3-4 tampon, `layer.contents = surface`): render iş parçacığında kare başına ~0,75 ms kazanç, ama simülatörde ana iş parçacığı `present` 0,04 → ~0,7 ms (simülatör GPU kopyası olabilir); net kazanç cihazda ölçülecek. İstatistik satırı js/clear/paint/hand/present/in/sfx.
- Ses: `MiniSfx.swift` (Sfx.kt birebir, AVAudioSourceNode, `.ambient` + mixWithOthers: sessiz anahtarına uyar, müziği kesmez). Kulakla dinlenmedi.
- İncelemeler: 4c'de orta+ yok; düşükler düzeltildi (dolu halkada kareyi atla, sRGB etiketi, her sayfa yüklemesinde stopNow, medya servisi sıfırlanınca motoru yeniden kur, arka planda ses kuyruğa girmez).
- Sonra: ana dal testleri 2106 geçti, replayCheck 46/46; worktree + dal silindi.

## Faz 4d (kalan)
- TestFlight build 6 (`CURRENT_PROJECT_VERSION` 5 → 6), iPhone'lu testçide: istatistik satırı (`present`, `late=0`), ses (sessiz anahtarı, müzik), haptik, 120 Hz. Yusuf'un iOS cihazı yok.
- `otaMinNative` yükseltmesi şart değil: eklentisiz eski iOS/Android yapısı `isPluginAvailable` false → WebView yolu (testli).
- Açık küçükler: renk ✓/✗ yedek glifi (parite 50/52), simülatörde ilk "Başla" dokunuşu bazen kayboluyor (araç kaynaklı olabilir).
