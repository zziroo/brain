---
type: decision
project: tussle
date: 2026-10-22
status: active
tags: [tussle, pazarlama, davet, olcum, huni]
source: "oturum 2026-10-22 (mobil-playus: pazarlama durum değerlendirmesi), main 1a459eb"
---

# Karar: Davet odaya değil kapışmaya (maç linki); ölçüm üçüncü taraf SDK yerine kendi `events` tablosu

## Bağlam
Pazarlama çıkış çizgisi ([[2026-10-20-sessiz-yayin-ayri-tanitim-hamlesi-ayri]]) üç koşuldu: arena oyunları hazır (tamamdı), ölçüm/huni (yoktu), kısa davet akışı (yoktu). Yusuf: "odaya davet çok gerekli gelmedi, direkt kapışmaya çağırsın, içeri girsin."

## Karar
- **Kapışmaya davet:** her açık kapışma kartı rastgele 10 karakterlik jeton taşır (`matches.invite`, göç 28). Kartta "Davet et" → sistem paylaşımı, metin "{ad} seni Tussle'da {oyun} kapışmasına çağırıyor" + `/?mac=TOKEN`. `GET invites/:token` (kimliksiz: oda adı, davet eden, oyun, durum; oda kodu yok), `POST invites/:token/join` (odaya üye yapar + boş koltuğa oturtur; kart dolu/bitmişse `seated:false`, odaya düşer; jeton maç bitince de oda daveti olarak çalışır, bilinçli). Bekleyen davet `localStorage` 7 gün (eskiden sessionStorage, ilk kurulumda kayboluyordu). Odaya davet (QR + 4 harfli kod) arka planda kalır.
- **iOS:** Install Referrer yok; açılış sayfası kodu gösterir, ana ekrandaki "Odaya katıl" alanı 10 karakterlik jetonu ve yapıştırılmış linki/“Kod:” satırını kabul eder. Android'de Play referrer linki yalnız `INSTALL.android.stage === 'store'` olunca eklenir (kapalı test opt-in linki taşımaz); uygulama tarafı eklenti Faz 2.
- **Ölçüm:** sunucu servislerinin kendisi yazar, istemciye güvenmeden: `events(kind, user_id, room_id, data)` (göç 27) — signup, room-create/join (how: code|invite), try-start/submit, match-create/join/finish (oyuncu başına), party-start, purchase, invite-send, invite-join. `users.source` ('invite', diğerleri şimdilik NULL) + `invited_by` yalnız taze hesapta (15 dk) ve ilk davette. Okuma: `feedback-cli huni [--days N]` ve /admin "Huni" sekmesi (ortak `scripts/funnel-sql.mjs`): kayıt → ilk oda → ilk oyun → ilk biten maç, D1 (pencere kohortu) / D7 (14–7 gün önce kohortu), günlük aktif, davet paylaşım → katılım → oturan.
- **Davetli tanıtımı:** Faz 2'de slaytlar yerine tek kart (davet eden + oyun kapağı + tek satır anlatım + isim + Katıl, altta "Tussle nedir?"), ilk maçtan sonra "Tussle'ı tanı". Yusuf ikna olmadı; önce telefonda deneyip karar verecek.

## Neden
"Ali seni Sumo'ya çağırıyor" bir an daveti, "odaya gel" bir yapı daveti; mesajda ilki çok daha güçlü ve ilk maça varış süresini kısaltır. Kendi olay tablosu gizlilik duruşunu (SDK yok) korur ve huni sorusunu tek komutla cevaplar.

## Reddedilen alternatifler
- Üçüncü taraf analitik SDK: "SDK yok" beyanını bozar, ek bağımlılık.
- İstemciden gelen huni olayları: sahte/eksik olur; istemci yalnız invite-send'i tetikliyor, o da sunucuda yetkiyle yazılıyor.
- Davet teşviği (hak hediyesi): önce doğal oranı ölç.
- Tek tx'te üyelik + koltuk: ws yayınları tx'e girmiyor; iki atomik adım, aradaki tek hata zaten istenen "koltuk gitti" cevabı.

## Sonuçlar / riskler
- Mağaza beyanları: Play Data safety "Uygulama etkileşimleri / Analiz", ASC "Usage Data → Product Interaction (Analytics, Linked)" konsolda **Yusuf güncelleyecek** (store/listing.md §6/§7 yazıldı, gizlilik sayfası 22 Eki).
- Telefonda denenmedi: davet düğmesi, web açılış kartı, linkten VS sahnesine düşme, iOS kod yapıştırma.
- Faz 2 açık: onboarding davetli kartı, Android Install Referrer eklentisi, "Tussle'ı tanı" kartı, `#/mac/TOKEN` için router rotası (uygulama içinden gidilirse karşılanmıyor), `users.source` 'store'/'web' ayrımı.

## İlgili
- [[2026-10-20-pazarlama-konumlandirma-canli-kapisma]], [[2026-10-20-tussle-pazarlama-plani]], [[2026-10-22-tussle-kapismaya-davet-ve-huni]]
