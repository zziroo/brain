---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, ders, akicilik, olcum, view-transitions, araclar]
source: oturum "tussle: arayüz cilası (geçiş, koyu tema, sohbet)" (2026-10-19 akşam)
---

# Ders: geçiş/animasyon ölçümü gizli bölmede yapılamaz; View Transition tuzakları

- **Gizli tarayıcı bölmesi rAF vermez:** uygulamanın yerleşik tarayıcı bölmesi gizliyken sayfa arka planda çalışır; requestAnimationFrame durur, View Transition takılır, ResizeObserver tetiklenmez. Kare ölçümü ve animasyon doğrulaması için ajanlar kendi başsız Chrome'unu kullandı: puppeteer-core + CDP, 390×844 DPR 3, CPU 4x yavaşlatma, `vite preview` ile üretim derlemesi, yerel API ve karalama veri klasörü. Ölçüt: geçiş içi en uzun kare, geçiş sırasında eklenen DOM düğümü, `getAnimations()` keyframe'lerinin yalnız transform/opacity olması, iz dosyasında compositor hatası.
- **"Önce/sonra" için `git stash` değil, geçici `git worktree add --detach`** (başka ajanlar aynı çalışma kopyasında).
- **View Transition anlık görüntüleri ata kırpmasını yok sayar:** kaydırıcı içindeki öğe (oda sohbeti) üst çubuğun/yazma kutusunun üstüne taşar. Kaydırıcı içi hareket için FLIP; dönüşüm kaynağı kaydırıcının görünen bandında en az yarısı görünmeli.
- **Aynı `view-transition-name` iki öğede olursa Chromium geçişi iptal eder;** adlar yakalamadan hemen önce verilir, her yolda (atlanan, iptal edilen geçiş dahil) temizlenir. Atlanan geçişin temizliği bir sonraki geçişin adlarını silmemeli (`trackTransition`/`endTransition` tek kez çalışır).
- **Geçiş sırasında canlı yeni ekran son yerinde durur ama görüntüsü kayıyor:** hızlı ikinci dokunuş görünmeyen düğmeye gider; giren ekran ve dönüşen alt sayfa tıklamaya kapatılmalı, arka plan tıklaması da dönüşüm sırasında kapatmamalı.
- **CSS `:has()` iOS 15.4 altında yok** (iOS hedefi 15.0); bekçi/geri dönüş yolları `:has`'a dayanmamalı.
- **Sabit `box-shadow` keyframe'i ana iş parçacığında koşar;** yalnız geçiş sınıflarında statik gölge yeter.

İlgili: [[2026-10-19-ekran-gecisi-itme-paylasilan-oge-sonra-doldur]], [[2026-10-18-yayin-temiz-worktree-den-yan-oturum-ayni-klasorde]].
