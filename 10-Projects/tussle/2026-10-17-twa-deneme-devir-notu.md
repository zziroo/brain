---
type: resource
project: tussle
date: 2026-10-17
status: active
tags: [tussle, android, twa, devir-notu]
source: oturum 2026-10-16 gece (mobil-playus) kare hızı turu sonu
---

# Devir notu: Android TWA deneme sürümü (`.twa`)

Yeni oturumun brifi. Öneri ve gerekçe: [[2026-10-17-android-twa-onerisi]]. Bulgular: [[2026-10-16-android-webview-parmak-kalkinca-takilma]].

## Amaç
Play sürümüne dokunmadan, yanına kurulan bir **TWA deneme uygulaması** yapmak. Yusuf iki telefonda (Xiaomi 17 Pro, OnePlus 15; Android 16) Slice'ı parmağı kalkıkken oynayıp akıcılığı Capacitor uygulamasıyla karşılaştıracak. Geçiş kararı ondan sonra Yusuf'un.

## Repo durumu (2026-10-17 00:30)
- `main` = GitHub, temiz. Son commitler: `11127a3` (kare sınırı kalktı; **canlı**, OTA 0.20261016.1948, yedek `pre-11127a3.db`), `050c924` (Android `DisplayRatePlugin` ekran sabitleme + `onLoopActivity`; versionCode 4; **AAB çıkmadı**, Play'de hâlâ versionCode 3).
- Android debug yapısı `applicationIdSuffix ".dev"` ile Play sürümünün yanına kurulur. Telefonlarda `net.ziroo.tussle.dev` kurulu.
- Derleme: `JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"`; adb `~/Library/Android/sdk/platform-tools/adb` (PATH'te yok). Xiaomi seri `cfa7c66`, OnePlus `3B15C400J8C00000`.

## Yapılacaklar
1. TWA projesi: tercihen `android-twa/` gibi ayrı bir klasör (mevcut `android/` Capacitor kabuğuna dokunma). `com.google.androidbrowserhelper` `LauncherActivity` ile elle ya da Bubblewrap CLI ile. Paket adı deneme için `net.ziroo.tussle.twa`. Başlangıç URL'si `https://tussle.ziroo.net/`, tam ekran, dikey, açılış rengi sayfa rengi, ikon mevcut `icon.svg` türevleri.
2. Digital Asset Links: `https://tussle.ziroo.net/.well-known/assetlinks.json` sunucudan statik verilecek (`src/server` statik yolu; `sw.js` bunu önbelleklememeli). Deneme için debug anahtarının SHA-256'sı yeter. Gerçek geçişte Play App Signing anahtarının SHA-256'sı (Console → Uygulama bütünlüğü) eklenecek. **Sunucu yayını Yusuf'un onayıyla.** Asset links doğrulanmazsa TWA adres çubuğu gösterir: deneme yine yapılabilir, akıcılık ölçümü etkilenmez.
3. Kur, Yusuf'a iki telefonda Slice'ı karşılaştırt (parmak kalkık). Gerekirse 240 fps yavaş çekim + ffmpeg top takibi (betik scratchpad'deydi: kare başına renkli piksel ağırlık merkezi, "durma" uzunlukları dağılımı; Chrome'da 2-3 karelik düzenli durmalar = 60 fps, uygulamada 1'lik + ara ara 3-5'lik = düzensiz).
4. Akıcıysa geçiş planı (ayrı iş, Yusuf karar verir):
   - Hesap taşıma: WebView `localStorage` (`https://localhost`; `tussle.token`, cihaz sırrı, `src/client/net.ts`) Chrome'a geçmez. Seçenekler: (a) son Capacitor sürümünde "hesabı taşı" kodu, (b) TWA ilk açılışta gizli bir WebView ile eski depoyu okuyup URL parçasıyla devretmek, (c) kapalı testte az kişi olduğu için kabul.
   - Web tarafı: `isNative` yolları (haptics, status bar, geri tuşu, OTA) TWA'da web yolu olur; `back-intercept.ts` (tanıtım slaytı geri) geçmiş tabanlı çalışmalı; Google girişi TWA'da açılabilir.
   - Play: aynı paket `net.ziroo.tussle`, versionCode 5+, yeni AAB. Kapalı test 14 gün sayacını etkileyip etkilemediğine bak.
   - iOS değişmez.

## Kurallar
- Ajanlar commit/yayın yapmaz; koordinatör yapar. Sunucu yayını, Play yüklemesi Yusuf'un onayıyla.
- Telefonda saniyelik `dumpsys` döngüsü kurma (cihazı kasıyor; bkz. ders notu).

## Ek: yavaş çekim top takibi
Videoyu Xiaomi'den al: `adb -s cfa7c66 pull /sdcard/DCIM/Camera/VID_..._HSR_240.mp4`. Çalıştır: `ffmpeg -v error -i app.mp4 -vf scale=270:480 -f rawvideo -pix_fmt rgb24 - | node track.mjs 270 480` (ffmpeg dönüşü otomatik uygular, `transpose` ekleme).

```js
// reads raw rgb24 frames W x H from stdin; per frame: saturated-pixel count, centroid; prints hold-run stats
const W = +process.argv[2], H = +process.argv[3], FS = W * H * 3;
let buf = Buffer.alloc(0); const rows = [];
process.stdin.on('data', (d) => { buf = Buffer.concat([buf, d]); while (buf.length >= FS) { const f = buf.subarray(0, FS); buf = buf.subarray(FS); let n = 0, sx = 0, sy = 0;
  for (let y = Math.floor(H * 0.08); y < Math.floor(H * 0.70); y++) for (let x = Math.floor(W * 0.12); x < Math.floor(W * 0.86); x++) { const i = (y * W + x) * 3, r = f[i], g = f[i + 1], b = f[i + 2]; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); if (mx > 90 && mx - mn > 70) { n++; sx += x; sy += y; } }
  rows.push(n > 30 ? [n, sx / n, sy / n] : null); } });
process.stdin.on('end', () => {
  // movement per camera frame (centroid distance); a "hold" = consecutive frames with movement < eps while ball present
  const mv = []; for (let i = 1; i < rows.length; i++) { const a = rows[i - 1], b = rows[i]; mv.push(a && b && Math.abs(a[0] - b[0]) / a[0] < 0.3 ? Math.hypot(a[1] - b[1], a[2] - b[2]) : null); }
  const valid = mv.filter((m) => m !== null); valid.sort((a, b) => a - b);
  const eps = 0.15; const runs = new Map(); let run = 0, moving = 0, held = 0, frames = 0;
  for (const m of mv) { if (m === null) { run = 0; continue; } frames++; if (m < eps) { run++; held++; } else { moving++; if (run) runs.set(run, (runs.get(run) || 0) + 1); run = 0; } }
  console.log(`frames with ball ${frames}, moving ${moving}, still ${held}, median move ${valid[valid.length >> 1]?.toFixed(2)} px`);
  console.log('still-run lengths (camera frames @240): ' + [...runs].sort((a, b) => a[0] - b[0]).map(([k, n]) => `${k}:${n}`).join('  '));
});
```
