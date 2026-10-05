---
type: decision
project: rehber-okuyucu
date: 2026-10-05
status: active
tags: [rehber-okuyucu, karar, ai-motoru]
source: oturum 2026-10-05; Yusuf: "üretimi iptal edecek tuş yapabilir miyiz?"
---

# Karar: Sahip AI üretimini iptal edebilir; önceki belge ve araştırma korunur

## Karar
- Düğme "Üretimi iptal et" (iki adımlı onay), uç nokta `POST api/guides/:id/ai/cancel`, CLI `cancel <id>`.
- Bekleyen iş kuyruktan çıkar; süren `claude` süreci hemen öldürülür ve yeniden sıraya girmez. Sonuç durum: önceki belge varsa `ready`, yoksa `none`.
- Saklı araştırma hiçbir aşamada silinmez; araştırması olmayan kayıtta `research_due` 1 kalır.
- Motor başladıysa iptal günlük sınıra sayılır (abonelik harcandı), başlamadan iptal edilirse `ai_runs` satırı silinir. Kullanım sayfasında sonuç "İptal".
- Koşucu claim'i 2 sn'de bir yoklar; claim artık işin değilse (CLI'den iptal, iptal + yeniden istek) süreci öldürür.

## Neden
Daha önce iptal yoktu; yanlış ya da uzun süren bir üretim 15-30 dakika aboneliği bloke ediyordu.

## Reddedilen alternatifler
- İptalde önceki belgeyi silmek: okur boş sayfa görürdü.
- İptal edilen işi sınırdan saymamak: motor çalıştıysa abonelik harcanmıştır.

## İlgili
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
