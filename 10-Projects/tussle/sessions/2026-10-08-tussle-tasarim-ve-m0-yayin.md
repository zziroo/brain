---
type: session
project: tussle
date: 2026-10-08
status: done
tags: [tussle, oturum, tasarim, yayin]
source: oturum 2026-10-08 (mobil-playus)
---

# Oturum: Playus incelemesi, Tussle tasarımı, M0 inşası ve yayın

- Playus (`club.playus`) incelendi: günlük 1 dk oyun, grup kodu, sınırlı deneme, sezon; 165 MB paket, ısınma, özelleştirme yok, "oyunlar tekrar ediyor" şikâyeti.
- Tasarım yazıldı (`docs/DESIGN.md`): Günün Oyunu, Düello/Arena (canlı), Parti Gecesi; oda ayarları matrisi; 12 oyunluk katalog; PWA + Capacitor; kapasite analizi (mevcut VPS ilk on binlerce kullanıcıya yeter, darboğaz trafik paketi).
- Kararlar: [[2026-10-08-web-cekirdegi-capacitor-ve-ad-tussle]], [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]. Yusuf: öncelik "her cihazda hiç kasmasın", mimari ve oyun seçimi Claude'da, Google/Apple girişi şart, markete global çıkış.
- M0 inşa: çekirdek + Refleks (1 ajan), Kule/Matematik/Bıçak + sunucu/lobi (4 paralel), 2 inceleme + 3 şüpheci + 3 düzeltme ajanı. Sonuç 211 test, 2 commit, yayın https://tussle.ziroo.net.
- Pazarlama sohbeti: yumuşak çıkış (TR), uygulama içi viral döngü (davet linki, paylaşım kartı, puan isteme), ASO, resmî çıkış vuruşu (kısa video, topluluklar).
- Dersler: [[2026-10-08-tussle-m0-dersleri]]. Sıradaki: cila turu, Kule zorluğu, canlı kapışma, Capacitor, mağaza.
