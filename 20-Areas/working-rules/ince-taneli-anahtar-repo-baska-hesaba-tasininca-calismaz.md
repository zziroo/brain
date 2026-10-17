---
type: lesson
project: genel
date: 2026-10-07
status: active
tags: [diskort, github, token, gecis]
source: oturum 2026-10-07 (zziroo taşımasının VPS kontrolü)
---

# Repo başka hesaba taşınınca eski hesabın ince taneli anahtarı yazma iznini kaybeder; okuma çalıştığı için fark edilmez

## Ne oldu
Diskort repo'su `yusufholat`'tan `zziroo`'ya taşındıktan sonra sunucudaki `GITHUB_DISPATCH_TOKEN` (yusufholat'ın ince taneli anahtarı) iOS iş akışını başlatamaz oldu: `403 "Resource not accessible by personal access token"`. Repo herkese açık olduğu için aynı anahtarla okuma (`GET .../workflows/ios.yml`) 200 döndü ve sorun gizlendi. Eski hesap collaborator olarak kalsa da ince taneli anahtar yalnızca kendi sahibinin repolarına erişir.

## Ders
- Repo taşındıktan sonra o repoya bağlı her anahtarı **yazma** işlemiyle dene; okumanın çalışması kanıt değil.
- Zararsız deneme: var olmayan bir dalla iş başlatma isteği. `POST /repos/<sahip>/<repo>/actions/workflows/<dosya>/dispatches` ve `{"ref":"yok-boyle-bir-dal"}`. `422 No ref found` izin var demek (iş başlamaz), `403` izin yok.
- Anahtarı yeni hesapla yeniden oluştur ve sunucuya yazarken eski satırı değiştir (eklersen iki satır olur). Tarif: Diskort `docs/ios.md` §3.

## İlgili
[[2026-10-06-github-repolari-zziroo-hesabina-tasindi]], [[secret-isleme-kurali]], [[10-Projects/diskort/_overview|diskort overview]]
