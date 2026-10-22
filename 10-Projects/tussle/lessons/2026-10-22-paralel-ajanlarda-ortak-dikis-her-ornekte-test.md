---
type: lesson
project: tussle
date: 2026-10-22
tags: [orkestra, inceleme, test]
source: Claude Code oturumu "tussle: arena oyunları kısa ve etkileşimli"
---
# Ders: ortak bir dikiş paralel ajanlarla N yere uygulanıyorsa, her örnek için aynı test yazılsın

Arena olay altyapısı bir ajanla kuruldu (Sumo örneği + DOM testi), üç ajan dokuz oyuna uyguladı. Number Hunt view'ında `events` kancası unutuldu; tüm testler yeşildi çünkü olay yolunu yalnız Sumo testi sınıyordu. İnceleme ajanı yakaladı.

**Uygulama:** dikişi kuran ajan, uygulayıcı brief'ine "her oyun için şu DOM/birim testini aynen ekle" şartı koysun (olay gelince bir kez oynar, çizim temiz); koordinatör de `grep -L "events(e)" src/client/arena/*-view.ts` gibi tek satırlık bir varlık kontrolü yapsın. İlgili: [[2026-10-22-tussle-arena-kisa-maclar-ve-olay-geri-bildirimi]].
