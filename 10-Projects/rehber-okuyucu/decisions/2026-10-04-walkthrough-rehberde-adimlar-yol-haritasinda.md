---
type: decision
project: rehber-okuyucu
date: 2026-10-04
status: active
tags: [rehber-okuyucu, ai-belgesi, yol-haritasi, geri-bildirim]
source: oturum 2026-10-04; Yusuf'un arkadaşının Witcher 3 belgesi üzerine yorumu
---

# Karar: Sırayla anlatan rehberlerde adımlar yol haritasında yaşar, başarım kartı onları etiketle türetir

## Bağlam
Arkadaşın yorumu: belge öncelik konusunda hatalı; başarım adımlarını tek listeye toplamak için genel sırayı bozmuş, rehbere dağılmış Gwent kartı toplama adımlarını tek listeye almış; bunun dışında iyi. Neden: model talimatı "bir başarımın adımları o başarımın kartına aittir, yol haritasına konmaz" diyordu (Mr Mushroom rehberi için eklenmişti).

## Karar
- Talimat önce rehber türünü ayırır. **Walkthrough** (yazar oyunu sırayla anlatır): adımlar `roadmap` adımlarında, yazarın sırasıyla, kontrol listesi olarak durur. **Başarım başarım yazılmış rehber**: adımlar kartın kendi listesinde kalır.
- Kontrol listesi maddesine `ach: [kart anahtarı]` etiketi (1-8; yalnız `roadmap` ve `extras` içinde). Madde tek yerde saklanır.
- Arayüz: kart "Yol haritasındaki adımlar" bölümünde bağlı maddeleri adım sırasıyla gösterir; işaret iki yerde ortak; kart sayacı kendi + bağlı maddeler; yol haritası adımları ayrı birim (içindekiler satırı, sayaç, `#r-<n>`).

## Neden
Oynarken "şu an buradayım, ne yapmalıyım" (sıra) ile takip ederken "bu başarımda kaçtayım" (sayaç) ihtiyaçları çatışıyordu; bir madde tek yere konabildiği için biri feda ediliyordu.

## Reddedilen alternatifler
- Yalnız talimatı değiştirip kart içi listeyi bölge başlıklarıyla sıralamak: başarım içi sıra korunur ama adımlar genel akıştan yine kopar.

## Durum
Kod yayında (`17b5d67`). **Gerçek bir rehberde üretilmiş örneği yok**: ilk deneme kesilme hatasına takıldı ([[claude-cli-cikis-sinirinda-yeni-iletiyle-devam-eder]]). Arkadaş beğenmezse yeniden bildirecek.

## İlgili
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
