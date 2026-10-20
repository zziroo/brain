---
type: project
project: tussle
date: 2026-10-20
status: active
tags: [tussle, mobil-playus, kod-haritasi, token, devir]
source: 2026-10-20 ZZ oturumu "araştırma: tweet doğrulama"; karar [[2026-10-20-token-ucuncu-tur-kod-haritasi-ve-kural-gozden-gecirme]]
---

# Devir notu: mobil-playus için kod haritası çıkarılacak

mobil-playus klasöründeki bir oturumda yapılacak. Bu not o oturumun brief'idir.

## Görev
`docs/kod-haritasi.md` dosyasını çıkar ve projenin CLAUDE.md'sine bağla. Amaç, ajanların işe grep/sed ile arayarak değil, haritayı okuyarak başlaması.

Neden: 19–20 Ekim'de bu projenin alt ajanları 966 grep, 945 sed ve 203 cat çalıştırdı. Bu, Bash çağrılarının ~%60'ı ve token'ın ana kaynağı.

## Biçim (kararlaştırıldı)
- En fazla ~400 satır, ~8k token. `docs/ARCHITECTURE.md`'nin yerine geçmez, onu tamamlar: mimari anlatımı tekrar etme, link ver.
- Satır numarası yazma. Bunun yerine dosya yolu + grep'lenebilir sembol adı yaz (fonksiyon, bileşen, sınıf, CSS kökü).
- Bölümler:
  1. **Alan → dosyalar:** her klasör/modül için tek satırda sorumluluk ve ana semboller.
  2. **"Şunu yapmak için şuraya bak" dizini:** yeni oyun ekleme, i18n metni, tema/renk, lobi/oda arayüzü, giriş/IAP, Capacitor/Android, mini/recorder, testler…; her biri için dokunulan dosyalar ve sıra.
  3. **Büyük dosyaların iç haritası:** `lobby.css`, `theme.css`, `covers-core.ts`, `room.ts`, i18n dosyaları gibi 1.000+ satırlık dosyalar için bölüm başlıkları ve grep işaretleri.
  4. **Tuzaklar:** aynı mantığın kopyası olan yerler, birlikte değişmesi gereken dosya çiftleri.
- Mockup ve asset klasörleri tek satırla geçilir.

## Bakım kuralı
Projenin CLAUDE.md'sine kısa bir bölüm eklenecek:
- Ajanlar ve koordinatör kod işine başlamadan önce haritayı okur.
- Yapıyı değiştiren ya da yeni modül ekleyen her commit, haritayı da aynı commit'te günceller.
- Büyük kod işlerinden önce `kesif` ajanı (`~/.claude/agents/kesif.md`) çağrılır.

## Yöntem ve doğrulama
- Haritayı bir Opus ajanı çıkarır; iş büyük olduğu için alanlara bölünebilir.
- Doğrulama: `git log`'dan son 5 gerçek değişikliği seç. Her birinin yalnız commit mesajını `kesif` ajanına ver.
- Ajanın bulduğu dosyaları commit'in gerçekten değiştirdiği dosyalarla karşılaştır, çağrı sayısını not et. Eksik çıkan yerleri haritaya ekle.

## Bitti sayılması için
- Harita ve CLAUDE.md bölümü yazılmış olmalı.
- Doğrulamanın sonucu (isabet, çağrı sayısı) raporlanmış ve buraya ya da karar notuna eklenmiş olmalı.
- Değişiklikler projenin kurallarına göre commit edilmiş olmalı.
- Kod değişikliği olmadığı için review ajanı gerekmez. Haritada sır ya da gizli yol olmadığını koordinatör kendisi kontrol eder.
- Sonuç iyiyse aynı şablon incremantal-game ve diskort'a uygulanır.
