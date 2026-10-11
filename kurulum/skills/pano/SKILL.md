---
name: pano
description: Bütün Claude Code geçmişinden (Mac + Windows arşivi) animasyonlu dashboard üretir ve tarayıcıda açar; token, maliyet, oturumlar, akışlar, ajanlar, alışkanlıklar. Kullanıcı /pano yazınca ya da "panoyu/dashboard'u aç, token raporu çıkar" deyince çalışır.
argument-hint: "[--since YYYY-MM-DD] [--until YYYY-MM-DD] [--kaynak mac|windows] [--metinsiz]"
---

# /pano: konuşma ve token panosu

Araç: `~/.claude/orchestration-report/pano.mjs` (veri sözleşmesi `pano/SEMA.md`, arayüz `pano/sablon.html`).

## Adımlar
1. Çalıştır (argümanları olduğu gibi geçir):
   `node ~/.claude/orchestration-report/pano.mjs --ac $ARGUMENTS`
   İlk çalıştırma bütün transkriptleri tarar (~1 dk); sonrakiler önbellekten hızlıdır. Bir şey tutarsız görünürse `--yenile` ile önbelleği yok say.
2. Konsol özetinden kullanıcıya 2–3 satır Türkçe özet ver: dönem, oturum/istem sayısı, toplam token ve API karşılığı maliyet. Maliyetin Max aboneliğinde ayrıca faturalanmadığını, "API'den olsaydı" tahmini olduğunu hatırlat.
3. Dosya: `~/.claude/orchestration-report/out/pano.html`. `--ac` varsayılan tarayıcıda açar; açılmadıysa yolu ver.

## Kurallar
- Pano yerel bir dosyadır; içinde istem metinleri var. Kullanıcı açıkça istemedikçe Artifact olarak yayınlama, buluta ya da vault'a kopyalama. Paylaşılacaksa `--metinsiz` ile üret ve yayından önce HTML'in tamamını oku.
- Transkript köklerine (`~/.claude/projects`, `~/Arsiv/claude-konusmalar/...`) hiçbir şey yazma.
- Windows'tan yeni kayıt gelmişse önce `python3 ~/Arsiv/claude-konusmalar/ice-aktar.py <zip>` ile içe aktar, sonra panoyu üret.
