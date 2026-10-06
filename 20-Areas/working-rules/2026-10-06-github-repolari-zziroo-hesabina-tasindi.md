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
- Windows (2026-10-07): `yusufholat` oturumu da kapatıldı (`gh auth logout -u yusufholat`, Kimlik Yöneticisi'ndeki `gh:github.com:yusufholat` kaydı silindi). Gerçek ve paket içi `hosts.yml` eşitlendi, `gh` yalnızca `zziroo` ile girişli. Eski repolara gerekirse yeniden `gh auth login` ile girilir.
- Windows'ta vault ve `zProjects` altındaki 11 reponun remote'u `zziroo/...` yapıldı ve `ls-remote` ile test edildi (2026-10-06).
- Eski `github.com/yusufholat/<repo>` adresleri yönlendiriliyor. **`yusufholat` altında bu isimlerde yeni repo açma**, yoksa yönlendirme kırılır.
- Diskort masaüstü uygulaması GitHub Releases'tan güncelleniyor. Yayımlanmış sürümler eski adrese gidiyor ve yönlendirmeye dayanıyor. Bir sonraki sürümde yayın ayarındaki owner `zziroo` yapılmalı (Diskort oturumunda). **Doğrulanmadı:** Yönlendirme üzerinden güncellemenin çalıştığı denenmedi.
- Açık: Mac'teki remote'lar ([[mac-gecisi-kontrol-listesi]]) ve VPS'teki git remote'ları. VPS'te GitHub'dan çeken bir klon olup olmadığı kontrol edilmedi.
- Grafik: 834 commit'in hepsi `zziroo`'ya bağlandı ve 26 Eylül–6 Ekim arasındaki her güne dağılıyor. Taşıma günü grafikte yalnızca birkaç gün görünüyordu. **Doğrulanmadı:** Yeniden hesaplamanın tamamlandığı (24 saati bulabilir) kontrol edilmedi.
- Mac (2026-10-06): `gh` yalnızca `zziroo` ile girişli. Yusuf eski repolara erişim istemediği için `yusufholat` oturumu kapatıldı (`gh auth logout -u yusufholat`). Keychain'de GitHub kimliği yok. Eski repolara gerekirse yeniden `gh auth login` ile girilir.
- VPS kontrolü (2026-10-06, salt okunur): GitHub klonu yalnızca `/opt/diskort` (remote `zziroo/diskort` yapıldı, 2026-10-06). `.env`'de `GITHUB_REPO` yok, sunucu koddaki varsayılanı kullanıyor (commit 94aa7a5 ile `zziroo`, bir sonraki API kurulumunda devreye girer). `/download/*` yönlendirmesi çalışıyor. **Kırık:** `GITHUB_DISPATCH_TOKEN` `yusufholat`'ın ince taneli anahtarı; `zziroo/diskort`'ta iş başlatma 403 veriyor ("Resource not accessible by personal access token"). Yani panelden iOS derlemesi başlatma çalışmıyor; `zziroo` ile yeni anahtar gerekli (docs/ios.md).
- Düzeltildi (2026-10-07): `zziroo` ile yeni ince taneli anahtar `diskort-ios-dispatch` (yalnız `zziroo/diskort`, Actions: Read and write, 1 yıl, süresi ~2027-10-07) sunucu `.env`'ine yazıldı, api yeniden başlatıldı; deneme 422 "No ref found" verdi (izin var). Eski `yusufholat` anahtarını GitHub'da iptal etmek Yusuf'a kaldı. Yenileme: Diskort `docs/ios.md` §3.
- SignPath: hiç başvurulmadı ([[kod-imzalama-simdilik-yok]]), taşımadan etkilenen bir kayıt yok.
- Ortam tuzağı: Terminal panelinde yapılan `gh auth login` Claude'un araçlarına yansımadı ([[ortam-tuzaklari-windows]]).

## İlgili
- [[2026-10-05-windowstan-maca-gecis]], [[mac-gecisi-kontrol-listesi]], [[git-push-autonomy]], [[_index]]
