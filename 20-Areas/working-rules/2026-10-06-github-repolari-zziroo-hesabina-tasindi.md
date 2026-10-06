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

GitHub commit'i hesaba isimle değil, **doğrulanmış e-posta adresiyle** bağlar. Kontrol yöntemi: `gh api repos/<sahip>/<repo>/commits` çıktısında `.author.login` alanı boşsa, o adres hiçbir hesapta doğrulanmamış demektir.

## Karar
Yusuf `zziroo.ai@gmail.com` ile yeni **`zziroo`** hesabını açtı ve adresi doğruladı. 2026 Eylül'den beri aktif olan 15 repo `zziroo`'ya transfer edildi (2026-10-06). Taşınanlar: brain, isik-bekcisi, diskort, ziroo-edge, ziroobank-expenses, web-fps-game, bal-vadisi, document-formatter, song-finder, achievement-guide-formatter, string-tool, steam-avgr-calculator, web-boss-teaser, voice-detector, trencheck. 2025 ve öncesindeki repolar (zi-note, roo-bot, okul ve hobi repoları) `yusufholat`'ta kaldı.

## Neden
Yusuf "Ziroo" işleri için ayrı bir kimlik istedi. Adres doğrulanınca eski commit'ler de geriye dönük olarak `zziroo`'ya bağlandı.

## Reddedilen alternatifler
- `zziroo.ai@gmail.com` adresini `yusufholat`'a ikinci e-posta olarak eklemek: En kolay yol buydu, ama ayrı kimlik isteğini karşılamıyordu.
- `yusufholat` kullanıcı adını değiştirmek: Eski repolar ve eski profil de yeni kimliğe geçerdi.

## Sonuçlar / riskler
- Transferden sonra `yusufholat` taşınan repolarda collaborator olarak kaldı: push yetkisi var, admin yetkisi yok.
- Windows'ta `gh` iki hesapla giriş yapmış durumda: aktif hesap `zziroo`, ikinci hesap `yusufholat`. `yusufholat`'ta kalan özel repolara (roo-bot, veriyapilariodev1) push için `gh auth switch -u yusufholat` gerekir.
- Windows'ta vault ve `zProjects` altındaki 11 reponun remote'u `zziroo/...` yapıldı ve `ls-remote` ile test edildi (2026-10-06).
- Eski `github.com/yusufholat/<repo>` adresleri yönlendiriliyor. **`yusufholat` altında bu isimlerde yeni repo açma**, yoksa yönlendirme kırılır.
- Diskort masaüstü uygulaması GitHub Releases'tan güncelleniyor. Yayımlanmış sürümler eski adrese gidiyor ve yönlendirmeye dayanıyor. Bir sonraki sürümde yayın ayarındaki owner `zziroo` yapılmalı (Diskort oturumunda). **Doğrulanmadı:** Yönlendirme üzerinden güncellemenin çalıştığı denenmedi.
- Açık: Mac'teki remote'lar ([[mac-gecisi-kontrol-listesi]]) ve VPS'teki git remote'ları. VPS'te GitHub'dan çeken bir klon olup olmadığı kontrol edilmedi.
- Grafik: 834 commit'in hepsi `zziroo`'ya bağlandı ve 26 Eylül–6 Ekim arasındaki her güne dağılıyor. Taşıma günü grafikte yalnızca birkaç gün görünüyordu. **Doğrulanmadı:** Yeniden hesaplamanın tamamlandığı (24 saati bulabilir) kontrol edilmedi.
- Mac (2026-10-06): `gh` yalnızca `zziroo` ile girişli. Yusuf eski repolara erişim istemediği için `yusufholat` oturumu kapatıldı (`gh auth logout -u yusufholat`). Keychain'de GitHub kimliği yok. Eski repolara gerekirse yeniden `gh auth login` ile girilir.
- Ortam tuzağı: Terminal panelinde yapılan `gh auth login` Claude'un araçlarına yansımadı ([[ortam-tuzaklari-windows]]).

## İlgili
- [[2026-10-05-windowstan-maca-gecis]], [[mac-gecisi-kontrol-listesi]], [[git-push-autonomy]], [[_index]]
