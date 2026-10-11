---
name: docfmt-purpose
description: "document-formatter is for the user's translator friend who must keep using Trados; the tool fixes Trados output layout, never replaces the translation step"
metadata:
  node_type: memory
  type: project
  originSessionId: 1f6fd62e-af38-4bc1-b87c-e79236bf6379
  modified: 2026-10-05T17:21:55.977Z
---

docfmt (built 2026-10-05) takes the original English PDF plus the Trados-produced Turkish DOCX (Trados converts PDF→DOCX, layout breaks) and places the Turkish text back into the original PDF layout. Output is a PDF, not editable Word.

**Why:** the translation must go through Trados (the friend's workflow); a tool that extracts and translates by itself would just duplicate the program. The user rejected that design.

**How to apply:** improvements should target alignment (Trados DOCX ↔ PDF segments) and rendering. Don't propose bypassing Trados.

**sdlxliff (2026-10-05):** Trados's `.sdlxliff` is the primary input; DOCX is only a fallback. Yusuf's rule: text missing from the sdlxliff was never translated and should stay as in the original PDF (English). Don't spend effort on it. Validate matching-heuristic changes by diffing .eslesme.csv on both test documents (vault lesson in pdf-ceviri).

**Görünürlük (2026-10-05):** Yusuf: sdlxliff'teki her Türkçe metin çıktıda bir şekilde görünmeli; birebir yeri yoksa komşu parçaya eklenir, sessizce atılmaz (görünmeyen kalırsa raporda listelenir). Exception: field-only text like "Page x of y".
