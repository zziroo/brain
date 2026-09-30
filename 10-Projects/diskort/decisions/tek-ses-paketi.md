---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [ses-tasarimi, ui]
source: C--dev-diskort 4b7b1382 (2026-09-27/28)
---

# Karar: Uygulama sesleri tek pakettir (yumuşak, Discord tarzında ama kopya değil); ses paketi ayarı ve ses seviyesi ayarı yok.

## Bağlam
Giriş/çıkış sesleri kullanıcıya "eksik" geldi; telif riski de vardı.

## Karar
Klasik paket silindi, tek yumuşak paket kaldı; giriş sesi birbirine yakın iki nota ile daha düz; sesler genel olarak güçlendirildi; başkasının giriş/çıkışı ile kendininki aynı sesi çalar. Üç varyant dinletilip biri (B) seçildi.

## Neden
- Kullanıcı basitlik istedi ("sesleri biraz arttır, seviye ayarı koymana gerek yok").
- Discord'un seslerini/melodilerini birebir kullanmak telifli; yalnızca üslup.

## Reddedilen alternatifler
- Ayarlarda ses paketi seçimi: gereksiz.
- Ses seviyesi ayarı: gereksiz karmaşa.

## Sonuçlar / riskler
Sonraki sürümlerde ek ses eklenirse aynı kural geçerli.

## İlgili
- [[2026-09-27-coklu-sunucu-dpdfnet-yayin-kalitesi-ses-tasarimi]]
