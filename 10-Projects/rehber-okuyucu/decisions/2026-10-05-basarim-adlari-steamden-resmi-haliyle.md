---
type: decision
project: rehber-okuyucu
date: 2026-10-05
status: active
tags: [rehber-okuyucu, karar, dil, steam]
source: oturum 2026-10-05 (achievement-guide-formatter), Yusuf'un "başarım adları bazen İngilizce kalıyor" bulgusu
---

# Karar: Başarım adlarını AI çevirmez; kartta Steam'deki resmi ad görünür, dili okuyucu seçer

## Bağlam
Türkçe belgelerde bazı başarım adları İngilizce, bazıları çevrilmiş çıkıyordu. Resmi liste gelmeyen Rusça bir rehberde 62 karttan 17'sinin adı Rusçadan geri çevrilmiş ve yanlıştı (ör. "Mercy" yerine Solace).

## Karar
- Çıktı dili seçenekleri: Özgün (varsayılan) / Türkçe / İngilizce (`ai_lang` = original | tr | en, şema v5).
- Kartta modelin yazdığı ad değil, `apiName` ile eşleşen Steam resmi adı ve açıklaması gösterilir.
- Okuyucuda "Başarım adları" seçim kutusu (30 Steam dili). Seçilen dil sunucudan istenir, sunucu Steam'den `l=<dil>` ile çekip (oyun, dil) başına önbelleğe alır. Varsayılan: belgenin dili.
- Diğer özel adlar (eşya, NPC, bölge) rehberde nasıl geçiyorsa öyle kalır; çeviride oyunun o dildeki resmi adı biliniyorsa o kullanılır.
- Ziyaretçi kaynaklı Steam çekmeleri sınırlı: IP başına saatte 30, toplam saatte 60, aynı anda 1; `l=english` hiç Steam'e gitmez (hattın önbelleği korunur).

## Neden
Yusuf'un sözü: kullanıcı çevrilmiş adı görmeyecek, Steam'de ne yazıyorsa onu görmeli. Oyunda ve Steam profilinde aranan ad budur.

## Reddedilen alternatifler
- AI'ın adları çıktı diline çevirmesi: oyunda öyle bir ad yok, aranamaz, yanlış çeviri riski.
- Kartta çıktı dilindeki ad + altında İngilizce ad: Yusuf seçim kutusunu tercih etti.

## Sonuçlar / riskler
- Kart açıklaması da resmi açıklama oldu: oyunun Türkçe çevirisi yoksa Türkçe belgede açıklama İngilizce görünür (tek satırla değiştirilebilir).
- Gizli başarımlarda Steam açıklama vermez.

## İlgili
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
