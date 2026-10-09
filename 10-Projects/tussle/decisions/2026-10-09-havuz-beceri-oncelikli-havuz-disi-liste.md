---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, oyun-havuzu, karar]
source: oturum 2026-10-09 (mobil-playus: Parti D-E-F, canlandırma, OFF_POOL)
---

# Günün oyunu havuzu anlık kontrollü beceri oyunlarını tutar; zayıflar OFF_POOL'da bekler

**Karar:** Yusuf "eğlenceli" derken görseli değil mekaniği kastetti: ilk oyunlar (Kule, Bıçak At, Refleks) gibi anlık kontrol, sonuç oyuncunun elinde. Şans ağırlıklı ya da "tek dokunuş, sonra izle" oyunları günün oyunu olmaz. Tutma/çıkarma kararı Claude'da ("vazgeçebilirsin, karar senin"). Mekanizma: `src/shared/pool.ts` `OFF_POOL` (itici, plinko, salyangoz, zar); oyunlar kayıtlı ve linkle oynanabilir kalır, hiçbir odanın günlük çekilişine girmez; oda ayarı doğrulaması ve ev sahibi paneli canlı havuzu kullanır. Şeker Vinci gizli kayma zarından arındırılıp saf nişan oyunu yapıldı (v2).

**Neden:** E partisi ("şans gibi hissettirmeyen şans") telefonda "bir şeyler eksik" bulundu; sorun görsel değil, kontrol azlığıydı. Kod silmek yerine havuz dışı tutmak geri alınabilir ve ileride kural yeniden tasarımına açık.

**Reddedilen alternatifler:** Oyunları silmek (emek kaybı, geri dönüş yok). Oda başına ev sahibine bırakmak (varsayılanı kötü olurdu). Meta'ya `pool:false` alanı (paylaşılan oyun sözleşmesini değiştirirdi; tek liste yeterli).

Bağlantı: [[2026-10-09-havuz-haric-tutma-listesi]], [[2026-10-09-ajanlar-tarayicida-oynar]].
