---
type: lesson
project: ceviri-araci
date: 2026-10-03
status: unverified
tags: [claude, ajan, araclar]
source: 2026-10-02 oturumu, alt ajan raporları; koordinatörün kendi heredoc denemesi (2026-10-03)
---

# Ders: Ters eğik çizgi ve tırnak içeren metni yazarken hem Bash heredoc hem Write aracı sorun çıkarabilir; yazdıktan sonra dosyayı kontrol et

- Alt ajan raporu (koordinatör yeniden üretmedi): bazı Bash heredoc düzenlemelerinde ters eğik çizgiler yarıya indi, düzenlemeler sessizce başarısız oldu. Ajan sonradan yama betiklerini dosya olarak yazdı.
- Alt ajan raporu (yeniden üretilmedi): Write aracı `\u` + dört hex kaçışını gerçek karaktere çevirdi; `excel.ts`, `renpy.ts`, `xml.ts` içinde düz U+FEFF/U+FFFE/U+FFFF kalmıştı, sonra geri düzeltildi.
- Koordinatör (2026-10-03): kesme işaretli ve ters eğik çizgili Türkçe notları tek bir uzun Bash heredoc zinciriyle yazmak "unexpected EOF" ile tamamen başarısız oldu, hiçbir dosya yazılmadı. Not dosyaları Write aracıyla tek tek yazıldı.

Uygulama: kaçış içeren kodu yazdıktan sonra testle ya da görünmez karakter taramasıyla doğrula; uzun içerikli çoklu dosya yazımını tek heredoc zincirine koyma. Diskort'taki "ters eğik çizgili kod için Write/Edit kullan" önerisi ([[dev-ortami-tuzaklari]]) tek başına yeterli değil.

İlgili: [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]]
