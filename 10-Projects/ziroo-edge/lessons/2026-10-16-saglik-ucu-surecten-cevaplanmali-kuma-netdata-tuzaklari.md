---
type: lesson
project: ziroo-edge
date: 2026-10-16
status: active
tags: [altyapi, ops, healthz, uptime-kuma, netdata, tarayici]
source: Claude Code oturumu 2026-10-16 "ziroo-edge: ops katmanı (Kuma + Netdata)"
---

# Ders: sağlık ucu uygulamanın sürecinden cevaplanmalı ve content-type ile doğrulanmalı; Kuma/Netdata arayüz tuzakları

## Sağlık ucu
- Diskort'ta `/healthz` aylarca "200" döndü ama gerçek sağlık ucu değildi: Caddy bilinmeyen yolu SPA yedeğiyle (index.html) karşılıyordu; API ölse de 200 gelirdi. Yalnız durum koduna bakan izleme bunu asla yakalamaz.
- Kural: `/healthz` uygulamanın kendi sürecinden gelir, `text/plain` "ok"; doğrularken `curl -D -` ile `content-type`'a ve gövdeye bak, yalnız koda değil. İki kapılı uygulamalarda (API + statik) yol eşleyicisine `/healthz` açıkça eklenir. Standart: [[proje-altyapi-standardi]].
- Geçici çözüm olarak Caddy'de `rewrite` (`/healthz` → `/api/health`) işe yarar ama iki ad üretir; Yusuf yönlendirme istemiyor, temiz olan API'nin kendi ucudur ([[2026-10-16-makine-sagligi-kuma-push-gozcuden-cikti]]).

## Uptime Kuma (tarayıcı panelinde, mobil düzen)
- Kaydet düğmesi alt gezinme çubuğunun arkasında kalıyor; tıklama "Anasayfa"ya gidiyor. Formu ad/URL alanında Enter ile gönder.
- Bildirim formu açıkken sayfa yenilenirse (navigate) form kaybolur; "Test" geçmiş olsa da Kaydet'e basılmadıysa kayıt yok. Listede görünene kadar kaydedilmiş sayma.
- Düzenleme sayfasında grup (`monitorGroupSelector`) erişilebilirlik ağacında görünmüyor; JS ile değer + `change` olayı işe yarıyor. Push monitörü oluşturulurken URL'deki jeton kaydetmeden önce okunabilir.
- Telegram Chat ID "bulunamadı": kullanıcı bota daha önce hiç yazmamışsa `getUpdates` boş döner; önce bota bir mesaj.
- Yeni grup monitörü "Bekliyor / Group empty" olayı yazar; geçmiş kaydıdır, üye eklenince biter.

## Netdata 2.12 (Docker)
- Host ağında varsayılan 0.0.0.0'a bağlanır; `netdata.conf [web] bind to = 127.0.0.1:19999` şart.
- `[cloud] enabled = no` bu sürümde "bulundu ama kullanılmıyor"; `/var/lib/netdata/cloud.d/cloud.conf` de arayüzdeki "Sign in" davetini kaldırmıyor. Davet bir kez "Skip and use the dashboard anonymously" ile geçilir. Vakit harcama.
- Caddy `basic_auth` 401 cevabında `Server: Caddy` başlığı kalır (`header -Server` uygulama cevaplarında çalışır); smoke testinde bunu kontrol etme.

## İlgili
- [[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]] · [[2026-10-16-ziroo-edge-ops-katmani-kuma-netdata|oturum]]
