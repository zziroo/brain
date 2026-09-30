---
type: lesson
project: diskort
date: 2026-09-30
status: active
tags: [diskort, orkestrasyon, ajan, worktree]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl, 54dc3a33-8a43-4d66-8774-07b1dfa4d58f.jsonl, 69fe2863-181c-42b1-bef7-d93dd8e73177.jsonl, a23848e8-c89f-4e6e-b205-6a370f117b82.jsonl
---

# Ajan akışında tekrar eden tuzaklar

- **Aşırı yük (529):** bir ajan aynı sunucu hatasıyla iki kez dosya değiştirmeden durdu; aynı görevi sıfırdan yeniden başlatmak gerekti.
- **Ajanın kendi işi açık kalır:** bitmiş ajan, arka planda başlattığı test sunucusu/ölçüm/render yüzünden "çalışıyor" görünebilir; durdurmadan önce gerçekten boşta mı bak. Yeniden uyandırılan ajan tekrar bildirim gönderir ("yeni bilgi yok" bildirimleri).
- **İzin sınıflandırıcı:** "Irreversible Local Destruction" kuralı bir ajanın `git rm` ile dosya silmesini engelledi (DeepFilterNet 3 kaldırma); silme kullanıcı onayıyla koordinatörce yapıldı.
- **Review ajanı yan etkisi:** iki review ajanı yanlışlıkla ana çalışma kopyasında `git checkout --detach` çalıştırdı; her seferinde `main`'e geri alındı. Review promptuna "ana kopyada checkout yok" yazılmalı.
- **Gizli Electron penceresi:** ajanın çizim aracı (hidden Electron) komut kapanınca Windows'ta hata penceresi gösterdi; araç düzeltildi.
- **Testler paralel koşuda zaman aşımı:** `engine.test.ts` ve bir sunucu testi tam koşuda bir kez zaman aşımına uğrayıp tekrarda geçti (zamanlamaya duyarlı, bkz. devir notundaki "rastgele başarısız iPhone testleri" önerisi). Makine üç ajanla yüklüyken paket paket çalıştırmak işe yaradı.
- **Ajan raporu doğrulama:** bir ajan "kaynağı kaçış dizisiyle yazdım" dedi, dosyada ham karakterler vardı; koordinatör doğrulayıp düzeltti. Ajan raporlarını review+skeptic olmadan "doğrulanmış" sayma.
- Eski worktree klasörlerini silmek analizde bilgi kaybettirmez (hepsi main'e birleşmişti); birleşmemiş işi olan klasör bilerek bırakıldı ([[2026-09-30-mimari-tanitim-videosu]]).
- Ortam: `%APPDATA%` altında eski test profilleri (yaklaşık 335 MB) birikmişti, kullanıcı onayıyla silindi.
