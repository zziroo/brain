---
type: lesson
project: silksong-mod
date: 2026-10-06
status: active
tags: [lora, sd-scripts, windows, powershell]
source: Windows oturumu 2026-10-06, deneme eğitimleri
---

# sd-scripts önbelleği (npz) modele özgü; PowerShell 5.1 Python uyarısını hata sayar

1. **Önbellek:** `--cache_latents_to_disk` ve `--cache_text_encoder_outputs_to_disk`, `.npz` dosyalarını görsellerin yanına yazar ve sonraki çalıştırmada model kimliğine bakmadan yeniden kullanır. Taban model değişince (Illustrious → SDXL Base) text encoder çıktıları farklıdır; eski önbellek sessizce yanlış eğitim yapar. Model değiştirmeden önce `*.npz` sil (`tools/train/train_lora.ps1` bunu otomatik yapıyor). Caption elle düzeltildiğinde de `*_te_outputs.npz` silinmeli.
2. **PowerShell 5.1:** `$ErrorActionPreference = "Stop"` ve `*>&1` ile native bir programın stderr satırı (ör. Python `SyntaxWarning`) `NativeCommandError` olur ve script durur. Eğitim bitmiş olsa bile sıradaki iş başlamaz. Çözüm: `"Continue"` ve `$LASTEXITCODE` kontrolü.
3. **RTX 5070 (sm_120):** xformers 0.0.32 bu kartta çöküyor; `--sdpa` kullan. PyTorch cu128+ şart.

İlgili: [[2026-10-06-lora-tabani-sdxl-base]]
