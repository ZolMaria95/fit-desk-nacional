#!/usr/bin/env python3
# =====================================================================
# FitDesk · Deploy del frontend a GitHub Pages por la Git Data API.
#
# Por qué la API y no `git push`: el token de `gh auth token` (fine-grained PAT)
# sirve para api.github.com pero github.com lo RECHAZA en git-receive-pack (401).
# Ver docs/aprendizajes.md (2026-07-16).
# Por qué curl y no urllib: el Python de Homebrew no trae CA certs → urllib da
# CERTIFICATE_VERIFY_FAILED. Aquí python solo orquesta/serializa JSON; el HTTPS
# lo hace curl. (Evitamos jq, que no está instalado.)
#
# Uso:
#   1) cd app && npx ng build -c cloud --base-href /fit-desk-nacional/
#   2) python3 scripts/deploy-gh-pages.py
# =====================================================================
import base64, json, os, subprocess, sys, datetime

REPO = "ZolMaria95/fit-desk-nacional"
BRANCH = "gh-pages"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "app", "dist", "app", "browser")
API = f"https://api.github.com/repos/{REPO}/git"

if not os.path.isdir(DIST):
    sys.exit(f"✗ No existe {DIST} — corre primero: ng build -c cloud --base-href /fit-desk-nacional/")

TOKEN = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=True).stdout.strip()
if not TOKEN:
    sys.exit("✗ No pude obtener el token con 'gh auth token'")
HDRS = ["-H", f"Authorization: Bearer {TOKEN}", "-H", "Accept: application/vnd.github+json"]


def api(method, path, payload=None):
    args = ["curl", "-sS", "-X", method, f"{API}{path}"] + HDRS
    if payload is not None:
        args += ["-d", json.dumps(payload)]
    out = subprocess.run(args, capture_output=True, text=True, check=True).stdout
    return json.loads(out) if out.strip() else {}


# Artefactos extra que Pages necesita: .nojekyll (servir _*) y 404.html (SPA/hash fallback).
import shutil
shutil.copy(os.path.join(DIST, "index.html"), os.path.join(DIST, "404.html"))
open(os.path.join(DIST, ".nojekyll"), "w").close()

print(f"→ Subiendo blobs desde {DIST}")
tree = []
for dirpath, _, files in os.walk(DIST):
    for name in files:
        full = os.path.join(dirpath, name)
        rel = os.path.relpath(full, DIST)
        with open(full, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        r = api("POST", "/blobs", {"content": b64, "encoding": "base64"})
        sha = r.get("sha")
        if not sha:
            sys.exit(f"✗ blob falló: {rel}: {r}")
        tree.append({"path": rel.replace(os.sep, "/"), "mode": "100644", "type": "blob", "sha": sha})
        print(".", end="", flush=True)
print(f"  ({len(tree)} archivos)")

t = api("POST", "/trees", {"tree": tree})  # sin base_tree → reemplaza la raíz
tree_sha = t.get("sha")
if not tree_sha:
    sys.exit(f"✗ tree falló: {t}")

parent = api("GET", f"/refs/heads/{BRANCH}")["object"]["sha"]
print(f"→ parent {BRANCH} = {parent}")

msg = "deploy(front): lote UX/UI móvil + Equipo/endpoint " + datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
c = api("POST", "/commits", {"message": msg, "tree": tree_sha, "parents": [parent]})
commit_sha = c.get("sha")
if not commit_sha:
    sys.exit(f"✗ commit falló: {c}")

u = api("PATCH", f"/refs/heads/{BRANCH}", {"sha": commit_sha, "force": True})
if u.get("object", {}).get("sha") != commit_sha:
    sys.exit(f"✗ update-ref falló: {u}")

print(f"✅ Deploy OK · commit {commit_sha}")
print("   https://zolmaria95.github.io/fit-desk-nacional/")
