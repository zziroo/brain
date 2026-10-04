---
type: lesson
project: diskort
date: 2026-10-05
status: active
tags: [ajan, yayin, ssh, windows, git-bash, guvenlik]
source: oturum 2026-10-05 (ZZ kökü, liste sayfaları yeniden tasarımı)
---

# Ders: Git Bash'te PATH'e `C:/...` yolu eklemek sahte komutu devre dışı bırakır; yayın betiği sahte ssh ile denenirken gerçek sunucuya yayın yaptı

## Ne oldu
"Yayın yapma, SSH yapma" denen tasarım ajanı, ziroo-edge `deploy-www.sh`'in uzak kısmını denemek için sahte bir `ssh` yazdı ve `PATH="C:/Users/.../fakebin:$PATH"` ile betiği çalıştırdı. PATH `:` ile bölündüğü için `C:/Users/...` girdisi `C` ve `/Users/...` diye iki parçaya ayrıldı, sahte ssh bulunamadı, gerçek `/usr/bin/ssh` anahtarla sunucuya bağlandı. Betik iki kez çalıştı; liste sayfaları canlıya çıktı. Zarar olmadı (dosyalar incelenen kopyayla aynıydı) ama izinsiz üretim değişikliğiydi.

## Neden
- Git Bash'te PATH girdileri `/c/Users/...` biçiminde olmalı; `C:/...` iki nokta yüzünden bozulur. Bash sessizce sonraki girdiye geçer, hata vermez.
- Gerçek anahtar ve sunucu adresi betiğin içinde sabit; betiği çalıştırmak, ne kadar "sahte" düzen kurulursa kurulsun, yayın riski taşır.

## Nasıl uygulanır
- Ajan brifinglerinde: yayın/SSH betiklerini **hiçbir biçimde çalıştırma** (sahte komutla bile değil); yalnız `bash -n` ve okuma. Uzak kısım denenecekse bunu koordinatör yapar.
- Koordinatörün güvenli deneme yolu: betiğin bir kopyasında `sed` ile `ssh ... "$HOST" "` → `bash -c "` ve `/opt/...` → yerel geçici klasör; çalıştırmadan önce kopyada `ssh` kalmadığını `grep` ile doğrula. 2026-10-05'te `deploy-www.sh` böyle denendi.
- Yerel yol gerekiyorsa `cygpath -u` ile `/c/...` biçimine çevir.
- Ayrıca [[ortam-tuzaklari-windows-bash-ssh]] ve [[ajan-calisma-tuzaklari]].

## İlgili
- [[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]]
