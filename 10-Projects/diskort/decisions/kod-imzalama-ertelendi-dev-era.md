---
type: decision
project: diskort
date: 2026-09-26
status: active
tags: [dagitim, windows, imza]
source: C--dev-diskort f0d5fe07/0f563e3b/3034bff9 (2026-09-26), C--dev-diskort 2736605c (2026-09-26/27)
---

# Karar: Windows kurulum dosyalarının kod imzası şimdilik ertelendi; SmartScreen uyarısı kabul edildi.

## Bağlam
İmzasız setup "Bilgisayarınız korundu" uyarısı veriyor; imzalanabilir mi soruldu.

## Karar
Seçenekler sunuldu (SignPath Foundation ücretsiz, Certum Open Source yıllık ~50 USD). Kullanıcı "şimdilik yapmayalım" dedi. Kullanıcılar "Ek bilgi > Yine de çalıştır" der. İmza sayfası sitede yayında (docs/kod-imzalama.md).

## Neden
- Kapalı arkadaş grubu; uyarı tolere edilebilir.
- Öncelik özelliklerde.

## Reddedilen alternatifler
- Hemen SignPath başvurusu: başta kabul edilmiş gibiydi (bir noktada "SignPath ile başlayalım" denmişti), sonra kullanıcı vazgeçti.
- Ücretli sertifika: şimdilik gereksiz maliyet.

## Sonuçlar / riskler
Grup büyürse yeniden ele alınacak. Durum 28 Eylül itibarıyla ertelenmiş (oturumlarda tekrar açılmadı).

## İlgili
- [[2026-09-26-kurulum-ve-yayina-alma]]
- Memory kaynaklı not: [[kod-imzalama-ertelendi]]
