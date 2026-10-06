---
type: lesson
project: silksong-mod
date: 2026-10-06
status: active
tags: [bepinex, unity, mod, guvenlik]
source: Windows oturumu 2026-10-06, kod incelemesi (BepInEx 5.4.23.5 decompile)
---

# BepInEx 5 preloader hataları yutar; kritik yamayı BepInEx'e bağlama

BepInEx 5.4.23.5'te `AssemblyPatcher.PatchAndLoad`, yamalı assembly'yi `Load()` ile (Write + Assembly.Load) try dışında yükler; `Preloader.Run` tüm istisnaları yakalayıp sadece loglar. Sonuç: patcher yazımı ya da yüklemesi patlarsa Unity diskteki **orijinal** DLL'i yükler, chainloader da (alfabetik sırada Assembly-CSharp'tan sonra gelen CoreModule yaması atlandığı için) hiç başlamaz. Oyun sessizce vanilla açılır.

**Ders:** Güvenlik açısından kritik bir değişiklik (ör. kayıt yolu) BepInEx'in çalışmasına bağlı olmamalı. Yamayı diskte, modlu kopyanın DLL'ine göm; BepInEx tarafı yalnızca doğrulasın ve başarısızlıkta öldürsün (fail-closed).

Ek not: BepInEx `UnityPatches` ile `Assembly.Location`'ı kancalar; "bu DLL diskten mi yüklendi" kontrolü yanıltıcıdır. Kimlik için MVID karşılaştır.

Uygulandığı yer: [[2026-10-06-kayit-yonlendirme-diske-gomulu-dll]]
