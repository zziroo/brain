---
type: decision
project: genel
date: 2026-10-06
status: active
tags: [working-rules, git, github]
source: oturum 2026-10-06 (commit'lerin GitHub hesabına bağlanmaması)
---

# 2026 projelerinin GitHub repoları yeni zziroo hesabına taşındı

## Bağlam
Commit'ler `zziroo.ai@gmail.com` ile atılıyordu, ama bu adres hiçbir GitHub hesabına bağlı değildi. Bu yüzden 829 commit avatarsız ve hesapsız görünüyordu. Repolar `yusufholat` hesabındaydı. O hesap `yusufholat@gmail.com` ve noreply adresine bağlı.

## Karar
Yusuf `zziroo.ai@gmail.com` ile yeni **`zziroo`** hesabını açtı ve adresi doğruladı. 2026 Eylül'den beri aktif olan 15 repo `zziroo`'ya transfer edildi (2026-10-06). Taşınanlar: brain, isik-bekcisi, diskort, ziroo-edge, ziroobank-expenses, web-fps-game, bal-vadisi, document-formatter, song-finder, achievement-guide-formatter, string-tool, steam-avgr-calculator, web-boss-teaser, voice-detector, trencheck. 2025 ve öncesindeki repolar (zi-note, roo-bot, okul ve hobi repoları) `yusufholat`'ta kaldı.

## Neden
Yusuf "Ziroo" işleri için ayrı bir kimlik istedi. Adres doğrulanınca eski commit'ler de geriye dönük olarak `zziroo`'ya bağlandı.

## Reddedilen alternatifler
- `zziroo.ai@gmail.com` adresini `yusufholat`'a ikinci e-posta olarak eklemek: En kolay yol buydu, ama ayrı kimlik isteğini karşılamıyordu.
- `yusufholat` kullanıcı adını değiştirmek: Eski repolar ve eski profil de yeni kimliğe geçerdi.

## Sonuçlar / riskler
- `yusufholat` taşınan repolarda collaborator (push yetkisi var, admin yok). Bu yüzden bu makinedeki `gh` (yusufholat) push yapabiliyor. Repo ayarları için `zziroo` ile giriş gerekir.
- Eski `github.com/yusufholat/<repo>` adresleri yönlendiriliyor. **`yusufholat` altında bu isimlerde yeni repo açma**, yoksa yönlendirme kırılır.
- Diskort masaüstü uygulaması GitHub Releases'tan güncelleniyor. Yayımlanmış sürümler eski adrese gidiyor ve yönlendirmeye dayanıyor. Bir sonraki sürümde yayın ayarındaki owner `zziroo` yapılmalı (Diskort oturumunda).
- VPS'teki ve Mac'teki git remote'ları da `zziroo/...` olarak güncellenmeli. Windows'ta vault remote'u güncellendi.
- Grafik: Commit'ler bağlandı. Katkı grafiğinin yeniden hesaplanması 24 saati bulabilir.

## İlgili
- [[2026-10-05-windowstan-maca-gecis]], [[mac-gecisi-kontrol-listesi]], [[git-push-autonomy]], [[_index]]
