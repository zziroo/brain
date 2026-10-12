---
type: decision
project: diskort
date: 2026-10-12
status: active
tags: [diskort, roller, yetki]
source: Claude Code oturumu 2026-10-12 (commit 8f419e7)
---

# Karar: Rol verme/alma hedefin seviyesine bakmaz (Discord davranışı)

## Bağlam
Yusuf'un arkadaşı (yönetici değil, MANAGE_ROLES var) yeni rol açtı ama aynı seviyedeki arkadaşlarına veremedi. İlk roller commit'indeki (5999848) kural hedefin en üst rolünün actor'ünkinden aşağıda olmasını istiyordu; bu Discord'dan daha katıydı ve kayıtlı bir kullanıcı kararı değildi.

## Karar
Rol verme/alma şartları: MANAGE_ROLES, rol actor'ün en üst rolünün altında, rolde actor'ün sahip olmadığı yetki yok. Hedefin seviyesi (sahip dahil) önemsiz. Atma/yasaklama hiyerarşisi (`outranks`) değişmedi. Sunucu `routes/roles.ts canAssignRole`, istemci `client-core permissions.ts canAssignRole`; üyeler sayfası açıklamaları güncellendi.

## Reddedilen alternatifler
- Sahibi istisna tutmak: sahip zaten sonsuz seviyede, alt rol verilmesi zarar vermez; Discord da izin verir.
