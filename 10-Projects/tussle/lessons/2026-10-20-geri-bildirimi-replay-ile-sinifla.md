---
type: lesson
project: tussle
date: 2026-10-20
status: active
tags: [tussle, denge, geri-bildirim, yontem]
source: Claude Code oturumu "tussle: geri bildirim turu" ([[2026-10-20-tussle-geri-bildirim-turu-antrenman-analizi]])
---

# Oyun geri bildirimini kural değiştirmeden önce replay ile sınıfla

**Ders:** "0 puan aldım", "hep süreden patlıyorum", "açışlar ceza gibi" türü hisler üç ayrı şeye çıkabiliyor: hata, sert eğri, bilinçli ama görünmeyen tasarım. Antrenman koşularının log'u (`practice_runs`, `src/shared/input-log.ts`) `replayWithState` ile tur tur okununca her biri dakikalar içinde ayrıldı: color-recall "0 puan" eğri sertliğiydi (ton tam, doygunluk 17 puan sapmış, kanallar çarpılıyordu); double-tap "süreden patlama" bilinçli tasarımdı ama kaçan şekerin süre yediği ekranda görünmüyordu; flip-match'te ıskaların yarısı kördü. Hisse göre kural değiştirmek yerine önce veriyi oynat.

**Nasıl:** koşuları `docker exec tussle node -e` ile log'larıyla jsonl'a dök ([[2026-10-18-canli-db-okuma-docker-exec-node-sqlite]]), `npx tsx` betiğiyle `gameModule.createSim` üzerinden tur tur durumu yazdır; sim sürümü artınca eski log reddedilir, gameVersion kontrolünü atlayan küçük bir betikle yeni sim'e olayları elle besle (eski/yeni skor karşılaştırması). Tek kişilik veriden genelleme yapma; raporda "tek koşu" diye işaretle.

**Yan ders:** test sabitlerini (swing GC testi 2M → 4M adım) ajan büyütünce tam koşuda 20 sn zaman aşımı; adım maliyeti aynıydı. Brief'e "test sabitlerini büyütme" yaz.
