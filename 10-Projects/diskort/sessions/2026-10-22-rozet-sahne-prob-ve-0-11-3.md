---
type: session
project: diskort
date: 2026-10-22
status: done
tags: [diskort, masaustu, yayin, bildirim, prob-motoru, release, deploy]
source: Claude Code oturumu 2026-10-22 (Mac) "diskort: durum özeti ve yeni işler"
---

# Oturum 2026-10-22: okunmamış rozeti, ses satırında sabit yuva + yayın küçük resmi, yayında tek tık/zoom, prob motoru; sunucu deploy ve 0.11.3

## Ne yapıldı
- **Okunmamış rozeti (masaüstü):** bahsetme + okunmamış DM toplamı (`useUnreadBadgeTotal`, client-core) IPC `app:badge-count` ile main'e; macOS/Linux `app.setBadgeCount`, Windows `resources/badge.png` overlay. Arkadaşlık istekleri sayılmıyor; DND'de de sayılıyor. Linux'ta yalnız Unity uyumlu başlatıcılarda görünür (doğrulanmadı).
- **Ses kanalı üye satırı:** kenar çubuğunda ayrı bir "daraltma modu" yok, yalnız genişlik (200–480). Yusuf'un gördüğü düzensizliğin nedeni: oyun ikonu sağdaki mikrofon/kulaklık ikonlarından önce duruyordu, onlar satıra göre değişince ikon kayıyordu. Çözüm: sağ uçta sabit yuva (`TrailingSlot`): yayın yapan üyede yayının küçük önizlemesi (`StreamThumb`, mevcut 25 sn'lik önizleme), değilse oyun ikonu; mikrofon ikonları solunda. Karar: [[2026-10-22-yayin-izleme-tek-tik-zoom-ve-ses-satirinda-sabit-yuva]].
- **Yayın izleme (masaüstü):** odakta tek tık ızgaraya döner (250 ms gecikmeli, çift tıkla çakışmaz), tekerlekle 1×–4× zoom (imleç sabit), sürükleyerek pan, Esc/görünüm değişince sıfırlama, barda "%200" hapı. Saf hesap `stage/zoom.ts` + test. İnceleme: izleyici listesi portalı (React ağacında içeride, DOM'da dışarıda) tekerlek/sürüklemeyi yayına geçiriyordu; portal div'inde `stopPropagation` (tam ekranda `contains` yetmiyor).
- **Prob motoru (sıradaki işler #6):** UDP/TCP kayıp serileri ayrı (`probe.proto`), boş odada "aday" yazılmıyor. İnceleme iki turda bir yüksek + üç orta bulgu çıkardı, hepsi düzeltildi. Ders: [[2026-10-22-sonda-serisi-sinirsiz-buyume-ve-yeniden-oynatma-sira-yapayligi]].
- **Kararsız göç testi:** `migration.test.ts` sunucu kimlik sırasına bağlıydı; karşılaştırma sıradan bağımsız yapıldı.
- Commit'ler: `ddd5b73` (masaüstü), `8caf99b` (sunucu), `130d077` Sürüm 0.11.3. Kod haritası güncellendi.
- **Deploy + yayın:** Yusuf "komple gönderilecek ne varsa gönderebiliriz, çok kullanan yok" dedi. Sunucu deploy edildi (healthz 200, hata yok). **0.11.3 yayınlandı**: masaüstü güncelleme yayını ve Android/iOS OTA uçları 0.11.3 veriyor (OTA sunucuya GitHub yoklamasıyla ~3 dk sonra düştü). APK 0.11.0 ve IPA 0.8.5 yeniden kullanıldı. Bekleyen `22ac734` (OTA öncesi sesten çıkma) bu sürümde.

## Doğrulanmayanlar
- Yeni arayüz canlı uygulamada görülmedi: satır hizası, yayın küçük resmi, tek tık/zoom hissi, dock rozeti, Windows overlay.
- Yalnız-UDP kesinti tespiti üretimde ne sıklıkta tetiklenir bilinmiyor (gerçek motorda ~1,25 sn art arda UDP kaybı gerekiyor).

## Maliyet notu
Üç keşif (haiku) + dört uygulama (opus medium) + inceleme/şüpheci turları; koordinatör ~120k bağlam. Sunucu incelemesi üç tur sürdü, değdi (sınırsız büyüme bulgusu).

## İlgili
- [[2026-10-22-yayin-izleme-tek-tik-zoom-ve-ses-satirinda-sabit-yuva]] · [[2026-10-22-sonda-serisi-sinirsiz-buyume-ve-yeniden-oynatma-sira-yapayligi]] · [[yayin-arayuzu-discord-tarzi]] · [[saglayici-udp-paket-siniri]] · [[surum-cikarma]] · [[deploy]]
