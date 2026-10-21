---
type: decision
project: genel
date: 2026-10-21
status: active
tags: [working-rules, windows, klasor-duzeni, kurulum]
source: Windows ZZ kök oturumu 2026-10-21 "sistem: disk taşıma sonrası temiz kurulum"
---

# Karar: Yeni Windows'ta ZZ aynı yolda kalır, içinde yalnız brain ve silksong-mod; diğer projeler gerekince origin'den klonlanır

## Karar
- Kök yine `C:\Users\yusuf\ZZ`. Altında `brain/` (vault, git) ve `zProjects/silksong-mod/`. Başka proje kopyası yok.
- Eski diskteki diğer 13 proje kopyası taşınmadı. Lazım olan proje `gh repo clone zziroo/<ad>` ile `zProjects/` altına çekilir; klasör adı eşleme tablosundaki ad olur (`incremantal-game` gibi), böylece eski oturumlar ve hafıza eşleşir.
- `ZZ/_backups` ve `ZZ/claude-kullanim.html` geri getirilmedi; yedekler `D:\zbackups\` altında durur.
- Eski diskteki kişisel klasörler (Documents, Downloads, Videos, Steam kayıtları) Yusuf'un kararına bırakıldı; H: takılı kaldıkça erişilebilir.

## Neden
- Claude oturumları ve hafıza klasör yoluna bağlı (`C--Users-yusuf-ZZ...`). Yol aynı kalınca hiçbir çeviri gerekmedi; 259 oturum kaydı ve hafıza doğrudan tanındı (yeniden başlatma sonrası doğrulandı: 8 açık, 192+ arşivli, projelere dağılım doğru).
- Windows yalnız Silksong/LoRA makinesi ([[2026-10-07-windows-makinesi-yalniz-silksong-icin]]); diğer projelerin Windows kopyaları zaten origin'in gerisindeydi. Eski kopyayı taşımak yanıltıcı olurdu.
- Yusuf temiz kurulumda düzenli bir başlangıç istedi ("birebir taşımana gerek yok, sadece veriler").

## Reddedilen alternatifler
- **ZZ'yi birebir kopyalamak:** eski ve remote'suz kopyalar, yedek klasörü ve tek seferlik raporlar gelirdi.
- **Projeleri başka bir köke (ör. `C:\dev`) koymak:** eski oturumlar ve hafıza eşleşmezdi; `C:\dev\diskort` kalıntısı bu yüzden zaten terk edilmişti.
- **Hepsini şimdiden klonlamak:** Windows'ta kullanılmayacak projeler için gereksiz.

İlgili: [[2026-10-21-windows-temiz-kurulum-hook-ve-bitir]], [[klasor-proje-eslemesi]], [[_index]]
