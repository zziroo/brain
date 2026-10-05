---
type: project
project: ceviri-araci
date: 2026-10-05
status: active
tags: [ceviri-araci, overview, lokalizasyon]
source: 2026-10-02 oturumu (string-tool)
---

# Çeviri Aracı: oyun lokalizasyon dosyalarını Excel'e aktarıp çevrilmiş dosyaları geri üreten masaüstü araç

> Not canlı gerçek değildir: repo ve sürüm durumunu işlem yapmadan önce doğrula.

## Nedir
Yusuf'un çevirmen arkadaşı için. Oyun stüdyoları İngilizce dil dosyalarını farklı formatlarda gönderiyor; çevirmenler metinleri elle Excel'e taşıyıp çeviriyor, sonra elle TR dosyalarına geri yazıyordu (elle yapılan `LocalTutorial-tr.json` geçersiz JSON çıkmıştı). Araç: kaynak dosyaları yükle → Excel'e aktar → çevrilmiş Excel'i al → orijinaliyle birebir aynı yapıda hedef dil dosyalarını üret.

## Teknoloji
- Klasör `C:\Users\yusuf\ZZ\zProjects\string-tool` (yerel git, remote yok).
- Electron 44 + electron-vite 5 + React 19 + TypeScript 7; exceljs, yaml, fflate. Testler vitest (`npm test`).
- `src/core` saf TS çekirdek (format işleyiciler, Excel, QA, prefill), `src/main` (dosya sistemi/IPC, yol ve uzantı denetimi), `src/renderer` (Türkçe arayüz).
- Formatlar: JSON, YAML, XML (Android/resx/XLIFF/genel), PO, properties/ini, Apple .strings, CSV/TSV, Ren'Py (.rpy, tl dosyaları), txt.
- Paket: `npm run dist` → `release/` altında portable `.exe` ve kurulum (imzasız, SmartScreen uyarısı verir).
- Yayın: https://tools.ziroo.net/ceviri-araci (indirme sayfası + iki .exe; eski diskort.ziroo.net/tools/ceviri-araci 301 ile yönlenir). `bash deploy/deploy.sh` (önce `npm run dist`) sunucuda statik kopyalar; hedef `/opt/ziroo-www/tools/ceviri-araci` (2026-10-03 geçişte kullanıldı). Betik yalnız kendi yollarına dokunur. Karar: [[2026-10-02-yayin-diskort-tools-altinda]] (eski), güncel: [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]].

## Kararlar
- [[2026-10-02-span-tabanli-yazma]]
- [[2026-10-02-ortaklastirma-yok-dil-kodu-kullanicida]]
- [[2026-10-02-yayin-diskort-tools-altinda]]
- [[2026-10-02-renpy-tl-dosyalari]]
- [[2026-10-02-kelime-sayimi]] (Yusuf onaylamadı)

## Öğrenilenler
- [[excel-satir-eslestirme-gizli-id-tek-basina-yetmez]]
- [[paylasilan-web-kokunde-yalniz-kendi-yollarina-dokun]]
- [[ajan-arac-tuzaklari-ters-egik-cizgi]]

## Oturumlar
- [[2026-10-02-ceviri-araci-v0-1-ve-v0-2]]

## Güncel durum (2026-10-03)
- **2026-10-05:** indirme sayfası neon temada (`29bb7ef`), elle yayınlandı çünkü betik Mac'te `.exe` olmadan çalışmıyor ([[mac-ten-yayin-copyfile-disable-ve-exe-siz-ceviri-sayfasi]]). Electron arayüzü eski görünümde.
v0.2.0 yayında (sunucuda yalnız son sürüm durur), 333 test geçiyor. v0.2.0 ile: Ren'Py desteği, Excel'de ve uygulamada dosya başına renk (paylaşılan palet `src/core/stats.ts`), Kelime / Dosya Toplamı / Genel Toplam sütunları. Dağıtım betiğinin kapsamı daraltıldı (commit b52a86c); bu düzeltmeden sonra yeniden yayın gerekmedi, sunucudaki dosyalar aynı.

## Sıradaki işler
- Arkadaşın gerçek dosyalarıyla denemesi ve geri bildirimi; Ren'Py çıktısının oyunda denenmesi (doğrulanmadı).
- Kelime sayımı için Yusuf'un onayı (boşluk sayımı mı, harf/rakam içeren parça mı).
- Sunucuda Ziroobank statik dosyalarının sahip/izinlerinin eski betikten etkilenip etkilenmediğine SSH ile bakılmadı; sayfa çalışıyor.
- Bilinen küçük eksikler: undo yok; Excel'de boşaltılan hücre çeviriyi silmiyor; nokta ile başlayan klasör doğrudan sürüklenirse sessizce atlanıyor; başka araçla yapılmış Excel'de "Translation status" başlığı çeviri sütunu sanılabilir; `.exe` imzasız.
