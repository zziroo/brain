---
type: session
project: tussle
date: 2026-10-09
status: active
tags: [tussle, oturum, kapak]
source: oturum 2026-10-09 (mobil-playus: D/E/F kapakları, Antrenman satırı)
---

# Oturum: havuzdaki 14 oyunun kapağı ve Antrenman düzeltmesi

- **Kapsam kararı:** haftalık limit %89 iken Yusuf "havuzdaki 14" seçti; havuz dışı 4 (plinko, zar, salyangoz, itici) yer tutucuda kaldı.
- **Kapaklar** (tek opus ajanı, `covers-core.ts` + `theme.css` `--cover-<id>`/`-2` + `MASCOT_BOX` + test + VISUAL.md §4.1): kapi, oruntu, ipatla, firlat, cark, hazine, vinc, gecit, pinyata, sifre, katane, cizgi, doldur, ritim. Ajan tarayıcıda açık/koyu, 320 ve 48 px kontrol etti; önizleme sayfası gitignore'lu `src/client/.scratch-icons/`.
- **Antrenman:** ana sayfa satırı 40 küçük kapağı diziyordu, telefonda ekran dışına taşıyordu (Yusuf ekran görüntüsü) → ilk 4 kapak. Antrenman listesi OFF_POOL'u gizler (36 oyun). [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]]
- **Yayın** `2482f79`: inceleme ajanı bulgu yok, 1.279 test yeşil, yedek `pre-2482f79.db`, healthz ok; canlıda Antrenman 36 oyun ve yer tutucu yok doğrulandı. Kapaklar Yusuf'un isteğiyle onay turu beklemeden yayınlandı.
- Dersler: [[2026-10-09-kapak-turu-dersleri]]

**Doğrulanmadı:** kapakların telefonda görünüşü; koyu temada ritim ve gecit panellerinin gerçek kart içindeki ayrışması; Antrenman satırının canlıda telefonda görünüşü (yerelde 375 px'te denendi).
