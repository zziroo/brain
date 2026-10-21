---
type: session
project: tussle
date: 2026-10-21
status: done
tags: [tussle, arena, performans, olcum, yayin]
source: "oturum 2026-10-21 öğleden sonra (mobil-playus: kalan işler + arena Xiaomi kasma)"
---

# Oturum: arena Xiaomi kasması ölçüldü, veri açlığı çıktı; telemetri + uyarlanabilir render gecikmesi yayında

## Ne yapıldı
- Yusuf'un "OnePlus akıyor, Xiaomi kasıyor" gözlemi için elde veri yoktu. Dört yayın (`7b0465d` → `de66558`, OTA 0.20261021.1237 → .1324), beş ölçüm maçı:
  1. `POST /api/client-log` + `client-log.jsonl` + arena maç sonu `arena` olayı (kare, çizim, snapshot, açlık, cihaz modeli); okuma `feedback-cli.mjs log --kind arena`.
  2. Ölçüm: iki telefonda çizim kusursuz (120 Hz, draw 0,1 ms), kasma snapshot gecikmesinden (Xiaomi karelerin %11'i, OnePlus %7'si aç). Render gecikmesi uyarlanabilir oldu (100–250, sonra 100–400 ms).
  3. Aynı Wi-Fi'da da Xiaomi'ye toplu/geç teslim (%18 toplu) → cihaz tarafı; pil kısıtlaması zaten kapalıydı.
  4. Maçta 100 ms'de bir `wake` mesajı (sunucu sessizce düşürür, strike yok). Etkisi küçük/belirsiz.
- Sonuç: donma iki telefonda %0,5'in altına indi. Ayrıntı ve tablo: [[2026-10-21-arena-kasma-veri-acligi-uyarlanabilir-render-gecikmesi]].
- Yusuf'un sorusu: "WebView yerine kendi çizim aracımızla yapamaz mıydık?" → arena zaten aynı canvas + sahne kitiyle çiziliyor; darboğaz çizim değil ağ teslimi, native kabuk da çözmezdi.

## Alınan kararlar
- [[2026-10-21-arena-kasma-veri-acligi-uyarlanabilir-render-gecikmesi]]

## Öğrenilenler
- [[2026-10-21-iki-telefon-farki-mac-ici-telemetriyle-olculur]]
- İnceleme bulgusu (orta): bütçeyi aşan "zararsız" mesajlar strike biriktirmemeli; takılma sonrası tarayıcı kuyruğu toplu boşaltır ve strike azalmadığı için soket maç ortasında kapanır. Karar notunda.

## Açık kalanlar
- Xiaomi'de toplu teslim sürüyor (%13); WebView/HyperOS zamanlaması, istemciden daha fazla zorlanamaz. Testçi verisi birikince cihaz bazında yeniden bak.
- Arena sırası: Trails → Crown, Paint → rozet yuvaları, izleme.
