---
type: lesson
project: tussle
date: 2026-10-21
status: active
tags: [tussle, olcum, performans, telemetri, android]
source: "oturum 2026-10-21 öğleden sonra (mobil-playus: kalan işler + arena Xiaomi kasma)"
---

# "Bu telefonda kasıyor" sorusunu adb yerine maç içi telemetriyle ölç: iki cihaz aynı maçta yan yana

- Önceki yöntem ([[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]]) tek cihaz, tek seferlik ve dokunuşu Yusuf yapıyor. Bu kez istemci maç sonunda tek bir ölçüm satırı gönderdi (`client-log.jsonl`, cihaz modeliyle) ve aynı maçın iki telefonu yan yana okundu.
- Yarım saatlik kod, OTA ile gitti; dört maçta kök neden (çizim değil, snapshot teslimi) ve düzeltmenin etkisi sayıyla görüldü. Yusuf'un "akıyor" dediği telefonda bile %7 donma vardı: his tek başına ölçü değil.
- Kural: his şikâyeti gelince önce "hangi sayıyı toplasam ayırt ederdi?" diye sor (çizim süresi mi, kare aralığı mı, veri gecikmesi mi), o sayıları `logEvent` ile gönder, iki cihazda bir maç oynat. adb/CDP yalnız telemetrinin ayıramadığı yerde.
- Tek maçlık örnekler gürültülü (OnePlus bir maçta 12, sonrakinde 35 donma): küçük bir değişikliğin etkisini tek maçla yargılama, birkaç maç ya da testçi verisi bekle.
