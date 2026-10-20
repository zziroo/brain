---
type: lesson
project: tussle
date: 2026-10-21
status: active
tags: [tussle, yan-oturum, git, yayin, ajan-tarayici]
source: oturum "tussle: mevcut durum kapsamlı çalışma" (2026-10-21), yayın `a396f75`
---
# Ders: aynı klasörde iki oturum çalışırken main'e giren her commit yayına girer; ortak dosyalar hunk bazlı stage'lenir
- **Main = yayın hattı.** `deploy/release.sh` HEAD'i gönderir. Yan oturum (arena/Sumo) kendi işini main'e commit edince (`e9574bd`) bizim yayınımız (`a396f75`) onu da canlıya taşıdı; kimse "arena yayınlansın" dememişti (bu kez zararsızdı, arena notu zaten telefon teyidi için yayın istiyordu). Kural: telefonda onaylanmamış iş yan dalda kalsın, hazır olunca main'e merge; yayın öncesi `git log HEAD..` ile "başka kimin commit'i gidiyor" bak ve Yusuf'a söyle.
- **Ortak dosyalarda hunk bazlı stage.** İki oturum `src/client/i18n/tr.ts`/`en.ts` ve `docs/kod-haritasi.md`'ye birlikte dokundu. İşe yarayan yol: `git diff -U0 -- <dosya> > p.diff`, küçük bir betikle yalnız kendi hunk'larını seç (hunk içeriğinde `arena|sumo` gibi anahtar değil, hunk numarasıyla; önce `awk`'la her hunk'ın ilk 2 değişen satırını listele), `git apply --cached --unidiff-zero`. Patch metni satır sonuyla bitmezse "corrupt patch" verir. Kendi dosyaların bütünüyle `git add`.
- **Yan oturumun `tsx watch` + vite HMR'si tarayıcı ajanlarını bozar.** Her Edit sunucuyu yeniden başlatır (anlık 502) ve sayfayı yeniler; oyun 2 sn'den uzun koşamaz. Çözümler: HMR'siz geçici vite (ayrı port), HEAD'den geçici worktree'de ayrı vite ("önce" görüntüsü için de gerekli), canvas-shot alıcısı ajan başına ayrı port (5203, 5211-5216), her ajan kendi sekmesi. Bir ajan yanlışlıkla başka ajanın sekmesinde `javascript_tool` çalıştırdı; brief'e "tabId'ni her çağrıda ver" yaz.
- **Uzaktan kontrolde `start_session` çalışmaz** ("only on a message typed in the desktop app"). Devir brief'ini vault'a yaz ([[2026-10-21-devir-gorsel-tur-brief]]) ve kullanıcıya masaüstünden başlatmayı söyle.
- **Arena oturumu tarafı (aynı gün):** anahtar kelimeyle hunk süzme de işledi (`git diff -U0` → hunk gövdesinde `arena|sumo` geçenleri tut → `git apply --cached --unidiff-zero`), ama i18n'de arena bloğu four-arrows bloğunun içine kaydı (düzeltme `c665c22`): süzülmüş yamayı uyguladıktan sonra blok sınırlarını (`@game:…:end`) gözle kontrol et. Commit öncesi stage'i tek başına doğrula: `git write-tree` → `git archive <tree> | tar -x` scratchpad'e, `node_modules` sembolik bağ, orada typecheck + ilgili testler; diğer oturumun kirli dosyaları böyle dışarıda kalır. Ajanlar çalışırken `npm test`'teki zamanlama testleri (crack-it, swing GC) yük altında düşer; tek başına koşturup karar ver.
İlgili: [[2026-10-18-yayin-temiz-worktree-den-yan-oturum-ayni-klasorde]], [[2026-10-18-ayni-checkoutta-baska-oturum-varken-magaza-derlemesi-yarim-isi-alir]], [[2026-10-21-tussle-geri-bildirim-turu-2-ve-gorsel-analiz]].
