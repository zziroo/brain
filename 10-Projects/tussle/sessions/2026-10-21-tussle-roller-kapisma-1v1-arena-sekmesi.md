---
type: session
project: tussle
date: 2026-10-21
status: active
tags: [tussle, roller, kapisma, arena, parti-gecesi, yayin]
source: "oturum 2026-10-21 akşam (mobil-playus: parti gecesi yetkisi → rol sadeleştirme → kapışma 1v1)"
---

# Oturum: roller sadeleşti, kapışma 1v1 oldu, arena sekmesi ve açılış sahneleri; sunucu + OTA + Android 1.12 + iOS build 10

- **Roller** ([[2026-10-21-yardimci-rol-kalkti-parti-ve-sonraki-gun-herkese]]): yardımcı kalktı (migration 25), herkes parti açar ve sonraki günü başlatır, sahip atma + ayarlarda. ⚔ düğmesi sohbet kutusunda sola. Yayın c9e121e / OTA 0.20261021.1551.
- **Kapışma 1v1, arena sekmesi, VS B, Parti açılışı B** ([[2026-10-21-kapisma-1v1-arena-sekmesi-acilis-sahneleri]]): `1206fb1`, `ce164c0`. İnceleme: rövanş yarışı (orta → şüpheci DOWNGRADE) ve düşükler düzeltildi; halka açılışında bulgu yok. 2675 test.
- **Bildirimler gözden geçirildi:** kapışma/arena kartı bildirimsiz, parti açılışı bildirimli; sohbet bildirimi sıklık sınırı önerildi, karar yok. İptal edilen parti bildirimini silmek bırakıldı.
- **Yayın (~21:10):** sunucu ce164c0 + OTA 0.20261021.1800 (DB 25); Android 1.12 vc 16 iç + kapalı test; iOS 1.4 build 10 TestFlight dış grup + beta incelemesi. Tuzaklar: [[2026-10-21-testflight-export-hesap-hatasi-ve-grup-404]], [[2026-10-21-ortak-klasorde-commit-dizin-degil-dosya-ekle]].
- **Doğrulanmadı (status: unverified):** hiçbiri telefonda denenmedi. Yerelde botlarla: 1v1 kart/izleme/rövanş, VS (Stack, XOX), halka (4 bot + sahte 32). Denenmeyen: 2 kişilik arena masası canlı, Android geri tuşu, yeniden bağlanınca iki koşuyu tekrar izleme, düşük donanımda VS/halka/iki ekran izleme performansı, istemci düzeltmeleri (rövanş düğmesi, çubuk scaleX) tarayıcıda.
- Yerel dev DB'de bot artığı odalar (Y6YA, 2JQD) var; zararsız.
