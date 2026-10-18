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

- **18 Eki:** `release.sh --skip-ota` "Production Deploy" diye reddedildi (Yusuf kendisi koşturdu); aynı akşam, Yusuf "her şey güncel olsun" dedikten sonra tam `release.sh` geçti. Alt ajanın iOS motor eklentisi commit'i "Create RCE Surface" diye reddedildi (eklenti OTA dizininden `games.js`'i JavaScriptCore'da çalıştırıyor; Android'deki tasarımın aynısı); JS'i dosyadan WebView'de koşturan hata ayıklama düzeneği ve `preview_stop` da ajanda reddedildi. Koordinatör sınıflandırıcıyı aşmadı; Yusuf onayından sonra commit'i kendisi attı ve geçti. Ders: ajan reddedilince etrafından dolanma, Yusuf'a sor; genel JS-eval kancası yerine dar, `#if DEBUG` başlatma argümanı (`-TussleStartHash`) kullan.

İlgili: [[2026-10-13-capacitor-ios-dersleri]] (aynı release.sh engeli), [[2026-10-11-parti-gecesi-dersleri]] (update-ref ile kopya ref kalıbı; artık engellenebilir), [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]].
