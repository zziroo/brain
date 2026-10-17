---
type: lesson
project: genel
date: 2026-10-17
status: active
tags: [claude-code, scratchpad, onizleme]
source: oturum "ziroo-edge: 2D kaydırmalı Ziroo ana sayfa" (2026-10-17, bilgisayar kapandı)
---

# Ders: Oturumun scratchpad'i (`/private/tmp/...`) bilgisayar yeniden başlayınca silinir

## Ne oldu
Önizleme sunucusu (`serve.mjs`), test sayfaları ve referans kopyalar scratchpad'deydi. `.claude/launch.json` de oraya bakıyordu. Bilgisayar kapanınca klasör tamamen gitti: önizleme açılmadı, yarıda kalan ajanın da ölçüm araçları yoktu.

## Nasıl uygulanır
- Birden fazla gün sürecek işlerde kalıcı test araçlarını depoda, commit'lenmeyen bir klasörde tut. ziroo-edge'de: `.claude/onizleme/` (`serve.mjs`, `h.js`, `rm.js`); `launch.json` göreli yolla `.claude/onizleme/serve.mjs`.
- Referans dosyaları (başka oturumun scratchpad'indeki taslaklar) işin başında kalıcı yere kopyala ya da yayındaki artifact'tan `read` ile al.
- Yarıda kalan ajan için önce `git status`: commit'lenmemiş iş var mı bak. Bu sefer yoktu, aşama baştan yapıldı.

## İlgili
- [[gizli-onizleme-panelinde-animasyon-durur-ve-gorunum-0x0]]
