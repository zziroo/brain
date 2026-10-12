---
type: decision
project: pano
date: 2026-10-13
status: active
tags: [pano, artifact, gizlilik, yayin]
source: ZZ oturumu 9f1a0281 ("bu araci artifactlara ekleyebilir misin")
---

# Karar: Pano claude.ai'de özel, metinli bir Artifact olarak tutulur, yalnız istek üzerine ve yalnız yeni metin okunarak güncellenir

## Bağlam
Yusuf panoyu "artifactlara eklemek" istedi. Artifact'ların nasıl çalıştığını tam bilmediğini söyledi ve "canlı olmayacak mı, bir kere yüklesek yetmiyor mu" diye sordu. Panoda bütün istem metinleri ve alt ajan istemleri var. Transkriptlerde ayrıca sunucu IP'si ve root SSH komutları geçiyor ([[2026-10-13-transkriptler-terminal-komutlarini-de-saklar]]).

## Karar
- **Metinli ve özel:** istem metinleri dahil. Yusuf açıkça "Metinli"yi seçti. Artifact varsayılan olarak yalnız ona açık.
- **Güncelleme yalnız istek üzerine:** `/pano yayınla` denince aynı adrese yeni sürüm yüklenir.
- **Yalnız yeni metin okunur:** `pano/yayin-kontrol.mjs` son yayından beri eklenen metinleri listeler; yayından sonra `--onayla` ile kaydedilir.
- **Yayın çıktısı maskeli, yerel pano değil:** `pano.mjs --artifact` ile üretilen çıktıda genel IPv4 adresleri `[IP]` olur ve `pano/yayin-maskeler.json`'daki dizeler değiştirilir. İlk listede Apple API anahtar kimliği ve Team ID, bir Instagram izleme parametresi ve arkadaş adlarının geçtiği bir istem var.

## Neden
- Artifact claude.ai'de duran sabit bir sayfa. Mac'teki transkriptlere erişemez, bu yüzden canlı olamaz; yayın anının fotoğrafıdır.
- İçerik claude.ai'de durur ve link paylaşılırsa her şey görünür. Yusuf maske kararını Claude'a bıraktı: "farketmez nasıl istersen. paylascagimi pek dusunmuyorum ama yanlislikla paylasilir belki". Bu yüzden kendi istemleri kaldı; saldırgana ya da üçüncü kişilere dokunan birkaç şey gizlendi.
- Yayından önce yayınlanacak metnin tamamı okunmalı. İlk yayında ~630 bin karakter vardı; üç `sonnet` okuma ajanı ve bir şablon/uyum ajanı okudu, okumalardan sonra eklenen 12 metni koordinatör okudu. Her güncellemede baştan okumak pahalı olurdu; yalnız fark okunuyor.

## Reddedilen alternatifler
- **Metinsiz yayın:** Yusuf metinliyi seçti.
- **Hiç maske yok:** link yanlışlıkla paylaşılırsa sunucu adresi ve root SSH komutları da giderdi. IP panoda hiçbir işe yaramıyor.
- **Otomatik ya da zamanlanmış güncelleme:** her yayından önce okuma gerekiyor ve Yusuf tek seferlik yüklemeyi yeterli buldu. İstek üzerine güncelleme yeterli.
- **Veriyi ayrı dosya olarak yayınlayıp sayfadan fetch etmek:** tek dosya 2,2 MB, sınır 16 MB; ek karmaşıklığa gerek yok.

## Sonuçlar / riskler
- Maske listesi elle tutuluyor. Yeni bir hassas dize ancak yayın öncesi okumada yakalanır, bu yüzden okuma atlanmamalı.
- Okunan dosya ile yayınlanan dosya aynı olmalı. Okumadan sonra `pano.mjs` yeniden çalıştırılırsa fark yeniden kontrol edilir.
- Yayın parçasının biçimi: [[2026-10-13-artifact-sayfasi-kendi-iskeletini-tasimamali]].

## İlgili
- [[10-Projects/pano/_overview|Pano]], [[2026-10-07-pano-dashboard]], [[araclar-ve-raporlar]]
