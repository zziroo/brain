---
type: decision
project: isik-bekcisi
date: 2026-10-08
status: active
tags: [isik-bekcisi, gamepad, kontroller, girdi, arayuz]
source: oturum dd56e56a + a15a1fc5 (incremantal-game, 2026-10-07 gece → 2026-10-08); canlı b2bedf1 (gamepad main'de dca5184 + ced2f40)
---

# Karar: oyun gamepad'le baştan sona oynanır; savaş tuşları omuzda, başparmaklar çubuklarda kalır

## Bağlam
Gamepad desteği planlanmıştı ([[2026-10-07-isi-fenerde-ve-kosede-imlecte-gosterge-yok]]). Yusuf başlattırdı ve Shelldiver'ın gamepad düzenini iyi hatırladığını söyledi. Shelldiver'ın tuş eşlemesi hiçbir kaynakta bulunamadı (yalnız "tam gamepad desteği" yazıyor).

## Karar (canlıda)
- **Sefer.**
  - Sol çubuk yürür (tuşlardaki hızda; yarım eğmek yavaş yürütmez). Sağ çubuk feneri çevirir.
  - RT basılı odak, RB parlama, LB atılım, Start duraklatma.
  - Ön tuşlar (A/B/X) seferde boş.
- **Kamp ve konuşma.** A kullan (E), X konuş (F), B kapat ya da geri. Konuşma plakasında A sonraki satır.
- **Menüler (2. dilim).**
  - D-pad ya da sol çubuk bir seçimi gezdirir, A basar.
  - Gökyüzünde yıldızdan yıldıza gidilir; kör satın alma yok.
  - Panellerde ve ayarlarda ince, soğuk bir "odak çerçevesi" seçili düğmeyi gösterir. Yalnız gamepad son kullanılan cihazken görünür.
  - Kayıt silmede odak "İptal"de başlar.
- **Tuş simgeleri.** Son kullanılan cihaz gamepad ise ipuçlarındaki, köşedeki ve yıldız açıklamalarındaki tuş adları gamepad'inkine döner. Fare ya da klavyeye dokununca geri gelir.
- **Yalnız standart düzen.** Tarayıcının standart düzende bildirmediği gamepad'ler yok sayılır; tuşları yanlış okunup fare nişanını bozmasınlar diye.
- **Ses.** Gamepad basışı tarayıcıda sesi açan bir hareket sayılmıyor. İlk tuş ya da tıklama sesi açar; gamepad'le oynarken ses kapalıysa bir kez "Ses için bir tuşa basın ya da tıklayın" yazar.

## Neden
- İlk öneride parlama A'daydı. Yusuf: "adam feneri odaklarken bir yöne, parlama yapamayacak gibi"; sağ başparmak sağ çubukta. Bu yüzden ışıkla ilgili her şey omza alındı: sağ el ışığı, sol el yürüyüşü yönetir.
- Odak çerçevesi gamepad'de "şu an ne seçili" bilgisinin tek yolu. Fare kullanana hiçbir şey değişmesin diye yalnız gamepad'le görünür.

## Reddedilen alternatifler
- **A'da parlama, B ya da LT'de atılım:** başparmak çubuktayken basılamıyor.
- **Shelldiver'ın düzenini birebir almak:** düzen bulunamadı.
- **Standart olmayan gamepad'leri de okumak:** bazı tarayıcılarda tetikler sürekli basılı görünüp fare nişanını ve oynama süresini bozuyordu. Bunun için ileride bir eşleme tablosu gerekir.
- **WebHID ile gamepad'e doğrudan bağlanmak:** yalnız Chrome'da çalışır, tek bir cihaza özel olur; Bluetooth bağlantısı sorunu zaten çözdü ([[2026-10-08-mac-te-gamepad-tarayiciya-yalniz-bluetooth-ile-gorunur]]).

## Sonuçlar / açık
- 1. dilimi Yusuf gerçek gamepad'le (Flydigi Vader 5 Pro, Bluetooth) denedi. 2. dilim (menüler) gerçek gamepad'le denenmedi.
- Atılım kaldırılırsa LB boşalır; atılım incelenecekler listesinde.
- Dokunmatik ya da fare olmayan cihazda başlık ekranı hâlâ "bilgisayar oyunu" notu gösteriyor. Yalnız gamepad'le oynayan cihazlar desteklenecekse bu değişmeli.

İlgili: [[2026-10-02-masaustu-oyun-wasd-hareket-fare-isik]]
