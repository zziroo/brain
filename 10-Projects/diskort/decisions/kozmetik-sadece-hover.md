---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, kozmetik, performans, 0-9-3]
source: memory diskort-cosmetics-plan.md ("After 0.9.2"), diskort-handoff.md
---

# Kozmetikler yalnızca işaret edilince oynar (Discord gibi), tüm platformlarda

## Bağlam
0.9.2 akşamı Yusuf telefonda kozmetiklerin düşük kalite göründüğünü (3-3.5x ekranlarda 2x varlıklar büyütülmüş, kayıplı WebP) ve uygulamanın takıldığını bildirdi, çoğunlukla üye listesinde (`kozmetik: aynı anda çok fazla dosya oynuyor`; WebP UI thread'inde çözülüyordu).

## Karar
Discord gibi, yalnız işaret edilince oynar. Masaüstü: satır/avatarlar hover (ve klavye odağı) ile canlanır, açılan profil kartı oynar. Mobil: listeler hep hareketsiz (yalnız poster, oynatıcı yok), açılan profil oynar. Kayıt: 0.9.3'te yayınlandı.

## Neden
Aynı anda çok dosya oynaması takılmaya yol açıyordu.

## Reddedilen alternatifler
Listede her zaman oynatma (0.9.2 davranışı): takılma nedeniyle bırakıldı.

## Sonuçlar / riskler
Sıradaki: çözmeyi UI thread dışına al, mobil için daha yüksek çözünürlüklü varlıklar, Yusuf'la OTA ile test. Plakalı satırlarda küçük avatar kırpılması kontrol edilecek ([[_overview]]).

## İlgili
- [[kozmetik-sunucudan-paketler]]
