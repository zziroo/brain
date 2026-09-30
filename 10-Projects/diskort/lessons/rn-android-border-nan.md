---
type: lesson
project: diskort
date: 2026-09-30
status: active
tags: [diskort, react-native, android, cokme]
source: memory diskort-rules.md (RN 0.86 Android borders, feedback #29)
---

# RN 0.86 Android: `experimental_backgroundImage` olan view'a border prop'u koyma ya da açıp kapama

Kaldırılan border'lar NaN olur: native çökme ya da bozuk kırpma (geri bildirim #29). `borderWidth`'ü değiştiren bir stilin temel `borderWidth: 0` değeri olmalı.

## İlgili
- [[_overview]]
