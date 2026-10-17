---
type: lesson
project: ziroo-edge
date: 2026-10-03
status: active
tags: [caddy, guvenlik, acik-yonlendirme, ziroo-edge]
source: tools/games geçişi incelemesi 2026-10-03 (inceleme ajanı bulgusu, skeptic doğruladı)
---

# Caddy'de `redir {path}/` ile elle klasör yönlendirmesi yazmak açık yönlendirme açar; file_server'ın kanonik yönlendirmesini kullan

## Ne oldu
Klasör adreslerini `redir {path}/` ile yönlendirmek `//evil.com/..%2Fbal-vadisi` isteğine `Location: //evil.com/...` döndürüyordu (tarayıcı bunu başka siteye yönlendirme sayar). `{path}` temizlenmemiş yoldur; `file` eşleyicisi ise temizlenmiş yolla dosya arar, bu yüzden eşleyici geçer ama yönlendirme ham yolu kullanır.

## Ders
- Yönlendirmede ham `{path}` kullanma. Klasör eğik çizgisi için `file_server`'ın yerleşik kanonik yönlendirmesine bırak (`//` önekini temizler).
- Yönlendirme yazdığın her yere `//host/..%2F...` vakası ekle.

## Nasıl yakalandı
İnceleme ajanı buldu, skeptic doğruladı, canlıya çıkmadan düzeltildi; ziroo-edge smoke testinde (`test/smoke.sh`) vaka var. Bağlam: [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]. İlgili: [[caddy-bind-mount-restart]].
