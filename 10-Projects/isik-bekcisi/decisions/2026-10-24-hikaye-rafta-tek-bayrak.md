---
type: decision
project: isik-bekcisi
date: 2026-10-24
status: active
tags: [hikaye, kamp, story]
source: Claude Code oturumu "ışık bekçisi: durum ve sıradaki işler", 2026-10-24; depo commit 05dba90
---

# Karar: hikâye rafa kalktı, tek bayrakla kapalı (`STORY.on` false)

## Bağlam
Yusuf ilk biyomu oynadı: "Hikâye kısımlarını şimdi hiç entegre etmeyelim; oyun otursun, sonra ekleriz. Her adımda bunlarla uğraşıyoruz." Asıl öncelik arayüz ve öğretme.

## Karar
`js/data.js` → `STORY = { on: false }`. Kapalıyken: konuşma plakası teklif edilmez (konuşma balonu işareti yok), sefer tepkileri yok, günce (kamp ateşi) yalnız Kayıtlar sekmesi. Kalanlar: F ile küçük sohbet, Kandil'in fenersiz kapı lafı, Ülker'in teleskop çağrısı, "kapı bu yanda". Altyapı (`story.js`, `talk.js`, `S.story`) silinmedi; `tools/story-check.mjs` bayrağı kendisi açar, yeşil kalır. Yeni özelliklerde hikâye metni, küçük sohbet satırı, günce sayfası yazılmaz.

## Neden
Hikâye tek modülden kampa üç kapıyla bağlıydı (`newTalk`, `takeReaction`, `entries`): kapatması ucuz, geri açması ücretsiz. Yusuf hikâyenin yerinde durmasını değil, oyun oturana kadar enerji çekmemesini istedi.

## Reddedilen alternatifler
- Hikâyeyi silmek: 29 konuşma, 93 söz, 49 tepki, 7 sayfa yazılmış; sonra geri entegre edilecek.
- Yalnız yeni hikâye yazmayı bırakıp mevcut davetleri açık tutmak: her kampa dönüşte sakinler konuşmaya çağırıyordu, yine dikkat çekiyordu.

## Yan etki ve ders
`s.kandil.road` (pri 1) koşulu `before: 'kandil.wick'` idi; bayrak kapalıyken o konuşma hiç dinlenmediği için Kandil 0. bölüm boyunca tek cümleye kilitleniyordu (inceleme ajanı yakaladı). `maxRuns` koşulu eklendi, satır ilk sefere kadar. Ders: hikâye koşulları (`before`/`after`) bayrak kapalıyken donar; small-talk koşullarını konuşmalara değil sefer sayısına bağla.

İlgili: [[2026-10-24-yazisiz-ogretme-secenekleri]] (gösterim seçeneği hikâyeyle birlikte sonraya).
