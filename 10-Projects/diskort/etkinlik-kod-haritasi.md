---
type: resource
project: diskort
date: 2026-10-01
status: active
tags: [diskort, etkinlik, kod-haritasi]
source: eski diskort-handoff hafıza notu (2026-09-30), _overview.md'den taşındı
---

# Etkinlik (oynanan oyun) özelliğinin kod haritası

Karar ve gerekçe: [[etkinlik-oyun-aktivitesi]]. Güncel proje durumu: [[_overview]].

- **Sözleşme:** `packages/shared/src/activity.ts`. `Presence.activities[]` (en yeni önce, en fazla 4), `ACTIVITY_SET {activities}`, ikon `/api/activity-icons/<sha256>`.
- **Sunucu:** oturum başına bellek içi liste, sıkı PNG doğrulama, 5 sn birleştirici. İkonlar `/data/activity-icons` altında ve yedeğe girmez; istemciler gerektiğinde yeniden yükler.
- **Masaüstü:** `apps/desktop/src/main/activity/`. Gizli PowerShell yardımcısı `scan.ps1` (~90 MB RAM; yalnızca girişliyken ve anahtar açıkken çalışır). Steam / Epic / Battle.net kitaplıkları + klasör kuralları, elle ekleme/gizleme, exe ikonu. Ayar bölümü "Etkinlik".
- **Gösterim:** `components/status/ActivityCard.tsx` (`PresenceSubline`), `sidebar/ActivityHoverCard.tsx`, `VoiceMemberRow.tsx`. Mobil yalnızca gösterir: `src/components/ActivityCard.tsx`.
- **Gerçek hayatta denenmedi:** gerçek oyunlar, anti-cheat oyunlar (Valorant), Battle.net oyunu, cihazda mobil. E2E yalnızca yerelde (9/9); ekran görüntüleri `<repo>\.claude\etkinlik-ekran\` altında (izlenmeyen klasör, commit etme). 4 kartlı profil kaydırmasını Yusuf gerçek kullanımdan sonra değerlendirecek.
