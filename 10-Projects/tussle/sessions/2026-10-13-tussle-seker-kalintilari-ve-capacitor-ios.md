---
type: session
project: tussle
date: 2026-10-13
status: done
tags: [tussle, oturum, capacitor, ios]
source: oturum 2026-10-13 üçüncü (mobil-playus)
---

# Oturum 2026-10-13 (üçüncü): oyun içi şeker kalıntıları ve Capacitor iOS kabuğu

- **Şeker kalıntıları** (`3795d6e`, yayın `a2865d0` ile çıktı): Karşıya Geç (taş, pembe dalga, yüzlü sarı top kahraman; kapakta blok, oyunda top: Yusuf'a soruldu, cevap yok), Kart Çevir (10 düz şekil), Köstebek (kulaklı toplar, taçlı altın, dikenli ekşi, düz tahta). Kes'teki dikenli top oyunla tutarlı, dokunulmadı. Oyun adları/skor birimi "şeker" kaldı.
- **Capacitor iOS** (`7c97dd6`, yayınlandı, GitHub aynı): [[2026-10-13-paket-kimligi-net-ziroo-tussle-ve-ios-kabuk]]. Simülatörde yerel sunucuyla tam akış (misafir, oda, Four Arrows, WS) doğrulandı; canlı sunucuyla yalnız açılış + form doğrulaması (metin girişi engeli). CORS canlıda curl ile doğrulandı (listeli origin 204 + başlık, yabancı origin başlıksız).
- Yedek `/opt/tussle/data/pre-7c97dd6.db`. 1.702 test yeşil.
- Yusuf Android Studio Rabbit 1'i kuruyor; Google Play 25 $ kayıt ve test e-postaları bekleniyor.
- Xcode'da imzalama (bireysel takım, ad Apple kimliğinden gelir; "Ziroo" için kurumsal hesap + D-U-N-S gerekir, sonraya) → Archive → App Store Connect'e yükleme başarılı: 1.0 (1), ad "Tussle: Daily Mini Games" ("Tussle" alınmış), English (U.S.). Yapı işlendi, uyum sorusu çıkmadı. Klavye üst şeridi (accessory bar) varsayılan bırakıldı.
- Doğrulanmayanlar: gerçek cihaz, açılış ekranı, koyu temada durum çubuğu, paylaşım sayfası, TestFlight yüklemesi.

Dersler: [[2026-10-13-capacitor-ios-dersleri]].
