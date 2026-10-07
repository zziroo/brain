---
type: decision
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong, boss, mekanik, sahmerdan, animasyon]
source: Windows oturumu 2026-10-07 akşam (Scoria ilk davranış, repo 82cf0cc, design/boss-01 §6)
---

# Karar: şahmerdan zinciri makaradan geçip örsün yanındaki tek, sabit bir çekme noktasına iner; Scoria A1/B3 için oraya yürür

## Bağlam
İlk oyun içi davranışı izleyen Yusuf, zincir çekmenin "çok animasyon ve mekanik isteyeceğinden" endişelendi ve "Team Cherry tarzında yapılabilirse A ve B, yoksa C" dedi. Tasarımda zincirin geometrisi tanımsızdı: çekince çekicin yükselmesi için zincirin bir makaradan geçmesi gerekiyor, aksi hâlde hareket fiziksel olarak saçma.

## Karar
- **A (seçildi):** zincir şahmerdandan tavandaki makaraya çıkar, ikinci makaradan örsün yanındaki sabit çekme noktasına iner. Scoria ucu aşağı çektikçe çekiç yükselir, bırakınca örse düşer. Scoria A1/B3'ten önce çekme noktasına yürür; bu yürüyüş ek telegraph. Diğer saldırılar her yerden.
- Yükselmiş çekiç kamerada kalmalı; örsün çarpışması Scoria'yı da durdurmalı (ilk sürümde içinden geçiyor).
- Tasarım dokümanı güncellendi: [[10-Projects/silksong-mod/design/boss-01-kilnwright-scoria|Boss 01]] başlık notu ve §6.

## Neden
- A'nın gövde maliyeti tek 6 karelik zincir çekme klibi (kaba pozu zaten var); çekiç, zincir ve makara koddan hareket ediyor, kare istemiyor.
- Mekanik tek sabit nokta ve iki küçük state machine; oyunda üç döngü sorunsuz döndü (repo `82cf0cc`).
- Sabit nokta oyuncu için okunaklı ve öğrenilebilir.

## Reddedilen alternatifler
- **B, maşayla uzaktan kancalama (ertelendi):** yeni animasyon (maşa fırlatma) ve yeni mekanik. A hasarla oynanıp örse yürüme sıkıcı gelirse eklenir.
- **C, klasik boss, çekiç elde (reddedildi):** her saldırıda çekiçli kol karesi gerekir; karakter LoRA'sı çekiç kolunu çizemiyor ([[2026-10-06-cekic-arena-sahmerdani-siluet-a4]]); "kendi ocağıyla dövüşen usta" teması kaybolur. Göründüğü kadar basit değil.

## Sonuçlar / riskler
- Scoria'nın örse yürüme süresi savaş temposunu düşürebilir; oynanınca bakılacak (unverified).
- Faz 2'deki zincirdeki Harpoon Ring ile şahmerdan zincirinin ilişkisi hâlâ tanımsız.

## İlgili
- [[2026-10-06-cekic-arena-sahmerdani-siluet-a4]]
- [[2026-10-07-animasyon-hatti-kukla-kaba-poz-v8c-lora]]
