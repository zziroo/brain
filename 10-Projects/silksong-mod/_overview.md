---
type: project
project: silksong-mod
date: 2026-10-07
status: active
tags: [oyun, mod, silksong, unity, lora]
source: Windows oturumları 2026-10-06, 2026-10-07
---

# Silksong modu: Team Cherry kalitesinde özgün boss

Kişisel kullanım ve arkadaşlarla oynamak için Hollow Knight: Silksong'a mod olarak yeni içerik. Dağıtım yok, ticari amaç yok.

## Güncel durum (2026-10-07 gece, Windows PC)
- Repo: `C:\Users\yusuf\ZZ\zProjects\silksong-mod` (yerel git, remote yok; son commit `a0de511`, çalışma kopyası temiz). Proje kuralları ve kurulum komutları repo `CLAUDE.md`'de. Tasarım dosyalarının ana kopyası bu vault (`design/`, repo ile birebir).
- Oyun: Unity 6000.0.50f1, **Mono**, TK2D, PlayMaker. Mod kopyası `D:\SilksongMod\Hollow Knight Silksong` (BepInEx 5.4.23.5); Steam kurulumu vanilla.
- **Kayıt güvenliği çalışıyor:** modlu kopya `_SunkenForgeMod\`'a yazar. Bkz. [[2026-10-06-kayit-yonlendirme-diske-gomulu-dll]]. Yusuf kayıt ritüelinde rahat; yedeği Claude gerektiğinde alır.
- **Tıklamasız test:** `DevAutoLoad` + `DevTeleport` + `TestSprite`/`RoomBuilder` ekran görüntüleri; Claude oyunu açıp log'dan doğrular.
- **Scoria oyunda hareket ediyor (hasarsız):** `[Boss]` (varsayılan kapalı) bizim odada Idle → Walk → çekme noktasına yürü → zincir çekme; şahmerdan Çek/Bırak ile yükselip örse düşüyor. Zincir makaralı, sabit çekme noktası: [[2026-10-07-zincir-mekanigi-makarali-sabit-cekme-noktasi]].
- **Boss:** boyut 2,5× Hornet, oranlar V8C (kalın kavisli kısa bacak, sivri ayak, kızıl-pas pelerin, kor), kontur ~5 px. Klipler: Idle 12, Walk 10, zincir çekme 6 kare (12 fps). Karakter LoRA `kilnwright_char_v8c` (adım 1500). Bkz. [[2026-10-07-boss-oranlari-v8c-ve-boyut-2-5x]], [[2026-10-07-animasyon-hatti-kukla-kaba-poz-v8c-lora]].
- **Biyom:** cam ocakları, buz mavisi, taşmış cam kristalleri. Sahne LoRA'sı `silksong_scenery_v2` adım 1200. Varsayılan oda **`new2d_a2`** (NEW2-c düzeni, soğuk mavi-gri, boss arenası koyuluğu): [[2026-10-07-oda-paleti-soguk-mavi-gri-boss-koyulugu]]. NEW2-m eski kontrol seti. Bkz. [[2026-10-07-biyom-cam-ocaklari-buz-mavisi]], [[10-Projects/silksong-mod/design/notes-katman-plani|katman planı]].
- **Kendi odamız oyunda:** Dock_13 dibindeki kapıdan `Demo End` kabuğuna giriliyor; oda `room.json` + `layout.json` setinden kuruluyor, oyun içi görüntü maketle neredeyse birebir. Kayıt hijyeni bizim sahne adlarını kayda yazdırmıyor. Bkz. [[2026-10-07-sahne-yolu-kabuk-demo-end-ve-kayit-hijyeni]], [[10-Projects/silksong-mod/design/notes-sahne-yolu|sahne yolu notu]].
- Tasarım: [[10-Projects/silksong-mod/design/00-dlc-overview-sunken-forge|DLC çerçevesi]], [[10-Projects/silksong-mod/design/boss-01-kilnwright-scoria|Boss 01 Scoria]], [[10-Projects/silksong-mod/design/notes-dogrulama|doğrulama notları]]. Denge ve lore: [[2026-10-06-scoria-denge-ve-lore-kararlari]].

## Kararlar
- Önce tek tam boss, "DLC" sonra. Hat bir kez uçtan uca işlemeden kapsam büyütülmez.
- Görsel üretim ve LoRA eğitimi Windows PC'de (RTX 5070); tasarım Mac'te de olabilir.
- Ses ve müzik şimdilik kapsam dışı (Yusuf'un kararı).
- Kayıt yönlendirme diske gömülü DLL ile; mod durumu ayrı dosyada, PlayerData'ya yazılmaz; bizim sahne adları kayda girmez.
- Boss karakteri pelerinli şövalye: [[2026-10-06-karakter-pelerinli-sovalye-kirmizi-goz]]; oranlar ve renk: [[2026-10-07-boss-oranlari-v8c-ve-boyut-2-5x]].
- Animasyon: sert parçalar kukla, uzuvlar koddan kavisli, büyük pozlar kaba poz + V8C LoRA yeniden çizim: [[2026-10-07-animasyon-hatti-kukla-kaba-poz-v8c-lora]].
- Bölge yeni biyom (cam ocakları, buz mavisi): [[2026-10-07-biyom-cam-ocaklari-buz-mavisi]].
- Zincir makaralı, sabit çekme noktası (A); B ertelendi, C reddedildi: [[2026-10-07-zincir-mekanigi-makarali-sabit-cekme-noktasi]].
- Oda paleti A2 (soğuk mavi-gri, boss koyuluğu): [[2026-10-07-oda-paleti-soguk-mavi-gri-boss-koyulugu]].
- Odalar v0.1'de `Demo End` kabuğunda, v0.2'de boş gerçek sahneler: [[2026-10-07-sahne-yolu-kabuk-demo-end-ve-kayit-hijyeni]].

## Sıradaki işler
1. **Arena odası:** örs çarpışması (Scoria içinden geçmesin), yükselen çekiç kamerada kalsın, örsün üstüne tek güçlü ışık huzmesi (boss arenalarındaki gibi), yeni zemin (üst kenar düz), parlayan alanı biraz daha azalt. Kamera kilidi.
2. **Scoria'ya hasar ve can:** düşüş hasar kutusu (2 maske), zemin dalgası, `HealthManager`; sonra Yusuf A mekaniğini oynayıp dener (örse yürüme sıkıcıysa B: maşayla uzaktan kancalama).
3. Dock_13'te gizli duvar.
4. Karakter LoRA'sına iyi yeniden çizimleri ekleyip bir tur daha eğitmek; V8C zincir çekme yeniden çizimlerini `rgba` klasörü olarak çıkarmak; B3 için diğer kolla zincir çekme.
5. v0.2 öncesi: H6 kayıt taramasını iç içe verilere genişlet; Unity editörü (Yol C) indirmesi için Yusuf'a sor.

## Doğrulanmayanlar
- Ölüm/hazard sırasında kayıt hijyeni (H2 koza taşıma) oyunda denenmedi.
- Animasyonların savaş içindeki hissi (davranış var, hasar yok; Yusuf oynamadı).
- Yusuf A2 odasını oyunda görmedi.
- Lore/isim geçici; saldırı metinlerinde eski 'cüruf/çatlak kabuk' ifadeleri güncellenmedi.

## Oturumlar
- [[2026-10-06-windows-kurulum-kayit-guvenligi-ilk-lora]]
- [[2026-10-07-boss-oranlari-cam-biyomu-ilk-oda]]
- [[2026-10-07-scoria-ilk-davranis-oda-paleti]]

## Notlar
- Oyun asset'leri, veri seti ve LoRA PC'de kalır; arkadaşlara sadece mod klasörü verilir.
