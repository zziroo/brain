---
type: resource
project: genel
date: 2026-10-01
status: active
tags: [working-rules, arac, rapor]
source: C:\Users\yusuf\.claude\CLAUDE.md (Tools)
---

# Orkestrasyon ve ajan akışı raporu `orchestration-report` klasöründeki betikle üretilir

- Yer: `C:\Users\yusuf\.claude\orchestration-report\`. Çalıştırma: `node report.mjs [--session <id>] [--project <dir-key>]`; çıktı HTML ve JSON olarak `out\` altına yazılır.
- Yusuf rapor isterse HTML Artifact olarak yayınlanır; yayından önce HTML'in tamamı okunur. İlk rapor yayımlanmış: https://claude.ai/artifact/Fif4G4UAd5tCiR78RocHsg (yeni oturumun raporu yeni artifact'a gidebilir).
- Bilinen tuhaflık: hâlâ çalışan ajanlar raporda "Yarım kaldı" görünür.
- Token/maliyet raporu: `node usage.mjs [--since YYYY-MM-DD] [--out <dosya.html>]`. `~/.claude/projects` altındaki tüm oturum ve subagent transkriptlerini tarar; model, proje, gün ve oturum bazında token ve API liste fiyatı karşılığını `out/usage.html` dosyasına yazar. Max aboneliğinde gerçek fatura sabit; buradaki $ "API'den olsaydı" tahminidir. Mesajlar kimliğe göre tekilleştirilir.
- 2026-10-05'ten itibaren Mac'te yer: `~/.claude/orchestration-report/`. Eski Windows dönemi oturumları da taşındı ve rapora girer: [[2026-10-05-windowstan-maca-gecis]].

## İlgili
- [[orkestrasyon]], [[_index]]
