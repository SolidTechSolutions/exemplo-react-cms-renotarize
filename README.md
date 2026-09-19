# SolidSign API - Example Front-end: CMS Renotarization (React)

Example front-end for adding a new ArchiveTimeStamp (v2 or v3) to an
existing CMS/CAdES signature. By default it talks to the
[`exemplo-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-renotarize)
example backend, which keeps the API credentials server-side — the
recommended integration pattern. An optional "Direct to SolidSign API" mode
lets you call the API straight from the browser, useful for a quick manual
check, but it exposes the token in the browser.

## How it works

- **Default mode (backend)**: `POST http://localhost:8101/api/cms/renotarize/form`.
- **Optional mode (direct)**: `POST {baseUrl}/solidsign/dsig/extending/cms/add-ats-{v2|v3}`, with the token entered in the form.

## Prerequisites

1. Run the [`exemplo-integracao-cms-renotarize`](https://github.com/SolidTechSolutions/exemplo-integracao-cms-renotarize) backend locally (`mvn spring-boot:run`, default port `8101`) — or, for direct mode, have a valid JWT token.
2. One or more signed (CAdES) `.p7s` files to renotarize.

## Running

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, upload the `.p7s` file(s), pick the ArchiveTimeStamp version and renotarize.
