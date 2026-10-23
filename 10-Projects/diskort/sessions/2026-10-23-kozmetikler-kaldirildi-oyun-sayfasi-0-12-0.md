---
type: session
project: diskort
date: 2026-10-23
status: active
tags: [diskort, surum, kozmetik, etkinlik]
source: "diskort: 0.12.0 kozmetikler kaldırıldı + oyun sayfası" oturumu (Fable 5.1 koordinatör, 4 Opus ajan + 1 yan oturum)
---

# 2026-10-23: Kozmetikler her platformdan kaldırıldı, oyun sayfası eklendi, 0.12.0 yayında

**Yapılanlar**
- Yusuf "daha sade arayüz, telefonda akmıyor" dedi; öneri kill switch yerine tam söküm oldu, Yusuf "komple her yerden" diye onayladı. Karar: [[2026-10-23-kozmetikler-tamamen-kaldirildi]]. Commit `8dccfed`: 150 dosya, 21 bin satır silme; göç 28; mobil Skia ve yaması gitti.
- Paralel yan oturumda oyun sayfası popover'ı: [[2026-10-23-oyun-sayfasi-popover-baglantilar]] (`91183d0`, main'e `f8739e8`).
- Ses satırı sağ yuva kayması: ekran görüntüsü ölçümüyle bulundu, tek satır CSS (`5cf8b94`): [[grid-sarmalayici-auto-sutun-satiri-tasirir]].
- Sürüm 0.12.0 (`6907fbb`, `v0.12.0`): sunucu deploy (yedek `diskort-2026-10-23_1705.db.gz`, şema 28, `/data/cosmetic-packs` silindi), GitHub iş akışı bütün paketleri üretti (yeni APK + IPA, runtimeVersion değişti), yayın 17:25.
- Vault: eski kozmetik notları `superseded`; bellek: `diskort-cosmetics-plan` silindi, kozmetik kuralı "bir daha önerme" oldu.

**Orkestra:** mobil / shared+core+sunucu / masaüstü+belge diye üç söküm ajanı; ikincisi 200k tavanında devretti; inceleme (Opus high) kritik/yüksek/orta bulgu çıkarmadı, şüpheci gerekmedi. Ders: [[ajan-prettier-ile-dosyalari-yeniden-bicimledi]].

**Doğrulanmayanlar:** 0.12.0 canlıda hiç denenmedi (oyun sayfası Windows'ta, kozmetiksiz ekranlar, mobil kutucuk yüksekliği 128, sağ yuva hizası). Telefonlara APK/IPA elle kurulacak. Mac'te oyun algılama yok (açık iş değil, Yusuf isterse).
