# AI Act Transparency Check

A focused, bilingual decision tool for understanding when **Article 50 of the EU AI Act** may require disclosure or labelling of AI-generated content.

> This application provides general information, not legal advice. For a binding assessment, consult a qualified legal professional and use the regulation itself as the authoritative source.

## What it does

The app turns the main Article 50 decision points into a short, guided check. It considers:

- whether the use is private or professional/public;
- the user group involved;
- the type of AI content, including text, images, audio, video, deepfakes, and chatbots;
- whether text concerns a matter of public interest; and
- whether recognizable human editorial review and fact-checking took place.

At the end, it explains the relevant obligations, technical marking expectations, visible labelling requirements, exceptions, and user-group differences.

## Highlights

- **Bilingual interface:** English and German, with browser-language detection and a manual toggle.
- **Guided workflow:** A responsive step-by-step check that adapts to the selected content type.
- **Article 50 coverage:** Interaction disclosure, machine-readable marking, deepfake disclosure, and public-interest text.
- **Practical result view:** Clear status, obligation cards, notes, exceptions, and a user-group matrix.
- **Responsive and accessible:** Keyboard-friendly controls, semantic markup, ARIA-friendly UI components, and mobile layouts.
- **Static deployment:** No account, database, API key, or runtime environment variable is required.

## Official EU sources

The app links only to official European Union institutional sources:

- [Regulation (EU) 2024/1689 — official EUR-Lex text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [Transparency obligations under Article 50 — European Commission FAQ](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)
- [Guidelines on transparency obligations — European Commission](https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content)
- [Code of Practice on Transparency of AI-generated Content — European Commission](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)

The regulation is legally binding. Commission guidance and the Code of Practice help explain implementation but do not replace the regulation.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 18, TypeScript, Vite 7 |
| Styling | Tailwind CSS 3, shadcn/ui patterns |
| Components | Radix UI primitives, Lucide icons |
| Routing | Wouter with hash-based navigation |
| Hosting | Static Vite output, compatible with Vercel |

The repository also contains a small Express/Drizzle scaffold from the original project template. The published website is the client-only Vite build and does not require that server or its SQLite database.

## Run locally

### Requirements

- Node.js `20.19+` or `22.12+`
- npm

### Install

```bash
git clone https://github.com/thisisbremlo/ai-act-transparency-check.git
cd ai-act-transparency-check
npm install
```

### Start development

```bash
npm run dev
```

Vite serves the app on `http://localhost:5000`. Set `PORT` to use another port.

### Build and preview production output

```bash
npm run build
npm run start
```

The build writes a standard static website to `dist/`, including `dist/index.html` and browser assets. `npm run start` serves that output with Vite Preview.

### Typecheck

```bash
npm run check
```

## Deploy to Vercel

This is a normal static Vite website. Vercel should use:

- **Framework preset:** Vite
- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Output directory:** `dist`

These settings are already described in `vercel.json`, including a fallback for the client-side route. No server process, database, API key, or environment variable is needed.

## Project structure

```text
client/
├── index.html              # Vite document shell
└── src/
    ├── components/ui/      # Reusable shadcn/ui components
    ├── hooks/              # Client hooks
    ├── lib/                # Client utilities
    ├── pages/dashboard.tsx # Decision wizard and results
    ├── i18n.ts             # English/German copy
    ├── App.tsx             # App shell and routing
    └── index.css           # Theme tokens and global styles

shared/                     # Shared schema types from the original scaffold
vercel.json                 # Static Vercel deployment configuration
vite.config.ts              # Vite client configuration
package.json                # Scripts and dependencies
```

## License

MIT
