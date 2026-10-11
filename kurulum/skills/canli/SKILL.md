---
name: canli
description: Çalışan Claude Code oturumlarını ve alt ajanlarını canlı, animasyonlu bir panoda gösterir (yerel sunucu, SSE). Kullanıcı /canli yazınca ya da "canlı panoyu aç, şu an hangi ajanlar çalışıyor göster" deyince çalışır.
argument-hint: "[--port 7788] [--pencere <dk>]"
---

# /canli: canlı orkestra panosu

Araç: `~/.claude/orchestration-report/canli.mjs` (arayüz `canli/sablon.html`, veri sözleşmesi `canli/SEMA.md`).
Port varsayılan 7788; `$ARGUMENTS` içinde `--port N` varsa onu kullan.

## Adımlar
1. Zaten çalışıyor mu bak:
   `curl -s -o /dev/null -w "%{http_code}" --max-time 2 http://127.0.0.1:<port>/durum`
   `200` dönerse yeniden başlatma, 3. adıma geç.
2. Çalışmıyorsa arka planda başlat (Bash `run_in_background: true`; argümanları olduğu gibi geçir):
   `node ~/.claude/orchestration-report/canli.mjs $ARGUMENTS`
   Sonra `/durum` 200 dönene kadar birkaç kez dene (açılış genelde <1 sn). Port doluysa ve `/durum`
   cevap vermiyorsa portu başka bir şey tutuyordur: kullanıcıya söyle, `--port` öner.
3. URL'yi ver: `http://127.0.0.1:<port>/` ve `open` ile varsayılan tarayıcıda aç. `/durum`'dan 1-2
   satır Türkçe özet: canlı oturum, çalışan ajan, son 1 saatin token ve API karşılığı maliyeti (Max
   aboneliğinde ayrıca faturalanmaz).
4. Durdurmak istenirse: `pkill -f "orchestration-report/canli.mjs"`.

## Kurallar
- Yalnız yerel: sunucu 127.0.0.1'e bağlanır; dışarı açma, tünel kurma.
- Artifact olarak yayınlama, buluta ya da vault'a kopyalama (sayfada oturum başlıkları ve araç özetleri var).
- Transkript köklerine (`~/.claude/projects`, `~/Arsiv/claude-konusmalar/...`) hiçbir şey yazma; araç onları salt okur.
