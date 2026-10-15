---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, gorsel, view, sade-sahne, geri-bildirim]
source: "oturum 2026-10-15 (mobil-playus yan oturum: Yayın 2 görünüm düzeltmeleri; 7 opus ajan + inceleme + skeptik)"
---

# Arkadaş geri bildirimi Yayın 2: yedi oyunun sahnesi sade kural içinde zenginleşti, sim'e dokunulmadı

## Karar
Yayın 1 (kural/denge, `4137f21`) sonrası görsel maddeler yalnız `view.ts` dosyalarında çözüldü; sim, meta sürümü ve altın tohum testleri aynı (1.667 test yeşil, typecheck temiz). `docs/VISUAL.md` §2.1 "sade sahne" kuralı korundu; "zenginlik" tek arka plan katmanı, pişirilmiş renk dizileri ve nesne detayından geldi:
- **Chop:** kapağın alacakaranlık paleti (lavanta + erik tepeler, ay, nane zemin bandı, kasklı kahraman); zemin yine `theme.bg`.
- **Spike Wall:** duvar rengi yüksekliğe göre 48 adımlı LUT ile sürekli geçer (gündüz lavanta → pembe → mercan, gece koyu tonlar); bitiş yazıları yumuşak açılır; ekrandan ve metinlerden "şeker" kalktı: toplanan nesne **"boncuk"** (yeni skor birimi `boncuk`, `SCORE_UNITS` + `unit.boncuk.*`; `meta.ts` yalnız açıklama ve ikincil birim).
- **Zigzag:** bir koldaki karolar tek siluetle konturlanır (16 komşuluk maskesi, iç dikiş yok); renk 6 durak × 6 karışımlık halka ile karo karo akar.
- **Arrow Wall:** kıvılcım ve "+1" yalnız gerçek geçişte ve okun ucunun duvardan çıktığı yerde; geçilen boşluk ok çıkana dek kalır (eski halde yeni duvar hemen kurulduğundan kıvılcım duvarın üstünde kalıyor, "boşluğa vuruşta partikül" gibi görünüyordu); hedef iki sarı direk + soluk pencere.
- **Jetpack:** 2 tonlu laboratuvar silueti + tepeler (paralaks), sticker kenarlı tavan/zemin, lazer (çelik kapak + mercan çekirdek) ve direk (kapsül + sarı bilezik) ayrı görünüm.
- **Hoop:** petrol saha bandı + saha çizgisi, mercan çember ve hedef karesi, ağ, dikişli turuncu top, ahşap sapan + pembe bant, ray okları.
- **Swing:** ip ahşap (turuncu → mürekkep karışımı; gece daha açık), top sarı, çivi lavanta.
- **Spiral:** Yayın 1'deki kırmızı dilimler yeterli bulundu, değişmedi.

## Neden
- Arkadaşın maddeleri görünüm hakkındaydı; sim'e dokunmamak skor/tekrar/anti-hile zincirini ve altın tohumları korur.
- Kapak paletini sahneye taşımak "gösterimlik resmi güzel, oyun sade" şikâyetini kuralı bozmadan çözer: zemin düz kalır, hava tek katmandan gelir.
- Sürekli renk geçişi için `createLinearGradient` yasak; çözüm pişirilmiş renk dizileri (LUT / sprite halkası) ve kare başına yalnız indeks okuma.

## Reddedilen alternatifler
- Chop'ta kapaktaki gibi tam mor gökyüzü: §2.1 "zemin tema sayfa rengi" kuralını bozar; tepeler + ay ile yetinildi (Yusuf isterse tam mor ayrı karar).
- Zigzag'da 12 karışım adımı (72 gövde sprite'ı, telefonda ~8 MB, tablette ~28 MB): 6'ya indirildi (~4,7 / 17 MB); kare başına canlı çizim (sprite'sız) dikiş kalitesini bozacağı için seçilmedi.
- Spike Wall'da toplanan nesneye "kristal" demek: tehlike zaten "şeker kristali"; "boncuk" seçildi.
- Chop arka plan katmanı 3 ton (lavanta, erik, bulut): inceleme düşük önem verdi, bırakıldı.

## Süreç notu
7 opus ajan paralel, her biri kendi tarayıcı sekmesiyle önce/sonra görüntü aldı (`scripts/canvas-shot`, 375x812, iki tema). İnceleme ajanı 2 yüksek (Arrow Wall tutulan boşluk mantığı) + 2 orta + 3 düşük buldu; skeptik yüksekleri doğruladı, ortaları düşüğe indirdi; hepsi düzeltildi. Yayına alma Yusuf'un kararı.
