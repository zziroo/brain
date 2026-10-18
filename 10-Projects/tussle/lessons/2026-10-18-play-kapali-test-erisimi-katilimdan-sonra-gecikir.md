---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ders, play, kapali-test]
source: oturum 2026-10-18 akşam (mobil-playus, "tussle: durum ve kalan işler")
---

# Ders: kapalı testte gruba katılıp testçi olduktan sonra Play bir süre "Öğe bulunamadı" der, beklemek yeter

- Arkadaşlar Google Grubu'na katılıp opt-in yaptıktan hemen sonra Play uygulaması "Öğe bulunamadı" gösterdi. Konsol doğruydu (Alpha etkin, 9 (1.5) yayında, testçi `tussle-test@googlegroups.com`, 178 ülke); bir süre sonra kendiliğinden açıldı.
- Teşhis sırası: önce bekle (dakikalar, bazen saatler); sonra Play'deki hesap gruba katılan Gmail mi; sonra Chrome'da aynı hesapla `https://play.google.com/apps/testing/net.ziroo.tussle` "test kullanıcısısın" diyor mu; en son Play Store önbelleği.
- Kurulum kartındaki indirme adımı ipucu bunu zaten söylüyor ("Play'de çıkmazsa birkaç dakika bekle").

İlgili: [[2026-10-16-kapali-test-google-grubuyla-acildi-mail-toplanmaz]], [[2026-10-18-kurulum-adimlari-sirali-indirme-kilitli]].
