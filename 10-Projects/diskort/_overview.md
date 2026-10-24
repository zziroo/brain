---
type: project
project: diskort
date: 2026-10-24
status: active
tags: [diskort, overview]
source: handoff notundan (artık kaldırıldı), diskurt-project ve diskort-* hafıza dosyalarından, 2026-10-01/02 oturumlarından
---

# Diskort: Discord kalitesinde sesli sohbet + ekran paylaşımı (Windows-first, kendi sunucusu)

> **Bu sayfa projenin tek durum kaynağıdır.** Ayrı bir devir (handoff) notu yok. Yeni sohbette ilk iş bunu oku. Anlamlı bir oturumun sonunda "Güncel durum" ve "Sıradaki işler" bölümlerini güncelle. Not canlı gerçek değildir: sunucu, sürüm ve repo durumunu işlem yapmadan önce canlıdan doğrula.

## Nedir
10-20 kişilik kapalı bir arkadaş grubu için masaüstü (Electron) + mobil (Expo/React Native) uygulama; zamanla tam bir Discord benzeri platform. Yeniden adlandırma: Diskurt -> Diskort (2026-09-26). Klasör `C:\Users\yusuf\ZZ\zProjects\diskort`, repo `zziroo/diskort` (public), güncellemeler GitHub Releases + kendi sunucumuz üzerinden.

## Hedefler
Ses + ekran paylaşımı kalitesi; metin kanalları, tepkiler, dosyalar, roller, DM'ler, profil (afiş, tema, giriş sesi), Etkinlik (oynanan oyun + oyun sayfası). Kozmetikler 0.12.0'da kaldırıldı ([[2026-10-23-kozmetikler-tamamen-kaldirildi]]). Yusuf canlıda test eder; client release'i onunla çıkar. Ayrıntı: [[proje-hedefleri-ve-platformlar]].

## Teknoloji
- pnpm monorepo: `apps/server` (Fastify, SQLite `node:sqlite`, WebSocket gateway), `packages/shared`, `packages/client-core`, `apps/desktop` (Electron), `apps/mobile` (Expo SDK 57, RN 0.86, @livekit/react-native, yerel Kotlin modülü `voice-service`), `apps/web` (indirme sayfası), `infra/` (docker compose: LiveKit, api, Caddy yalnız `caddy` profiliyle).
- Dağıtım: VPS ([[sunucu-vps]]), Android APK + OTA ([[mobil-ota-guncelleme]]), iOS Ad Hoc ([[ios-ad-hoc-dagitim]]).
- Gürültü bastırma: DPDFNet (DeepFilterNet 3, 0.9.3'te kaldırıldı).
- Kod haritası: Etkinlik [[etkinlik-kod-haritasi]].

## Güncel durum
_Son güncelleme: 2026-10-24; canlıdan doğrula. Eski ayrıntılı hâl: [[10-Projects/diskort/sessions/2026-10-17-diskort-guncel-durum-arsivi|arşiv]]._
- **Sürüm 0.12.1 (2026-10-24, `38454b5`, etiket `v0.12.1`, 15:50 civarı yayında; zorunlu güncelleme):** masaüstünde yüzen yayın penceresi `StreamPip` (`a2f845f`): sahne ekranda değilken izlenen yayın köşede sürer, sürükle-bırak en yakın köşeye animasyonla yapışır, karşı kenar/köşeden 16:9 boyutlanır (240px–alanın %85'i), köşe ve genişlik ayarlarda kalıcı; tık sahneye döner, üst şerit kanal adı, alt şerit yayıncı + ses + izlemeyi bırak. Yalnız masaüstü; APK/IPA 0.12.0 ile aynı. Canlıda denenmedi (sürükleme hissi, tutamaçlar, taşıma sonrası tıkın yutulması). Varsayılan sağ alt köşe metin kanalında mesaj kutusunun emoji/GIF düğmelerini kapatabilir; gerekirse varsayılanı değiştir.
- **Sürüm 0.12.0 (2026-10-23, `6907fbb`, etiket `v0.12.0`, 2026-10-23 17:25 yayında; zorunlu güncelleme):** profil kozmetikleri her platformdan kaldırıldı ([[2026-10-23-kozmetikler-tamamen-kaldirildi]]); masaüstünde oyun sayfası popover'ı ([[2026-10-23-oyun-sayfasi-popover-baglantilar]]); ses satırında uzun ad + YAYINDA + küçük resimde sağ yuva kayması düzeltildi (`5cf8b94`). Mobil yeni APK + IPA ister (Skia kalktı, runtimeVersion değişti). Canlıda denenmedi.
- **Önceki istemci 0.11.3** (2026-10-22): okunmamış rozeti (dock/görev çubuğu), ses satırında sabit sağ yuva + yayın küçük resmi, yayında tek tık/zoom, OTA öncesi sesten çıkma (`22ac734`) ([[2026-10-22-rozet-sahne-prob-ve-0-11-3]], karar [[2026-10-22-yayin-izleme-tek-tik-zoom-ve-ses-satirinda-sabit-yuva]]). Canlıda denenmedi. Mobil OTA ile: Android APK 0.11.0, iOS IPA 0.8.5. 1.0 ertelendi ([[surum-1-0-ertelendi]]).
- **Sunucu:** `6907fbb` deploy edildi (2026-10-23 17:06, yedek `diskort-2026-10-23_1705.db.gz`), DB şeması **28** (kozmetik sütunları düştü; eski imaja dönüş yedekten), `/data/cosmetic-packs` silindi. Önceki `8caf99b` (2026-10-22): prob motoru UDP/TCP serileri ayrı (`probe.proto`), boş odada "aday" yazılmıyor; kayıtlar yalnız-UDP'de teşhiste sağlayıcı kesintisi sayılmaz ([[2026-10-22-sonda-serisi-sinirsiz-buyume-ve-yeniden-oynatma-sira-yapayligi]] · [[grid-sarmalayici-auto-sutun-satiri-tasirir]] · [[ajan-prettier-ile-dosyalari-yeniden-bicimledi]]). imajda ffmpeg. Panelde yalnız Diskort'a ait kartlar; makine geneli Netdata'da ([[2026-10-16-admin-paneli-makine-geneli-netdataya-tasindi]]).
- **Sağlık ucu:** API `/healthz` düz "ok"; Kuma'nın `diskort.ziroo.net` monitörü buna bakar ([[proje-altyapi-standardi]]).
- **Kod haritası:** `docs/kod-haritasi.md` (316 satır, `93f8bb9`, 2026-10-20); ajanlar önce onu okur. Yapı değiştiren commit öncesi `node ~/.claude/skills/kod-haritasi/harita.mjs kontrol` ([[2026-10-20-token-ucuncu-tur-kod-haritasi-ve-kural-gozden-gecirme]]).
- **Giriş kapısı ve ziroo.net:** [[10-Projects/ziroo-edge/_overview|ziroo-edge]]. Diskort siteleri `infra/caddy/diskort.caddy`, değişiklik `bash /opt/ziroo-edge/reload.sh` ([[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]). Reload WebSocket'leri keser; `stream_close_delay 5m` var, kanal doluyken denenmedi ([[caddy-reload-websocketleri-keser]]).
- **Makine:** [[vps-makinesi]]. Trafik planı 1000 GB/ay (~800 GB kullanım). Otomatik güvenlik güncellemeleri kapalı; 2026-10-16 07:30 bakımının yapıldığı doğrulanmadı ([[2026-10-15-sunucu-bakim-penceresi-07-30]]). Eski sunucu durdurulmuş, Yusuf silecek.
- **Ses kesintileri:** neden eski sağlayıcının UDP sınırıydı, sunucu taşındı ([[saglayici-udp-paket-siniri]]). Yayın donmaları yayıncı kodlayıcısından; yoğun yayınla tam kanıtlanmadı.
- **İzin sistemi:** otomatik mod, Yusuf o oturumda sohbette söylemedikçe ssh deploy ve tag/push'u engelleyebilir. Sor, sonra her komutu ayrı çağrıyla çalıştır.

## Sıradaki işler
1. **0.12.1 ve 0.12.0 canlı doğrulama:** yüzen yayın penceresi (sürükleme hissi, tutamaçlar, taşıma sonrası tık, sağ alt varsayılanın mesaj kutusunu kapatıp kapatmadığı; [[2026-10-24-yayin-yuzen-pencere-pip]]); oyun sayfası popover'ı Windows'ta (Steam oyununda doğrudan bağlantılar, Epic/elle eklenen oyunda arama), kozmetiksiz profil/üye listesi/ses kutucukları, mobil ses kutucuğu yüksekliği (128'e indi), yeni APK ve IPA kurulumu; ses satırı sağ yuva hizası. Sonra 0.11.3 masaüstü: dock rozeti (Windows overlay), ses satırı hizası ve yayın küçük resmi, yayında tek tık/zoom hissi (250 ms gecikme, 4× sınır); giriş sesi sırası, uzunluk seçici, seviye, sarı halka, panel düğmesi, telefonda yükleme/çalma, iOS'ta LiveKit ile karışım. Rahatsız edici ses: `admin-cli intro-sound-remove`.
2. **0.11.0 doğrulama:** yeni APK kurulumu, masaüstü AGC gerçek mikrofonla, telefonda DPDFNet 30 ms tampon (Xiaomi'de 7,5 ms eşiği aşılıp model kapanıyor, doğrulanmadı), Android OOM tekrarı.
3. **Eski doğrulamalar:** 0.10.3 (Mac'te elle kurulum, sonraki sürümde macOS otomatik güncelleme uçtan uca, `.p12` yedeğe taşınacak), 0.10.0 (arkadaşlık akışı iki cihazla, donanım simulcast, telefonda izleme FPS'i). Ayrıntı arşivde.
4. **Yalnız-UDP kesinti kayıtları:** üretimde `probe.proto: udp` kayıtlarının sıklığına bak (gözcü raporu); gürültü yaparsa eşik.
5. **Yayın kalitesi:** yayıncı bit hızı sıçraması; zayıf hatlı izleyiciye düşük katman (ertelendi); Sonar yayın sesi ([[sonar-yayin-sesine-kendi-sesini-katar]]); telefon ısınması (`watch` telemetrisi).
6. **Yayın küçük resmi** önizleme indirme maliyeti (her istemci, 25 sn, ≤256 KB) kalabalıkta sorun olursa satırda yalnız hover'da göster.
7. **Geri bildirim #36** (Android arka plan sesleri): Yusuf Xiaomi'de pil kısıtlamasını kapatıp dener; gelmezse sonraki APK'ya telemetri.
8. **Rutin:** Diskort gözcüsü 2026-10-18'de global `gece-gozcusu`na dönüştü (Diskort adımları aynen; rapor `~/ZZ/gozcu/`, `## Diskort` bölümü; [[2026-10-18-global-gece-gozcusu]]). Modeli Opus medium'a düşürmek hâlâ açık. `mic.fallback` kayıtlarını izle; Etkinlik için gerçek hayat geri bildirimi topla.
9. **Yusuf'un cihaz testleri:** mobil ses ekranı ve yayın kutucukları, masaüstü sahne, rolsüz DM profili.
10. **Repo taşıma artıkları:** sunucu `GITHUB_REPO` varsayılanı sonraki api kurulumunda devreye girer; Yusuf eski `yusufholat` anahtarını iptal eder. Sahipsiz dal `origin/mimari-tanitim-videosu`: karar Yusuf'ta.
11. **Yusuf'a hatırlat:** eski sunucuyu sil (içinde bilinmeyen bir `set-env.sh` var).
12. **Sunucu bakımı:** [[10-Projects/ziroo-edge/_overview|ziroo-edge]] sıradaki işlerinde.

**Açık öneriler (önce sor):** kanal kategorileri, IPA yalnız kendi sunucumuzdan, release/deploy/geri bildirim için proje skilleri, sunucular arası ses moderasyonu, Spotify tarzı `listening` etkinliği.

## Önemli kararlar
- Hedefler/platformlar: [[proje-hedefleri-ve-platformlar]]
- Basit tut, reddedilenler: [[urun-basit-tutma-reddedilen-fikirler]]
- Etkinlik: [[etkinlik-oyun-aktivitesi]]; DM: [[dm-sunucu-ayrimi]], [[dm-sesli-arama-ve-calma]], [[engelleme-dm-ve-arama]], [[dm-aramalari-yonetimde-ozel]]
- Kayıt: [[kayit-sadece-hesap-davetiyesi]]; ekran paylaşımı: [[ekran-paylasimi-sabit-presetler]]
- Kozmetik: **kaldırıldı** [[2026-10-23-kozmetikler-tamamen-kaldirildi]] (eski: [[kozmetik-sunucudan-paketler]], [[kozmetik-sadece-hover]]); oyun sayfası: [[2026-10-23-oyun-sayfasi-popover-baglantilar]]
- Arkadaşlık: [[arkadaslik-sistemi]]; roller: [[rol-etiketleme]], [[rol-verme-hedefin-seviyesine-bakmaz]]
- İzleme: panel yalnız Diskort'a ait bilgiyi gösterir [[2026-10-16-admin-paneli-makine-geneli-netdataya-tasindi]]; makine izleme (Kuma, Netdata) ziroo-edge'de: [[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]]
- Sunucu: [[sunucu-lightnode-istanbula-tasindi]]; makine geneli [[vps-makinesi]]; giriş kapısı, alan adları ve ziroo.net: [[10-Projects/ziroo-edge/_overview|ziroo-edge]] (Caddy'nin ayrılması: [[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]])
- Yayın sahnesi: [[yayin-arayuzu-discord-tarzi]], [[sahne-izgarada-coklu-yayin]], [[2026-10-22-yayin-izleme-tek-tik-zoom-ve-ses-satirinda-sabit-yuva]]; yayın sesi: [[uygulamaya-ozel-yayin-sesi-ertelendi]]
- Ses: [[model-calisirken-agc-kapali-ve-sinirlayici]], [[2026-10-15-kisisel-giris-sesi]], [[masaustu-yazilimsal-agc]], [[dpdfnet-esikler-gevsetildi-android-ayri-is-parcacigi]], [[konusma-halkasi-duyulan-sesten]]
- Release: [[surum-cikarma-kurali]], [[surum-1-0-ertelendi]]; imzalama: [[kod-imzalama-ertelendi]] (Windows), [[macos-developer-id-imza-ve-otomatik-guncelleme]]
- Rutin: [[2026-10-10-gozcu-gunluk-gece-incelemesi-kaldirildi]], [[2026-10-15-gozcu-birlesik-dort-bolum]] (yerini aldı: [[2026-10-18-global-gece-gozcusu]]); presence: [[telefondan-bagli-gostergesi]]
- Mobil: [[android-min-api-26]], [[mobil-ota-guncelleme]], [[ios-ad-hoc-dagitim]]; UI: [[sunucu-rail-rozeti]]

## Runbook'lar
[[sunucu-vps]] (makine geneli: [[vps-makinesi]]) · [[deploy]] · [[surum-cikarma]] · [[geri-bildirim-inceleme]] · [[ios-cihaz-ekleme]] · [[yedekler]] · [[admin-paneli-ve-loglar]] · [[gelen-kutusu-ve-rutinler]] · [[yerel-ui-test-ortami]]

## Dersler
[[ota-yeniden-yukleme-seste-eski-livekit-oturumunu-birakir]] · [[dev-ortami-tuzaklari]] · [[electron-cdp-testi]] · [[yerel-installer-testi-userdata]] · [[rn-android-border-nan]] · [[kozmetik-avif-tam-aralik]] · [[worktree-silme-windows]] · [[secret-isleme-kurali]] · [[caddy-bind-mount-restart]] · [[dpdfnet-fallback-koku-neden]] · [[saglayici-udp-paket-siniri]] · [[sonar-yayin-sesine-kendi-sesini-katar]] · [[yerel-testte-ekran-paylasimi-gercek-pencere]] · [[server-testleri-tam-kosuda-kararsiz]] · [[caddy-reload-websocketleri-keser]] · [[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]] · [[github-macos-runner-kapasitesi]] · [[electron-net-fetch-rangeerror]] · [[electron-builder-csc-link-anahtar-zinciri-parolasi]] · [[rn-animated-interpolate-render-icinde-oom]] · [[kotlin-derlemesi-mac-te-yok-android-ci-ile-dogrula]] · [[livekit-default-cikis-aygitini-somut-kimlige-sabitler]] · [[2026-10-22-sonda-serisi-sinirsiz-buyume-ve-yeniden-oynatma-sira-yapayligi]]

## Oturumlar ve ek kararlar/dersler
- [[_index-dev-era]]: geliştirme dönemi (C:\dev, 2026-09-26..28)
- [[_index-current-era]]: güncel dönem (ZZ\zProjects\diskort)
- [[2026-10-04-geri-bildirim-kontrolu-ve-caddy-reload]]: hata kontrolü, Caddy reload kopması, panel deploy
- [[2026-10-08-arkadaslik-sistemi-ve-0-10-0]]: arkadaşlık sistemi, donanım simulcast, 720p30, 0.10.0
- [[2026-10-15-gozcu-birlesik-ve-yedek-aynasi]]: masaüstü güncellemesi, gözcü dört bölüm, ssh vps alias'ı, Mac yedek aynası, Tussle gece yedeği
- [[2026-10-12-rol-etiketi-dpdfnet-agc-oom]]: rol etiketi, rol verme kuralı, DPDFNet eşikleri, masaüstü AGC, OOM, sink-id, 0.11.0
- [[2026-10-15-canli-dogrulama-bakim-plani-geri-bildirim]]: canlı doğrulama (sunucu 99f3652, OTA 200), bakım planı 16 Ekim 07:30, geri bildirim #35 main'de, #34 ertelendi, #36 pil testi
- [[2026-10-15-kisisel-giris-sesi-ve-0-11-1]]: kişisel giriş sesi (#34, üç ajan + inceleme), sürüm 0.11.1, şema 27, imajda ffmpeg
- [[2026-10-16-admin-altyapi-sekmesi]]: admin "Makine" sekmesi "Altyapı" oldu, makine geneli Netdata'ya, `a22c0dc` yayında
- [[2026-10-22-rozet-sahne-prob-ve-0-11-3]]: okunmamış rozeti, ses satırında sabit yuva + yayın küçük resmi, yayında tek tık/zoom, prob motoru UDP/TCP, sunucu deploy, 0.11.3
- [[2026-10-23-kozmetikler-kaldirildi-oyun-sayfasi-0-12-0]]: kozmetikler her platformdan kaldırıldı (şema 28), oyun sayfası popover'ı, sağ yuva kayması, 0.12.0 yayında
- [[2026-10-24-yayin-pip-ve-0-12-1]]: yüzen yayın penceresi (StreamPip), 0.12.1 yayında; karar [[2026-10-24-yayin-yuzen-pencere-pip]], ders [[2026-10-24-pointer-capture-click-hedefini-degistirir]]
- [[10-Projects/diskort/sessions/2026-10-17-diskort-guncel-durum-arsivi|2026-10-17 güncel durum arşivi]]: overview'un kısaltma öncesi "Güncel durum" ve "Sıradaki işler" bölümleri, olduğu gibi
- ziroo-edge ve marka oturumları (tools/games geçişi, liste sayfaları, ziroo.net, maskot) artık kendi overview'larında: [[10-Projects/ziroo-edge/_overview|ziroo-edge]], [[10-Projects/marka/_overview|marka]]

## Çalışma kuralları (Claude)
[[20-Areas/working-rules/_index|Çalışma kuralları]] (20-Areas): [[git-push-autonomy]], [[diskort-orchestrator-mode]], [[zamanlanmis-gorevler-ve-skiller]]. Diskort'tan taşınan genel kurallar ve dersler (telefonla erişim, izin istemleri, SSH engeli, zziroo taşıması, ince taneli anahtar, rutin çalışma klasörü, `.claude` altına yazma) de orada.

## Sürüm özeti
0.1.2 metin kanalları (2026-09-26) · 0.1.3 zorunlu otomatik güncelleme · 0.1.4 client-core · 0.2.0 Android v1 · 0.2.x OTA · 0.3.0 tepkiler+ekler · 0.3.1 DeepFilterNet 3 · 0.3.2 profil fotoğrafları · 0.3.3 tema UI · 0.3.4 GPU ekran kodlama · 0.4.0 roller · 0.8.1 iOS Ad Hoc + şema 21 · 0.9.0 Etkinlik · 0.9.2 kozmetik paketleri · 0.9.3 DPDFNet düzeltmesi · 0.9.4 bağlantı teşhisi çalışması · 0.9.5 sahnede çoklu yayın + AGC/sınırlayıcı + yerel konuşma halkası · 0.9.6 DM'de arama + ekran paylaşımı + engelleme (şema 25) · 0.10.0 arkadaşlık + donanım simulcast + 720p30 (şema 26) · 0.10.3 macOS imza + telefon göstergesi · 0.11.0 rol etiketi + masaüstü AGC + DPDFNet eşikleri (yeni APK) · 0.11.1 kişisel giriş sesi + kanal süresi (şema 27) · 0.11.2 giriş sesi düzeltmeleri · 0.11.3 okunmamış rozeti + ses satırı yuvası + yayın tek tık/zoom + OTA öncesi sesten çıkma · 0.12.0 kozmetikler kaldırıldı (şema 28, yeni APK/IPA) + oyun sayfası popover'ı.
