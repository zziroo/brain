---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, urun, reddedilen]
source: memory diskort-rules.md
---

# Ürün basit tutulur: kanal durumu ve üye listesinde ayrı "Etkinlik" grubu reddedildi, tekrar önerilmez

## Bağlam
Yusuf 2026-09-26..29 oturumlarında ürün kapsamı ve hissi için kurallar koydu.

## Karar
- Reddedilen: sesli kanal durumu ("kanal durumu"); üye listesinde ayrı bir "Etkinlik" gruplaması. Tekrar önerme.
- Yayın rozeti metni her yerde "YAYINDA".
- Sol alttaki ses/kullanıcı paneli yeniden biçimlendirilmez (yalnız yayın satırı ve kozmetik gösterimi serbest).
- Discord arayüzü yalnızca referanstır; kod, varlık, ses asla kopyalanmaz. Tarayıcı panelinde (Yusuf'un Discord'u) yalnız bakılır, sesli kanallara tıklanmaz.
- Üye listesi satır alt metinleri durum ikonları (gamepad, ses) + tek metin kullanır; listede hızlı "Mesaj gönder" butonu yok.
- Arayüz sesleri: tek özgün set, paket yok.
- Ayarlar: paylaşılan sınıflandırma `packages/client-core/src/settingsSections.ts`.
- Mobil video: dokun -> animasyonlu tam ekran, sessize alma sol altta, satır içi native kontrol yok.

## Neden
Kaynakta tek tek gerekçe verilmemiş; ortak tema "basit tut" ve Discord'u kopyalama. Özellik/UI önermeden önce bu liste kontrol edilir.

## Reddedilen alternatifler
Yukarıdaki maddeler zaten reddedilenlerdir.

## İlgili
- [[etkinlik-oyun-aktivitesi]], [[dm-sunucu-ayrimi]], [[_overview]]
