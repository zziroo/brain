---
type: decision
project: diskort
date: 2026-09-29
status: active
tags: [diskort, arayuz, tercih, urun]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl, a23848e8-c89f-4e6e-b205-6a370f117b82.jsonl
---

# Karar: Üye ve kanal listesi sade kalır; istenmeyen bölümler (Etkinlik bölümü, kanal durumu) eklenmez

## Bağlam
Bir ajan, kullanıcının yayın isteğini yanlış genişleterek "Etkinlik" bölümü ve "kanal durumu" eklemişti.

## Karar
İkisi de kaldırıldı (hiç main'e girmemişti; dal ve worktree silindi). Üye/kanal listesi eskisi gibi sade. Koordinatör, bu tür bölümleri bir daha kendiliğinden önermeyecek.

## Neden
Kullanıcı: "bizimki daha sade olsun". Ayrıca şema değişikliği sunucuya gitmedi.

## Reddedilen alternatifler
- Etkinlik için A (yalnız yayıncılar) veya B (oyun algılama): kullanıcı ikisini de istemedi.

## Sonuçlar / riskler
- 30 Eylül'de kullanıcı bu kez kendisi "oynuyor etkinlik kartı" istedi ve yapıldı: [[2026-09-30-etkinlik-karti-oynuyor]]. Yani tercih "kendi başına ekleme", özelliğe karşı değil.

Benzer/ilgili not (başka ajan): [[urun-basit-tutma-reddedilen-fikirler]]
