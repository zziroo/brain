---
type: session
project: rehber-okuyucu
date: 2026-10-04
status: active
tags: [rehber-okuyucu, oturum, yayin]
source: oturum 2026-10-03/04 (achievement-guide-formatter), Steam rehber görüntüleyicisinden şikâyetle başladı
---

# Rehber Okuyucu sıfırdan kuruldu, tools.ziroo.net/rehber'de yayınlandı, motor Opus'a alındı

## Ne yapıldı
- Sözleşme (`docs/SPEC.md`) yazıldı; sunucu ve arayüz iki ajanla paralel kuruldu, altı düzeltme turu geçti.
- Yusuf'un istekleriyle eklendi: tek tek işaretlenen kontrol listeleri, her resmi başarıma kart (boş gövdeli de olsa), kullanım sayfası ve model etiketi.
- Mimari yolda değişti: SSH'li kuyruk işleyicisi yerine sunucu içi Claude CLI ([[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]]).
- Yayın: `deploy.sh` ilk seferde çalıştı; araç listesine kart (ziroo-edge `c7782d9`, push edilmedi). Commit'ler `cbf9a61`, `0e83ca3`, `35b4cde`.
- Canlıda Witcher 3 rehberi (45 bölüm, 78 başarım) Sonnet ile iki kez kötü sonuç verdi; motor Opus'a alındı ([[buyuk-rehberde-model-kisaltiyor]]).

## İnceleme kapısı
Beş inceleme + iki şüpheci turu. Kanıtlı bulgular: karesel regex (iki kez), bellek çökmesi, atıf şişirme, ziyaretçi yenilemesiyle üretim tetikleme, iş döngüsünün olay döngüsünü kilitlemesi, genel giriş sınırının sahibi kilitlemesi. Hepsi düzeltildi. Ayrı incelemeden geçmeyenler: son turdaki regex ve giriş sırası düzeltmeleri (Claude yaptı), bilinmeyen alanların atılması, tamlık kuralı.

## Olaylar
- Yusuf token'ı PowerShell'de bash komutuyla denedi, komut çalışmadı; token ekran görüntüsüyle sohbete düştü. Yenilemesi önerildi, yenilediği doğrulanmadı.
- Yapıştırılan token'da boşluk vardı (401); değeri görmeden sunucuda temizlendi.
- Otomatik izin denetimi `/etc/rehber.env` yazımını ve deploy'u engelledi; Yusuf sohbette izin verince yapıldı.

## Açık
[[10-Projects/rehber-okuyucu/_overview|Genel bakış]] "Sıradaki işler".
