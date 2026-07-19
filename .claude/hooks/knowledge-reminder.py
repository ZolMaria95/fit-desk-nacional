#!/usr/bin/env python3
"""
Hook Stop — auto-guardado de conocimiento (convención de CLAUDE.md).

Al terminar un turno, si hay cambios de CÓDIGO sin registrar en las bitácoras
(docs/decisiones.md / docs/aprendizajes.md), bloquea UNA vez y recuerda a Claude
persistir las decisiones/aprendizajes antes de cerrar. Anti-loop vía
`stop_hook_active`. No usa jq (solo python3, que es lo disponible).

Emite JSON en stdout solo cuando corresponde bloquear:
  {"decision":"block","reason":"…"}
En cualquier otro caso no imprime nada (exit 0) → el turno cierra normal.
"""
import json
import os
import subprocess
import sys

# Extensiones que cuentan como "cambio de código" digno de registro.
CODE_EXTS = (".ts", ".html", ".scss", ".java", ".sh", ".sql")


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except Exception:
        return  # sin payload válido: no interferir

    # Anti-loop: si este Stop ya provino de un bloqueo previo, no volver a bloquear.
    if data.get("stop_hook_active"):
        return

    # Raíz del proyecto: 3 niveles arriba de este archivo (.claude/hooks/x.py).
    proj = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

    def porcelain(*paths):
        try:
            out = subprocess.run(
                ["git", "-C", proj, "status", "--porcelain", "--", *paths],
                capture_output=True, text=True, timeout=10,
            ).stdout
            return [ln for ln in out.splitlines() if ln.strip()]
        except Exception:
            return []

    codigo = [ln for ln in porcelain("app", "backend") if ln.rstrip().endswith(CODE_EXTS)]
    bitacoras = porcelain("docs/decisiones.md", "docs/aprendizajes.md")

    # Hay código tocado pero las bitácoras no → probablemente falta registrar conocimiento.
    if codigo and not bitacoras:
        print(json.dumps({
            "decision": "block",
            "reason": (
                "Convención CLAUDE.md (auto-guardado de conocimiento): hay cambios de código "
                "sin registrar en la bitácora. Antes de terminar, persiste las decisiones y/o "
                "aprendizajes nuevos en docs/decisiones.md y docs/aprendizajes.md (con fecha y "
                "contexto), y luego termina. Si el cambio es trivial y no amerita registro, dilo "
                "en una línea y termina."
            ),
        }))


if __name__ == "__main__":
    main()
