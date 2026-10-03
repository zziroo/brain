---
type: project
project: diskort
date: 2026-10-02
status: active
tags: [diskort, overview]
source: handoff notundan (artık kaldırıldı), diskurt-project ve diskort-* hafıza dosyalarından, 2026-10-01/02 oturumlarından
---

# Diskort: Discord kalitesinde sesli sohbet + ekran paylaşımı (Windows-first, kendi sunucusu)

> **Bu sayfa projenin tek durum kaynağıdır.** Ayrı bir devir (handoff) notu yok. Yeni sohbette ilk iş bunu oku. Anlamlı bir oturumun sonunda "Güncel durum" ve "Sıradaki işler" bölümlerini güncelle. Not canlı gerçek değildir: sunucu, sürüm ve repo durumunu işlem yapmadan önce canlıdan doğrula.

## Nedir
10-20 kişilik kapalı bir arkadaş grubu için masaüstü (Electron) + mobil (Expo/React Native) uygulama; zamanla tam bir Discord benzeri platform. Yeniden adlandırma: Diskurt -> Diskort (2026-09-26). Klasör `C:\Users\yusuf\ZZ\zProjects\diskort`, repo `yusufholat/diskort` (public), güncellemeler GitHub Releases + kendi sunucumuz üzerinden.

## Hedefler
Ses + ekran paylaşımı kalitesi; metin kanalları, tepkiler, dosyalar, roller, DM'ler, profil/kozmetikler, Etkinlik (oynanan oyun). Yusuf canlıda test eder; client release'i onunla çıkar. Ayrıntı: [[proje-hedefleri-ve-platformlar]].

## Teknoloji
- pnpm monorepo: `apps/server` (Fastify, SQLite `node:sqlite`, WebSocket gateway), `packages/shared`, `packages/client-core`, `apps/desktop` (Electron), `apps/mobile` (Expo SDK 57, RN 0.86, @livekit/react-native, react-native-skia, yerel Kotlin modülü `voice-service`), `apps/web` (indirme sayfası), `infra/` (docker compose: LiveKit, api, Caddy yalnız `caddy` profiliyle).
- Dağıtım: VPS ([[sunucu-vps]]), Android APK + OTA ([[mobil-ota-guncelleme]]), iOS Ad Hoc ([[ios-ad-hoc-dagitim]]).
- Gürültü bastırma: DPDFNet (DeepFilterNet 3, 0.9.3'te kaldırıldı).
- Kod haritası: Etkinlik [[etkinlik-kod-haritasi]].

## Güncel durum (2026-10-02; canlıdan doğrula)
- **İstemci:** masaüstü **0.9.6** yayında (2026-10-02 gece): DM'de sesli arama + ekran paylaşımı + engelleme ([[dm-sesli-arama-ve-calma]], [[engelleme-dm-ve-arama]], [[dm-aramalari-yonetimde-ozel]]); masaüstünde yerel uçtan uca denendi, **telefonda hiç denenmedi**. 0.9.5 (sahnede çoklu yayın [[sahne-izgarada-coklu-yayin]], [[model-calisirken-agc-kapali-ve-sinirlayici]], [[konusma-halkasi-duyulan-sesten]]): Yusuf "sorunsuz kullanıyoruz" dedi. 1.0 ertelendi ([[surum-1-0-ertelendi]]). Mobil yalnız OTA; Android APK 0.9.2 (yamalı Skia, eski APK'lar zorunlu güncelleme ekranı alır), iOS IPA 0.8.5 yeniden kullanılıyor, 0.9.2'den beri iPhone'lara OTA ile ulaşıyor. 0.9.4 = bağlantı teşhisi; 0.9.3 = DPDFNet fallback düzeltmesi, kozmetikler yalnız hover/açık profilde.
- **Sunucu:** 2026-10-01'de LightNode İstanbul'a taşındı. Eski sağlayıcı gelen UDP'yi ~1400 paket/sn üstünde kesiyordu ([[sunucu-lightnode-istanbula-tasindi]], [[saglayici-udp-paket-siniri]]). DB şeması **25** (messages.type/call_data, user_blocks). Sunucuda `8168252` çalışıyor (2026-10-02 deploy: yedek alındı, bütünlük ok; sonraki `cadb249` yalnız sürüm numarası). Altı kozmetik paketi `/data/cosmetic-packs` altında, tüm platformlar.
- **Ses kesintileri:** nedeni bulundu ve sunucu taşındı. 2026-10-01 akşam aramasında `outages.jsonl`'de kesinti yok, dış sondalar temiz; donmalar yayıncı kodlayıcısından (bit hızı sıçraması) ve tek kullanıcının hattından. Yoğun yayınla hâlâ tam kanıtlanmadı.
- **Yeni sunucuda eksikler:** otomatik güvenlik güncellemeleri (unattended-upgrades imajda maskeli), SSH sertleştirme dosyası yeniden uygulanmadı. Trafik planı 1000 GB/ay, kullanım ~800 GB civarı. Eski sunucu durdurulmuş durumda, Yusuf silecek.
- **Giriş kapısı:** 2026-10-03'ten beri Caddy ayrı `ziroo-edge` projesinde; Diskort siteleri `infra/caddy/diskort.caddy`, diğer projeler `/opt/ziroo-sites/*.caddy` ve `hosts/*.caddy`, değişiklik `bash /opt/ziroo-edge/reload.sh` ([[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]).
- **Alt alan adları:** 2026-10-03'te Diskort dışı projeler `tools.ziroo.net` / `games.ziroo.net`'e taşındı, DNS joker `*.ziroo.net` ([[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]). Açık: eski kopyaların temizliği (runbook Faz D).
- **SignPath:** başvurulmayacak ([[kod-imzalama-ertelendi]]).
- **Not (izin sistemi):** otomatik mod sınıflandırıcısı, o oturumda Yusuf sohbette söylemedikçe ssh deploy ve release tag/push'u engelleyebilir. Sor, sonra push / ssh / tag / `gh release edit` komutlarını ayrı çağrılar olarak çalıştır.

### Sıradaki işler
0. **0.9.6 DM aramasını gerçekte dene:** telefonda gelen arama kartı, zil, `diskort-call` bildirimi, dokununca açılma; masaüstünde grup araması, aynı anda iki gelen arama, masaüstü bildirimi, DM aramasındayken ses kanalına geçiş. Bilinen sınırlar: arama başka cihazda açılınca telefondaki "Seni arıyor" bildirimi kalıyor (konuşma okununca kalkar); bire bir aramada karşı taraf çıkınca odada tek kalınıyor. Sorunsuz geçerse 1.0 ([[surum-1-0-ertelendi]]).
0a. Yayın donmaları: yayıncı bit hızı sıçraması (2,8 → 12,4 Mbps, anahtar kare yok) donmalarla aynı anda; bit hızı tavanına/kodlayıcı ayarlarına bak (2026-10-01 akşam gelen kutusu).
0b. Yayın sesi: Sonar kullananların kendi sesi sistem sesli yayına karışıyor ([[sonar-yayin-sesine-kendi-sesini-katar]]); kullanıcıya geçici çözüm söylendi. Uygulamaya özel yayın sesi ayrı iş, Yusuf isterse ([[uygulamaya-ozel-yayin-sesi-ertelendi]]).
0c. **Zayıf hatlı izleyiciye düşük katman (ertelendi, Yusuf isteyince):** 2026-10-02 akşamı bir DM aramasında yayın 8-16 Mbps'e çıkınca Android izleyicinin indirme hattı doldu (ping 4585 ms'ye, gelen kayıp %21'e çıktı; sunucu ve yayıncı temizdi, yayın durunca 1 sn'de düzeldi). Ekran paylaşımı tek katman gidiyor (`simulcast: false`, masaüstü `voiceClient.ts`; 1080p60 ön ayarı 12 Mbps), sunucu zayıf hatta daha düşük akış veremiyor. Öneri: simulcast yalnız ekran kartı kodlayıcısı varken açılsın (yazılım kodlayıcıda CPU yüzünden kapalı kalsın). Geçici çözüm: telefondan izleyen varken yayıncı 720p ya da 1080p30 seçer. 0a ve 6. maddeyle ilgili.
2. Prob motorunu düzelt: yalnız-UDP kesintileri yakalansın (UDP ve TCP kayıp serileri ayrı sayılsın); boş odadaki 1-2 sn'lik "aday" gürültüsünü azalt.
3. Yeni sunucu: otomatik güvenlik güncellemelerini aç, SSH sertleştirmesini yeniden uygula, çıkış trafiğini ölç, 1000 GB planı izle.
4. Gelen kutusunu (gözcü/gece) 0.9.x regresyonları için kontrol et; Yusuf'un gerçek hayat Etkinlik geri bildirimini topla (gerçek oyun, anti-cheat, Battle.net, mobil).
5. DPDFNet fallback düzeltmesini (0.9.3) kullanıcılar oynadıktan sonra telemetri `mic.fallback` ile doğrula; `reportClientError('kozmetik')` kayıtlarını izle.
6. **Telefon ısınması** (VP9 1080p yayın izlerken): APK 0.8.13'te DPDFNet bütçe düzeltmesi + termal otomatik kapatma var. Kalan: Yusuf 5-10 dk yayın izler, ardından `watch` telemetrisi okunur. Gerekirse JS seçenekleri: VP9'u bırak, donanım kodlayıcıda 720p30 düşük katman, tam ekran değilse mobil düşük katmana abone.
7. Yusuf'un cihaz testleri: telefonda yeni kozmetikler (Android APK kurulumu, Android 10+ kart videosu, iOS OTA), mobil Skia setleri, mobil ses ekranı/yayın kutucukları, masaüstü sahne otomatik gizleme/şerit/kendi önizleme duraklatma, rolsüz DM profili.
8. Yusuf'a hatırlat: eski sunucuyu sil (içinde bilinmeyen bir `set-env.sh` var).

**Açık öneriler (önce sor):** kanal kategorileri, IPA yalnız kendi sunucumuzdan, release/deploy/geri bildirim için proje skilleri, sunucular arası ses moderasyonu, Spotify tarzı `listening` etkinliği.

## Önemli kararlar
- Hedefler/platformlar: [[proje-hedefleri-ve-platformlar]]
- Basit tut, reddedilenler: [[urun-basit-tutma-reddedilen-fikirler]]
- Etkinlik: [[etkinlik-oyun-aktivitesi]]; DM: [[dm-sunucu-ayrimi]], [[dm-sesli-arama-ve-calma]], [[engelleme-dm-ve-arama]], [[dm-aramalari-yonetimde-ozel]]
- Kayıt: [[kayit-sadece-hesap-davetiyesi]]; ekran paylaşımı: [[ekran-paylasimi-sabit-presetler]]
- Kozmetik: [[kozmetik-sunucudan-paketler]], [[kozmetik-sadece-hover]]
- Sunucu: [[sunucu-lightnode-istanbula-tasindi]], [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]
- Yayın sahnesi: [[yayin-arayuzu-discord-tarzi]], [[sahne-izgarada-coklu-yayin]]; yayın sesi: [[uygulamaya-ozel-yayin-sesi-ertelendi]]
- Ses: [[model-calisirken-agc-kapali-ve-sinirlayici]], [[konusma-halkasi-duyulan-sesten]]
- Release: [[surum-cikarma-kurali]], [[surum-1-0-ertelendi]]; imzalama: [[kod-imzalama-ertelendi]]
- Mobil: [[android-min-api-26]], [[mobil-ota-guncelleme]], [[ios-ad-hoc-dagitim]]; UI: [[sunucu-rail-rozeti]]

## Runbook'lar
[[sunucu-vps]] · [[deploy]] · [[surum-cikarma]] · [[geri-bildirim-inceleme]] · [[kozmetik-yayinlama]] · [[ios-cihaz-ekleme]] · [[yedekler]] · [[admin-paneli-ve-loglar]] · [[gelen-kutusu-ve-rutinler]] · [[yerel-ui-test-ortami]] · [[telefonla-erisim]]

## Dersler
[[dev-ortami-tuzaklari]] · [[electron-cdp-testi]] · [[yerel-installer-testi-userdata]] · [[rn-android-border-nan]] · [[kozmetik-avif-tam-aralik]] · [[worktree-silme-windows]] · [[claude-altina-yazma-izin-sorar]] · [[secret-isleme-kurali]] · [[caddy-bind-mount-restart]] · [[dpdfnet-fallback-koku-neden]] · [[saglayici-udp-paket-siniri]] · [[sonar-yayin-sesine-kendi-sesini-katar]] · [[yerel-testte-ekran-paylasimi-gercek-pencere]] · [[server-testleri-tam-kosuda-kararsiz]] · [[caddy-redir-path-acik-yonlendirme]]

## Oturumlar ve ek kararlar/dersler
- [[sessions/_index-dev-era]]: geliştirme dönemi (C:\dev, 2026-09-26..28)
- [[sessions/_index-current-era]]: güncel dönem (ZZ\zProjects\diskort)
- [[2026-10-03-tools-games-alt-alan-adi-gecisi]]: tools/games alt alan adları, joker DNS

## Çalışma kuralları (Claude)
[[20-Areas/working-rules/_index|Çalışma kuralları]] (20-Areas): [[git-push-autonomy]], [[diskort-orchestrator-mode]], [[zamanlanmis-gorevler-ve-skiller]]

## Sürüm özeti
0.1.2 metin kanalları (2026-09-26) · 0.1.3 zorunlu otomatik güncelleme · 0.1.4 client-core · 0.2.0 Android v1 · 0.2.x OTA · 0.3.0 tepkiler+ekler · 0.3.1 DeepFilterNet 3 · 0.3.2 profil fotoğrafları · 0.3.3 tema UI · 0.3.4 GPU ekran kodlama · 0.4.0 roller · 0.8.1 iOS Ad Hoc + şema 21 · 0.9.0 Etkinlik · 0.9.2 kozmetik paketleri · 0.9.3 DPDFNet düzeltmesi · 0.9.4 bağlantı teşhisi çalışması · 0.9.5 sahnede çoklu yayın + AGC/sınırlayıcı + yerel konuşma halkası · 0.9.6 DM'de arama + ekran paylaşımı + engelleme (şema 25).
