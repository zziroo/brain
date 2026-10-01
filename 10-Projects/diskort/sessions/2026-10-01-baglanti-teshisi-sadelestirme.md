---
type: session
project: diskort
date: 2026-10-01
status: active
tags: [ses, yayin, teshis, ag, saglayici, panel]
source: Claude Code oturumu 2026-10-01 (koordinatör + Fable ajanları), main 3d12e38
---

# Bağlantı teşhisi sadeleştirildi; kayıp sağlayıcı ağında, sunucuya paket ulaşmıyor

## Bulgular (gerçek veriden)
- 2026-10-01 03:18 TSİ: yayın yokken, sunucu boştayken 4 sn boyunca sunucuya gelen paket 0–8/sn'ye düştü; UDP ve TCP dış sondalar aynı anda kayboldu; 4 kullanıcı birden giden kayıp bildirdi. 03:17:36 ve 02:19:30'da 1 sn'lik aynı kesinti.
- Sunucu (VMware, ens192) temiz: NIC düşüşü yok, UDP tampon hatası yok, steal 0, ufw'de hız sınırı yok, conntrack 1058/65536. Paketler sanal makineye gelmeden kayboluyor: barındırma sağlayıcısının ağı.
- "Kırmızı ama ms normal": gösterge yalnızca giden kayba (%10) ve pinge bakar; ping, yanıt alınan son STUN ölçümünde takılı kalır.
- Pencere oynatma tetikleyicisi kanıtlanmadı: 02:18 olayında yayıncı 3→10 Mbps, sunucu çıkışı 39 Mbps / 4300 pps, 2 sn sonra çöküş. Sağlayıcıda patlamayla tetiklenen bir süzgeç olabilir; aynı kesinti yayınsızken de var.
- Varsayılan yayın 1080p60 / 12 Mbps; LiveKit yumuşatmadan (pacer yok) her izleyiciye çoğaltıyor; PLI başına tam kare döngüsü olası (ölçülmedi).

## Yapılanlar (main 3d12e38; sunucuya kuruldu, istemci 0.9.4)
- microProbe kaldırıldı (bitiş sırasıyla saydığı için kısa kesintileri kaçırıyordu, saniyede 10 DNS sorgusu atıyordu). Tek sonda motoru: 5 hedef, 4 sonda/sn, gönderim sırasıyla sayım; kesinti = ≥2 farklı hedefte art arda ≥3 kayıp.
- NIC sessizliği: mutlak sıfıra yakın ölçüt (taban ≥20 pps, eşik clamp(%5, 8, 40)). Yalnız NIC'te görülen = "aday"; ≥2 farklı hedefte kayıp sondayla doğrulanırsa "tam". Gerçek gecenin verisiyle yeniden oynatma testi: 3 gerçek kesinti yakalandı, yanlış alarm 0.
- Tek NIC örnekleyicisi (SecondSampler); `outages.jsonl`, `netmin-*.jsonl`; `/api/admin/net/live|seconds|outages|minutes`.
- Sınıflandırıcı: eşzamanlılık şartı, `saglayici_kesinti/gelen/giden`, `sunucu_yolu`, `ayri_kullanicilar`; kaynak sorunu trafik oranına göre; "eksik kanıt" listesi.
- İstemci olay kaydı: masaüstü 1 sn, telefon 2 sn; 120 sn halka; tetikleyiciler (giden kayıp, STUN yanıtsız, BWE çöküşü, donma, yeniden bağlanma) ya da sunucu isteği (`VOICE_TRACE_REQUEST`); `traces-YYYY-MM-DD.jsonl`. Yeni istemci sürümü gerekir.
- Eskimiş ping "—" gösterilir. Masaüstü süreç çökmeleri (pencere, GPU, ana süreç, yanıt vermeyen) `/api/client-errors`'a bildirilir (`masaustu-surec|ana|yanitsiz`).
- Panel: tek "Bağlantı teşhisi" sekmesi (Canlı durum, Olaylar, Testler, Ayrıntı), sağlayıcı raporu (TR+EN).
- Hat testi: `--patlama` profili (yalnız yönetici kodu; yayın açıkken `--zorla` ister), sunucunun gördüğü kesintiler sonuçta.

## Öğleden sonra: kök neden bulundu ve sunucu taşındı
- Hat testi (14:55 ve 14:59 TSİ) kök nedeni gösterdi: gelen UDP ~1400 paket/sn üstünde tümüyle kesiliyor ([[saglayici-udp-paket-siniri]]).
- isimkayit'e yazıldı; istisna reddedildi.
- LightNode İstanbul saatlik açılıp ölçüldü (10.000 paket/sn kayıpsız), sistem taşındı: veri birebir kopyalandı (155 dosya, veritabanı özeti aynı), sertifikalar taşındı, DNS çevrildi ([[sunucu-lightnode-istanbula-tasindi]]).
- Yedek betiği, gözcü görevi, hafıza ve kılavuzlardaki adres güncellendi (depo d8212a5).

## Kararlar
- Yayın ayarlarına (bit hızı, PLI aralığı, öncelik) dokunulmadı. **Neden:** tetikleyici ölçülmedi; kalite kullanıcının kararı. **Reddedilen:** PLI throttle'ı artırmak, 1080p60'ı 8 Mbps'e indirmek, tek UDP portu — hepsi ölçümden sonra değerlendirilecek.
- Panelden kullanıcının masaüstünde uzaktan hat testi başlatma yapılmadı (ayrı dilim).

## Açık işler (güncel)
- Gerçek yayınla doğrulama: akşam 1080p60 yayın + hızlı pencere hareketi; "Bağlantı teşhisi" sekmesinde kesinti var mı.
- Sonda motoru: UDP ve TCP serilerini ayrı say (yalnız-UDP kesintisi kaçıyor).
- Yeni sunucuda otomatik güvenlik güncellemesi kapalı.
- Çıkan 40 Mbps ölçülmedi; trafik paketi 1000 GB, gerekirse 2000.
- Eski sunucuyu birkaç gün sonra sil (kökünde içeriği bilinmeyen `set-env.sh` var).

## Açık işler (sabahki liste)
1. ~~Sunucu kurulumu~~ yapıldı (3d12e38, 2026-10-01 06:38 UTC).
2. Kurulumdan sonra: yeni dedektör gerçek trafikte yanlış alarm veriyor mu; konteynerde conntrack okunuyor mu.
3. Patlama testi (yayın yokken) → sağlayıcıda patlama süzgeci var mı.
4. Sağlayıcıya (isimkayit / ik-cloud) kesinti raporu.
5. ~~İstemci sürümü~~ 0.9.4 yayınlandı (2026-10-01 06:48 UTC).

## İlgili
- [[ses-kalitesi-udp-kayiplari]] · [[admin-paneli-ve-loglar]] · [[ekran-paylasimi-sabit-presetler]] · [[otomatik-mod-ssh-engeli-yeni-sohbette]]
