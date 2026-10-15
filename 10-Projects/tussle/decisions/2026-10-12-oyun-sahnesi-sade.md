---
type: decision
project: tussle
date: 2026-10-12
status: active
tags: [tussle, gorsel, tema]
source: oturum 2026-10-12 (mobil-playus: denge ve sade tema turu)
---

> **2026-10-15:** Arayüz (oyun dışı) dili de sadeleşti: [[2026-10-15-tema-orta-yol-kart-konturu-yumusak-pembe]]. Sahne kararı geçerli.

# Karar: Oyun sahneleri sade (Şeker Dükkânı kapaklarda kalır, sahnede "her taraf şeker" yok)

## Bağlam
Yusuf: ilk oyunlar (Kule, Zıpla, Refleks) sade; Şeker Yağmuru'ndan sonrakiler serpinti, gradient gökyüzü, gofret zemin, ambalajlı karakterlerle "şeker şeker" olmuş. "İlk oyunlar gibi sade olsun."

## Karar
`docs/VISUAL.md` §2.1 "Oyun sahnesi: sade": düz tema zemini; en fazla 1 soluk katman (2 ton, `layoutGame`'de pişirilir); nesne tek dolgu + mürekkep kontur (+ yüz); gradient/pattern/serpinti/doku/ambalaj karakter yok; partikül yalnız olay anında; statik dekor ≤ 6; kapak rengi + 1–2 vurgu. İstisnalar: HUD okunurluk bandı (pişirilmiş alfa rampası) ve bilgi taşıyan renk izleri (Renk Hafızası kaydırıcıları). Pilot Kanat Çırp (734→394 satır), sonra 29 oyun 9 ajanla; toplam view kodu ~22k→~14k satır. Sim'e dokunulmadı.

## Neden
Sadelik ilk oyunlarla tutarlı, okunurluk ve kare bütçesi daha iyi; süs bilgi taşımıyordu.

## Reddedilen alternatifler
- Yalnız ağır 13 oyunu sadeleştirmek: Yusuf 30'unun tamamını istedi.
- Şeker temasını kapaklardan da kaldırmak: kapaklar ve arayüz Şeker Dükkânı olarak kalır.

## Sonuçlar / riskler
Süsle birlikte bilgi silinmesi riski (inceleme yakaladı: Bardak Doldur hız ipucu, Sepet ekşi ayrımı, Diken/Yılan renk yakınlığı; düzeltildi). Yusuf'un gözüyle bakılacaklar: Piñata düz top (eşek/yıldız hissi gitti), Vinç makine hissi azaldı, Şifre'de fitil yerine düz süre çubuğu, Çark 2 tonlu, Gecit kapıları 3 renk, Yılan damalı ızgara kaldı.

> **Kapak kısmı 2026-10-13'te değişti:** yukarıdaki "kapaklar Şeker Dükkânı olarak kalır" artık geçersiz; kapaklar ve küçük resimler de şekersiz, yalnız arayüz paleti Şeker Dükkânı. Bkz. [[2026-10-13-kapaklar-ve-kucuk-resimler-sekersiz]].

İlgili: [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]], [[2026-10-12-denge-ve-tema-turu-dersleri]].
