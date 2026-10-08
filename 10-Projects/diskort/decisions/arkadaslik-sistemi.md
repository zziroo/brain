---
type: decision
project: diskort
date: 2026-10-08
status: active
tags: [diskort, dm, arkadaslik, gizlilik]
source: Claude Code oturumu 2026-10-08 (geri bildirim #32 Ziroo, #33 yasin; sürüm 0.10.0)
---

# Karar: Arkadaşlık sistemi; DM "ortak sunucu VEYA arkadaş" ile açılır

## Bağlam
İki geri bildirim aynı şeyi istedi: ortak sunucusu olmayan kişilere DM / arkadaş ekleme. O güne kadar DM yalnız ortak sunucudaki kişilerle açılabiliyordu.

## Karar
- Kullanıcı adıyla arkadaşlık isteği (istek atmak için ortak sunucu gerekmez); kabul / ret / geri çekme / arkadaşlıktan çıkma. Karşı tarafın bekleyen isteği varsa yeni istek kabul sayılır. Giden bekleyen istek sınırı 100.
- `PermissionService.canReach` = ortak sunucu ∨ arkadaşlık: DM açma, gruba ekleme, bire bir yazma. Arkadaşlık bitince ortak sunucu yoksa bire bir DM salt okunur (listede kalır), süren arama biter.
- Presence ve profil güncellemeleri arkadaşlara da gider (`contacts()` = ortak sunucu ∪ arkadaş); bekleyen isteklerdeki kişiler presence almaz.
- Engel: engellemek arkadaşlığı ve iki yöndeki istekleri siler; seni engelleyene istek atınca DM yoluyla aynı genel 403 ("şu an gönderemezsin"), nedeni söylenmez; engellediğine atınca nedeni söylenir. Engeli kaldırmak arkadaşlığı geri getirmez.
- Bildirim: telefona "friend-request" push (çift başına 10 dk'da bir), masaüstünde odak dışındayken sistem bildirimi (aynı sınır). Şema 26 (`friend_requests`, `friendships` user_a<user_b).
- UI: DM listesinin üstünde "Arkadaşlar" (Tümü / Bekleyen / Arkadaş ekle), ana sayfa rozeti = okunmamış DM + gelen istek; profil kartı, DM başlığı ve kişi menüsünde durum düğmesi. Mobilde `/friends`, bildirimden Bekleyen'e.

## Neden
Yusuf "Arkadaşlık sistemi" seçeneğini seçti (2026-10-08). Engelleme ile uyumlu, istenmeyen DM'ye kapalı.

## Reddedilen alternatifler
- Kullanıcı adıyla herkese DM (istek/kabul yok): küçük iş ama istenmeyen DM'ye açık.
- Ertelemek.
- Seni engelleyene 404 "bulunamadı": inceleme bulgusu, ortak sunucuda gördüğün birine "bulunamadı" demek engeli ele verirdi; genel 403 seçildi.

## Sonuçlar / riskler
- Kullanıcı adı bilen herkes istek atıp giden listesinden karşı tarafın profilini (avatar, afiş, kozmetik) görebilir (Discord'daki gibi; hesaplar davetle açıldığı için kabul edildi, 20/dk sınırı var).
- REST yanıtı tam listeyi uygular; arada gelen daha yeni FRIENDS_UPDATE bir sonraki olaya kadar ezilebilir (düşük, kabul edildi).
- Eski istemciler yalnız arkadaşlık üzerinden açılmış DM'de "ortak sunucu yok" gösterir.
