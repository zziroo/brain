---
type: decision
project: pano
date: 2026-10-20
status: active
tags: [pano, canli, sunucu, arayuz, guvenlik]
source: ZZ oturumu ec23c2ad ("canli komutuyla panoyu birlestirebilir miyiz")
---

# Karar: /pano ve /canli tek yerel sunucuda birleşir; Canlı ilk sekme olur, Artifact akışı bırakılır

## Bağlam
Kullanıcının iki aracı vardı: `/pano` (geçmiş, statik HTML) ve `/canli` (çalışan oturumlar, yerel sunucu + SSE). Kullanıcı "Artifact'a bağlı kalmayalım" dedi, Canlı sekmesinin ilk sekme olmasını ve arayüzün komple elden geçirilmesini istedi.

## Karar
- `node pano.mjs --ac` yerel sunucu başlatır (yalnız 127.0.0.1, port 7788; çalışıyorsa yeniden başlatmaz). Tek sayfada ilk sekme **Canlı**, sonra geçmiş sekmeleri. `/canli` komutu önce aynı sayfayı `#canli` ile açan kısayol olarak bırakıldı, aynı gün kullanıcı isteğiyle kaldırıldı (`/pano` zaten Canlı'da açılır). Sunucudaki `/canli` adresi hâlâ `/#canli`'ya yönlenir.
- Geçmiş `/pano.json` ile sunucudan taze gelir; arayüz sekmeye dönünce kendini yeniler.
- Canlı arayüzü iframe değil, `pano/sablon.html` içine gömülü modül. `canli/sablon.html` kullanımdan kalktı (yedek).
- Arayüz yenilendi: tek tasarım sistemi (jetonlar, açık/koyu), yumuşak eğri + gradyanlı grafikler, gün × saat yoğunluğu, önbellek verimi göstergesi, proje bazlı kelime ve aktif süre kartı (kelime tahmini "≈").
- `--artifact` / `yayin-kontrol.mjs` / `/pano yayınla` silinmedi ama önerilmez; paylaşım gerekirse `--metinsiz` statik dosya.

## Neden
Tek araç, tek komut; canlı veri Artifact'ta zaten çalışamaz (SSE yerel sunucu ister) ve Artifact'ın elle yayın + metin tarama maliyeti vardı.

## Reddedilen alternatifler
- Her şeyi tek statik dosyaya gömmek: canlı kısım çalışmaz, `/canli` kuralı (buluta çıkma) ile çelişir.
- Canlı'yı ayrı komut olarak bırakıp yalnız yan yana göstermek (iframe): çift başlık, ayrı tema, çift kaydırma; B1'de gerçek modüle çevrildi.

## Güvenlik (inceleme + şüpheci geçişi sonrası düzeltildi)
- Host denetimi + `Sec-Fetch-Site` (yalnız same-origin/none): başka sitelerin `no-cors` fetch ile ağır hesap tetiklemesi (DoS) kesildi.
- Bekleyen geçmiş hesabı en çok 3, fazlası 429. `--durdur` pid'in gerçekten `sunucu.mjs` olduğunu `ps` ile doğrular. Sunucu kapanırken hesap alt süreci öldürülür.
- Arayüz incelemesi: XSS yok (DOM `textContent` ile), `--metinsiz` sızıntısı yok; 1 orta (Canlı kurulmadan SSE olay kuyruğu şişmesi) ve 3 düşük bulgu düzeltildi.

## Dikkat
- Argümansız `node pano.mjs` artık `out/pano.html` yazmaz, sunucu başlatır. Statik dosya için `--statik` / `--metinsiz`.
- "Kelime" sayısı istem metninden (400 karakterle kırpık, düğme yanıtları ve yapıştırmalar dahil) tahmindir; "aktif süre" oturumun çalışma süresidir, klavye süresi değil.
- Yedekler: `~/.claude/orchestration-report/out/yedek-*` (faz başına). Klasör git deposu değil.

Bağlantılar: [[10-Projects/pano/_overview|Pano]], [[2026-10-13-pano-artifact-yayini]] (superseded olmaz, ama artık önerilmez), [[2026-10-07-pano-dashboard]].
