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

## Güncel durum (2026-10-07 akşam, Windows PC)
- Repo: `C:\Users\yusuf\ZZ\zProjects\silksong-mod` (yerel git, remote yok; son commit `de3f11e`, çalışma kopyası temiz). Proje kuralları ve kurulum komutları repo `CLAUDE.md`'de. Tasarım dosyalarının ana kopyası bu vault (`design/`, repo ile birebir).
- Oyun: Unity 6000.0.50f1, **Mono**, TK2D, PlayMaker. Mod kopyası `D:\SilksongMod\Hollow Knight Silksong` (BepInEx 5.4.23.5); Steam kurulumu vanilla.
- **Kayıt güvenliği çalışıyor:** modlu kopya `_SunkenForgeMod\`'a yazar. Bkz. [[2026-10-06-kayit-yonlendirme-diske-gomulu-dll]]. Yusuf kayıt ritüelinde rahat; yedeği Claude gerektiğinde alır.
- **Tıklamasız test:** `DevAutoLoad` + `DevTeleport` + `TestSprite`/`RoomBuilder` ekran görüntüleri; Claude oyunu açıp log'dan doğrular.
- **Boss:** boyut 2,5× Hornet, oranlar V8C (kalın kavisli kısa bacak, sivri ayak, kızıl-pas pelerin, kor), kontur ~5 px. Klipler: Idle 12, Walk 10, zincir çekme 6 kare (12 fps). Karakter LoRA `kilnwright_char_v8c` (adım 1500). Bkz. [[2026-10-07-boss-oranlari-v8c-ve-boyut-2-5x]], [[2026-10-07-animasyon-hatti-kukla-kaba-poz-v8c-lora]].
- **Biyom:** cam ocakları, buz mavisi, taşmış cam kristalleri. Sahne LoRA'sı `silksong_scenery_v2` adım 1200. Odalar NEW2-m (oyunda kuruldu) ve NEW2-c (kontrast, yalnız maket). Bkz. [[2026-10-07-biyom-cam-ocaklari-buz-mavisi]], [[10-Projects/silksong-mod/design/notes-katman-plani|katman planı]].
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
- Odalar v0.1'de `Demo End` kabuğunda, v0.2'de boş gerçek sahneler: [[2026-10-07-sahne-yolu-kabuk-demo-end-ve-kayit-hijyeni]].

## Sıradaki işler
1. **Oda paleti ve havası:** Yusuf odayı fazla parlak buldu ("tam Silksong havası vermedi"), Claude da aynı görüşte. Karanlık seviyesi +1, daha az doygun, sıcak-gri alt tonlu palet, parlayan nesneleri birkaç odakta topla, NEW2-c'nin siyah kütleleri ve ışık huzmeleri. Oyunda gerçek odalarla yan yana kıyasla.
2. NEW2-c'yi (ya da yeni paletli sürümü) `dress_room.py` ile oyuna taşı; kristal saydamlığı NEW2-m ile NEW2-c arası; zemini yeniden yap.
3. Boss tarafı: arena odası (kamera kilidi, şahmerdan, örs), Dock_13'te gizli duvar, Scoria'nın oyundaki ilk davranışı (Idle/Walk/zincir çekme + 'Çek'/'Bırak').
4. Karakter LoRA'sına iyi yeniden çizimleri ekleyip bir tur daha eğitmek (kukla görünümünden uzaklaşmak); B3 için diğer kolla zincir çekme.
5. v0.2 öncesi: H6 kayıt taramasını iç içe verilere genişlet; Unity editörü (Yol C) indirmesi için Yusuf'a sor.

## Doğrulanmayanlar
- Ölüm/hazard sırasında kayıt hijyeni (H2 koza taşıma) oyunda denenmedi.
- Animasyonların savaş içindeki hissi (boss davranışı yok).
- Lore/isim geçici; saldırı metinlerinde eski 'cüruf/çatlak kabuk' ifadeleri güncellenmedi.

## Oturumlar
- [[2026-10-06-windows-kurulum-kayit-guvenligi-ilk-lora]]
- [[2026-10-07-boss-oranlari-cam-biyomu-ilk-oda]]

## Notlar
- Oyun asset'leri, veri seti ve LoRA PC'de kalır; arkadaşlara sadece mod klasörü verilir.
