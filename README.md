# 🇧🇷 SolidSign API - Front-end de Exemplo: Renotarização (ArchiveTimeStamp) CMS (React)

## Como funciona

"Via example backend" (padrão) chama `POST /api/cms/renotarize/form` no back-end de exemplo (`http://localhost:8101`), que repassa pra `POST /solidsign/dsig/extending/cms/add-ats-v3` (ou `add-ats-v2`) da SolidSign API. "Direct to SolidSign API" (opcional) chama a API direto do navegador.

## Requisitos

Rode **um** destes back-ends de exemplo localmente (portas diferentes — ajuste `backendUrl` no formulário pra combinar):

- **Java** (porta 8101): [`exemplo-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-renotarize)
- **C#** (porta 5098): [`exemplo-csharp-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-csharp-integracao-cms-renotarize)
- **JavaScript** (porta 8100): [`exemplo-javascript-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-javascript-integracao-cms-renotarize)
- **TypeScript** (porta 8100): [`exemplo-typescript-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-typescript-integracao-cms-renotarize)
- **Node.js** (porta 3100): [`exemplo-nodejs-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-nodejs-integracao-cms-renotarize)
- **PHP** (porta 8100): [`exemplo-php-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-php-integracao-cms-renotarize)
- **Python** (porta 8100): [`exemplo-python-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-python-integracao-cms-renotarize)

- Um token JWT válido (`POST /solidsign/auth/token`)

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`, preencha o formulário e envie.

## Variáveis do formulário

| Campo | Significado | Default |
|---|---|---|
| `mode` | Via backend de exemplo (padrão) ou direto à API | `backend` |
| `backendUrl` | URL do back-end de exemplo | `http://localhost:8101` |
| `authorization` | Token JWT (Bearer) | (vazio) |
| `documents` | Documento(s) a carimbar | (vazio) |
| `atsVersion` | Versão do archive timestamp | `v3` |
| `hashAlgorithm` | Algoritmo de hash | `SHA256` |
| `signatureIndex` | Índice da assinatura (opcional) | (vazio) |
| `en319122` | Usar EN 319 122 (só v3) | `true` |

---

# 🇬🇧 SolidSign API - Example Front-end: CMS Renotarization (ArchiveTimeStamp) (React)

## How it works

"Via example backend" (default) calls `POST /api/cms/renotarize/form` on the example backend (`http://localhost:8101`), which forwards to `POST /solidsign/dsig/extending/cms/add-ats-v3` (or `add-ats-v2`) on the SolidSign API. "Direct to SolidSign API" (optional) calls the API straight from the browser.

## Requirements

Run **one** of these example backends locally (different ports — adjust `backendUrl` in the form to match):

- **Java** (port 8101): [`exemplo-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-renotarize)
- **C#** (port 5098): [`exemplo-csharp-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-csharp-integracao-cms-renotarize)
- **JavaScript** (port 8100): [`exemplo-javascript-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-javascript-integracao-cms-renotarize)
- **TypeScript** (port 8100): [`exemplo-typescript-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-typescript-integracao-cms-renotarize)
- **Node.js** (port 3100): [`exemplo-nodejs-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-nodejs-integracao-cms-renotarize)
- **PHP** (port 8100): [`exemplo-php-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-php-integracao-cms-renotarize)
- **Python** (port 8100): [`exemplo-python-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-python-integracao-cms-renotarize)

- A valid JWT token (`POST /solidsign/auth/token`)

## Running

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, fill in the form and submit.

## Form fields

| Field | Meaning | Default |
|---|---|---|
| `mode` | Via example backend (default) or direct to API | `backend` |
| `backendUrl` | Example backend URL | `http://localhost:8101` |
| `authorization` | JWT (Bearer) token | (empty) |
| `documents` | Document(s) to timestamp | (empty) |
| `atsVersion` | Archive timestamp version | `v3` |
| `hashAlgorithm` | Hash algorithm | `SHA256` |
| `signatureIndex` | Signature index (optional) | (empty) |
| `en319122` | Use EN 319 122 (v3 only) | `true` |
