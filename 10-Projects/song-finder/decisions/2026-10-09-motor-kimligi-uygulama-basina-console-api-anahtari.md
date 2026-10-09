---
type: decision
project: song-finder
date: 2026-10-09
status: active
tags: [song-finder, rehber-okuyucu, karar, yayin, sirlar, api-anahtari]
source: oturum ZZ kökü 2026-10-09 (API anahtarına geçiş)
---

# Song Finder ve Rehber Okuyucu motor kimliği olarak abonelik belirteci yerine uygulama başına Console API anahtarı kullanır

## Bağlam
İki araç da sunucu içinde başsız Claude Code CLI çalıştırıyor ve kimlik olarak Yusuf'un Max aboneliğinin `claude setup-token` belirtecini kullanıyordu (ortak dosya `/etc/claude-token.env`, Rehber'de `/etc/rehber.env` içindeki kopya). Yusuf Claude Console'da (platform.claude.com, "Ziroo's Individual Org", Default workspace) 200 USD kredi aldı ve araçların bunu kullanmasını istedi.

## Karar
1. Her uygulamanın **kendi** API anahtarı var: `song-finder-prod` (`/etc/song-finder.env`) ve `rehber-prod` (`/etc/rehber.env`), `ANTHROPIC_API_KEY=` satırı olarak. Anahtarlar süresiz, Default workspace kapsamında.
2. Kod kuralı (iki projede aynı): CLI'ye **tek kimlik** gider. `ANTHROPIC_API_KEY` doluysa o geçer ve `CLAUDE_CODE_OAUTH_TOKEN` düşer; boşsa ya da yoksa abonelik belirteci eskisi gibi geçer. `ANTHROPIC_AUTH_TOKEN` hiç geçmez. Yerler: song-finder `app/lib/claude.js` `childEnv`, rehber `src/engine.js` `childEnv`; commit'ler song-finder `532bbf9`, rehber `c695e5a`.
3. song-finder `deploy.sh` iki kimlikten birini kabul eder ve hangisini bulduğunu yazar ("kimlik: ANTHROPIC_API_KEY (Console kredisi)").
4. Yayın 2026-10-09: ikisi de API anahtarıyla çalışıyor (Yusuf doğruladı).

## Neden
- Uygulama başına anahtar: Console'da harcama anahtar adıyla ayrışır, biri sızarsa yalnız o iptal edilir; aynı krediden çekildiği için ek maliyet yok.
- Geri dönüş yolu açık: anahtar satırı silinirse kod kendiliğinden abonelik belirtecine döner.
- Eski kod API anahtarını bilerek siliyordu ("motor abonelikle çalışmalı"); kredi varken bu kural anlamsızlaştı.

## Reddedilen alternatifler
- Tek ortak anahtar / tek workspace'te tek anahtar: maliyet görünürlüğü ve sızıntı sınırı kaybolur.
- Uygulama başına ayrı workspace: başlangıç için gereksiz; harcama anahtar bazında zaten görünüyor. İleride uygulama başına harcama limiti istenirse açılır.
- Konteyner içini elle yamamak (deploy'suz): salt okunur dosya sistemi, ilk yeniden başlatmada kaybolur.

## Sonuçlar / riskler
- Kredi kullanımla erir (song-finder arama başına 45-60 bin token + web araması). Console'da aylık harcama limiti koyulmalı; auto-reload kapalı kalmalı.
- Anahtar süresi: ilk denemede 30 gün seçilmişti, rehber-prod bu yüzden yeniden üretildi. Eski rehber-prod anahtarı Console'da silinmeli.
- Temizlik (2026-10-09 itibarıyla bekliyor, Claude'un sunucuya yazma izni yok): `/etc/rehber.env` içindeki `CLAUDE_CODE_OAUTH_TOKEN` satırı ve `/etc/claude-token.env` içeriği kaldırılacak, iki konteyner yeniden başlatılacak; Console > Authorization tokens'taki yalnız `user:inference` kapsamlı belirteç (setup-token) iptal edilecek. Kod belirteci zaten geçirmediği için acil değil.
- [[2026-10-04-yayinda-token-ve-parola-rehber-okuyucu-ile-ortak]] kararının token kısmı geçersiz; parola kısmı sürüyor.

## İlgili
- [[10-Projects/song-finder/_overview|Song Finder]], [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
- [[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]]
