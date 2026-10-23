---
type: lesson
project: diskort
date: 2026-10-23
status: active
tags: [diskort, masaustu, css, yerlesim]
source: 2026-10-23 oturumu "diskort: 0.12.0 kozmetikler kaldırıldı + oyun sayfası", commit 5cf8b94
---

# Grid sarmalayıcıda varsayılan `auto` sütun, flex satırı kısaltacağına taşırır

**Belirti:** Ses kanalında yayın yapan üyenin satırında yayın küçük resmi oyun ikonundan daha sağda bitiyor, sağ yuva hizası bozuk görünüyordu. 0.11.3'teki "sabit sağ yuva" kodu doğruydu; ekran görüntüsü piksel piksel ölçülünce küçük resmin 32 yerine 22 px göründüğü, yani kenarda kesildiği anlaşıldı: satır sağa taşıyordu.

**Neden:** Satırları açılıp kapanırken animasyonlamak için saran `.collapse-*` sınıfı `display: grid; grid-template-rows: 1fr`. Örtük sütun `auto` olduğundan sütunun en küçük genişliği öğenin min-content genişliğidir; flex satırdaki `truncate` isim bile olsa grid öğesi o genişliğin altına inmez. Ad + YAYINDA + küçük resim dar kenar çubuğuna sığmayınca satır taşıyor, ad kısalmıyordu.

**Çözüm:** `grid-template-columns: minmax(0, 1fr)` (ya da grid öğesine `min-width: 0`). Aynı sarmalayıcıyı kullanan bütün listeler için geçerli.

**Ders:** Bir flex satırı grid/`0fr→1fr` sarmalayıcıya koyarken sütunu `minmax(0, 1fr)` yap; "truncate çalışmıyor / satır sağa taşıyor" belirtisinde önce sarmalayıcıya bak, satırın kendine değil. Ekran görüntüsünden ölçüm: PIL yoksa PNG'yi `zlib` ile elle çözüp sütun taramak yeterli (Retina'da 1 css px = 2 px).
