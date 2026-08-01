# AI Act Transparency Check

Interactive dashboard that helps users determine whether they need to label AI-generated content under **Article 50 of the EU AI Act** (Regulation (EU) 2024/1689).

Built with React, TypeScript, Tailwind CSS, and shadcn/ui. Bilingual (English/German) with automatic browser language detection.

## Features

- **5-step decision wizard** — guides users through the key criteria:
  1. Context of use (private vs. professional/public)
  2. User group (individuals, media, authorities, companies)
  3. Content type (text, image, audio, video, deepfake, chatbot)
  4. Public interest relevance (for text content)
  5. Editorial review (for public interest text)
- **Article 50 compliance logic** covering:
  - Art. 50(1) — AI interaction disclosure (chatbots)
  - Art. 50(2) — Machine-readable marking (provider obligation)
  - Art. 50(4) — Deepfake labeling
  - Art. 50(4) — AI-generated text on public interest matters
  - Editorial review exemption with fact-checking requirement
- **User group matrix** showing technical marking and visible labeling requirements for each group
- **Bilingual** — English and German, auto-detected from browser language with manual toggle
- **Dark mode** with system preference detection
- **Fully responsive** — desktop, tablet, and mobile
- **Accessible** — semantic HTML, keyboard navigation, ARIA labels

## Legal Basis

- [Article 50, EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50)
- [EU Commission Guidelines on Transparency Obligations](https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems) (July 20, 2026)
- [Code of Practice on Transparency of AI-Generated Content](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content) (June 10, 2026)

**Disclaimer:** This dashboard provides initial guidance and does not constitute legal advice. For a binding assessment, consult a qualified legal professional. The guidelines are legally non-binding; only the obligations under the AI Act are binding. The Court of Justice of the European Union (CJEU) provides the ultimately authoritative interpretation.

## Tech Stack

| Layer       | Technology                                    |
| ----------- | --------------------------------------------- |
| Frontend    | React 18, TypeScript, Vite                    |
| Styling     | Tailwind CSS v3, shadcn/ui                    |
| Backend     | Express.js                                    |
| Database    | SQLite (Drizzle ORM)                          |
| Fonts       | Satoshi + Cabinet Grotesk (Fontshare)         |

## Getting Started

### Prerequisites

- Node.js 20.19+ (or 22.12+)
- npm (or pnpm)

### Installation

```bash
git clone https://github.com/thisisbremlo/ai-act-transparency-check.git
cd ai-act-transparency-check
npm install
```

### Development

```bash
npm run dev
```

The dev server starts on `http://localhost:5000` (override with the `PORT` environment variable).

### Production Build

```bash
npm run build
npm run start
```

The build compiles the Vite client to `dist/public/` and bundles the Express server to `dist/index.cjs` (with `NODE_ENV=production` baked in). `npm run start` runs the bundled server, which serves both the API and the static client.

### Deploy

This is a full-stack app: the Express server (`dist/index.cjs`) serves both the API and the static client from `dist/public/`. Deploy the `npm run build` output to any Node.js host (Render, Railway, Fly.io, etc.) and run `npm run start`. A static host (Vercel, Netlify, S3, etc.) alone is not sufficient, since the API and server-side logic run inside the Node server.

> **Note:** The SQLite database lives in a local `data.db` file that is created at runtime. On hosts with ephemeral filesystems the data is lost on redeploy — use a persistent volume or an external database if you need durable storage.

## Key Dates

| Date                | Milestone                                                                |
| ------------------- | ------------------------------------------------------------------------ |
| August 2, 2026      | Transparency obligations under Art. 50 AI Act take effect                 |
| December 2, 2026    | Transition period for systems already on the market before Aug 2, 2026   |

## Project Structure

```
ai-act-transparency-check/
├── client/                  # Frontend
│   ├── src/
│   │   ├── pages/           # Page components (dashboard.tsx, not-found.tsx)
│   │   ├── components/ui/   # shadcn/ui components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities and query client
│   │   ├── i18n.ts          # Translations (EN/DE) + language detection
│   │   ├── App.tsx          # Root app with routing
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles + theme tokens
│   └── index.html           # HTML template
├── server/                  # Backend
│   ├── index.ts             # Express server setup
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Storage interface
│   ├── static.ts            # Static file serving
│   └── vite.ts              # Vite middleware
├── shared/                  # Shared types/schema
├── script/                  # Build scripts
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── drizzle.config.ts
├── components.json
└── tsconfig.json
```

## License

MIT
