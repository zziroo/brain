---
type: project
project: kapis
date: 2026-10-03
status: active
tags: [kapis, overview, oyun, three-js]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa; kill cam); repo docs/ dosyaları
---

# KAPIŞ: tarayıcıda Overwatch tarzı hero-shooter (arkadaş grubu için)

> Bu sayfa projenin durum kaynağıdır. Not canlı gerçek değildir: sunucu, repo ve test durumunu işlem yapmadan önce canlıdan doğrula.

## Nedir
Yusuf'un arkadaş grubu için tarayıcıda oynanan hero-shooter. Repo `C:\Users\yusuf\ZZ\zProjects\web-fps-game` (git, `main`). Commit'ler: `1ed0709` temel, `91e58ed` çekirdek, `2c95e3f` dalga 3, `4841e53` düzeltmeler.

## Teknoloji
- İstemci: three.js + TypeScript + Vite. Sunucu: Node `ws`, otoriteli. Tek portta statik dosya + WebSocket.
- Paylaşılan deterministik simülasyon (60 Hz): istemci tahmini + uzlaştırma, lag telafisi. Ayrıntı: [[2026-10-03-paylasilan-sim-sunucu-otoritesi-hero-dilimi]], [[2026-10-03-simulasyon-ve-guvenlik-kararlari]].
- Tüm model, efekt ve ses prosedürel; dış dosya yok.
- 6 kahraman (Volt, Hayalet, Kaya, Şahin, Nabız, Gölge; her birinde silah + Shift + E + Q). Modlar: Herkes Tek (20 kill), Takım (30).
- 12 kişilik odalar (4 harfli kod, `/?room=KOD`). Botlar: navmesh + A*, kolay/orta/zor, 0,02 ms/bot/tick. Arayüz tam Türkçe.
- Sözleşme dokümanları repoda: `docs/DESIGN.md` (ürün + ajan kuralları), `docs/ARCHITECTURE.md`, `docs/CLIENT.md` (istemci dikişleri), `docs/POLISH.md` (cila listesi).
- Dev sayfaları: `/gallery.html` (kahraman/efekt galerisi), `/audio-demo.html`, `/ui/demo.html`. Debug: `?debug=1&autojoin=new&name=X&hero=volt&bots=6`, `window.__kapis`.

## Güncel durum (2026-10-03; canlıdan doğrula)
**Yayında:** https://kapis.ziroo.net (VPS, konteyner `kapis` 127.0.0.1:8085, ziroo-edge Caddy `hosts/kapis.caddy`; [[2026-10-03-yayin-paylasilan-vps-kapis-ziroo-net]]). Repo GitHub'da özel: `yusufholat/web-fps-game`; main'e gelen her commit push'lanır. Son yayın `a6eaba2`, 521 test yeşil. Deploy: repo kökünde `bash deploy/deploy.sh` (HEAD'i gönderir).
- **Kill cam**: ölümden önceki son 3,4 sn öldürenin gözünden oynar, Space ile geçilir, ayardan kapatılır; yalnızca istemci tarafı. Respawn 3 → 4 sn ([[2026-10-03-kill-cam-istemci-tarafi-tekrar]]).
- **Denge paneli** (Esc → Denge): sunucu geneli, PIN korumalı, 252 ayar, kalıcı ([[2026-10-03-denge-paneli-sunucu-geneli-pin]]). PIN sunucuda `/opt/kapis/.env` (600); veri `/opt/kapis/data`.
- Arkadaşlarla ilk deneme yapıldı: Chrome'da sorunsuz; Opera'da WASD takılıyor (çözülmedi, `docs/POLISH.md`).

Doğrulanmayanlar:
- Ses motoru Yusuf dışında kimse tarafından değerlendirilmedi (geri bildirim gelmedi).
- Gerçek iGPU fps'i ölçülmedi.
- Denge paneli gerçek oyuncularla canlıda denenmedi (yalnız iki sekmeyle yerelde doğrulandı).
- Opera klavye sorununun nedeni bilinmiyor.
- Kill cam canlıda ve gerçek oyuncuyla denenmedi (yalnız yerelde botlarla); 4 sn respawn'ın tempo etkisi görülmedi.

### Sıradaki işler
1. Arkadaşlardan his/denge/ses geri bildirimi → `docs/POLISH.md` cila turu (dipten ateşte beyaz top, patlama/duman görünümü, Şahin barrage kendine hasar, dönen ölüm kamerasında kendi gövdesi, kill cam eksikleri: kahramana özel silah tepkisi, tekrara karışan canlı roket sesi/hasar sayıları).
2. Opera klavye sorununu incele ya da giriş ekranına tarayıcı uyarısı koy.
3. İleride oyun modları eklenirse mod bazlı denge (ön ayar → mod eşlemesi).

## Önemli kararlar
- [[2026-10-03-paylasilan-sim-sunucu-otoritesi-hero-dilimi]]
- [[2026-10-03-ajan-dalgalari-ve-inceleme-kapisi]]
- [[2026-10-03-yayin-paylasilan-vps-kapis-ziroo-net]]
- [[2026-10-03-simulasyon-ve-guvenlik-kararlari]]
- [[2026-10-03-denge-paneli-sunucu-geneli-pin]]
- [[2026-10-03-kill-cam-istemci-tarafi-tekrar]]

## Dersler
[[2026-10-03-kapis-dev-ortami-tuzaklari]] · [[2026-10-03-kullanim-limiti-ve-ajan-dalgasi-boyutu]] · [[2026-10-03-inceleme-ve-test-dersleri]]

## Oturumlar
[[2026-10-03-kapis-ilk-insa]] · [[2026-10-03-kapis-yayin-ve-denge-paneli]] · [[2026-10-03-kapis-kill-cam]]

## İlgili
Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]]. Aynı VPS ve Caddy: [[diskort/_overview|Diskort]].
