# AGENTS.md

Guidance for AI agents working in this repository.

## Repository layout

| Branch | Contents |
|--------|----------|
| `main` | Placeholder only (`README.md` with title). No application code. |
| `cursor/portfolio-template-9b3d` | **Active app**: zero-dependency static portfolio (HTML / CSS / JS). |

When developing or testing the portfolio, check out `cursor/portfolio-template-9b3d` (or merge it into your working branch).

## Cursor Cloud specific instructions

### Product

Bilingual (zh/en) personal portfolio template. All editable copy lives in `content.js`. No build step, no package manager, no Docker.

### Services

| Service | Required | Start | URL |
|---------|----------|-------|-----|
| Static file server | Yes (recommended for local dev) | `python3 -m http.server 8000` from repo root | http://localhost:8000 |

Opening `index.html` via `file://` also works; a local HTTP server avoids occasional browser restrictions on module/script loading.

### Lint / test / build

None configured. There is no `package.json`, Makefile, or test runner. Validation is manual: serve the site and verify in a browser (language toggle, theme toggle, scroll/reveal).

### Non-obvious notes

- **Branch**: `main` is empty; the portfolio exists on `cursor/portfolio-template-9b3d`.
- **Dependencies**: Nothing to install. Python 3 is preinstalled on Cloud VMs for `http.server`.
- **Hot reload**: Edit `content.js` or CSS, then refresh the browser; no watcher is bundled.
- **Fonts**: Google Fonts load from the network; offline preview falls back to system fonts (by design).
