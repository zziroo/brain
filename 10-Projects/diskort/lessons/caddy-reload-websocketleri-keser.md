---
type: lesson
project: diskort
date: 2026-10-04
status: active
tags: [diskort, caddy, ziroo-edge, livekit, websocket, sunucu]
source: 2026-10-04 oturumu (geri bildirim/hata kontrolü)
---

# Caddy reload açık WebSocket'leri keser; `stream_close_delay` olmadan sesli kanaldaki herkes aynı anda kopar

## Ne oldu
2026-10-03 21:50:21Z'de dört masaüstü kullanıcısının LiveKit sinyal bağlantısı 400 ms içinde koptu (`signal disconnected` + `triggering ICE restart`). Aynı saniyede `ziroo-edge` loglarında elle çalıştırılmış bir `reload.sh` vardı (`/load`, "servers shutting down with eternal grace period"). LiveKit oturumu sürdürdü (resuming RTC session), ses kesilmeden toparlandı; ama gateway ve sinyal bağlantıları yeniden kuruldu. 2026-10-02 23:41'deki iki kişilik ortak kopma da büyük olasılıkla bir Caddy değişikliğiyle aynı zamandaydı (log ile doğrulanmadı).

## Neden
Caddy yapılandırma yeniden yüklenince eski sunucuyu kapatır; `reverse_proxy` ile yükseltilmiş (hijack edilmiş) WebSocket akışları varsayılan olarak hemen kapatılır. "Kesintisiz reload" HTTP istekleri için geçerlidir, uzun ömürlü WebSocket'ler için değil.

## Çözüm
`infra/caddy/diskort.caddy` içinde gateway (`127.0.0.1:3000`) ve LiveKit (`127.0.0.1:7880`) `reverse_proxy` bloklarına `stream_close_delay 5m` eklendi (commit `1b61d83`, 2026-10-04 canlıda). Reload sonrası açık akışlar 5 dk daha yaşar.

## Ders
- Gözcüde birden fazla kullanıcıda **aynı saniyede** sinyal kopması görülürse önce `docker logs ziroo-edge` ile o dakikada reload var mı bak.
- Reload'u yine de mümkünse sesli kanalda kimse yokken yap (`curl -s 127.0.0.1:6789/metrics | grep livekit_participant_total`). TURN/TLS (katman 4) bağlantıları bu ayarla korunmaz.
- Ayarın gerçek kullanıcılar kanaldayken işe yaradığı henüz gözlenmedi (doğrulama bekliyor).

## İlgili
- [[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]
- [[deploy]]
- [[2026-10-04-geri-bildirim-kontrolu-ve-caddy-reload]]
