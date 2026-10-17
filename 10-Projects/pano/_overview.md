---
type: project
project: pano
date: 2026-10-13
status: active
tags: [pano, overview, claude, token, arac]
source: ZZ oturumu 9f1a0281 (2026-10-07 – 2026-10-13)
---

# Pano: bütün Claude Code geçmişini gösteren animasyonlu dashboard

> Not canlı gerçek değildir: dosyaları ve artifact'ı işlem yapmadan önce doğrula.

## Nedir
Mac ve Windows arşivindeki bütün Claude Code oturumlarını ve alt ajanlarını tarar, tek dosyalık bir dashboard üretir. Bölümler:
- token ve maliyet (API liste fiyatı karşılığı),
- projeler,
- oturumlar (her oturum oynatılabilir zaman çizelgesiyle),
- araç akışları ve orkestrasyon Sankey'i,
- ajanlar,
- alışkanlıklar,
- dosyalar.

Tarih, kaynak, proje, model ve zamanlanmış görev filtreleri bütün bölümlerde çalışır.

## Kullanım
- `/pano`: yerel panoyu üretir ve tarayıcıda açar.
- `/pano yayınla`: claude.ai'deki özel Artifact'ı günceller.

Talimat `~/.claude/skills/pano/SKILL.md`'de.

## Teknoloji
Klasör: `~/.claude/orchestration-report/`. **Git deposu değil**; sürüm geçmişi ve yedek yok.

| Dosya | İçerik |
|---|---|
| `pano.mjs` | Toplayıcı. Önbelleği `out/.pano-onbellek.json`: ilk tarama ~5 sn, sonrakiler <2 sn. `--artifact` yayın parçasını üretir. |
| `ortak.mjs` | Kaynak listesi, fiyatlar, proje adı, redact. `usage.mjs` ve `report.mjs`'ten kopya. |
| `pano/sablon.html` | Arayüz. Tek dosya, dış bağımlılık yok, vanilla JS + SVG/Canvas. |
| `pano/SEMA.md` | Veri sözleşmesi. |
| `pano/yayin-kontrol.mjs` | Yayın öncesi yalnız yeni metinleri listeler. |
| `pano/yayin-maskeler.json` | Yayında gizlenen dizeler. |

- Kaynaklar `~/Arsiv/claude-konusmalar/kaynaklar.json`'dan okunur: Mac canlı ve Windows arşivi.
- Toplam çağrı ve maliyet, aynı süzgeçle `usage.mjs`'e birebir eşit olmalı (SEMA.md'deki doğrulama kuralı).

## Kararlar
- [[2026-10-07-pano-dashboard]]: ham tablolar + tarayıcıda hesap, tek dosya, `usage.mjs` ile eşitlik, zamanlanmış görev işareti
- [[2026-10-13-pano-artifact-yayini]]: özel, metinli Artifact; istek üzerine güncelleme; yalnız yeni metni okuma; IP ve maske listesi

## Öğrenilenler
- [[2026-10-13-transkriptler-terminal-komutlarini-de-saklar]]
- [[2026-10-13-artifact-sayfasi-kendi-iskeletini-tasimamali]]
- [[2026-10-07-redact-regexinde-sinirsiz-tekrar]]

## Oturumlar
- [[2026-10-13-pano-yapimi-ve-artifact-yayini]]

## Yayın
Özel Artifact (yalnız Yusuf görür, link paylaşılırsa görünür). Adres `/pano` skill'inde. Kendiliğinden güncellenmez.

## Güncel durum

_Son güncelleme: 2026-10-13_

- Yerel pano çalışıyor. Artifact'a giden veri (2026-10-13 gecesi üretildi): 326 oturum, 768 alt ajan, 1.308 istem, API karşılığı ~5.572 $.
- Artifact 2026-10-13'te ilk kez yayınlandı (sürüm 1, metinli, maskeli). Okunan 5.672 metin "görüldü" olarak kaydedildi.

## Sıradaki işler
- Fiyat tablosu ve yardımcılar `usage.mjs`, `report.mjs` ve `ortak.mjs`'de kopya. Tek dosyada birleştirilebilir. `report.mjs`'in `PRICES` tablosunda yalnız Opus 5.5 ve Sonnet 5 var.
- Klasör git deposu değil; `git init` ile sürüm takibi düşünülebilir.
- Oturum düzeyindeki sayaçlar tarih aralığına bölünmüyor (aktif süre, dosyalar, komutlar, efor); pano bunu kartta yazıyor.
- Artifact linkinde `#oturum/<id>` derin bağlantısı dışarıdan taşınmıyor; yalnız düz hash geçiyor. İstenirse `#oturum.<id>` biçimine geçilebilir.

## Doğrulanmayanlar
- Yayınlanan Artifact claude.ai'de gözle kontrol edilmedi. Yerel kopya iki temada ve 400 px'te kontrol edildi.
- Windows'ta `--ac` (`explorer.exe`) dalı denenmedi.
- Firefox ve Safari'de denenmedi; yalnız Chromium tabanlı tarayıcıda denendi.
