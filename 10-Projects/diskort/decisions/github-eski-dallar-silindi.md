---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, git, temizlik]
source: a23848e8-c89f-4e6e-b205-6a370f117b82.jsonl
---

# Karar: GitHub'daki `main` dışındaki birleşmiş dallar silinir (30 dal silindi)

## Bağlam
Kullanıcı, eski dalların silinmesinin geçmişe zarar verip vermeyeceğini sordu.

## Karar
30 dalın hepsi `main`'e birleşmişti (silmeden önce yeniden kontrol); silindi, uzakta yalnız `main`. Kural iş akışı notuna yazıldı. Silinen dalların son commit kimlikleri sohbet çıktısında kayıtlı.

## Neden
Dal yalnızca bir commit'e isimdir; geçmiş `main`'de ve sürümler etiketlerde durur. Saklamanın faydası yok.

## Reddedilen alternatifler
- Dalları tutmak: fayda yok, kalabalık.
