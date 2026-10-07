---
type: decision
project: silksong-mod
date: 2026-10-06
status: active
tags: [silksong, boss, tasarim, lora, animasyon]
source: Windows oturumu 2026-10-06 gece (D:\SilksongMod\ai\out\knight_v1\A_orig_s24.png, kilnwright_char_v2)
---

# Boss karakteri pelerinli şövalye: gri kask-maske, kor kırmızı göz, kızıl pelerin, uzun maşa kollar; Idle saf kukla ile

**Karar (Yusuf, 2026-10-06 gece):**
1. Karakter, kaya-golem A4 silueti yerine karakter LoRA'sının *kontrol* sütunundan çıkan pelerinli şövalye (`A_orig_s24.png`): ince böcek şövalye, yüzüne kaynamış gri perçinli kask-maske, iki kor kırmızı göz, kapüşonlu yırtık kızıl pelerin, çok uzun ince kollar ve maşa eller, elde küçük demirci aletleri, uzun ince bacaklar.
2. Gözler kor kırmızı (Hornet'in kırmızısına yakınlığı kabul edildi).
3. İsim Kilnwright Scoria kalır; lore küçük uyarlamayla ("kaskı yüzüne, maşası eline kaynadı; pelerini ocak ateşinde kavruldu") devam eder, ayrıntılar sonra. Yusuf: "en kötü hayali bir karakter olur, bağlı olmak zorunda değil."
4. Idle animasyonu saf parçalı kukla (`tools/anim/puppet.py`); img2img yeniden çizim yalnız büyük pozlarda.
5. Şahmerdan (arena çekici) kararı değişmedi: [[2026-10-06-cekic-arena-sahmerdani-siluet-a4]].

**Neden:**
- Yusuf'un tercihi: 18+20+34 görsellik üç turda ittirilen A4 yerine bu figürü "daha çok beğendim" dedi; tasarım dokümanının "modelin iyi çizdiğine esne" ilkesi.
- Animasyon açısından da uygun: gövde+kask tek sert parça, pelerin tek esnek katman, kollar/bacaklar ince çubuk; kukla rig'i 3 parçayla (iki kol + pelerin) çalıştı.
- Idle için saf kukla: yeniden çizim (denoise 0,25–0,35) her karede küçük farklar bırakıp "kıtırdama" yaratıyordu; kukla sıfır titreme verdi ve Yusuf "çok daha iyi" dedi.
- Oyun içi doğrulama: `TestSprite` ile Abyss_12'de Hornet'in yanında, hero materyali/sorting'iyle çalıştı.

**Reddedilen alternatifler:**
- *A4 kaya-golem:* özgün ama Yusuf'un gözünde daha az çekici; kolsuz/hantal okunuyordu.
- *Pelerin rengini kor turuncuya çevirmek (Hornet kırmızısıyla karışmasın diye):* B/C varyantlarında pelerin kayboldu, test geçersiz; kırmızı kaldı, sonra img2img ile denenebilir.
- *Idle'ı img2img ile yeniden çizmek:* kıtırdama.
- *Karanlık oyuk göz (HK tarzı):* Yusuf kırmızıyı seçti.

**Güncelleme 2026-10-07:** silüet, kask ve göz kararı geçerli; oranlar (ince uzun uzuvlar), pelerin rengi ve boyut [[2026-10-07-boss-oranlari-v8c-ve-boyut-2-5x]] ile değişti. Idle artık kavisli bacaklı V8C kuklası.

**Doğrulanmayan (2026-10-06 itibarıyla):** oyun içi boyut (bir sonraki açılışta `PixelsPerUnit=98` ile 2,5× Hornet), renk doygunluğunun oyun paletine uyumu, 12 fps hissi; Yusuf'un oyun içi izlenimi henüz alınmadı.
