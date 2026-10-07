---
type: lesson
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong, orkestrasyon, test, ajan]
source: Windows oturumu 2026-10-07 akşam (palet ve boss ajanları paralel)
---

# İki ajan aynı oyunu test ediyorsa: atomik kilit klasörü, tek derleyen ajan, her çalıştırmada ayarı baştan yaz

- **Kilit:** `mkdir D:\SilksongMod\work\.game_lock` atomik; başarısızsa diğeri tutuyor, ~60 sn'de bir dene. İçine `owner.txt`. Oyun süreci tamamen kapanmadan kilit bırakılmaz. Bir ajanın süreç tespiti hatalıydı, kilidi oyun açıkken ~30 sn bıraktı; süreç adını doğru eşleştir, önce temiz kapat, sonra zorla.
- **Derleme:** yalnız bir ajan `dotnet build` yapar (yarım C# başka ajanın testini bozar). Diğeri set dosyalarını doğrudan `plugins\SunkenForge\dress\<ad>\`'a kopyalar.
- **Ayar dosyası ortak:** her çalıştırmada testin dayandığı tüm anahtarları açıkça yaz, önceki duruma güvenme; başlamadan cfg yedeği al.
- **Kullanıcı pencereye dokunursa** tıklamasız tur bozulur; ajanlara haber ver, o turun görüntülerini şüpheli say.
- **Ölü/zorla kapatılan oturumdan sonra** oyun ilk kurulum ekranlarını (dil, ekran kenarı, parlaklık) gösterdi; neden belirsiz (unverified, muhtemelen `_SunkenForgeMod\AppConfig.ini`). Gerçek kayıtlar etkilenmedi.

İlgili: [[2026-10-06-kayit-yonlendirme-diske-gomulu-dll]]
