# Second Brain: kullanım kuralları (Claude için)

Bu klasör Yusuf'un ikinci beyni: düz Markdown, yerel, Obsidian ile uyumlu. Dil: **Türkçe**.

## Bağlamı şişirme kuralı (en önemlisi)
Kademeli açılım: önce `Home.md`, sonra ilgili projenin `_overview.md` dosyası, sonra gerekirse tek tek not. **Vault'u toptan okuma.** Bir şey ararken `Grep` ile ara, bulduğun notu oku.

## Yapı
- `00-Inbox/`: hızlı yakalama. İşlenmemiş şeyler buraya; haftalık boşaltılır.
- `10-Projects/<proje>/`: `_overview.md` (durum + bağlantılar), `decisions/` (karar kayıtları), `lessons/` (öğrenilenler), `sessions/` (oturum özetleri).
- `20-Areas/`: sürekli sorumluluklar ve çalışma kuralları (`working-rules/`).
- `30-Resources/`: kalıcı bilgi, kaynak, rehber.
- `40-Daily/`: `YYYY-MM-DD.md` günlük notlar.
- `90-Archive/`: bitmiş ya da eskimiş. Silme, buraya taşı.
- `99-Templates/`: not şablonları.

## Not yazma kuralları
1. Her notun frontmatter'ı olur: `type` (decision | lesson | session | resource | daily | project), `project`, `date`, `status`, `tags`, `source`.
2. Notlar kısa ve atomik: bir not = bir fikir ya da bir karar. Başlık, içeriği anlatan bir cümle olsun.
3. Bağlantı ver: `[[not-adı]]`. Yetim not bırakma; en az bir yerden (overview ya da Home) bağlansın.
4. Karar notunda **Neden** ve **Reddedilen alternatifler** mutlaka olsun. Bu beynin asıl değeri bu.
5. Dosya adları: küçük harf, tire (`kebab-case`), Türkçe karakter yok. Tarihli olanlar `2026-09-30-konu.md`.
6. Bir şey değiştiyse eski notu silme. `status: superseded` yap ve yenisine bağla.
7. Kaynağı yaz: hangi oturum ya da dosyadan çıktı (`source:`).

## Güvenlik
**Asla** şifre, token, API anahtarı, `.env` değeri, özel anahtar yazma. Sadece yerini söyle ("anahtar `~/.ssh/...` içinde"). Kişisel veri (ödeme, kimlik no) yazma.

## Bakım
- Haftalık: Inbox'ı boşalt, yetim notları bul, `Home.md`'yi güncelle.
- Oturum sonunda: önemli kararlar `decisions/` altına, öğrenilenler `lessons/` altına.
- Vault bir git deposudur ve GitHub'da özel bir kopyası var (`zziroo/brain`, 2026-10-05'ten beri). Yazmadan önce `git pull --ff-only` çalıştır. Büyük değişiklikten sonra commit at ve `git push` yap; böylece iki makine (Windows ve Mac) aynı vault'u görür.
