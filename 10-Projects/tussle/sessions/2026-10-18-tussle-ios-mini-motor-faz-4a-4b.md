---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ios, mini-motor, javascriptcore, coregraphics, faz-4]
source: oturum 2026-10-18 akşam (mobil-playus, "tussle: durum ve kalan işler"), Yusuf 1 saat yokken
---

# iOS mini motor Faz 4a bitti, Faz 4b yarım (dal `ios-mini-motor`, worktree `.claude/worktrees/agent-a18ce01ce166ceec7`)

Önceki: [[2026-10-18-mini-motor-faz-devir-notu]] (Faz 4 gerekenleri). Karar: [[2026-10-18-android-mini-oyun-motoru]].

## Faz 4a (commit `4e2a785`, inceleme düzeltmeleri `9b96094`)
- `ios/App/App/Mini/MiniEngine.swift` (JavaScriptCore ana bilgisayarı: `__hostMeasure/Haptic/Sfx/Log`, Int8Array'i kopyasız okur) + `MiniPainter.swift` (CoreGraphics + CoreText ressamı, Painter.kt'nin karşılığı) + macOS CLI `ios-mini/` (`build.sh`, `main.swift`: `replay-check`, `parity`, `selftest`).
- **replayCheck 46/46** (koordinatör yeniden çalıştırıp doğruladı). **Parite 50/52**, ortanca en kötü kare %0,05; kalan 2 = renk ✓/✗ yedek glif (Chrome Mac ≠ CoreText; CoreText iOS WebView'in bugünkü hâli). Mac'te kare boyama ~2,3 ms.
- Ressam düzeltmeleri: döşenmiş satırlarda dikiş (Skia AA'sız resim çizimi taklidi: piksel merkezine oturan kırpma + 1 tekselli kenarlı önbellek kopya), gradyan metin tüm tuvali boyuyordu (glif konturları).
- İnceleme (opus) iki orta bulgu → sınama (sonnet) ikisini de **düşüğe indirdi**, düzeltildi: RECT op 47 negatif genişlikte üçgen çiziyordu; komut akışında sınır denetimi yoktu (`-O` ile OOB okuma, negatif sayıda çökme) → opcode başına işlenen sayısı tablosu, `paint()` `Bool` döner, CLI selftest 186 kesik önek + 12 bozuk akışta çökmez.
- PROTOCOL.md belirsizlikleri (sözleşme değişmedi): §3.4 DRAW_IMAGE kenar kaplaması, §5 metin gradyanı, harf aralığında sondaki boşluk, §1 `__hostLog` çok argümanlı.

## Faz 4b (commit'lenmedi: izin sınıflandırıcısı "Create RCE Surface" dedi)
- `ios/App/App/MiniGamePlugin.swift` (Capacitor `MiniGame`: prepare/run/start/layout/setPass/resume/stop; olaylar chunk/paused/done/error; CADisplayLink'li ayrı iş parçacığı; BGRA bitmap → layer contents; dokunsal tablo; ses taslak), `SceneDelegate.swift` (`TussleBridgeViewController` eklentiyi kaydeder, `TussleWindow.hitTest` dokunuş yönlendirme), `project.pbxproj` (Mini grubu, Nunito `../../android/...` tek kopya), `src/client/native-game.ts` (iOS da; `Capacitor.isPluginAvailable('MiniGame')` kapısı → eklentisiz eski iOS yapısı OTA ile gelen istemcide WebView yolunda kalır).
- Simülatör (iPhone 17, iOS 27): BUILD SUCCEEDED, paket 25,6 ms'de yüklendi (46 oyun), build id istemciyle aynı → yerel yol açılıyor. **Oyun henüz oynatılmadı:** oda adı alanına simülatör aracının yapıştırması WKWebView'e ulaşmadı; JS ile sürme düzeneği sınıflandırıcıya takıldı.
- Commit'i sınıflandırıcı engellediği için koordinatör de atmadı; Yusuf'un kararı.

## Faz 4c'ye kalan
Simülatörde tam oyun (zipla/hedef): yerel çizim, dokunuş, kapat X, sonuç kartı, paint ms; ses (Sfx.kt → AVAudioEngine); simülatörde replayCheck + parite; klavye/safe area yerleşimi; TestFlight `CURRENT_PROJECT_VERSION` 5 → 6. Bu çalışma ağacında `cap sync` değil `cap copy` (sync `CapApp-SPM/Package.swift`'i sembolik bağ yollarıyla bozar).
