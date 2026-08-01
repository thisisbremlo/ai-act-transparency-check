import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ShieldCheck, ShieldAlert, AlertTriangle,
  FileText, ImageIcon, Mic, Video,
  Building2, Newspaper, Landmark, User,
  Bot, Eye, Cpu, CheckCircle2, XCircle,
  ArrowLeft, RotateCcw, Info, Clock, Scale, Sparkles, Languages, ExternalLink,
} from "lucide-react";
import { translations, detectLang, type Lang } from "@/i18n";

type UsageContext = "private" | "commercial" | null;
type UserGroup = "individual" | "media" | "authority" | "company" | null;
type ContentType = "text" | "image" | "audio" | "video" | "deepfake" | "chatbot" | null;
type PublicInterest = "yes" | "no" | null;
type EditorialReview = "reviewed" | "not_reviewed" | null;

interface Answers {
  usageContext: UsageContext;
  userGroup: UserGroup;
  contentType: ContentType;
  publicInterest: PublicInterest;
  editorialReview: EditorialReview;
}

const initialAnswers: Answers = {
  usageContext: null, userGroup: null, contentType: null,
  publicInterest: null, editorialReview: null,
};

const STEPS = [
  { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
];

interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  testId: string;
}

function OptionCard({ icon, title, description, selected, onClick, testId }: OptionCardProps) {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className={`group relative flex flex-col items-start gap-3 rounded-lg border-2 p-5 text-left transition-all duration-200 ${
        selected ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40 hover:bg-muted/50"
      }`}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
        selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-primary"
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-medium text-foreground">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{description}</div>
      </div>
      {selected && <CheckCircle2 className="absolute top-3 right-3 h-5 w-5 text-primary" />}
    </button>
  );
}

function buildResult(answers: Answers, t: typeof translations.en) {
  const { usageContext, userGroup, contentType, publicInterest, editorialReview } = answers;

  if (usageContext === "private") {
    return {
      level: "exempt" as const,
      title: t.resultExempt,
      summary: t.resultExemptSummary,
      obligations: [] as any[],
      notes: [t.exemptNote1, t.exemptNote2],
      userGroupRequirements: [] as any[],
    };
  }

  const obligations: any[] = [];

  if (contentType === "chatbot") {
    obligations.push({
      id: "art50-1", title: t.art50_1_title, article: "Art. 50(1) AI Act",
      description: t.art50_1_desc, icon: <Bot className="h-5 w-5" />,
      type: "interaction" as const, status: "required" as const,
    });
  }

  if (contentType) {
    obligations.push({
      id: "art50-2", title: t.art50_2_title, article: "Art. 50(2) AI Act",
      description: t.art50_2_desc, icon: <Cpu className="h-5 w-5" />,
      type: "technical" as const, status: "required" as const,
    });
  }

  if (contentType === "deepfake") {
    obligations.push({
      id: "art50-4-deepfake", title: t.art50_4_deepfake_title, article: "Art. 50(4) AI Act",
      description: t.art50_4_deepfake_desc, icon: <Video className="h-5 w-5" />,
      type: "visible" as const, status: "required" as const,
    });
  }

  if (contentType === "text" && publicInterest === "yes") {
    if (editorialReview === "reviewed") {
      obligations.push({
        id: "art50-4-text-exempt", title: t.art50_4_text_exempt_title, article: "Art. 50(4) AI Act",
        description: t.art50_4_text_exempt_desc, icon: <FileText className="h-5 w-5" />,
        type: "visible" as const, status: "not_required" as const,
      });
    } else if (editorialReview === "not_reviewed") {
      obligations.push({
        id: "art50-4-text", title: t.art50_4_text_title, article: "Art. 50(4) AI Act",
        description: t.art50_4_text_desc, icon: <FileText className="h-5 w-5" />,
        type: "visible" as const, status: "required" as const,
      });
    }
  }

  if (contentType === "text" && publicInterest === "no") {
    obligations.push({
      id: "art50-4-text-na", title: t.art50_4_text_na_title, article: "Art. 50(4) AI Act",
      description: t.art50_4_text_na_desc, icon: <FileText className="h-5 w-5" />,
      type: "visible" as const, status: "not_required" as const,
    });
  }

  const hasRequiredVisible = obligations.some((o) => o.type === "visible" && o.status === "required");
  const hasRequiredInteraction = obligations.some((o) => o.type === "interaction" && o.status === "required");
  const hasTechnical = obligations.some((o) => o.type === "technical" && o.status === "required");
  const hasExemption = obligations.some((o) => o.status === "not_required");

  let level: "required" | "not_required" | "exempt" | "conditional" = "not_required";
  let title = t.resultNotRequiredTitle;
  let summary = t.resultNotRequiredSummary;

  if (hasRequiredVisible || hasRequiredInteraction) {
    level = "required";
    title = t.resultRequired;
    summary = t.resultRequiredSummary;
  } else if (hasExemption && hasTechnical) {
    level = "conditional";
    title = t.resultConditional;
    summary = t.resultConditionalSummary;
  } else if (hasTechnical) {
    level = "conditional";
    title = t.resultNotRequiredTitle;
    summary = t.resultNotRequiredSummary;
  }

  const notes: string[] = [t.note1];
  if (hasRequiredVisible) notes.push(t.note2);
  if (contentType === "deepfake") notes.push(t.note3);
  notes.push(t.note4);

  // User group matrix
  const groupDefs = [
    { key: "individual", label: t.groupIndividuals, icon: <User className="h-4 w-4" /> },
    { key: "media", label: t.groupMedia, icon: <Newspaper className="h-4 w-4" /> },
    { key: "authority", label: t.groupAuthorities, icon: <Landmark className="h-4 w-4" /> },
    { key: "company", label: t.groupCompanies, icon: <Building2 className="h-4 w-4" /> },
  ];

  const userGroupRequirements = groupDefs.map((g) => {
    const isActive = g.key === userGroup;
    let visible = "";

    if (contentType === "deepfake") {
      visible = g.key === "media" ? t.matrixDeepfakeMedia
        : g.key === "authority" ? t.matrixDeepfakeAuthority
        : t.matrixDeepfakeDefault;
    } else if (contentType === "chatbot") {
      visible = g.key === "authority" ? t.matrixChatbotAuthority : t.matrixChatbotDefault;
    } else if (contentType === "text" && publicInterest === "yes") {
      visible = g.key === "media" ? t.matrixTextMedia
        : g.key === "authority" ? t.matrixTextAuthority
        : t.matrixTextDefault;
    } else if (contentType === "text") {
      visible = t.matrixTextNotPublic;
    } else if (contentType === "image" || contentType === "audio" || contentType === "video") {
      visible = t.matrixMediaOnlyDeepfake;
    }

    return {
      group: g.label,
      icon: g.icon,
      technicalMarking: (isActive ? "✓ " : "") + t.matrixTechDefault,
      visibleLabeling: visible,
      isActive,
    };
  });

  return { level, title, summary, obligations, notes, userGroupRequirements };
}

function getStatusBadge(status: string, t: typeof translations.en) {
  if (status === "required") return <Badge variant="destructive">{t.required}</Badge>;
  if (status === "not_required") return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{t.notRequired}</Badge>;
  return <Badge variant="secondary">{t.conditional}</Badge>;
}

function getStatusIcon(status: string) {
  if (status === "required") return <ShieldAlert className="h-5 w-5 text-destructive" />;
  if (status === "not_required") return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />;
  return <AlertTriangle className="h-5 w-5 text-amber-500" />;
}

function OfficialSourcesFooter({ t }: { t: typeof translations.en }) {
  const sources = [
    {
      label: t.officialRegulation,
      href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng",
      detail: "EUR-Lex · Regulation (EU) 2024/1689",
    },
    {
      label: t.officialArticle50,
      href: "https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act",
      detail: "European Commission · Article 50 FAQ",
    },
    {
      label: t.officialGuidelines,
      href: "https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content",
      detail: "European Commission · Implementation guidance",
    },
    {
      label: t.officialCode,
      href: "https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content",
      detail: "European Commission · Code of Practice",
    },
  ];

  return (
    <footer className="mt-12 border-t border-border pt-8" aria-labelledby="official-sources-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold" id="official-sources-title">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Scale className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            {t.officialDocsTitle}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{t.officialDocsIntro}</p>
        </div>
        <div className="grid w-full gap-2 sm:max-w-xl sm:grid-cols-2">
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-border bg-card/50 p-3 transition-colors hover:border-primary/40 hover:bg-muted/50"
            >
              <span className="flex items-start justify-between gap-3 text-sm font-medium text-foreground">
                {source.label}
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </span>
              <span className="mt-1 block text-[11px] text-muted-foreground">{source.detail}</span>
            </a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">{t.officialSourceNote}</p>
    </footer>
  );
}

function LevelIcon({ level }: { level: string }) {
  if (level === "required") return <ShieldAlert className="h-8 w-8 text-destructive" />;
  if (level === "exempt") return <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-500" />;
  return <AlertTriangle className="h-8 w-8 text-amber-500" />;
}

export default function DashboardPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [showResult, setShowResult] = useState(false);

  // Detect browser language on mount
  useEffect(() => {
    setLang(detectLang());
  }, []);

  const t = translations[lang];

  const result = useMemo(() => buildResult(answers, t), [answers, t]);

  const progress = useMemo(() => {
    if (showResult) return 100;
    return Math.round((step / (STEPS.length - 1)) * 100);
  }, [step, showResult]);

  const handleSelect = (field: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = useMemo(() => {
    switch (step) {
      case 0: return answers.usageContext !== null;
      case 1: return answers.userGroup !== null;
      case 2: return answers.contentType !== null;
      case 3: return answers.contentType === "text" ? answers.publicInterest !== null : true;
      case 4: return (answers.contentType === "text" && answers.publicInterest === "yes") ? answers.editorialReview !== null : true;
      default: return true;
    }
  }, [step, answers]);

  const handleNext = () => {
    if (step === 0 && answers.usageContext === "private") { setShowResult(true); return; }
    if (step === 2 && answers.contentType !== "text") { setShowResult(true); return; }
    if (step === 3 && answers.publicInterest === "no") { setShowResult(true); return; }
    if (step === 4) { setShowResult(true); return; }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    if (showResult) { setShowResult(false); return; }
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleRestart = () => {
    setAnswers(initialAnswers); setStep(0); setShowResult(false);
  };

  const visibleSteps = useMemo(() => {
    const steps = [0, 1, 2];
    if (answers.contentType === "text") {
      steps.push(3);
      if (answers.publicInterest === "yes") steps.push(4);
    }
    steps.push(5);
    return steps;
  }, [answers.contentType, answers.publicInterest]);

  const toggleLang = () => setLang(lang === "en" ? "de" : "en");

  const LangToggle = () => (
    <button
      onClick={toggleLang}
      data-testid="button-lang-toggle"
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Languages className="h-4 w-4" />
      {lang === "en" ? "DE" : "EN"}
    </button>
  );

  const Header = () => (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Scale className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight">{t.appName}</span>
            <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">{t.appSubtitle}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <LangToggle />
          {(showResult || step > 0) && (
            <Button variant="ghost" size="sm" onClick={handleRestart} data-testid="button-restart">
              <RotateCcw className="mr-1.5 h-4 w-4" />
              {t.restart}
            </Button>
          )}
        </div>
      </div>
    </header>
  );

  // ============ RESULT VIEW ============
  if (showResult) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
          {/* Result Hero */}
          <Card className={`mb-6 border-2 ${
            result.level === "required" ? "border-destructive/30" :
            result.level === "exempt" ? "border-green-500/30" : "border-amber-500/30"
          }`}>
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <LevelIcon level={result.level} />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold tracking-tight sm:text-2xl" data-testid="text-result-title">
                    {result.title}
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base" data-testid="text-result-summary">
                    {result.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" /> {t.effectiveFrom}
                    </Badge>
                    {result.level === "required" && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" /> {t.finesUpTo}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Obligations */}
          {result.obligations.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold">{t.yourDuties}</h2>
              <div className="grid gap-3">
                {result.obligations.map((obl) => (
                  <Card key={obl.id} data-testid={`card-obligation-${obl.id}`}>
                    <CardContent className="p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">{obl.icon}</div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold">{obl.title}</h3>
                            {getStatusBadge(obl.status, t)}
                          </div>
                          <Badge variant="outline" className="mt-1.5 mb-2 font-mono text-xs">{obl.article}</Badge>
                          <p className="text-sm text-muted-foreground">{obl.description}</p>
                        </div>
                        <div className="shrink-0">{getStatusIcon(obl.status)}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* User Group Matrix */}
          {result.userGroupRequirements.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold">{t.matrixTitle}</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" data-testid="table-usergroups">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="p-3 text-left font-medium text-muted-foreground">{t.matrixGroup}</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5" />{t.matrixTechnical}</span>
                          </th>
                          <th className="p-3 text-left font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{t.matrixVisible}</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.userGroupRequirements.map((req, i) => (
                          <tr key={req.group} className={`border-b border-border last:border-0 ${req.isActive ? "bg-primary/5" : ""}`} data-testid={`row-usergroup-${i}`}>
                            <td className="p-3">
                              <div className="flex items-center gap-2 font-medium">
                                {req.icon}
                                <span className={req.isActive ? "text-primary" : ""}>{req.group}</span>
                                {req.isActive && <Badge variant="outline" className="ml-1 text-xs">{t.yourGroup}</Badge>}
                              </div>
                            </td>
                            <td className="p-3 text-muted-foreground">{req.technicalMarking.replace("✓ ", "")}</td>
                            <td className="p-3 text-muted-foreground">{req.visibleLabeling}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notes */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold">{t.notesTitle}</h2>
            <Card>
              <CardContent className="p-5">
                <Accordion type="single" collapsible>
                  {result.notes.map((note, i) => (
                    <AccordionItem key={i} value={`note-${i}`} className="border-b border-border last:border-0">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">
                        <span className="flex items-center gap-2"><Info className="h-4 w-4 text-muted-foreground" />{t.note} {i + 1}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{note}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Legal Framework */}
          <div className="mb-6">
            <Card className="bg-muted/30">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Scale className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold">{t.legalTitle}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{t.legalBody}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs">
                      <a href="https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">{t.linkArt50}</a>
                      <a href="https://digital-strategy.ec.europa.eu/en/policies/guidelines-transparency-ai-generated-content" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">{t.linkGuidelines}</a>
                      <a href="https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">{t.linkCode}</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="mr-1.5 h-4 w-4" />{t.back}
            </Button>
            <Button onClick={handleRestart} data-testid="button-new-check">
              <RotateCcw className="mr-1.5 h-4 w-4" />{t.newCheck}
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">{t.disclaimer}</p>
          <OfficialSourcesFooter t={t} />
        </main>
      </div>
    );
  }

  // ============ WIZARD VIEW ============
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {t.step} {step + 1} {t.of} {visibleSteps.filter((s) => s < 5).length + 1}
            </span>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} data-testid="progress-bar" />
        </div>

        {/* Step 1: Usage Context */}
        {step === 0 && (
          <div data-testid="step-usage-context">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{t.step1Title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.step1Desc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <OptionCard icon={<User className="h-5 w-5" />} title={t.step1OptionPrivate} description={t.step1OptionPrivateDesc} selected={answers.usageContext === "private"} onClick={() => handleSelect("usageContext", "private")} testId="option-private" />
              <OptionCard icon={<Building2 className="h-5 w-5" />} title={t.step1OptionCommercial} description={t.step1OptionCommercialDesc} selected={answers.usageContext === "commercial"} onClick={() => handleSelect("usageContext", "commercial")} testId="option-commercial" />
            </div>
          </div>
        )}

        {/* Step 2: User Group */}
        {step === 1 && (
          <div data-testid="step-user-group">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{t.step2Title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.step2Desc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <OptionCard icon={<User className="h-5 w-5" />} title={t.step2OptionIndividual} description={t.step2OptionIndividualDesc} selected={answers.userGroup === "individual"} onClick={() => handleSelect("userGroup", "individual")} testId="option-individual" />
              <OptionCard icon={<Newspaper className="h-5 w-5" />} title={t.step2OptionMedia} description={t.step2OptionMediaDesc} selected={answers.userGroup === "media"} onClick={() => handleSelect("userGroup", "media")} testId="option-media" />
              <OptionCard icon={<Landmark className="h-5 w-5" />} title={t.step2OptionAuthority} description={t.step2OptionAuthorityDesc} selected={answers.userGroup === "authority"} onClick={() => handleSelect("userGroup", "authority")} testId="option-authority" />
              <OptionCard icon={<Building2 className="h-5 w-5" />} title={t.step2OptionCompany} description={t.step2OptionCompanyDesc} selected={answers.userGroup === "company"} onClick={() => handleSelect("userGroup", "company")} testId="option-company" />
            </div>
          </div>
        )}

        {/* Step 3: Content Type */}
        {step === 2 && (
          <div data-testid="step-content-type">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{t.step3Title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.step3Desc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <OptionCard icon={<FileText className="h-5 w-5" />} title={t.step3OptionText} description={t.step3OptionTextDesc} selected={answers.contentType === "text"} onClick={() => handleSelect("contentType", "text")} testId="option-text" />
              <OptionCard icon={<ImageIcon className="h-5 w-5" />} title={t.step3OptionImage} description={t.step3OptionImageDesc} selected={answers.contentType === "image"} onClick={() => handleSelect("contentType", "image")} testId="option-image" />
              <OptionCard icon={<Mic className="h-5 w-5" />} title={t.step3OptionAudio} description={t.step3OptionAudioDesc} selected={answers.contentType === "audio"} onClick={() => handleSelect("contentType", "audio")} testId="option-audio" />
              <OptionCard icon={<Video className="h-5 w-5" />} title={t.step3OptionVideo} description={t.step3OptionVideoDesc} selected={answers.contentType === "video"} onClick={() => handleSelect("contentType", "video")} testId="option-video" />
              <OptionCard icon={<Sparkles className="h-5 w-5" />} title={t.step3OptionDeepfake} description={t.step3OptionDeepfakeDesc} selected={answers.contentType === "deepfake"} onClick={() => handleSelect("contentType", "deepfake")} testId="option-deepfake" />
              <OptionCard icon={<Bot className="h-5 w-5" />} title={t.step3OptionChatbot} description={t.step3OptionChatbotDesc} selected={answers.contentType === "chatbot"} onClick={() => handleSelect("contentType", "chatbot")} testId="option-chatbot" />
            </div>
          </div>
        )}

        {/* Step 4: Public Interest */}
        {step === 3 && (
          <div data-testid="step-public-interest">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{t.step4Title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.step4Desc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <OptionCard icon={<Newspaper className="h-5 w-5" />} title={t.step4OptionYes} description={t.step4OptionYesDesc} selected={answers.publicInterest === "yes"} onClick={() => handleSelect("publicInterest", "yes")} testId="option-public-interest-yes" />
              <OptionCard icon={<XCircle className="h-5 w-5" />} title={t.step4OptionNo} description={t.step4OptionNoDesc} selected={answers.publicInterest === "no"} onClick={() => handleSelect("publicInterest", "no")} testId="option-public-interest-no" />
            </div>
          </div>
        )}

        {/* Step 5: Editorial Review */}
        {step === 4 && (
          <div data-testid="step-editorial-review">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{t.step5Title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.step5Desc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <OptionCard icon={<CheckCircle2 className="h-5 w-5" />} title={t.step5OptionReviewed} description={t.step5OptionReviewedDesc} selected={answers.editorialReview === "reviewed"} onClick={() => handleSelect("editorialReview", "reviewed")} testId="option-editorial-reviewed" />
              <OptionCard icon={<XCircle className="h-5 w-5" />} title={t.step5OptionNotReviewed} description={t.step5OptionNotReviewedDesc} selected={answers.editorialReview === "not_reviewed"} onClick={() => handleSelect("editorialReview", "not_reviewed")} testId="option-editorial-not-reviewed" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 0} data-testid="button-prev">
            <ArrowLeft className="mr-1.5 h-4 w-4" />{t.back}
          </Button>
          <Button onClick={handleNext} disabled={!canProceed} data-testid="button-next">
            {step === 0 && answers.usageContext === "private" ? t.showResult : t.next}
          </Button>
        </div>
        <OfficialSourcesFooter t={t} />
      </main>
    </div>
  );
}
