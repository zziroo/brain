---
type: session
project: tussle
date: 2026-10-19
status: active
tags: [tussle, bildirim, android, xiaomi, sohbet, serit, oda, iap, yayin]
source: oturum "tussle: Android bildirim dengesizliği" → "tussle: geri bildirimler (Şerit, aktif kişiler)" (2026-10-18/19 gece, mobil-playus)
---

# Oturum: Android bildirim dengesizliği, emoji rozeti, 2 hak, YOSEF geri bildirimleri (Şerit v3, kim burada), iPhone hediye

## Yapılanlar
- **Bildirim:** odadayken o odanın bildirimi geliyor, Xiaomi'de bazen hiç gelmiyordu. Sebep: arka planda açık kalan soket "odada" sayılıyordu, dönüşte yarı açık soket ise abonesiz kalıyordu. Çözüm `away` bayrağı + `isActive` (push yalnız ön plandaki odada susar) + istemci nabzı (25 sn ping, 10 sn cevapsızsa yeniden bağlan); ayarlar ve deneme ekranı da odada sayılır (`9c9e328`). Karar [[2026-10-18-bildirim-yalniz-on-plandaki-odada-susar]]. Xiaomi otomatik başlatma rehberi yan oturumda ([[2026-10-18-tussle-xiaomi-bildirim-rehberi]]).
- **Sohbet:** emoji tepkisi mesaj balonu gibi duruyordu; 22 px rozet, balonun alt kenarına yapışık, "benim" renk tonu (`7958b67`). **Yeni odalar varsayılan 2 hak** (eski odalar değişmedi).
- Yayın 1: `7958b67`, OTA 0.20261018.1857, temiz worktree'den ([[2026-10-18-yayin-temiz-worktree-den-yan-oturum-ayni-klasorde]]).
- **Geri bildirim kutusu:** #1 test ve #2 Denge (v4 ile çözülmüştü) kapatıldı. #3 Şerit kolay → **Şerit v3**; #4 kim aktif → **oda adında "● N" rozeti**, üye listesinde buradakiler üstte yeşil noktalı; ilk tasarım (başlık altı satır) Yusuf'un isteğiyle rozete taşındı. iPhone'da hediye düğmesi yok sorusu → katalog mağazaya göre (`?store=`), Apple doğrulaması sunucuda kapalı. Karar [[2026-10-19-odada-kim-var-rozeti-ve-serit-v3]].
- Ses uyarısı (`Failed to start the audio device`) zaten `624c6e0`'da yakalanıyordu; kayıttaki satırlar eski paketlerden.
- Yayın 2: `e2de09a`, OTA 0.20261018.2131, canlı web paketinde doğrulandı, main = origin/main.
- **İnsan verisi:** her günlük deneme ve canlı maç/parti turu tam girdi kaydıyla tutuluyor (web/uygulama farkı yok, platform tur başına yazılmıyor; deneme turları tutulmuyor). 39 oyuncu, ~1.250 tur. Rapor yan oturumda: [[2026-10-19-denge-insan-kosulariyla-surum-bazli-olculur]].

## Doğrulanmayanlar
- Gerçek telefonda: bildirim (arka planda açık odaya gelir mi, ön planda susar mı; Android WebView `visibilitychange` + `appStateChange`), Şerit v3 hissi, rozetin çentikli ekranda üst boşluğa sığması.
- YOSEF'in ekran görüntüsünde hediyenin neden zaten gizli olduğu koddan çıkmadı (iPhone uygulaması, OTA 1541); yeni katalog kuralıyla artık her durumda gizli.

## Kalan
- Arkadaşların çoğu web'den giriyor (Yusuf, 19 Eki): web değişiklikleri sayfa açılınca gelir; Xiaomi rehber kartı yalnız uygulamada.
- Düşük bulgular bilerek bırakıldı: bağlanırken takılan soket için zaman aşımı yok; çıkışta rozet ~2-3 sn eski kalır.
