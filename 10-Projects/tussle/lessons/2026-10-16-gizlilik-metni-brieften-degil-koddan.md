---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, gizlilik, ajan, ders]
source: Claude Code yan oturumu 2026-10-16 "tussle: mağaza hazırlığı"
---

# Ders: gizlilik ve veri güvenliği metni brief'teki varsayımdan değil koddan yazılır; ajan üç brief varsayımını çürüttü, inceleme bir saklama sözünü yakaladı

Koordinatörün brief'i "e-posta bağlı hesabı göstermek ve birleştirmek için kullanılır", "avatar ayarları saklanır", "uygulamada Google/Apple girişi var" diyordu. Kod: e-posta yazılıyor ama hiçbir yerde okunmuyor; avatar rengi kullanıcı id hash'inden türüyor, ayar yok; native kabukta sağlayıcı düğmesi hiç yok. Ajan her maddeyi `file:line` ile doğrulayıp brief'e uymadı; metin buna göre yazıldı. İnceleme ajanı ise sayfanın "silinen veri 14 günde yedeklerden çıkar" sözünün `deploy/release.sh`'in aldığı ve elle silinen `pre-<sha>.db` kopyalarıyla çeliştiğini buldu; söz 30 güne çekildi, budama koordinatöre not edildi.

Kural: hukuki/mağaza metni üreten ajana "her iddia için kanıt satırı, brief'e uymayan bulguyu raporla" de; metni ayrı bir inceleme ajanı yedek/günlük/dağıtım betiklerine karşı da okusun (yalnız uygulama koduna değil). Bir de canlı sunucu ayarı (Caddy `log`) depodan farklı olabilir; yayında teyit.

İlgili: [[2026-10-16-gizlilik-sayfasi-sunucudan-statik-en-tr]]
