---
type: decision
project: genel
date: 2026-10-17
status: active
tags: [working-rules, vault, skill, hook]
source: Claude Code oturumu 2026-10-17 "sistem: kaydet/başla komutları ve vault düzeni"
---

# Karar: /basla yerine SessionStart hook'u; oturum sonu için /bitir (kaydet + arşivle)

## Karar
- **Oturum başı:** `/basla` skill'i kaldırıldı. Yerine `~/.claude/hooks/oturum-baslangici.mjs` (settings.json `SessionStart`, yalnız `startup|clear`). Çalışma klasörünü [[klasor-proje-eslemesi]] tablosunda bulur, vault'u `git pull --ff-only` ile çeker, `_overview.md`'nin "Güncel durum" + "Sıradaki işler" bölümlerini (en fazla ~6000 karakter) ve overview tarihini bağlama ekler; Diskort'ta okunmamış inbox dosyalarını bildirir. ZZ kökünde ve eşlemesiz klasörde hiçbir şey eklemez. Hata olursa sessiz çıkar.
- **Oturum sonu:** yeni `/bitir` skill'i `/kaydet`'in 0-8. adımlarını uygular, sonra oturumu sormadan arşivler (kayıt ya da push başarısızsa arşivlemez). `/kaydet` oturum ortası için aynen kalır ve arşivi yalnızca önerir.
- **Eşleme tablosu:** klasör adları vault adlarından farklı (`mobil-playus` → `tussle`, `incremantal-game` → `isik-bekcisi`...). Hook ve `/kaydet` aynı tabloyu okur.
- **Overview kısa kalır:** hook bu bölümleri her oturumda okuduğu için "Güncel durum" değişiklik günlüğü değil, yalnızca şu anki durum; `/kaydet` buna göre güncellendi.

## Neden
- Yusuf "kaydet" ve "arşivle"yi hep birlikte kullanıyordu; iki adım tek komuta indi.
- `/basla` her oturumda yazılması gereken, unutulabilen bir adımdı; hook bunu kendiliğinden ve tutarlı yapar. Kalan nadir durumlar (başka projenin durumu, ZZ kökü) doğal dille çözülüyor.
- Eski `/basla` Windows yolunu arıyordu ve klasör adı farklı projeleri bulamıyordu; ziroo-edge ve marka notları bu yüzden `diskort/` altına yazılmıştı.

## Reddedilen alternatifler
- **`/kaydet`'e otomatik arşiv eklemek:** `/kaydet` çoğu zaman oturum ortasında çalışıyor (2026-10-16 kararı); ayrı komut daha güvenli.
- **`/basla`'yı hook'un yanında tutmak:** kullanıcı gereksiz buldu; iki komut (`/kaydet`, `/bitir`) yeterli.
- **Overview'ın tamamını bağlama eklemek:** tussle overview'ı ~42k karakter; her oturuma binlerce token eklerdi.

İlgili: [[hafiza-ve-vault-duzeni]], [[_index]]
