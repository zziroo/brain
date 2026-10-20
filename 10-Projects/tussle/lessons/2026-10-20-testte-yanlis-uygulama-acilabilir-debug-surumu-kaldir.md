---
type: lesson
project: tussle
date: 2026-10-20
status: active
tags: [tussle, android, test, cihaz]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi)"
---

# Telefon testinde yanlış uygulama açılabilir: cihaz hissini ölçümle doğrula, debug sürümünü iş bitince kaldır

- Telefonda hem Play sürümü (`net.ziroo.tussle`) hem debug `net.ziroo.tussle.dev` vardı; Yusuf testte yanlışını açabiliyor ve "bana çok güvenmeyin" dedi.
- Bir ajan "önce" ölçümü için eski APK kurmuştu; kullanıcı onu denedi ve eski davranışı yeni sandı.
- Kural: cihaz hissine dair geri bildirimi kayıt/ölçümle doğrula ([[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]]); debug ya da eski APK'yı iş bitince kaldır (bu oturumda kaldırıldı); hangi uygulamanın açık olduğunu söyle.
