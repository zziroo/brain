---
type: project
project: kapis
date: 2026-10-05
status: active
tags: [kapis, overview, oyun, three-js]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa; kill cam); oturum 2026-10-04/05 (dünya temaları); repo docs/ dosyaları
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
- Sözleşme dokümanları repoda: `docs/DESIGN.md` (ürün + ajan kuralları), `docs/ARCHITECTURE.md`, `docs/CLIENT.md` (istemci dikişleri), `docs/THEMES.md` (tema yazarı sözleşmesi + bütçe), `docs/POLISH.md` (cila listesi).
- Dev sayfaları: `/gallery.html` (kahraman/efekt galerisi; `?theme=<id>` tema tezgâhı), `/audio-demo.html`, `/ui/demo.html`. Debug: `?debug=1&autojoin=new&name=X&hero=volt&bots=6&theme=<id|random>`, `window.__kapis`. Paralel ajanlarda vite: `KAPIS_NO_HMR=1`.

## Güncel durum (2026-10-05; canlıdan doğrula)
**Yayında:** https://kapis.ziroo.net (VPS, konteyner `kapis` 127.0.0.1:8085, ziroo-edge Caddy `hosts/kapis.caddy`; [[2026-10-03-yayin-paylasilan-vps-kapis-ziroo-net]]). Repo GitHub'da özel: `zziroo/web-fps-game`; main'e gelen her commit push'lanır. Son yayın `5a5ca20` (2026-10-05), 623 test yeşil. Deploy: repo kökünde `bash deploy/deploy.sh` (HEAD'i gönderir; önceki imaj `kapis:prev`). 2026-10-05'ten beri https://games.ziroo.net/ listesinde ilk kart ([[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]]).
- **Dünya temaları**: 7 tema (neon, Ortaçağ Şatosu, Cadılar Bayramı, Sakura Tapınağı, Lav Madeni, Kutup İstasyonu, Çöl Harabeleri), yalnız görünüm + müzik/ortam sesi, aynı arena. Her maç rastgele, oda sahibi seçebilir; tur başı tanıtım kartı + kamera turu, sonuç ekranında "Sıradaki arena" çarkı, giriş ekranında canlı vitrin ([[2026-10-05-dunya-temalari-yalniz-gorunum-ayni-harita]], [[2026-10-05-tema-altyapisi-themedef-ve-arka-plan-insa]]).
- **Kill cam**: ölümden önceki son 3,4 sn öldürenin gözünden oynar, Space ile geçilir, ayardan kapatılır; yalnızca istemci tarafı. Respawn 3 → 4 sn ([[2026-10-03-kill-cam-istemci-tarafi-tekrar]]).
- **Denge paneli** (Esc → Denge): sunucu geneli, PIN korumalı, 252 ayar, kalıcı ([[2026-10-03-denge-paneli-sunucu-geneli-pin]]). PIN sunucuda `/opt/kapis/.env` (600); veri `/opt/kapis/data`.
- Arkadaşlarla ilk deneme yapıldı: Chrome'da sorunsuz; Opera'da WASD takılıyor (çözülmedi, `docs/POLISH.md`).

Doğrulanmayanlar:
- Ses motoru Yusuf dışında kimse tarafından değerlendirilmedi (geri bildirim gelmedi).
- Gerçek iGPU fps'i ölçülmedi.
- Denge paneli gerçek oyuncularla canlıda denenmedi (yalnız iki sekmeyle yerelde doğrulandı).
- Opera klavye sorununun nedeni bilinmiyor.
- Kill cam canlıda ve gerçek oyuncuyla denenmedi (yalnız yerelde botlarla); 4 sn respawn'ın tempo etkisi görülmedi.
- Tema müzikleri ve ortam sesleri dinlenmedi (yalnız ölçümle neon'a göre ayarlandı); temalar zayıf iGPU'da, Firefox/Safari'de ve gerçek oyuncularla denenmedi.

### Sıradaki işler
1. **Yeni harita düzenleri** (Yusuf: temalardan sonra; temalar haritadan bağımsız, bütçeler ~100 m'ye kadar harita ve 400 m uzak düzlem varsayıyor). Fikirler: az kişi için küçük/sıkışık harita, uzun görüş hatlı keskin nişancı haritası.
2. Arkadaşlarla deneme → his/denge/ses/tema geri bildirimi → `docs/POLISH.md` cila turu (dipten ateşte beyaz top, patlama/duman görünümü, Şahin barrage kendine hasar, dönen ölüm kamerasında kendi gövdesi, kill cam eksikleri: kahramana özel silah tepkisi, tekrara karışan canlı roket sesi/hasar sayıları).
3. Tema küçükleri: vitrinde önceden kurulmamış temaya tıklayınca kısa karanlık geçiş (görünümden hazır sinyali); tezgâhta `perch` yer imi mankenin içinde; `checkTheme`'e 80k üçgen uyarısı.
4. Opera klavye sorununu incele ya da giriş ekranına tarayıcı uyarısı koy.
5. İleride oyun modları eklenirse mod bazlı denge (ön ayar → mod eşlemesi).

## Önemli kararlar
- [[2026-10-03-paylasilan-sim-sunucu-otoritesi-hero-dilimi]]
- [[2026-10-03-ajan-dalgalari-ve-inceleme-kapisi]]
- [[2026-10-03-yayin-paylasilan-vps-kapis-ziroo-net]]
- [[2026-10-03-simulasyon-ve-guvenlik-kararlari]]
- [[2026-10-03-denge-paneli-sunucu-geneli-pin]]
- [[2026-10-03-kill-cam-istemci-tarafi-tekrar]]
- [[2026-10-05-dunya-temalari-yalniz-gorunum-ayni-harita]]
- [[2026-10-05-tema-altyapisi-themedef-ve-arka-plan-insa]]

## Dersler
[[2026-10-03-kapis-dev-ortami-tuzaklari]] · [[2026-10-03-kullanim-limiti-ve-ajan-dalgasi-boyutu]] · [[2026-10-03-inceleme-ve-test-dersleri]] · [[2026-10-05-tema-gorsel-tuzaklari]]

## Oturumlar
[[2026-10-03-kapis-ilk-insa]] · [[2026-10-03-kapis-yayin-ve-denge-paneli]] · [[2026-10-03-kapis-kill-cam]] · [[2026-10-05-kapis-dunya-temalari]]

## İlgili
Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]]. Aynı VPS ve Caddy: [[diskort/_overview|Diskort]].
