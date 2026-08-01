export type Lang = "en" | "de";

export const translations = {
  en: {
    // Header
    appName: "AI Act Check",
    appSubtitle: "Art. 50 AI Labeling",
    restart: "Restart",
    newCheck: "Start new check",
    back: "Back",
    next: "Next",
    showResult: "Show result",

    // Progress
    step: "Step",
    of: "of",

    // Step 1: Anwendungsbereich
    step1Title: "In what context do you use AI?",
    step1Desc: "The AI Act's transparency obligations apply only to professional or commercial use of AI systems. Purely private use is exempt.",
    step1OptionPrivate: "Private / non-professional",
    step1OptionPrivateDesc: "AI content is created exclusively for private purposes without publication in a professional or public context.",
    step1OptionCommercial: "Commercial / public",
    step1OptionCommercialDesc: "AI content is created and/or published in a professional, business, or public context.",

    // Step 2: Nutzergruppe
    step2Title: "Which user group do you belong to?",
    step2Desc: "Requirements may vary depending on the user group. Select the group that best fits your situation.",
    step2OptionIndividual: "Individual (professional)",
    step2OptionIndividualDesc: "Freelancers, self-employed, or individuals using AI professionally.",
    step2OptionMedia: "Media & Publishers",
    step2OptionMediaDesc: "Editorial teams, news media, publishers, and journalistic outlets.",
    step2OptionAuthority: "Authorities",
    step2OptionAuthorityDesc: "Public administrations, ministries, agencies, and public institutions.",
    step2OptionCompany: "Companies",
    step2OptionCompanyDesc: "Companies, agencies, organizations, and commercial entities.",

    // Step 3: Inhaltstyp
    step3Title: "What type of AI content are you creating?",
    step3Desc: "Labeling obligations differ by content type. Deepfakes and AI-generated text on public interest topics are subject to the strictest requirements.",
    step3OptionText: "Text",
    step3OptionTextDesc: "AI-generated or AI-edited texts, articles, blog posts, etc.",
    step3OptionImage: "Image",
    step3OptionImageDesc: "AI-generated or AI-manipulated images and graphics.",
    step3OptionAudio: "Audio",
    step3OptionAudioDesc: "AI-generated audio files, voice synthesis, music, etc.",
    step3OptionVideo: "Video",
    step3OptionVideoDesc: "AI-generated or AI-manipulated video files.",
    step3OptionDeepfake: "Deepfake",
    step3OptionDeepfakeDesc: "Realistic AI content (image/audio/video) depicting real persons, places, or events that could appear authentic.",
    step3OptionChatbot: "Chatbot / AI Interaction",
    step3OptionChatbotDesc: "AI systems that interact directly with people (chatbots, virtual assistants).",

    // Step 4: Öffentliche Relevanz
    step4Title: "Does the text address a matter of public interest?",
    step4Desc: "The labeling obligation for AI-generated text applies only when the text serves to inform the public about matters of public interest. This typically includes news, political topics, financial developments, and socially relevant content. Marketing or advertising texts do not fall under this category.",
    step4OptionYes: "Yes, of public interest",
    step4OptionYesDesc: "The text informs the public about socially relevant topics (news, politics, finance, etc.).",
    step4OptionNo: "No, not public",
    step4OptionNoDesc: "The text serves marketing, advertising, product descriptions, internal communication, or other non-public purposes.",

    // Step 5: Redaktionelle Prüfung
    step5Title: "Does editorial review take place?",
    step5Desc: "For AI-generated text on matters of public interest, the labeling obligation is waived if a human carries out editorial review and this is recognizable. The guidelines require a minimum of fact-checking. Subsequent AI-assisted content editing after release voids the exemption.",
    step5OptionReviewed: "Yes, with recognizable fact-check",
    step5OptionReviewedDesc: "A human reviews the AI-generated text editorially, including fact-checking, and the review is recognizable to the public.",
    step5OptionNotReviewed: "No, fully AI-generated",
    step5OptionNotReviewedDesc: "The text is published without or without recognizable editorial review by a human.",

    // Result
    resultRequired: "Labeling obligation exists",
    resultRequiredSummary: "Based on your responses, you are obligated to label AI-generated content accordingly.",
    resultExempt: "No labeling obligation",
    resultExemptSummary: "For purely private, non-professional use of AI systems, the transparency obligations under Art. 50 AI Act do not apply. The obligations are directed at providers and professional deployers of AI systems.",
    resultConditional: "Conditional obligations – editorial exemption applies",
    resultConditionalSummary: "Visible labeling is waived due to an exception, but the technical marking by the provider remains in effect.",
    resultNotRequiredTitle: "No visible labeling obligation",
    resultNotRequiredSummary: "For this content type, no visible labeling is required. However, the machine-readable marking by the AI system's provider remains in effect.",

    // Obligations
    yourDuties: "Your obligations in detail",
    art50_1_title: "Disclose AI interaction",
    art50_1_desc: "Users must be informed when interacting with an AI (e.g., chatbots, virtual assistants). The notice must be clear, recognizable, and accessible — hidden notices in terms of service are insufficient.",
    art50_2_title: "Machine-readable marking (by provider)",
    art50_2_desc: "The provider of the AI system must ensure that generated content (text, image, audio, video) is marked in a machine-readable format as AI-generated — through digitally signed metadata and imperceptible watermarks. This obligation applies from August 2, 2026 (or December 2, 2026 for systems already on the market before August 2, 2026).",
    art50_4_deepfake_title: "Visibly label deepfake",
    art50_4_deepfake_desc: "AI-generated or manipulated image, audio, or video content that resembles real persons, places, objects, or events and could falsely appear authentic (deepfakes) must be disclosed as artificially generated. The labeling must be clear, visible, understandable, and accessible. Editorial review does not exempt deepfake labeling — even reviewed deepfakes must be labeled.",
    art50_4_text_exempt_title: "Editorial exemption applies",
    art50_4_text_exempt_desc: "For AI-generated text on matters of public interest, the labeling obligation is waived if a human carries out editorial review and this is recognizable. The guidelines require a minimum of fact-checking. Subsequent AI-assisted content editing after release voids the exemption.",
    art50_4_text_title: "Label AI text on public interest",
    art50_4_text_desc: "Texts that serve to inform the public about matters of public interest and are fully AI-generated must be disclosed as AI-generated. This typically covers news articles, political statements, and editorial content with social relevance. The labeling must be clear, visible, and understandable.",
    art50_4_text_na_title: "No visible labeling required",
    art50_4_text_na_desc: "The text does not serve to inform the public about matters of public interest (e.g., marketing texts, product descriptions, internal communication). No visible labeling is required. The machine-readable marking by the provider (Art. 50(2)) remains in effect.",

    // Status badges
    required: "Required",
    notRequired: "Not required",
    conditional: "Conditional",

    // Result meta
    effectiveFrom: "Effective Aug 2, 2026",
    finesUpTo: "Fines up to €15M",

    // Matrix
    matrixTitle: "Requirements by user group",
    matrixGroup: "User group",
    matrixTechnical: "Technical marking",
    matrixVisible: "Visible labeling",
    yourGroup: "Your group",

    // Group labels
    groupIndividuals: "Individuals (professional)",
    groupMedia: "Media & Publishers",
    groupAuthorities: "Authorities",
    groupCompanies: "Companies",

    // Matrix content - technical marking
    matrixTechDefault: "The AI system provider must ensure machine-readable marking (metadata + watermark). Deployers should preserve this marking upon publication.",

    // Matrix content - visible labeling
    matrixDeepfakeMedia: "Deepfakes must be visibly labeled. Journalistic duty of care remains. EU icons or text notices are acceptable.",
    matrixDeepfakeAuthority: "Deepfakes must be labeled. Exception for AI systems legally authorized for law enforcement.",
    matrixDeepfakeDefault: "Deepfakes must be visibly labeled as AI-generated (clear, understandable, accessible).",
    matrixChatbotAuthority: "Chatbots must be identifiable as AI interaction. Exception for law enforcement systems.",
    matrixChatbotDefault: "Chatbots and virtual assistants must inform users about the AI nature at the start of the interaction.",
    matrixTextMedia: "AI-generated text on public interest must be labeled. Editorial review with fact-checking exempts from the obligation.",
    matrixTextAuthority: "Government publications on public topics must disclose AI generation, unless editorial review takes place.",
    matrixTextDefault: "AI-generated text on public matters must be labeled, unless editorial review with fact-checking is recognizable.",
    matrixTextNotPublic: "No visible labeling required for texts without public interest relevance.",
    matrixMediaOnlyDeepfake: "Visible labeling only required if the content qualifies as a deepfake (realistic depiction of real subjects).",

    // Notes
    notesTitle: "Notes & exceptions",
    note: "Note",
    note1: "The transparency obligations under Art. 50 AI Act apply from August 2, 2026. For AI systems already on the market before that date, a transition period for machine-readable marking applies until December 2, 2026.",
    note2: "Visible labeling must be clear, understandable, accessible, and barrier-free. The European Commission has published a set of icons that may be used. Alternatively, captions, text overlays, or notices in the content description are acceptable.",
    note3: "Exception: For artistic, creative, satirical, and fictional works, the deepfake labeling obligation may be waived if there is no potential for deception. The assessment is context-dependent.",
    note4: "Non-compliance may result in fines of up to €15 million or 3% of global annual turnover — whichever is higher.",

    // Legal
    legalTitle: "Legal framework",
    legalBody: "This dashboard is based on Article 50 of Regulation (EU) 2024/1689 (AI Act), the final guidelines of the European Commission from July 20, 2026, and the Code of Practice on Transparency of AI-Generated Content from June 10, 2026. The guidelines are legally non-binding; only the obligations under the AI Act are binding. The Court of Justice of the European Union (CJEU) provides the ultimately authoritative interpretation.",
    linkArt50: "Article 50 FAQ",
    linkGuidelines: "Commission guidelines",
    linkCode: "Code of Practice",
    officialDocsTitle: "Official EU documents",
    officialDocsIntro: "Read the binding regulation and the European Commission’s official implementation resources.",
    officialRegulation: "EU AI Act · Regulation text",
    officialArticle50: "Article 50 · Transparency FAQ",
    officialGuidelines: "Transparency guidelines",
    officialCode: "Code of Practice",
    officialSourceNote: "These links point only to official EU institutional sources. This tool offers general information, not legal advice; the regulation itself is the binding source.",

    // Disclaimer
    disclaimer: "This application provides initial guidance and does not constitute legal advice. For a binding assessment, please consult a qualified legal professional.",

    // Exempt notes
    exemptNote1: "This exemption applies only to non-professional use. Once AI content is published in a professional or commercial context, the obligations apply.",
    exemptNote2: "Providers of the AI systems (e.g., OpenAI, Midjourney) remain subject to the technical marking obligation under Art. 50(2).",
  },

  de: {
    appName: "AI Act Check",
    appSubtitle: "Art. 50 KI-Kennzeichnung",
    restart: "Neu starten",
    newCheck: "Neue Prüfung starten",
    back: "Zurück",
    next: "Weiter",
    showResult: "Ergebnis anzeigen",

    step: "Schritt",
    of: "von",

    step1Title: "In welchem Rahmen nutzen Sie KI?",
    step1Desc: "Die Transparenzpflichten des AI Act gelten nur für die berufliche oder gewerbliche Nutzung von KI-Systemen. Reine Privatanwendung ist ausgenommen.",
    step1OptionPrivate: "Privat / nicht-beruflich",
    step1OptionPrivateDesc: "KI-Inhalte werden ausschließlich für private Zwecke erstellt, ohne Veröffentlichung im beruflichen oder öffentlichen Kontext.",
    step1OptionCommercial: "Gewerblich / öffentlich",
    step1OptionCommercialDesc: "KI-Inhalte werden im beruflichen, geschäftlichen oder öffentlichen Kontext erstellt und/oder veröffentlicht.",

    step2Title: "Welcher Nutzergruppe gehören Sie an?",
    step2Desc: "Die Anforderungen können je nach Nutzergruppe unterschiedlich ausfallen. Wählen Sie die Gruppe, die am besten auf Ihre Situation zutrifft.",
    step2OptionIndividual: "Privatperson (beruflich)",
    step2OptionIndividualDesc: "Freelancer, Selbstständige oder Einzelpersonen, die KI beruflich einsetzen.",
    step2OptionMedia: "Medien & Verlage",
    step2OptionMediaDesc: "Redaktionen, Nachrichtenmedien, Verlage und journalistische Angebote.",
    step2OptionAuthority: "Behörden",
    step2OptionAuthorityDesc: "Öffentliche Verwaltungen, Ministerien, Agenturen und öffentliche Einrichtungen.",
    step2OptionCompany: "Unternehmen",
    step2OptionCompanyDesc: "Unternehmen, Agenturen, Organisationen und wirtschaftliche Akteure.",

    step3Title: "Welche Art von KI-Inhalt erstellen Sie?",
    step3Desc: "Die Kennzeichnungspflichten unterscheiden sich je nach Inhaltstyp. Deepfakes und KI-generierte Texte zu öffentlichen Themen unterliegen den strengsten Anforderungen.",
    step3OptionText: "Text",
    step3OptionTextDesc: "KI-generierte oder KI-bearbeitete Texte, Artikel, Blogbeiträge etc.",
    step3OptionImage: "Bild",
    step3OptionImageDesc: "KI-generierte oder KI-manipulierte Bilder und Grafiken.",
    step3OptionAudio: "Audio",
    step3OptionAudioDesc: "KI-generierte Audiodateien, Stimmsynthese, Musik etc.",
    step3OptionVideo: "Video",
    step3OptionVideoDesc: "KI-generierte oder KI-manipulierte Videodateien.",
    step3OptionDeepfake: "Deepfake",
    step3OptionDeepfakeDesc: "Realistisch wirkende KI-Inhalte (Bild/Audio/Video), die reale Personen, Orte oder Ereignisse darstellen und als echt erscheinen könnten.",
    step3OptionChatbot: "Chatbot / KI-Interaktion",
    step3OptionChatbotDesc: "KI-Systeme, die direkt mit Menschen interagieren (Chatbots, virtuelle Assistenten).",

    step4Title: "Dient der Text einem Thema von öffentlichem Interesse?",
    step4Desc: "Die Kennzeichnungspflicht für KI-generierte Texte greift nur, wenn diese der Information der Öffentlichkeit über Angelegenheiten von öffentlichem Interesse dienen. Dazu gehören typischerweise Nachrichten, politische Themen, Finanzentwicklungen und gesellschaftlich relevante Inhalte. Marketing- oder Werbetexte fallen nicht darunter.",
    step4OptionYes: "Ja, von öffentlichem Interesse",
    step4OptionYesDesc: "Der Text informiert die Öffentlichkeit über gesellschaftlich relevante Themen (Nachrichten, Politik, Finanzen etc.).",
    step4OptionNo: "Nein, nicht öffentlich",
    step4OptionNoDesc: "Der Text dient Marketing, Werbung, Produktbeschreibungen, interner Kommunikation oder anderen nicht-öffentlichen Zwecken.",

    step5Title: "Findet eine redaktionelle Prüfung statt?",
    step5Desc: "Bei KI-generierten Texten zu Themen von öffentlichem Interesse entfällt die Kennzeichnungspflicht, wenn ein Mensch die redaktionelle Prüfung übernimmt und dies erkennbar ist. Die Leitlinien verlangen als Minimum einen Faktencheck. Eine inhaltliche KI-Nachbearbeitung nach Freigabe lässt die Ausnahme entfallen.",
    step5OptionReviewed: "Ja, mit erkennbarem Faktencheck",
    step5OptionReviewedDesc: "Ein Mensch prüft den KI-generierten Text redaktionell, einschließlich Faktencheck, und die Prüfung ist für die Öffentlichkeit erkennbar.",
    step5OptionNotReviewed: "Nein, vollständig KI-generiert",
    step5OptionNotReviewedDesc: "Der Text wird ohne oder ohne erkennbare redaktionelle Prüfung durch einen Menschen veröffentlicht.",

    resultRequired: "Kennzeichnungspflicht besteht",
    resultRequiredSummary: "Aufgrund Ihrer Angaben sind Sie verpflichtet, KI-generierte Inhalte entsprechend zu kennzeichnen.",
    resultExempt: "Keine Kennzeichnungspflicht",
    resultExemptSummary: "Bei rein privater, nicht-beruflicher Nutzung von KI-Systemen entfallen die Transparenzpflichten nach Art. 50 AI Act. Die Pflichten richten sich an Anbieter und berufliche Betreiber von KI-Systemen.",
    resultConditional: "Bedingte Pflichten – redaktionelle Ausnahme greift",
    resultConditionalSummary: "Die sichtbare Kennzeichnung entfällt durch eine Ausnahme, aber die technische Markierung durch den Anbieter bleibt bestehen.",
    resultNotRequiredTitle: "Keine sichtbare Kennzeichnungspflicht",
    resultNotRequiredSummary: "Für diesen Inhaltstyp ist keine sichtbare Kennzeichnung vorgeschrieben. Die maschinenlesbare Markierung durch den Anbieter des KI-Systems bleibt jedoch bestehen.",

    yourDuties: "Ihre Pflichten im Detail",
    art50_1_title: "KI-Interaktion kennzeichnen",
    art50_1_desc: "Nutzer müssen informiert werden, wenn sie mit einer KI interagieren (z. B. Chatbots, virtuelle Assistenten). Der Hinweis muss klar, erkennbar und zugänglich sein – versteckte Hinweise in AGB reichen nicht aus.",
    art50_2_title: "Maschinenlesbare Markierung (durch Anbieter)",
    art50_2_desc: "Der Anbieter des KI-Systems muss sicherstellen, dass generierte Inhalte (Text, Bild, Audio, Video) maschinenlesbar als KI-generiert markiert sind – durch digital signierte Metadaten und imperzeptible Wasserzeichen. Diese Pflicht gilt ab 2. August 2026 (bzw. 2. Dezember 2026 für Systeme, die bereits vor dem 2. August 2026 auf dem Markt waren).",
    art50_4_deepfake_title: "Deepfake sichtbar kennzeichnen",
    art50_4_deepfake_desc: "KI-generierte oder -manipulierte Bild-, Audio- oder Videoinhalte, die realen Personen, Orten, Gegenständen oder Ereignissen ähneln und fälschlicherweise als echt erscheinen könnten (Deepfakes), müssen als künstlich erzeugt offengelegt werden. Die Kennzeichnung muss klar, sichtbar, verständlich und barrierefrei erfolgen. Eine redaktionelle Prüfung entfällt hier nicht als Ausnahme – auch geprüfte Deepfakes müssen gekennzeichnet werden.",
    art50_4_text_exempt_title: "Redaktionelle Ausnahme greift",
    art50_4_text_exempt_desc: "Bei KI-generierten Texten zu Themen von öffentlichem Interesse entfällt die Kennzeichnungspflicht, wenn ein Mensch die redaktionelle Prüfung übernimmt und dies erkennbar ist. Die Leitlinien verlangen als Minimum einen Faktencheck. Eine inhaltliche KI-Nachbearbeitung nach Freigabe lässt die Ausnahme entfallen.",
    art50_4_text_title: "KI-Text zu öffentlichem Interesse kennzeichnen",
    art50_4_text_desc: "Texte, die der Information der Öffentlichkeit über Angelegenheiten von öffentlichem Interesse dienen und vollständig von KI erstellt wurden, müssen als KI-generiert offengelegt werden. Dies betrifft typischerweise Nachrichtenartikel, politische Stellungnahmen und redaktionelle Inhalte mit gesellschaftlicher Relevanz. Die Kennzeichnung muss klar, sichtbar und verständlich erfolgen.",
    art50_4_text_na_title: "Keine sichtbare Kennzeichnung erforderlich",
    art50_4_text_na_desc: "Der Text dient nicht der Information der Öffentlichkeit über Angelegenheiten von öffentlichem Interesse (z. B. Marketing-Texte, Produktbeschreibungen, interne Kommunikation). Eine sichtbare Kennzeichnung ist nicht erforderlich. Die maschinenlesbare Markierung durch den Anbieter (Art. 50 Abs. 2) bleibt jedoch bestehen.",

    required: "Erforderlich",
    notRequired: "Nicht erforderlich",
    conditional: "Bedingt",

    effectiveFrom: "Gilt ab 2. Aug. 2026",
    finesUpTo: "Bußgelder bis 15 Mio. €",

    matrixTitle: "Anforderungen je Nutzergruppe",
    matrixGroup: "Nutzergruppe",
    matrixTechnical: "Technische Markierung",
    matrixVisible: "Sichtbare Kennzeichnung",
    yourGroup: "Ihre Gruppe",

    groupIndividuals: "Privatpersonen (berufl. Nutzung)",
    groupMedia: "Medien & Verlage",
    groupAuthorities: "Behörden",
    groupCompanies: "Unternehmen",

    matrixTechDefault: "Anbieter des KI-Systems muss maschinenlesbare Markierung (Metadaten + Wasserzeichen) sicherstellen. Betreiber sollten diese Markierung bei Veröffentlichung erhalten.",

    matrixDeepfakeMedia: "Deepfakes müssen sichtbar gekennzeichnet werden. Journalistische Sorgfaltspflicht bleibt bestehen. EU-Icons oder Texthinweise zulässig.",
    matrixDeepfakeAuthority: "Deepfakes müssen gekennzeichnet werden. Ausnahme bei KI-Systemen, die gesetzlich zur Strafverfolgung autorisiert sind.",
    matrixDeepfakeDefault: "Deepfakes müssen sichtbar als KI-generiert gekennzeichnet werden (klar, verständlich, barrierefrei).",
    matrixChatbotAuthority: "Chatbots müssen als KI-Interaktion erkennbar sein. Ausnahme bei Systemen zur Strafverfolgung.",
    matrixChatbotDefault: "Chatbots und virtuelle Assistenten müssen Nutzer zu Beginn der Interaktion über die KI-Natur informieren.",
    matrixTextMedia: "KI-generierte Texte zu öffentlichem Interesse müssen gekennzeichnet werden. Redaktionelle Prüfung mit Faktencheck befreit von der Pflicht.",
    matrixTextAuthority: "Behördliche Veröffentlichungen zu öffentlichen Themen müssen KI-Generierung offenlegen, sofern keine redaktionelle Prüfung erfolgt.",
    matrixTextDefault: "KI-generierte Texte zu öffentlichen Angelegenheiten müssen gekennzeichnet werden, es sei denn, redaktionelle Prüfung mit Faktencheck ist erkennbar.",
    matrixTextNotPublic: "Keine sichtbare Kennzeichnung erforderlich für Texte ohne öffentlichen Interesse-Bezug.",
    matrixMediaOnlyDeepfake: "Sichtbare Kennzeichnung nur erforderlich, wenn der Inhalt als Deepfake einzustufen ist (realistische Darstellung realer Subjekte).",

    notesTitle: "Hinweise & Ausnahmen",
    note: "Hinweis",
    note1: "Die Transparenzpflichten nach Art. 50 AI Act gelten ab dem 2. August 2026. Für KI-Systeme, die bereits vor diesem Datum auf dem Markt waren, gilt eine Übergangsfrist für die maschinenlesbare Markierung bis zum 2. Dezember 2026.",
    note2: "Die sichtbare Kennzeichnung muss klar, verständlich, zugänglich und barrierefrei erfolgen. Die EU-Kommission hat ein Set von Icons veröffentlicht, die verwendet werden können. Alternativ sind Bildunterschriften, Texteinblendungen oder Hinweise in der Inhaltsbeschreibung zulässig.",
    note3: "Ausnahme: Für künstlerische, kreative, satirische und fiktionale Arbeiten kann die Deepfake-Kennzeichnungspflicht entfallen, sofern kein Täuschungspotential besteht. Die Bewertung ist kontextabhängig.",
    note4: "Bei Verstößen drohen Bußgelder von bis zu 15 Millionen Euro oder 3 % des weltweiten Jahresumsatzes – je nachdem, welcher Betrag höher ist.",

    legalTitle: "Rechtlicher Rahmen",
    legalBody: "Dieses Dashboard basiert auf Artikel 50 der Verordnung (EU) 2024/1689 (AI Act), den finalen Leitlinien der EU-Kommission vom 20. Juli 2026 sowie dem Code of Practice on Transparency of AI-Generated Content vom 10. Juni 2026. Die Leitlinien sind rechtlich unverbindlich; verbindlich sind allein die Pflichten aus dem AI Act. Letztverbindlich interpretiert nur der Europäische Gerichtshof (EuGH).",
    linkArt50: "FAQ zu Artikel 50",
    linkGuidelines: "Leitlinien der Kommission",
    linkCode: "Code of Practice",
    officialDocsTitle: "Offizielle EU-Dokumente",
    officialDocsIntro: "Lesen Sie den verbindlichen Gesetzestext und die offiziellen Umsetzungshilfen der Europäischen Kommission.",
    officialRegulation: "EU AI Act · Verordnungstext",
    officialArticle50: "Artikel 50 · Transparenz-FAQ",
    officialGuidelines: "Transparenz-Leitlinien",
    officialCode: "Code of Practice",
    officialSourceNote: "Diese Links führen ausschließlich zu offiziellen EU-Institutionen. Dieses Tool bietet allgemeine Informationen und keine Rechtsberatung; verbindlich ist der Verordnungstext.",

    disclaimer: "Diese Anwendung bietet eine erste Orientierung und ersetzt keine Rechtsberatung. Für eine verbindliche Bewertung konsultieren Sie bitte eine Fachanwältin oder einen Fachanwalt.",

    exemptNote1: "Die Ausnahme gilt nur für nicht-berufliche Nutzung. Sobald KI-Inhalte im beruflichen oder geschäftlichen Kontext veröffentlicht werden, greifen die Pflichten.",
    exemptNote2: "Anbieter der KI-Systeme (z. B. OpenAI, Midjourney) unterliegen weiterhin der Pflicht zur technischen Markierung gemäß Art. 50 Abs. 2.",
  },
};

export function detectLang(): Lang {
  const lang = navigator.language || (navigator as any).userLanguage || "en";
  return lang.toLowerCase().startsWith("de") ? "de" : "en";
}
