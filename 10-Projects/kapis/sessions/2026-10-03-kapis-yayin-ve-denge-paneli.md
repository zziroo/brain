---
type: session
project: kapis
date: 2026-10-03
status: done
tags: [kapis, session, yayin, denge]
source: oturum 2026-10-03 (web-fps-game, yayın ve denge paneli)
---

# Oturum: KAPIŞ yayına alındı, denge paneli eklendi

## Ne yapıldı
- `bash deploy/deploy.sh` ile https://kapis.ziroo.net yayına girdi (ziroo-edge `hosts/kapis.caddy`); canlıda oda kurma + bot maçı doğrulandı (ping ~50 ms, 30 anlık görüntü/sn).
- Arkadaş denemesi: bir oyuncuda WASD takıldı. Opera'da oluyor, Chrome'da yok. Ayrıca gerçek bir açık bulundu ve düzeltildi: fare yeniden kilitlenmeden önce basılı tutulan tuş yok sayılıyordu (`input.ts`, commit `57587ee`).
- Denge paneli: önce oda bazlı yazıldı, incelemede yabancıların düzenleyebildiği görüldü ve Yusuf sunucu geneli istedi; PIN korumalı tek sete çevrildi ([[2026-10-03-denge-paneli-sunucu-geneli-pin]], commit `b8e7083`).
- Repo GitHub'da özel (`yusufholat/web-fps-game`); Yusuf main'e gelen her şeyin push'lanmasını istedi.
- Menüde Denge sekmesi açılınca "KAHRAMAN DEĞİŞTİR" düğmesinin taşması düzeltildi (`2597d9b`).

## Dersler
- Açık sunucuda "oda sahibi" bir yetki sınırı değildir: herkes oda kurup sahip olur. Sunucu genelini etkileyen her özellik ayrı bir sırla korunmalı.
- Oyuncu "klavye takılıyor" dediğinde önce tarayıcıyı sor: sorun Opera'ya özgüydü.

## Doğrulanmayanlar
- Opera'daki klavye sorununun nedeni; denge panelinin gerçek oyuncularla canlı kullanımı.

## İlgili
- [[_overview]], [[2026-10-03-kapis-ilk-insa]]
