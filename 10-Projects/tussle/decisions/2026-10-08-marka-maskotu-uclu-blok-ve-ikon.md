---
type: decision
project: tussle
date: 2026-10-08
status: active
tags: [tussle, ikon, marka, maskot, pwa]
source: oturum 2026-10-08 gece (mobil-playus UI yenileme)
---

# Karar: marka maskotu "üçlü blok" (taçlı sarı üstte, camgöbeği ve magenta altta); ikon ve uygulama içi kullanım

## Bağlam
Uygulama ikonu eski koyu zeminli neon halkaydı. Yusuf "oyunu anlatan, Playus'un zar+alev ikonu gibi oyunvari" bir şey istedi. 20'den fazla aday çizildi (zar, blok yığını, kupa, şimşek, VS düellosu, kronometre, podyum, kapışan bloklar, taç kapmaca ve varyantları), her biri 192 ve 48 px PNG ile sunuldu.

## Karar
- Seçilen aday **N2d2**: 2-1 piramit; altta camgöbeği ve magenta bloklar (gülen), üstte taçlı sarı blok; sticker stili (kalın mürekkep kontur, sert gölge), krem `#fff1e0` zemin, yıldız/parıltı yok. Anlamı: arkadaş grubu + kazanan.
- Kaynak `src/client/public/icons/icon.svg`; PNG'ler qlmanage + `scripts/png-palette.mjs` ile paletli üretilir (toplam ~49 KB); maskable sürümde sanat ~%67 ölçekte (yarıçap 205/512 içinde). Eski `scripts/gen-icons.mjs` silindi.
- Aynı üçlü uygulama içinde `brand-core.ts` / `brand.ts` ile DOM SVG olarak kullanılır: ruh hâlleri (normal, mutlu, şaşkın, uykulu), animasyonlar `hello` (tek sefer giriş), `loading` (yalnız yükleme görünürken döngü), `idle` (tek göz kırpma, sürekli döngü yok). Kullanım: giriş ekranı, ana sayfa logosu (wordmark), yükleme durumları, boş durumlar, sonuç kartı (1. sıra/rekor → mutlu). Toast'ta yok.
- Azaltılmış hareket (uygulama ayarı ve OS) döngüyü ve kırpmayı kapatır (`!important`, özgüllük yüzünden).

## Neden
- Yusuf N2 ailesini (blok yığını) beğendi; iki alt turda N2d2 48 px'te en dengeli ve "arkadaşlar + sıralama" mesajını taşıyan oldu.
- Tek maskot seti ikon, boş durum ve yükleme arasında tutarlılık sağlıyor; "varyanslarıyla her yerde" Yusuf'un isteği.

## Reddedilen alternatifler
- **VS düellosu (H/K):** en güçlü 1v1 anlatımı, ama oyun 1v1 değil, grup; Yusuf "1v1 olsa seçerdim" dedi.
- **Zar + alev (A ailesi):** Playus'a fazla yakın, alev arkada kayboluyordu.
- **Kronometre, kupa, şimşek, podyum, kapışan bloklar:** sevimli ama ya genel ya 48 px'te karışık.
- **Yakın plan tek taçlı yüz (N2d3):** küçükte en net ama "tek kişilik oyun" hissi.
- **Sürekli göz kırpma (idle):** menüde sonsuz animasyon GPU'yu uyanık tutar; tek kırpma tercih edildi.

## İlgili
- [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]]
- [[2026-10-08-ui-yenileme-dersleri]]
