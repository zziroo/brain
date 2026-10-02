---
type: project
project: ceviri-araci
date: 2026-10-02
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
- Formatlar: JSON, YAML, XML (Android/resx/XLIFF/genel), PO, properties/ini, Apple .strings, CSV/TSV, txt.
- Paket: `npm run dist` → `release/` altında portable `.exe` ve kurulum (imzasız, SmartScreen uyarısı verir).

## Kararlar
- [[2026-10-02-span-tabanli-yazma]]
- [[2026-10-02-ortaklastirma-yok-dil-kodu-kullanicida]]

## Öğrenilenler
- [[excel-satir-eslestirme-gizli-id-tek-basina-yetmez]]

## Güncel durum (2026-10-02)
v0.1.0 çalışıyor; 282 test geçiyor; iki inceleme turu yapıldı, yüksek bulgu kalmadı. Arkadaşa henüz verilmedi.

## Sıradaki işler
- Arkadaşın gerçek dosyalarıyla denemesi ve geri bildirimi.
- Bilinen küçük eksikler: geri alma (undo) yok; Excel'de boşaltılan hücre çeviriyi silmiyor; nokta ile başlayan klasör doğrudan sürüklenirse sessizce atlanıyor.
