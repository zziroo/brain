---
type: decision
project: diskort
date: 2026-09-29
status: active
tags: [diskort, dm, profil, gizlilik]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl
---

# Karar: DM'de profil kartı ve menülerde sunucu bilgisi (rol, rol rengi, taç, kick/ban, ses/yayın işlemleri) gösterilmez

## Bağlam
Kullanıcı DM'den profile bakınca sunucuya ait bilgilerin göründüğünü fark etti.

## Karar
DM bağlamında yalnızca hesap bilgileri: avatar, afiş, isim, @kullanıcı adı, durum, hakkında, kozmetikler; "Kullanıcı adını kopyala" eklendi. Profil ayarlarında sunucu rolleri de kalktı. Review: başka sunucunun ses kanalındayken "Yayını izle" kaybı gerçek ama düşük (skeptic DOWNGRADE); ses moderasyonu yalnız o an açık sunucuda çıkar.

## Neden
DM'deki kişi başka sunucuda da olabilir; bir sunucunun bilgisini göstermek yanlış/sızıntı.

## Reddedilen alternatifler
- Ses/yayın işlemlerini ses kanalının sunucusuna göre hesaplamak (ilk düzeltme önerisi): skeptic moderasyon için yanlış buldu (eskiden de açık sunucuya göre hesaplanıyordu).

## İlgili
- [[2026-09-29-hata-paneli-skia-kanal-paneli]]

Benzer/ilgili not (başka ajan): [[dm-sunucu-ayrimi]]
