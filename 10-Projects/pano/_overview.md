---
type: project
project: pano
date: 2026-10-21
status: active
tags: [pano, overview, claude, token, arac]
source: ZZ oturumları 9f1a0281 (2026-10-07 – 2026-10-13) ve ec23c2ad (2026-10-17 – 2026-10-21)
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
- `/pano`: yerel sunucuyu başlatır (çalışıyorsa kullanır) ve tarayıcıda açar; ilk sekme Canlı, sonra geçmiş sekmeleri. `/canli` komutu 2026-10-20'de kaldırıldı.
- `/pano metinsiz`: paylaşım için statik, metinsiz dosya.
- `/pano yayınla`: claude.ai'deki özel Artifact'ı günceller (artık önerilmez).

Talimat `~/.claude/skills/pano/SKILL.md`'de.

## Teknoloji
Klasör: `~/.claude/orchestration-report/`. **Git deposu değil**; sürüm geçmişi ve yedek yok.

| Dosya | İçerik |
|---|---|
| `pano.mjs` | Toplayıcı + başlatıcı. Önbelleği `out/.pano-onbellek.json`: ilk tarama ~5 sn, sonrakiler <2 sn. Varsayılan: yerel sunucu başlatır (2026-10-20, [[2026-10-20-pano-ve-canli-tek-yerel-sunucu]]); `--statik` dosya, `--artifact` eski yayın parçası. |
| `sunucu.mjs`, `baslat.mjs` | Birleşik yerel sunucu (geçmiş + SSE canlı) ve başlatıcı. Yalnız 127.0.0.1, Sec-Fetch-Site/Host denetimli. |
| `ortak.mjs` | Kaynak listesi, fiyatlar, proje adı, redact. `usage.mjs` ve `report.mjs`'ten kopya. |
| `pano/sablon.html` | Arayüz. Tek dosya, dış bağımlılık yok, vanilla JS + SVG/Canvas. |
| `pano/SEMA.md` | Veri sözleşmesi. |
| `pano/yayin-kontrol.mjs` | Yayın öncesi yalnız yeni metinleri listeler. |
| `pano/yayin-maskeler.json` | Yayında gizlenen dizeler. |

- Kaynaklar `~/Arsiv/claude-konusmalar/kaynaklar.json`'dan okunur: Mac canlı ve Windows arşivi.
- Toplam çağrı ve maliyet, aynı süzgeçle `usage.mjs`'e birebir eşit olmalı (SEMA.md'deki doğrulama kuralı).

## Kararlar
- [[2026-10-07-pano-dashboard]]: ham tablolar + tarayıcıda hesap, tek dosya, `usage.mjs` ile eşitlik, zamanlanmış görev işareti
- [[2026-10-13-pano-artifact-yayini]]: özel, metinli Artifact; istek üzerine güncelleme; yalnız yeni metni okuma; IP ve maske listesi (2026-10-20'den beri önerilmez)
- [[2026-10-20-pano-ve-canli-tek-yerel-sunucu]]: pano + canlı tek yerel sunucu, Canlı ilk sekme, Artifact akışı bırakıldı

## Öğrenilenler
- [[2026-10-13-transkriptler-terminal-komutlarini-de-saklar]]
- [[2026-10-13-artifact-sayfasi-kendi-iskeletini-tasimamali]]
- [[2026-10-07-redact-regexinde-sinirsiz-tekrar]]
- [[2026-10-20-yerel-sunucuda-sec-fetch-site-ve-hesap-kuyrugu]]

## Oturumlar
- [[2026-10-13-pano-yapimi-ve-artifact-yayini]]
- [[2026-10-20-pano-canli-birlesmesi-ve-arayuz-yenileme]]

## Yayın
Özel Artifact (yalnız Yusuf görür, link paylaşılırsa görünür). Adres `/pano` skill'inde. Kendiliğinden güncellenmez; 2026-10-20'den beri güncellenmesi önerilmez (son sürüm 5, 20 Ekim).

## Güncel durum

_Son güncelleme: 2026-10-21_

- Yerel sunucu çalışıyor (127.0.0.1:7788): Canlı ilk sekme, arayüz yenilendi, Projeler'de kelime/aktif süre kartı var. Ayrıntı: [[2026-10-20-pano-canli-birlesmesi-ve-arayuz-yenileme]].
- 20 Ekim: 442 oturum, 1.328 ajan, 2.485 istem, API karşılığı ≈ 7.463 $.
- Artifact eski akışla bırakıldı (sürüm 5); güncel kopya yerel sunucuda.

## Sıradaki işler
- Arayüzü gerçek tarayıcıda gözle kontrol et: animasyonlar, ipucu konumu, yığılmış alan eğrisi; Akışlar'daki "Tablo" kusuru.
- Argümansız `node pano.mjs` artık dosya yazmıyor; eski kullanıma dayanan bir betik çıkarsa `--statik` kullan.
- Fiyat tablosu ve yardımcılar `usage.mjs`, `report.mjs` ve `ortak.mjs`'de kopya. Tek dosyada birleştirilebilir. `report.mjs`'in `PRICES` tablosunda yalnız Opus 5.5 ve Sonnet 5 var.
- Klasör git deposu değil; `git init` ile sürüm takibi düşünülebilir.
- Oturum düzeyindeki sayaçlar tarih aralığına bölünmüyor (aktif süre, dosyalar, komutlar, efor); pano bunu kartta yazıyor.
- Artifact linkinde `#oturum/<id>` derin bağlantısı dışarıdan taşınmıyor; yalnız düz hash geçiyor. İstenirse `#oturum.<id>` biçimine geçilebilir.

## Doğrulanmayanlar
- Yeni arayüzün animasyonları ve ipucu konumu gerçek tarayıcıda görsel doğrulanmadı (ajan testleri gizli panelde yapıldı); konsol hatası ve taşma kontrolleri ajan raporuna dayanır.
- Yayınlanan Artifact claude.ai'de gözle kontrol edilmedi. Yerel kopya iki temada ve 400 px'te kontrol edildi.
- Windows'ta `--ac` (`explorer.exe`) dalı denenmedi.
- Firefox ve Safari'de denenmedi; yalnız Chromium tabanlı tarayıcıda denendi.
