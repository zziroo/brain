---
type: decision
project: diskort
date: 2026-09-26
status: active
tags: [working-rules, git, diskort]
source: memory git-push-autonomy.md (diskort proje hafızası)
---

# Claude, Diskort reposunda doğrulanmış değişikliği kendi takdiriyle main'e commit edip push edebilir

## Bağlam
Yusuf 2026-09-26'da `zziroo/diskort` için her push'ta sormaya gerek olmadığını söyledi.

## Karar
Tutarlı, doğrulanmış bir değişiklikten sonra (typecheck + testler geçince) Türkçe commit mesajıyla `main`'e commit + push serbest.

## Neden
Yusuf, iş sürerken GitHub deposunun senkron kalmasını ve her seferinde sorulmamasını istedi.

## Reddedilen alternatifler
- Her push'ta onay sormak: Yusuf gereksiz bulduğu için.

## Sonuçlar / riskler
Force-push ve yayımlanmış geçmişi yeniden yazmak yine yasak (önce sor). Client release'i ayrı kural: Yusuf "sürüm çıkar" demeden çıkmaz ([[surum-cikarma-kurali]]).

## İlgili
- [[diskort-orchestrator-mode]], [[_index]]
