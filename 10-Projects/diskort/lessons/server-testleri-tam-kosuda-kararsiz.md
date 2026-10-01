---
type: lesson
project: diskort
date: 2026-10-02
status: unverified
tags: [diskort, test]
source: Claude Code oturumu 2026-10-01/02 (DM arama işinde test koşuları)
---

# Server testlerinde tam koşuda her seferinde farklı bir dosya testi bir kez düşebilir

## Ne oldu
`pnpm -r test` tam koşularında farklı zamanlarda `lineTest.test.ts` (ENOENT / kayıt kırpma), `clientErrors.test.ts` (kalıcılık) ve `activityPresence.test.ts` birer kez düştü. Hepsi tek başına tekrar tekrar geçti; düşen testlerin dosyaları ve test ettikleri kod değişmemişti (lineTest'teki değişiklik dosya işlemleriyle ilgisizdi).

## Ders
Tam koşuda tek bir dosya/zamanlama testi düşerse önce o dosyayı tek başına 2-3 kez çalıştır; geçiyorsa yük altındaki kararsızlık say ve raporda belirt. Değişikliğin dokunduğu bir testse kararsız sayma, incele. Kök neden (geçici klasör/zamanlama) araştırılmadı.

## İlgili
- [[dev-ortami-tuzaklari]]
