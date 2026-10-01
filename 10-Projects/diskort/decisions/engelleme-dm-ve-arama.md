---
type: decision
project: diskort
date: 2026-10-02
status: active
tags: [diskort, dm, engelleme, gizlilik]
source: Claude Code oturumu 2026-10-01/02 (DM arama + engelleme, 0.9.6)
---

# Karar: Engelleme yalnız DM ve aramayı kapatır; engellenene söylenmez, sunucu kanallarına dokunmaz

## Bağlam
DM araması gelince Yusuf engellemenin de gelmesini istedi.

## Karar
- Engellenen kişi engelleyene yeni bire bir DM açamaz, mesaj/tepki atamaz, düzenleyemez, arayamaz. Mevcut bire bir DM **iki taraf için** salt okunur olur ("ortak sunucu kalmadı" kuralıyla aynı). Süren bire bir arama iki taraf için biter.
- Engellenen kişi engellendiğini öğrenmez: yalnız genel "Bu konuşmaya artık mesaj gönderemezsin." görür. Engelleyen "Engeli kaldır" seçeneğini görür.
- Grup DM: aralarında engel olan iki kişi birbirini gruba ekleyemez / onunla grup kuramaz; engellediğin kişinin başlattığı ya da çaldığı grup araması seni çalmaz. Gruplar başka türlü etkilenmez.
- Engel listesi: Ayarlar → Hesabım → Engellenenler (masaüstü + mobil). Kişi menüsü ve profil kartından engellenir.

## Neden
Yusuf'un seçimi; ürünü basit tutma kuralına uygun en dar kapsam.

## Reddedilen alternatifler
- Sunucu kanallarında engellenenin mesajlarını katlamak ("Engellenen mesaj — göster"): seçilmedi.
- Aynı sesli kanalda engellenenin sesini otomatik kısmak: seçilmedi.

## Sonuçlar / riskler
- Grup aramasında çalınanlar listesi herkese gittiği için arayan, çalınmayan kişiden engeli tahmin edebilir (kabul edildi).
- Eski (0.9.5) istemciler salt okunur DM'de yazma kutusunu gösterir, gönderince hata alır.
- Ayarlar aramasında "engel" kelimesi bölümü bulmaz (ortak ayar listesine eklenmedi).

## İlgili
- [[dm-sesli-arama-ve-calma]], [[dm-sunucu-ayrimi]], [[urun-basit-tutma-reddedilen-fikirler]]
