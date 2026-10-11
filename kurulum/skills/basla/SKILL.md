---
name: basla
description: Yeni bir sohbetin başında ikinci beyinden (vault) projenin güncel durumunu okuyup kısa bir özet verir. Yalnızca kullanıcı /basla yazınca çalışır.
argument-hint: "[proje-adı]"
disable-model-invocation: true
---

# /basla: oturum başlangıcı

Amaç: bu sohbet hiçbir şey hatırlamıyor; vault'tan (`/Users/ziroo/ZZ/brain`) projenin durumunu **kademeli** oku ve kısa bir özet ver. Türkçe yaz. Vault'u toptan okuma.

## Adımlar
0. **Vault'u güncelle:** `git -C <vault> pull --ff-only` (vault GitHub'da özel repo: `zziroo/brain`). Ağ yoksa ya da çakışma varsa devam et ama özette "vault güncellenemedi" de.
1. **Projeyi belirle.** Argüman verildiyse o (`/basla diskort`). Yoksa çalışma klasörünün adından bul (`...\zProjects\<ad>`). `10-Projects\<ad>\_overview.md` yoksa `Home.md`'yi oku, hangi proje olduğunu kullanıcıya sor.
2. **`_overview.md`'yi oku** (özellikle "Güncel durum" ve "Sıradaki işler"). Frontmatter'daki `date` 3 günden eskiyse bunu söyle.
3. **Projeye özgü ek adımlar:**
   - **diskort:** `/Users/ziroo/diskort-inbox/` içindeki okunmamış dosyaları oku (`okundu/` hariç), özetle. Dosyaları `okundu/`ya **özeti kullanıcıya verdikten sonra** taşı. Özellik/UI önermeden önce hafızadaki `diskort-rules`'ı oku.
   - Diğer projelerde ek adım yoktur; varsa `_overview.md` içinde yazar.
4. **Özet ver** (en fazla ~12 satır):
   - Şu an durum (sürüm, sunucu, bilinen sorunlar)
   - Sıradaki işler (kısa liste)
   - Okunmamış inbox bulguları (varsa)
   - **Canlıdan doğrulanması gerekenler**: vault bir anlık görüntüdür; sunucu, sürüm ve repo durumunu işlem yapmadan önce kontrol et.
5. Ne yapılacağını **sor**; kendiliğinden iş başlatma.

## Kurallar
- Gerekmedikçe tek tek karar/ders notlarını açma; bir konu çıkarsa `Grep` ile ara.
- Vault'ta bir şey yazma (pull hariç). Yazmak için `/kaydet` var.
- Secret görürsen yansıtma.
