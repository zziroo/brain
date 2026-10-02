---
type: lesson
project: ceviri-araci
date: 2026-10-02
status: active
tags: [ceviri-araci, excel, inceleme]
source: 2026-10-02 inceleme turları
---

# Excel'den çeviri alırken gizli ID sütunu tek başına güvenilir değil

Çevirmen görünür sütunları (A:G) seçip sıralarsa gizli ID sütunu yerinde kalır ve çeviriler sessizce yanlış satırlara gider. Çözüm: autofilter ID sütununu da kapsar; ID yalnızca satırın Dosya + Anahtar hücreleriyle uyuşursa kabul edilir, uyuşmazsa Dosya + Anahtar ile, sonra tekil kaynak metinle eşleştirilir. Kaynak metni dosyadakinden farklıysa (oyun güncellenmiş) çeviri uygulanır ama satır numaralarıyla uyarılır.

Genel ders: kullanıcının düzenleyebileceği bir tabloda gizli anahtara körü körüne güvenme; görünür bağlamla çapraz doğrula ve her sapmayı satır numarasıyla raporla.

Bağlam: [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]]
