---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, roller, parti-gecesi, sezon, sohbet, ui]
source: "oturum 2026-10-21 akşam (mobil-playus: rol sadeleştirme)"
---

# Karar: Yardımcı rolü kalktı; Parti Gecesi'ni ve sonraki günü her üye başlatır, sahip atma + ayarlarda kalır

## Ne
- Roller artık `host | member`. Yardımcı (cohost) kalktı, migration 25 eski yardımcıları üye yaptı, rol değiştirme uç noktası silindi.
- **Parti Gecesi'ni odadaki her üye açar.** Başlatma ve iptal partiyi açanda (`creator_id`, hata kodu `party.creator_only`). Odada tek açık parti kuralı sürüyor (`party.room_busy`).
- **"Sonraki günü başlat" her üyede.** Sunucu yine herkes bitirmeden kabul etmez; aynı anda ikinci basış `day.not_done` alır, istemci sessizce günü yeniler.
- **Sahip kalıyor:** üye atma, oda ayarları, taç, sahiplik devri.
- Sohbet kutusunda ⚔ (Kapışma) düğmesi yazı alanının soluna geçti; Gönder sağda tek. Neden: başparmak göndermek isterken ⚔'ya gidiyordu (Yusuf).
- Commit'ler `0d8efef` (roller), `c9e121e` (⚔ yeri). Yayında 2026-10-21 akşam: sunucu c9e121e, OTA 0.20261021.1551, canlı DB 25 (yardımcı satırı kalmadı).

## Neden
- 11 Eki'de "yalnız sahip açar" gerekçesi aynı anda iki parti kartıydı ([[2026-10-11-parti-gecesi]]). Sunucu zaten tek açık partiyi zorluyor, gerekçe kalmadı.
- Yardımcının tek işi atma + ayarlardı; Yusuf ikisini de sahipte tuttu, rol anlamsızlaştı.

## Reddedilen
- Rol sistemini tamamen kaldırmak: atma ve ayarlar sahipsiz kalırdı (oylama ve herkes-atar önerildi; Yusuf "sahip atsın" dedi).
- ⚔ ile Gönder'in yer değiştirmesi: ⚔ en sağ köşeye geçer, aynı hata ters yönde olurdu. Yazarken ⚔'yı gizlemek: içerik kayar.

## Açık
- Açık parti varken "Parti Gecesi" sekmesi diğerlerinde de görünür; açmaya çalışan "Bu odada zaten bir parti var" uyarısı alır. Gizlemek istenirse küçük iş.
- Telefon teyidi: ⚔ solda kas hafızası, herkesin parti açması, sonraki gün düğmesi üyelerde.


## İlgili
- Aynı akşamın devamı: [[2026-10-21-kapisma-1v1-arena-sekmesi-acilis-sahneleri]]; oturum [[2026-10-21-tussle-roller-kapisma-1v1-arena-sekmesi]].
