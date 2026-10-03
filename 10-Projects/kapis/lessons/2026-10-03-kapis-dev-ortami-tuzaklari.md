---
type: lesson
project: kapis
date: 2026-10-03
status: active
tags: [kapis, dev-ortami, vite, windows, preview]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa)
---

# Dev ortamı: önizleme PORT'u, paylaşılan vite önbelleği, Windows zamanlayıcı

## Ne oldu
- `preview_start` başlatılan sürece `PORT` env'ini kendi portuyla geçiriyor; `npm run dev` içindeki oyun sunucusu vite ile aynı porta bağlandı. **Çözüm:** launch.json'da derlenmiş tek portlu sunucuyu çalıştır (`node dist/server/index.js`, 8080).
- Paralel vite örnekleri `node_modules/.vite` önbelleğini paylaştı. **Çözüm:** `cacheDir` porta göre ayrıldı.
- Windows'ta `setInterval` çözünürlüğü ~15,6 ms: tick'ler ortalama 7,6 ms geç başlar. Uzun vadeli hız doğru; Linux'ta sorun yok.
- (Kill cam oturumu) PowerShell 5.1'de `Get-Content -Raw | Set-Content` ile kaynak dosya düzenlemek ASCII dışı karakterleri bozdu (`constants.ts`'te 20 satır değişti) ve BOM ekliyor. **Çözüm:** Edit aracını kullan; toplu değişiklik gerekiyorsa `[IO.File]::ReadAllText/WriteAllText` + `UTF8Encoding($false)`.
- (Kill cam oturumu) PowerShell 5.1 here-string ile `git commit -m` içinde çift tırnak geçince mesaj bölündü, commit atılmadı. **Çözüm:** mesajı dosyaya yaz, `git commit -F`.
- (Kill cam oturumu) `tests/server-sim.test.ts` gerçek zaman testi, aynı anda başka bir ajan da `npm test` çalıştırırken bir kez düştü; tek başına geçti.

## Çıkarım
Önizleme ve paralel ajan sunucularında port ve önbellek yolunu açıkça ayır; Windows zamanlama ölçümünü Linux davranışı sanma. Kaynak dosyaları PowerShell boru hattıyla yeniden yazma.

## İlgili
- [[_overview]], [[dev-ortami-tuzaklari]]
