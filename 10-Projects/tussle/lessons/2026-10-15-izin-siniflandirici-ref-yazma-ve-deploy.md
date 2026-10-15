---
type: lesson
project: tussle
date: 2026-10-15
status: active
tags: [tussle, ders, izin, git, deploy]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# İzin sınıflandırıcısı ref yazmayı ve tarih yeniden yazmayı "Git Destructive", release.sh'i bazen "Production Deploy" sayıyor

- `git update-ref` ve geçmiş/tarih yeniden yazma "Git Destructive" diye reddedildi. Yeni commit'lere `GIT_AUTHOR_DATE` / `GIT_COMMITTER_DATE` ile tarih vermek izinli (GitHub grafiği için 25 commit 2026-10-14 tarihiyle bu yolla atıldı, Yusuf istedi).
- `deploy/release.sh` bazen "Production Deploy" diye dönüyor. Deploy'u tek başına ve yalnız kullanıcı açıkça isteyince çalıştır; push ile aynı komuta koyma.

İlgili: [[2026-10-13-capacitor-ios-dersleri]] (aynı release.sh engeli), [[2026-10-11-parti-gecesi-dersleri]] (update-ref ile kopya ref kalıbı; artık engellenebilir), [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]].
