---
type: project
project: diskort
date: 2026-10-12
status: active
tags: [diskort, overview]
source: handoff notundan (artık kaldırıldı), diskurt-project ve diskort-* hafıza dosyalarından, 2026-10-01/02 oturumlarından
---

# Diskort: Discord kalitesinde sesli sohbet + ekran paylaşımı (Windows-first, kendi sunucusu)

> **Bu sayfa projenin tek durum kaynağıdır.** Ayrı bir devir (handoff) notu yok. Yeni sohbette ilk iş bunu oku. Anlamlı bir oturumun sonunda "Güncel durum" ve "Sıradaki işler" bölümlerini güncelle. Not canlı gerçek değildir: sunucu, sürüm ve repo durumunu işlem yapmadan önce canlıdan doğrula.

## Nedir
10-20 kişilik kapalı bir arkadaş grubu için masaüstü (Electron) + mobil (Expo/React Native) uygulama; zamanla tam bir Discord benzeri platform. Yeniden adlandırma: Diskurt -> Diskort (2026-09-26). Klasör `C:\Users\yusuf\ZZ\zProjects\diskort`, repo `zziroo/diskort` (public), güncellemeler GitHub Releases + kendi sunucumuz üzerinden.

## Hedefler
Ses + ekran paylaşımı kalitesi; metin kanalları, tepkiler, dosyalar, roller, DM'ler, profil/kozmetikler, Etkinlik (oynanan oyun). Yusuf canlıda test eder; client release'i onunla çıkar. Ayrıntı: [[proje-hedefleri-ve-platformlar]].

## Teknoloji
- pnpm monorepo: `apps/server` (Fastify, SQLite `node:sqlite`, WebSocket gateway), `packages/shared`, `packages/client-core`, `apps/desktop` (Electron), `apps/mobile` (Expo SDK 57, RN 0.86, @livekit/react-native, react-native-skia, yerel Kotlin modülü `voice-service`), `apps/web` (indirme sayfası), `infra/` (docker compose: LiveKit, api, Caddy yalnız `caddy` profiliyle).
- Dağıtım: VPS ([[sunucu-vps]]), Android APK + OTA ([[mobil-ota-guncelleme]]), iOS Ad Hoc ([[ios-ad-hoc-dagitim]]).
- Gürültü bastırma: DPDFNet (DeepFilterNet 3, 0.9.3'te kaldırıldı).
- Kod haritası: Etkinlik [[etkinlik-kod-haritasi]].

## Güncel durum (2026-10-12; canlıdan doğrula)
- **Main, yayınlanmamış (2026-10-12):** rol etiketleme @rol ([[rol-etiketleme]]), rol verme hedefin seviyesine bakmaz ([[rol-verme-hedefin-seviyesine-bakmaz]]), DPDFNet eşikleri gevşetildi + Android ayrı iş parçacığı 30 ms tampon, **yeni APK gerekir** ([[dpdfnet-esikler-gevsetildi-android-ayri-is-parcacigi]]), masaüstü yazılımsal AGC + konuşma seviyesi telemetrisi ([[masaustu-yazilimsal-agc]]), Android ses ekranı Animated OOM düzeltmesi, çıkış aygıtı sink-id düzeltmesi. Sunucu deploy edilmedi (şema değişmedi), sürüm yok. Oturum: [[sessions/2026-10-12-rol-etiketi-dpdfnet-agc-oom]].
- **0.10.3 (2026-10-10):** macOS Developer ID imzalı + notarize, otomatik güncelleme ([[macos-developer-id-imza-ve-otomatik-guncelleme]]; ilk deneme 0.10.2 [[electron-builder-csc-link-anahtar-zinciri-parolasi]] ile düştü, taslak silindi), macOS menü çubuğu şablon ikonu, [[telefondan-bagli-gostergesi]], boştan çevrimiçiye 1 sn'de dönüş. Sunucuda `e63209c` (şema 26, değişiklik yok); web sayfası `6a16ed2`. `latest*.yml` 0.10.3. Oturum: [[sessions/2026-10-10-macos-imza-telefon-gostergesi-0-10-3]].
- **0.10.1 (2026-10-08 22:50):** mobilde LiveKit tek bağlantı kipi kapatıldı ([[mobil-livekit-tek-baglanti-kipi-kapatildi]]): kanala üçüncü kişi gelince Android telefonlarda ses kopuyordu (negotiation timed out). JS-only, OTA; APK/IPA yeniden kullanıldı; `latest.yml` ve expo/android 0.10.1 veriyor. 2026-10-10 taraması: "negotiation timed out" yalnız 0.9.6/0.10.0'da, 0.10.1'de yok (az veri, tutuyor gibi).
- **0.10.0 (2026-10-08):** arkadaşlık sistemi ([[arkadaslik-sistemi]], şema 26), donanım kodlayıcıda ekran paylaşımı simulcast (telefon/zayıf hat alt katman alır), 720p30 ön ayarı, macOS güncelleyici RangeError ve "killed" gürültüsü düzeltmeleri ([[electron-net-fetch-rangeerror]]). Sunucu deploy edildi (56d1c8a + sürüm commit'i, şema 26). v0.10.0 2026-10-08 21:15'te yayınlandı (macOS/iOS işleri runner kapasitesi yüzünden 5 kez iptal oldu, 6. denemede geçti: [[github-macos-runner-kapasitesi]]); `latest.yml`/`latest-mac.yml`/ota-ios 0.10.0 veriyor; geri bildirim #32/#33 tamamlandı. Yönlendirme artık `zziroo/diskort` üzerinden çalışıyor (denendi). Oturum: [[sessions/2026-10-08-arkadaslik-sistemi-ve-0-10-0]].
- **İstemci:** masaüstü **0.9.6** yayında (2026-10-02 gece): DM'de sesli arama + ekran paylaşımı + engelleme ([[dm-sesli-arama-ve-calma]], [[engelleme-dm-ve-arama]], [[dm-aramalari-yonetimde-ozel]]); Yusuf 2026-10-08: DM araması sorunsuz, telefonda yayın FPS'i düşüktü (0.10.0 simulcast bununla ilgili). 0.9.5 (sahnede çoklu yayın [[sahne-izgarada-coklu-yayin]], [[model-calisirken-agc-kapali-ve-sinirlayici]], [[konusma-halkasi-duyulan-sesten]]): Yusuf "sorunsuz kullanıyoruz" dedi. 1.0 ertelendi ([[surum-1-0-ertelendi]]). Mobil yalnız OTA; Android APK 0.9.2 (yamalı Skia, eski APK'lar zorunlu güncelleme ekranı alır), iOS IPA 0.8.5 yeniden kullanılıyor, 0.9.2'den beri iPhone'lara OTA ile ulaşıyor. 0.9.4 = bağlantı teşhisi; 0.9.3 = DPDFNet fallback düzeltmesi, kozmetikler yalnız hover/açık profilde.
- **Sunucu:** 2026-10-01'de LightNode İstanbul'a taşındı. Eski sağlayıcı gelen UDP'yi ~1400 paket/sn üstünde kesiyordu ([[sunucu-lightnode-istanbula-tasindi]], [[saglayici-udp-paket-siniri]]). DB şeması **26** (friend_requests, friendships). Sunucuda `d82ad87` (0.10.0) çalışıyor (2026-10-08 deploy; bütünlük ok). Altı kozmetik paketi `/data/cosmetic-packs` altında, tüm platformlar.
- **Ses kesintileri:** nedeni bulundu ve sunucu taşındı. 2026-10-01 akşam aramasında `outages.jsonl`'de kesinti yok, dış sondalar temiz; donmalar yayıncı kodlayıcısından (bit hızı sıçraması) ve tek kullanıcının hattından. Yoğun yayınla hâlâ tam kanıtlanmadı.
- **Yeni sunucuda eksikler:** otomatik güvenlik güncellemeleri (unattended-upgrades imajda maskeli; 2026-10-05'te 143 güvenlik güncellemesi bekliyordu), SSH sertleştirmesi yerinde (2026-10-04 `sshd -T`: parola kapalı, root yalnız anahtar). Trafik planı 1000 GB/ay, kullanım ~800 GB civarı. Eski sunucu durdurulmuş durumda, Yusuf silecek.
- **Giriş kapısı:** 2026-10-03'ten beri Caddy ayrı `ziroo-edge` projesinde; Diskort siteleri `infra/caddy/diskort.caddy`, diğer projeler `/opt/ziroo-sites/*.caddy` ve `hosts/*.caddy`, değişiklik `bash /opt/ziroo-edge/reload.sh` ([[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]).
- **Alt alan adları:** 2026-10-03'te Diskort dışı projeler `tools.ziroo.net` / `games.ziroo.net`'e taşındı, DNS joker `*.ziroo.net` ([[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]). Açık: eski kopyaların temizliği (runbook Faz D; 2026-10-05'te `/opt/diskort/apps/web/tools` 196 MB, `games`, `games.html` duruyordu).
- **ziroo.net ve listeler (2026-10-05):** `ziroo.net` ana sayfası (kapılar: Oyunlar, Araçlar, Diskort; `www` → `ziroo.net`) yayında; araç ve oyun listeleri ziroo-edge `www/`'de ortak neon tasarımla, yayın `bash deploy-www.sh [tools|games|home|all]` ([[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]]). Çıplak alan adı için Cloudflare'da ayrı A kaydı var (joker kapsamıyor).
- **Caddy reload kopması (2026-10-04 düzeltildi):** `ziroo-edge` reload açık WebSocket'leri kesiyordu, sesli kanaldaki herkes aynı anda kopuyordu; gateway ve LiveKit bloklarına `stream_close_delay 5m` eklendi, kanal doluyken henüz denenmedi ([[caddy-reload-websocketleri-keser]]).
- **SignPath:** başvurulmayacak ([[kod-imzalama-ertelendi]]).
- **Not (izin sistemi):** otomatik mod sınıflandırıcısı, o oturumda Yusuf sohbette söylemedikçe ssh deploy ve release tag/push'u engelleyebilir. Sor, sonra push / ssh / tag / `gh release edit` komutlarını ayrı çağrılar olarak çalıştır.

### Sıradaki işler
0000. **2026-10-12 işlerini canlıya al:** sunucu deploy (rol etiketi, rol kuralı, telemetri şeması), ardından sürüm (masaüstü AGC + DPDFNet + rol etiketi; mobil OTA + **yeni APK** Kotlin için). Sonra: AGC gerçek mikrofonla dinlenir, admin "Konuşma seviyesi" ile telefon/PC farkı ölçülür; telefonda DPDFNet 30 ms tampon + "geç" sayısı; Android OOM tekrarı (bellek telemetrisi ertelendi).
000. **0.10.3 doğrulama:** Yusuf Mac'te 0.10.3'ü bir kez elle kurar (izinler yeniden istenir); sonraki sürümde macOS otomatik güncellemeyi uçtan uca gör; menü çubuğu ikonu, telefon rozeti boyutu (üye listesi, 80 px profil), boşta düzeltmesi, mobil OTA 0.10.3. `.p12` yedek klasörüne taşınıp Documents'tan silinecek. enginbabapro'nun 0.10.1 yığınsız Android çökmesi (PSS ~700 MB) tekrar ederse incele.
00. **0.10.0 canlı doğrulama:** arkadaşlık akışı iki cihazla (istek, kabul, bildirim, sunucusuz DM), donanım simulcast'in GPU'da kaldığı (bağlantı paneli kodlayıcı satırında OpenH264 geçmemeli), telefonda izleme FPS'i; `mic.fallback`/kozmetik kayıtlarıyla birlikte gelen kutusunu izle.
0. 0.9.6 DM araması Yusuf'a göre sorunsuz (2026-10-08). Kalan: 1.0 kararı ([[surum-1-0-ertelendi]]).
0a. Yayın donmaları: yayıncı bit hızı sıçraması (2,8 → 12,4 Mbps, anahtar kare yok) donmalarla aynı anda; bit hızı tavanına/kodlayıcı ayarlarına bak (2026-10-01 akşam gelen kutusu).
0b. Yayın sesi: Sonar kullananların kendi sesi sistem sesli yayına karışıyor ([[sonar-yayin-sesine-kendi-sesini-katar]]); kullanıcıya geçici çözüm söylendi. Uygulamaya özel yayın sesi ayrı iş, Yusuf isterse ([[uygulamaya-ozel-yayin-sesi-ertelendi]]).
0c. **Zayıf hatlı izleyiciye düşük katman (ertelendi, Yusuf isteyince):** 2026-10-02 akşamı bir DM aramasında yayın 8-16 Mbps'e çıkınca Android izleyicinin indirme hattı doldu (ping 4585 ms'ye, gelen kayıp %21'e çıktı; sunucu ve yayıncı temizdi, yayın durunca 1 sn'de düzeldi). Ekran paylaşımı tek katman gidiyor (`simulcast: false`, masaüstü `voiceClient.ts`; 1080p60 ön ayarı 12 Mbps), sunucu zayıf hatta daha düşük akış veremiyor. Öneri: simulcast yalnız ekran kartı kodlayıcısı varken açılsın (yazılım kodlayıcıda CPU yüzünden kapalı kalsın). Geçici çözüm: telefondan izleyen varken yayıncı 720p ya da 1080p30 seçer. 0a ve 6. maddeyle ilgili.
2. Prob motorunu düzelt: yalnız-UDP kesintileri yakalansın (UDP ve TCP kayıp serileri ayrı sayılsın); boş odadaki 1-2 sn'lik "aday" gürültüsünü azalt.
3. Yeni sunucu: bekleyen güvenlik güncellemelerini (2026-10-05: 143) sakin bir saatte kur, otomatik güvenlik güncellemelerini aç, çıkış trafiğini ölç, 1000 GB planı izle.
4. **Rutin:** yalnız gözcü kaldı, günde bir 00:10 ([[2026-10-10-gozcu-gunluk-gece-incelemesi-kaldirildi]]); çalışma klasörü 2026-10-10'da düzeltildi ([[rutin-calisma-klasoru-silinince-oturum-acmaz]]), ilk gece çalışmasını doğrula. Kod incelemesi için tüm projelere ortak düzenek düşünülüyor. Gelen kutusunu 0.9.x/0.10.0 regresyonları için kontrol et; Yusuf'un gerçek hayat Etkinlik geri bildirimini topla (gerçek oyun, anti-cheat, Battle.net, mobil).
5. DPDFNet fallback düzeltmesini (0.9.3) kullanıcılar oynadıktan sonra telemetri `mic.fallback` ile doğrula; `reportClientError('kozmetik')` kayıtlarını izle.
6. **Telefon ısınması** (VP9 1080p yayın izlerken): APK 0.8.13'te DPDFNet bütçe düzeltmesi + termal otomatik kapatma var. Kalan: Yusuf 5-10 dk yayın izler, ardından `watch` telemetrisi okunur. Gerekirse JS seçenekleri: VP9'u bırak, donanım kodlayıcıda 720p30 düşük katman, tam ekran değilse mobil düşük katmana abone.
7. Yusuf'un cihaz testleri: telefonda yeni kozmetikler (Android APK kurulumu, Android 10+ kart videosu, iOS OTA), mobil Skia setleri, mobil ses ekranı/yayın kutucukları, masaüstü sahne otomatik gizleme/şerit/kendi önizleme duraklatma, rolsüz DM profili.
8. Yusuf'a hatırlat: eski sunucuyu sil (içinde bilinmeyen bir `set-env.sh` var).
9. **GitHub repo taşındı (2026-10-06):** `yusufholat/diskort` → `zziroo/diskort` ([[2026-10-06-github-repolari-zziroo-hesabina-tasindi]]). Kod çevrildi (commit 94aa7a5), VPS remote'u ve iOS dispatch anahtarı 2026-10-07'de `zziroo` ile yenilendi ([[ince-taneli-anahtar-repo-baska-hesaba-tasininca-calismaz]]). Kalan: sunucu `GITHUB_REPO` varsayılanı bir sonraki api kurulumunda devreye girer; Yusuf eski `yusufholat` anahtarını iptal eder. `yusufholat` altında aynı adla repo açılmamalı. Windows `.exe` Mac'ten de GitHub Actions ile çıkar (`release.yml` windows işi).
10. **Sahipsiz dal (2026-10-07):** Windows'ta yalnız yerelde duran 2 commit `origin/mimari-tanitim-videosu` dalına push'landı (`d3ecd70`, 2026-09-30, Remotion ile mimari tanıtım videosu, `tools/architecture-video`). Merge edilmedi, incelenmedi; ne olacağına Yusuf karar verir ([[2026-10-07-windows-makinesi-yalniz-silksong-icin]]).

**Açık öneriler (önce sor):** kanal kategorileri, IPA yalnız kendi sunucumuzdan, release/deploy/geri bildirim için proje skilleri, sunucular arası ses moderasyonu, Spotify tarzı `listening` etkinliği.

## Önemli kararlar
- Hedefler/platformlar: [[proje-hedefleri-ve-platformlar]]
- Basit tut, reddedilenler: [[urun-basit-tutma-reddedilen-fikirler]]
- Etkinlik: [[etkinlik-oyun-aktivitesi]]; DM: [[dm-sunucu-ayrimi]], [[dm-sesli-arama-ve-calma]], [[engelleme-dm-ve-arama]], [[dm-aramalari-yonetimde-ozel]]
- Kayıt: [[kayit-sadece-hesap-davetiyesi]]; ekran paylaşımı: [[ekran-paylasimi-sabit-presetler]]
- Kozmetik: [[kozmetik-sunucudan-paketler]], [[kozmetik-sadece-hover]]
- Arkadaşlık: [[arkadaslik-sistemi]]
- Sunucu: [[sunucu-lightnode-istanbula-tasindi]], [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]], [[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]] (ders: [[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]])
- Yayın sahnesi: [[yayin-arayuzu-discord-tarzi]], [[sahne-izgarada-coklu-yayin]]; yayın sesi: [[uygulamaya-ozel-yayin-sesi-ertelendi]]
- Ses: [[model-calisirken-agc-kapali-ve-sinirlayici]], [[konusma-halkasi-duyulan-sesten]]
- Release: [[surum-cikarma-kurali]], [[surum-1-0-ertelendi]]; imzalama: [[kod-imzalama-ertelendi]] (Windows), [[macos-developer-id-imza-ve-otomatik-guncelleme]]
- Rutin: [[2026-10-10-gozcu-gunluk-gece-incelemesi-kaldirildi]]; presence: [[telefondan-bagli-gostergesi]]
- Mobil: [[android-min-api-26]], [[mobil-ota-guncelleme]], [[ios-ad-hoc-dagitim]]; UI: [[sunucu-rail-rozeti]]

## Runbook'lar
[[sunucu-vps]] · [[deploy]] · [[surum-cikarma]] · [[geri-bildirim-inceleme]] · [[kozmetik-yayinlama]] · [[ios-cihaz-ekleme]] · [[yedekler]] · [[admin-paneli-ve-loglar]] · [[gelen-kutusu-ve-rutinler]] · [[yerel-ui-test-ortami]] · [[telefonla-erisim]]

## Dersler
[[dev-ortami-tuzaklari]] · [[electron-cdp-testi]] · [[yerel-installer-testi-userdata]] · [[rn-android-border-nan]] · [[kozmetik-avif-tam-aralik]] · [[worktree-silme-windows]] · [[claude-altina-yazma-izin-sorar]] · [[secret-isleme-kurali]] · [[caddy-bind-mount-restart]] · [[dpdfnet-fallback-koku-neden]] · [[saglayici-udp-paket-siniri]] · [[sonar-yayin-sesine-kendi-sesini-katar]] · [[yerel-testte-ekran-paylasimi-gercek-pencere]] · [[server-testleri-tam-kosuda-kararsiz]] · [[caddy-redir-path-acik-yonlendirme]] · [[caddy-reload-websocketleri-keser]] · [[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]] · [[turkce-sayfada-css-buyuk-harf-noktali-i]] · [[ince-taneli-anahtar-repo-baska-hesaba-tasininca-calismaz]] · [[github-macos-runner-kapasitesi]] · [[electron-net-fetch-rangeerror]] · [[electron-builder-csc-link-anahtar-zinciri-parolasi]] · [[rutin-calisma-klasoru-silinince-oturum-acmaz]]

## Oturumlar ve ek kararlar/dersler
- [[sessions/_index-dev-era]]: geliştirme dönemi (C:\dev, 2026-09-26..28)
- [[sessions/_index-current-era]]: güncel dönem (ZZ\zProjects\diskort)
- [[2026-10-03-tools-games-alt-alan-adi-gecisi]]: tools/games alt alan adları, joker DNS
- [[2026-10-04-geri-bildirim-kontrolu-ve-caddy-reload]]: hata kontrolü, Caddy reload kopması, panel deploy
- [[2026-10-05-liste-sayfalari-ve-ziroo-net-ana-sayfa]]: listeler neon tasarıma geçti, KAPIŞ eklendi, ziroo.net ana sayfası
- [[2026-10-05-araclarin-arayuzu-neon-temaya-gecti]]: altı aracın kendi arayüzü neon temaya geçti, Mac'ten ilk yayın ([[mac-ten-yayin-copyfile-disable-ve-exe-siz-ceviri-sayfasi]])
- [[2026-10-07-zziroo-tasimasi-tamamlandi-ve-mac-listesi]]: zziroo taşımasının Mac/VPS tarafı, iOS anahtarı yenilendi, Mac listesi işlendi
- [[sessions/2026-10-08-arkadaslik-sistemi-ve-0-10-0]]: arkadaşlık sistemi, donanım simulcast, 720p30, 0.10.0

## Çalışma kuralları (Claude)
[[20-Areas/working-rules/_index|Çalışma kuralları]] (20-Areas): [[git-push-autonomy]], [[diskort-orchestrator-mode]], [[zamanlanmis-gorevler-ve-skiller]]

## Sürüm özeti
0.1.2 metin kanalları (2026-09-26) · 0.1.3 zorunlu otomatik güncelleme · 0.1.4 client-core · 0.2.0 Android v1 · 0.2.x OTA · 0.3.0 tepkiler+ekler · 0.3.1 DeepFilterNet 3 · 0.3.2 profil fotoğrafları · 0.3.3 tema UI · 0.3.4 GPU ekran kodlama · 0.4.0 roller · 0.8.1 iOS Ad Hoc + şema 21 · 0.9.0 Etkinlik · 0.9.2 kozmetik paketleri · 0.9.3 DPDFNet düzeltmesi · 0.9.4 bağlantı teşhisi çalışması · 0.9.5 sahnede çoklu yayın + AGC/sınırlayıcı + yerel konuşma halkası · 0.9.6 DM'de arama + ekran paylaşımı + engelleme (şema 25) · 0.10.0 arkadaşlık + donanım simulcast + 720p30 (şema 26).
