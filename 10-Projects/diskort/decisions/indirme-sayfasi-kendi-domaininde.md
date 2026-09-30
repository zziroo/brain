---
type: decision
project: diskort
date: 2026-09-26
status: active
tags: [dagitim, web]
source: C--dev-diskort f0d5fe07/0f563e3b/3034bff9 (2026-09-26)
---

# Karar: Kurulum dosyaları GitHub yerine kendi alan adımızdaki indirme sayfasından dağıtılır; kullanıcı GitHub'ı görmez.

## Bağlam
Discord'un indirme sayfası gibi bir sayfa istendi; repo public ve MIT lisanslı olsa da arkadaşların GitHub'a gitmesi istenmedi.

## Karar
Sunucu, GitHub sürümlerini periyodik (5 dk) okuyup kendi alan adında indirme sayfası ve güncelleme uç noktası sunar. Android APK'sı ve sonradan iOS de aynı sayfadan. Sayfa ayrı repo gerektirmeden ana repoda (apps/web) durur.

## Neden
- Kullanıcı deneyimi tek yerde; güncelleme yolları (desktop ve mobil) aynı sunucudan.
- Ayrı repo gereksiz bakım olurdu; ana repoda tek sürüm.

## Reddedilen alternatifler
- Doğrudan GitHub Releases linki: kullanıcı GitHub'a yönlenir, kontrol azalır.
- Ayrı web reposu: gereksiz ayrışma.

## Sonuçlar / riskler
MIT lisansı repoya eklendi. Sonradan test APK akışı kaldırıldı, yayınlar doğrudan ana akıştan.

## İlgili
- [[2026-09-26-kurulum-ve-yayina-alma]]
