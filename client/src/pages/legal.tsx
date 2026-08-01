import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Languages, Scale } from "lucide-react";
import { detectLang, type Lang } from "@/i18n";

type LegalSection = "legal" | "privacy" | "disclaimer";

const content = {
  en: {
    legal: {
      eyebrow: "LEGAL NOTICE",
      title: "Legal Notice",
      intro: "Information about the operator of the EU AI Act Article 50 Transparency & Compliance Checker.",
      headingProvider: "Provider identification",
      headingContact: "Contact",
      headingPurpose: "Purpose of this website",
      purpose: "This website provides a free, general-information checker about selected transparency and disclosure obligations under Article 50 of Regulation (EU) 2024/1689 (the EU AI Act). It is an informational tool and does not certify compliance or provide legal advice.",
      headingResponsible: "Responsible for content",
      responsible: "Responsible for content under § 18(2) MStV, where applicable to the editorial content of this website:",
      headingLiability: "Liability for content",
      liability: "The contents of this website have been prepared with care. However, they are general information and may be incomplete, outdated, or unsuitable for a particular situation. The binding legal text and official guidance take precedence. No guarantee is given for completeness, accuracy, or currentness.",
      headingLinks: "External links",
      links: "This website links to official EU sources and may link to other external websites. I have no influence over external content and assume no responsibility for it. The respective provider is responsible for its own content.",
      headingCopyright: "Copyright",
      copyright: "The text, design, graphics, and software of this website are protected by copyright unless otherwise indicated. Any use beyond the limits of applicable copyright law requires prior permission.",
      headingDispute: "Consumer dispute resolution",
      dispute: "I am neither obliged nor willing to participate in dispute-resolution proceedings before a consumer arbitration board. The former EU Online Dispute Resolution platform was discontinued on 20 July 2025; no obsolete ODR link is provided here.",
      updated: "Last updated: August 2026",
    },
    privacy: {
      eyebrow: "DATA PROTECTION",
      title: "Privacy Policy",
      intro: "This notice explains what happens to personal data when you visit and use the checker.",
      headingController: "Controller",
      headingScope: "What the checker does",
      scope: "The checker runs in your browser. Your answers and the generated result are held in temporary browser memory while you use the tool. The application does not require an account, does not provide a contact form, does not intentionally use analytics or advertising trackers, and does not send your answers to an application database or AI service.",
      headingTechnical: "Technical request data",
      technical: "When you visit the website, the hosting and delivery infrastructure may process technical connection data such as IP address, date and time of the request, requested URL, referrer, browser and device information, and security-related log data. This processing is necessary to deliver, secure, and maintain the website and is based, where applicable, on Art. 6(1)(f) GDPR (legitimate interest in secure and reliable operation). The exact retention period is determined by the providers’ current systems and policies.",
      headingHosting: "Hosting and delivery",
      hosting: "The website is deployed as a static Vite application through Vercel. Vercel may process technical request data and security logs as part of hosting and content delivery. For details, see Vercel’s privacy policy:",
      headingFonts: "Externally hosted fonts",
      fonts: "The site currently loads Satoshi and Cabinet Grotesk fonts from Fontshare’s API. Loading these stylesheets causes the browser to contact Fontshare and may transmit technical connection data, including your IP address. Fontshare’s provider information and privacy terms apply to that request:",
      headingCookies: "Cookies and local storage",
      cookies: "The checker does not intentionally set cookies or use localStorage or sessionStorage. It has no advertising or non-essential tracking technologies. If this changes, this privacy policy and any required consent mechanism will be updated before the new technology is used.",
      headingRecipients: "Recipients and transfers",
      recipients: "Technical data may be processed by the hosting, delivery, security, and font providers named above. Depending on their infrastructure, processing may take place outside the EU/EEA. The providers’ privacy notices describe their safeguards and international-transfer arrangements.",
      headingRights: "Your rights",
      rights: "Subject to the legal requirements, you may have rights of access, rectification, erasure, restriction of processing, data portability, and objection. Where processing is based on consent, you may withdraw consent with future effect. To exercise a right, contact the controller at the email address above.",
      headingComplaint: "Right to lodge a complaint",
      complaint: "You have the right to lodge a complaint with a competent data protection supervisory authority, in particular in the EU Member State of your habitual residence, place of work, or the place of an alleged infringement.",
      headingChanges: "Changes to this policy",
      changes: "This policy may be updated when the website, its providers, or applicable legal requirements change. The current version is the one published on this page.",
      updated: "Last updated: August 2026",
    },
    disclaimer: {
      eyebrow: "IMPORTANT INFORMATION",
      title: "Disclaimer",
      intro: "Please read this before relying on a result from the checker.",
      headingGeneral: "General information only",
      general: "This tool provides a preliminary, scenario-based orientation about selected EU AI Act Article 50 transparency topics. It is not legal advice, a legal opinion, a risk assessment, or a certification of compliance.",
      headingNoGuarantee: "No guarantee of completeness",
      noGuarantee: "The result depends on the answers provided and on the facts and law available when the tool was written. The EU AI Act, Commission guidance, national implementation, enforcement practice, and your specific circumstances may lead to a different assessment. Always read the binding regulation and current official guidance for the relevant case.",
      headingProfessional: "Get professional advice",
      professional: "For a binding assessment, especially before publishing AI-generated content or launching an AI system, consult a qualified legal professional. Do not rely on this checker as the sole basis for a business, editorial, technical, or compliance decision.",
      headingSources: "Official sources",
      sources: "The checker links to the official EU AI Act text and European Commission resources. Those sources are authoritative; this website is not affiliated with or endorsed by the European Union or the European Commission.",
      updated: "Last updated: August 2026",
    },
  },
  de: {
    legal: {
      eyebrow: "IMPRESSUM",
      title: "Impressum",
      intro: "Angaben zum Betreiber des EU AI Act Article 50 Transparency & Compliance Checker.",
      headingProvider: "Angaben gemäß § 5 DDG",
      headingContact: "Kontakt",
      headingPurpose: "Zweck dieser Website",
      purpose: "Diese Website bietet einen kostenlosen Checker mit allgemeinen Informationen zu ausgewählten Transparenz- und Offenlegungspflichten nach Artikel 50 der Verordnung (EU) 2024/1689 (EU AI Act). Das Tool dient ausschließlich der Orientierung, zertifiziert keine Compliance und stellt keine Rechtsberatung dar.",
      headingResponsible: "Verantwortlich für den Inhalt",
      responsible: "Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV, soweit diese Vorschrift auf die redaktionellen Inhalte dieser Website anwendbar ist:",
      headingLiability: "Haftung für Inhalte",
      liability: "Die Inhalte dieser Website wurden sorgfältig erstellt. Sie stellen jedoch allgemeine Informationen dar und können unvollständig, veraltet oder für einen konkreten Einzelfall ungeeignet sein. Der verbindliche Gesetzestext und offizielle Leitlinien gehen vor. Für Vollständigkeit, Richtigkeit und Aktualität wird keine Gewähr übernommen.",
      headingLinks: "Externe Links",
      links: "Diese Website verlinkt auf offizielle EU-Quellen und kann auf weitere externe Websites verweisen. Auf deren Inhalte besteht kein Einfluss; eine Verantwortung dafür wird nicht übernommen. Für die Inhalte der verlinkten Seiten ist der jeweilige Anbieter verantwortlich.",
      headingCopyright: "Urheberrecht",
      copyright: "Texte, Gestaltung, Grafiken und Software dieser Website sind urheberrechtlich geschützt, soweit nicht anders gekennzeichnet. Jede Nutzung außerhalb der Grenzen des geltenden Urheberrechts bedarf vorheriger Zustimmung.",
      headingDispute: "Verbraucherstreitbeilegung",
      dispute: "Ich bin weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Die frühere EU-Plattform zur Online-Streitbeilegung wurde am 20. Juli 2025 eingestellt; ein veralteter ODR-Link wird daher nicht verwendet.",
      updated: "Stand: August 2026",
    },
    privacy: {
      eyebrow: "DATENSCHUTZ",
      title: "Datenschutzerklärung",
      intro: "Diese Erklärung beschreibt, was mit personenbezogenen Daten beim Besuch und bei der Nutzung des Checkers geschieht.",
      headingController: "Verantwortlicher",
      headingScope: "Was der Checker macht",
      scope: "Der Checker läuft in Ihrem Browser. Ihre Antworten und das erzeugte Ergebnis werden während der Nutzung nur im temporären Arbeitsspeicher des Browsers verarbeitet. Es ist kein Konto erforderlich, es gibt kein Kontaktformular, keine bewusst eingesetzte Analyse- oder Werbeverfolgung und die Antworten werden nicht an eine Anwendungsdatenbank oder einen KI-Dienst gesendet.",
      headingTechnical: "Technische Verbindungsdaten",
      technical: "Beim Aufruf der Website können die Hosting- und Auslieferungsinfrastruktur technische Verbindungsdaten wie IP-Adresse, Datum und Uhrzeit des Aufrufs, angeforderte URL, Referrer, Browser- und Geräteinformationen sowie sicherheitsbezogene Protokolldaten verarbeiten. Dies ist für die Auslieferung, Sicherheit und Wartung der Website erforderlich und beruht, soweit anwendbar, auf Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und zuverlässigen Betrieb). Die genaue Speicherdauer richtet sich nach den aktuellen Systemen und Richtlinien der Anbieter.",
      headingHosting: "Hosting und Auslieferung",
      hosting: "Die Website wird als statische Vite-Anwendung über Vercel bereitgestellt. Vercel kann im Rahmen von Hosting und Content-Auslieferung technische Verbindungsdaten und Sicherheitsprotokolle verarbeiten. Einzelheiten enthält die Datenschutzerklärung von Vercel:",
      headingFonts: "Extern geladene Schriftarten",
      fonts: "Die Website lädt derzeit die Schriftarten Satoshi und Cabinet Grotesk über die API von Fontshare. Dabei nimmt der Browser Verbindung zu Fontshare auf; technische Verbindungsdaten einschließlich der IP-Adresse können übertragen werden. Für diesen Abruf gelten die Anbieterinformationen und Datenschutzbedingungen von Fontshare:",
      headingCookies: "Cookies und lokaler Speicher",
      cookies: "Der Checker setzt bewusst keine Cookies und verwendet weder localStorage noch sessionStorage. Es gibt keine Werbe- oder nicht notwendigen Tracking-Technologien. Falls sich dies ändert, werden diese Datenschutzerklärung und ein eventuell erforderlicher Einwilligungsmechanismus vor dem Einsatz aktualisiert.",
      headingRecipients: "Empfänger und Übermittlungen",
      recipients: "Technische Daten können durch die oben genannten Hosting-, Auslieferungs-, Sicherheits- und Schriftartenanbieter verarbeitet werden. Je nach Infrastruktur kann eine Verarbeitung außerhalb der EU/des EWR stattfinden. Die Datenschutzhinweise der Anbieter beschreiben deren Schutzmaßnahmen und Regelungen für internationale Übermittlungen.",
      headingRights: "Ihre Rechte",
      rights: "Sie haben nach Maßgabe der gesetzlichen Voraussetzungen möglicherweise Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenn eine Verarbeitung auf Einwilligung beruht, kann diese mit Wirkung für die Zukunft widerrufen werden. Zur Ausübung Ihrer Rechte können Sie sich an den oben genannten Verantwortlichen wenden.",
      headingComplaint: "Beschwerderecht",
      complaint: "Sie haben das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren, insbesondere in dem EU-Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts eines möglichen Verstoßes.",
      headingChanges: "Änderungen dieser Erklärung",
      changes: "Diese Erklärung kann angepasst werden, wenn sich die Website, ihre Anbieter oder die rechtlichen Anforderungen ändern. Maßgeblich ist die jeweils auf dieser Seite veröffentlichte Fassung.",
      updated: "Stand: August 2026",
    },
    disclaimer: {
      eyebrow: "WICHTIGE INFORMATION",
      title: "Haftungshinweis",
      intro: "Bitte lesen Sie diesen Hinweis, bevor Sie sich auf ein Ergebnis des Checkers stützen.",
      headingGeneral: "Nur allgemeine Informationen",
      general: "Dieses Tool bietet eine erste, szenariobasierte Orientierung zu ausgewählten Transparenzthemen nach Artikel 50 des EU AI Act. Es ist keine Rechtsberatung, kein Rechtsgutachten, keine Risikobewertung und keine Compliance-Zertifizierung.",
      headingNoGuarantee: "Keine Garantie auf Vollständigkeit",
      noGuarantee: "Das Ergebnis hängt von Ihren Angaben sowie den zum Zeitpunkt der Erstellung verfügbaren Tatsachen und Rechtsinformationen ab. Der EU AI Act, Leitlinien der Kommission, nationale Umsetzung, Vollzugspraxis und Ihre konkreten Umstände können zu einer abweichenden Bewertung führen. Für den jeweiligen Fall sind stets der verbindliche Gesetzestext und aktuelle offizielle Leitlinien zu prüfen.",
      headingProfessional: "Fachkundige Beratung",
      professional: "Für eine verbindliche Bewertung, insbesondere vor der Veröffentlichung KI-generierter Inhalte oder der Einführung eines KI-Systems, sollten Sie eine qualifizierte Rechtsberatung einholen. Verwenden Sie diesen Checker nicht als alleinige Grundlage für geschäftliche, redaktionelle, technische oder Compliance-Entscheidungen.",
      headingSources: "Offizielle Quellen",
      sources: "Der Checker verlinkt auf den offiziellen Text des EU AI Act und auf Ressourcen der Europäischen Kommission. Diese Quellen sind maßgeblich; die Website steht in keiner Verbindung zur Europäischen Union oder zur Europäischen Kommission und wird von diesen nicht empfohlen.",
      updated: "Stand: August 2026",
    },
  },
} as const;

function PageShell({
  lang,
  setLang,
  children,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Scale className="h-4 w-4 text-primary-foreground" />
            </span>
            AI Act Check
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={lang === "en" ? "Auf Deutsch wechseln" : "Switch to English"}
          >
            <Languages className="h-4 w-4" />
            {lang === "en" ? "DE" : "EN"}
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-6 text-xs text-muted-foreground sm:px-6">
          <Link href="/" className="transition-colors hover:text-foreground">{lang === "en" ? "Back to checker" : "Zum Checker"}</Link>
          <Link href="/legal" className="transition-colors hover:text-foreground">{lang === "en" ? "Legal Notice" : "Impressum"}</Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">{lang === "en" ? "Privacy Policy" : "Datenschutz"}</Link>
          <Link href="/disclaimer" className="transition-colors hover:text-foreground">{lang === "en" ? "Disclaimer" : "Haftungshinweis"}</Link>
        </div>
      </footer>
    </div>
  );
}

function PageHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <div className="mb-10 border-b border-border pb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
    </div>
  );
}

function LegalNotice({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = content[lang].legal;
  return (
    <PageShell lang={lang} setLang={setLang}>
      <PageHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      <div className="space-y-9 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingProvider}</h2>
          <p className="text-foreground">Benjamin Michael Bremer<br />Gartenstraße 58a<br />29525 Uelzen<br />Germany</p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingContact}</h2>
          <a className="text-primary underline underline-offset-2 hover:no-underline" href="mailto:hi@bremlo.uk">hi@bremlo.uk</a>
        </section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingPurpose}</h2><p>{t.purpose}</p></section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingResponsible}</h2>
          <p>{t.responsible}</p>
          <p className="mt-3 text-foreground">Benjamin Michael Bremer<br />Gartenstraße 58a<br />29525 Uelzen<br />Germany</p>
        </section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingLiability}</h2><p>{t.liability}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingLinks}</h2><p>{t.links}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingCopyright}</h2><p>{t.copyright}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingDispute}</h2><p>{t.dispute}</p></section>
        <p className="border-t border-border pt-6 text-xs">{t.updated}</p>
      </div>
    </PageShell>
  );
}

function PrivacyPolicy({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = content[lang].privacy;
  return (
    <PageShell lang={lang} setLang={setLang}>
      <PageHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      <div className="space-y-9 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingController}</h2>
          <p className="text-foreground">Benjamin Michael Bremer<br />Gartenstraße 58a<br />29525 Uelzen<br />Germany</p>
          <p className="mt-3"><a className="text-primary underline underline-offset-2 hover:no-underline" href="mailto:hi@bremlo.uk">hi@bremlo.uk</a></p>
        </section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingScope}</h2><p>{t.scope}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingTechnical}</h2><p>{t.technical}</p></section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingHosting}</h2>
          <p>{t.hosting} <a className="text-primary underline underline-offset-2 hover:no-underline" href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>.</p>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingFonts}</h2>
          <p>{t.fonts} <a className="text-primary underline underline-offset-2 hover:no-underline" href="https://www.fontshare.com/" target="_blank" rel="noopener noreferrer">Fontshare</a>.</p>
        </section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingCookies}</h2><p>{t.cookies}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingRecipients}</h2><p>{t.recipients}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingRights}</h2><p>{t.rights}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingComplaint}</h2><p>{t.complaint}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingChanges}</h2><p>{t.changes}</p></section>
        <p className="border-t border-border pt-6 text-xs">{t.updated}</p>
      </div>
    </PageShell>
  );
}

function Disclaimer({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = content[lang].disclaimer;
  return (
    <PageShell lang={lang} setLang={setLang}>
      <PageHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      <div className="space-y-9 text-sm leading-relaxed text-muted-foreground">
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingGeneral}</h2><p>{t.general}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingNoGuarantee}</h2><p>{t.noGuarantee}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingProfessional}</h2><p>{t.professional}</p></section>
        <section><h2 className="mb-3 text-lg font-semibold text-foreground">{t.headingSources}</h2><p>{t.sources}</p></section>
        <p className="border-t border-border pt-6 text-xs">{t.updated}</p>
      </div>
    </PageShell>
  );
}

export default function LegalPage({ section }: { section: LegalSection }) {
  const [lang, setLang] = useState<Lang>(() => detectLang());
  if (section === "privacy") return <PrivacyPolicy lang={lang} setLang={setLang} />;
  if (section === "disclaimer") return <Disclaimer lang={lang} setLang={setLang} />;
  return <LegalNotice lang={lang} setLang={setLang} />;
}
