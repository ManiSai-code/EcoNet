import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./mock-data";

type Dict = Record<string, Record<Lang, string>>;

const DICT: Dict = {
  "nav.home": { en: "Home", kn: "ಮುಖಪುಟ", hi: "होम" },
  "nav.services": { en: "Services", kn: "ಸೇವೆಗಳು", hi: "सेवाएँ" },
  "nav.schemes": { en: "Schemes", kn: "ಯೋಜನೆಗಳು", hi: "योजनाएँ" },
  "nav.documents": { en: "Documents", kn: "ದಾಖಲೆಗಳು", hi: "दस्तावेज़" },
  "nav.chatbot": { en: "AI Chatbot", kn: "ಎಐ ಚಾಟ್‌ಬಾಟ್", hi: "एआई चैटबॉट" },
  "nav.about": { en: "About", kn: "ನಮ್ಮ ಬಗ್ಗೆ", hi: "हमारे बारे में" },
  "nav.contact": { en: "Contact", kn: "ಸಂಪರ್ಕ", hi: "संपर्क" },
  "nav.login": { en: "Login", kn: "ಲಾಗಿನ್", hi: "लॉगिन" },
  "nav.dashboard": { en: "Dashboard", kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", hi: "डैशबोर्ड" },
  "nav.feedback": { en: "Feedback", kn: "ಪ್ರತಿಕ್ರಿಯೆ", hi: "प्रतिक्रिया" },

  "hero.title": {
    en: "Your AI Assistant for Government Services",
    kn: "ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ ನಿಮ್ಮ ಎಐ ಸಹಾಯಕ",
    hi: "सरकारी सेवाओं के लिए आपका एआई सहायक",
  },
  "hero.subtitle": {
    en: "Get information about government schemes, documents, and public services in your preferred language.",
    kn: "ನಿಮ್ಮ ಆಯ್ಕೆಯ ಭಾಷೆಯಲ್ಲಿ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ದಾಖಲೆಗಳು ಮತ್ತು ಸೇವೆಗಳ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",
    hi: "अपनी पसंदीदा भाषा में सरकारी योजनाओं, दस्तावेज़ों और सेवाओं की जानकारी प्राप्त करें।",
  },
  "hero.cta1": { en: "Start Chatting", kn: "ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ", hi: "चैट शुरू करें" },
  "hero.cta2": { en: "Explore Services", kn: "ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ", hi: "सेवाएँ देखें" },

  "features.title": { en: "Why Sarkari Sahayak?", kn: "ಸರ್ಕಾರಿ ಸಹಾಯಕ ಏಕೆ?", hi: "सरकारी सहायक क्यों?" },
  "features.multi.title": { en: "Multilingual Support", kn: "ಬಹುಭಾಷಾ ಬೆಂಬಲ", hi: "बहुभाषी समर्थन" },
  "features.multi.desc": { en: "Kannada, Hindi & English", kn: "ಕನ್ನಡ, ಹಿಂದಿ ಮತ್ತು ಇಂಗ್ಲಿಷ್", hi: "कन्नड़, हिंदी और अंग्रेज़ी" },
  "features.scheme.title": { en: "Scheme Information", kn: "ಯೋಜನೆಯ ಮಾಹಿತಿ", hi: "योजना जानकारी" },
  "features.scheme.desc": { en: "Latest central & state schemes", kn: "ಇತ್ತೀಚಿನ ಯೋಜನೆಗಳು", hi: "नवीनतम योजनाएँ" },
  "features.doc.title": { en: "Document Guidance", kn: "ದಾಖಲೆ ಮಾರ್ಗದರ್ಶನ", hi: "दस्तावेज़ मार्गदर्शन" },
  "features.doc.desc": { en: "Step-by-step help", kn: "ಹಂತ-ಹಂತದ ಸಹಾಯ", hi: "चरण-दर-चरण सहायता" },
  "features.247.title": { en: "24/7 AI Assistance", kn: "24/7 ಎಐ ಸಹಾಯ", hi: "24/7 एआई सहायता" },
  "features.247.desc": { en: "Always available", kn: "ಯಾವಾಗಲೂ ಲಭ್ಯ", hi: "हमेशा उपलब्ध" },
  "features.apply.title": { en: "Application Support", kn: "ಅರ್ಜಿ ಬೆಂಬಲ", hi: "आवेदन सहायता" },
  "features.apply.desc": { en: "Easy walkthroughs", kn: "ಸುಲಭ ಮಾರ್ಗದರ್ಶನ", hi: "आसान गाइड" },
  "features.friendly.title": { en: "Citizen Friendly", kn: "ನಾಗರಿಕ ಸ್ನೇಹಿ", hi: "नागरिक हितैषी" },
  "features.friendly.desc": { en: "Simple & accessible", kn: "ಸರಳ ಮತ್ತು ಪ್ರವೇಶಯೋಗ್ಯ", hi: "सरल और सुलभ" },

  "chat.title": { en: "Sarkari Sahayak AI", kn: "ಸರ್ಕಾರಿ ಸಹಾಯಕ ಎಐ", hi: "सरकारी सहायक एआई" },
  "chat.placeholder": { en: "Ask about schemes, documents, services...", kn: "ಯೋಜನೆ, ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ...", hi: "योजना, दस्तावेज़ के बारे में पूछें..." },
  "chat.send": { en: "Send", kn: "ಕಳುಹಿಸಿ", hi: "भेजें" },
  "chat.categories": { en: "Quick Categories", kn: "ತ್ವರಿತ ವರ್ಗಗಳು", hi: "त्वरित श्रेणियाँ" },
  "chat.greeting": {
    en: "Namaste! I'm Sarkari Sahayak. Ask me about any government scheme, document, or service.",
    kn: "ನಮಸ್ಕಾರ! ನಾನು ಸರ್ಕಾರಿ ಸಹಾಯಕ. ಯಾವುದೇ ಸರ್ಕಾರಿ ಯೋಜನೆ ಅಥವಾ ಸೇವೆಯ ಬಗ್ಗೆ ಕೇಳಿ.",
    hi: "नमस्ते! मैं सरकारी सहायक हूँ। किसी भी योजना, दस्तावेज़ या सेवा के बारे में पूछें।",
  },

  "common.eligibility": { en: "Eligibility", kn: "ಅರ್ಹತೆ", hi: "पात्रता" },
  "common.documents": { en: "Documents", kn: "ದಾಖಲೆಗಳು", hi: "दस्तावेज़" },
  "common.process": { en: "Process", kn: "ಪ್ರಕ್ರಿಯೆ", hi: "प्रक्रिया" },
  "common.learn": { en: "Learn more", kn: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ", hi: "और जानें" },
  "common.purpose": { en: "Purpose", kn: "ಉದ್ದೇಶ", hi: "उद्देश्य" },
  "common.time": { en: "Processing Time", kn: "ಪ್ರಕ್ರಿಯೆ ಸಮಯ", hi: "प्रोसेसिंग समय" },
  "common.steps": { en: "Steps", kn: "ಹಂತಗಳು", hi: "चरण" },
  "common.category": { en: "Category", kn: "ವರ್ಗ", hi: "श्रेणी" },
  "common.all": { en: "All", kn: "ಎಲ್ಲಾ", hi: "सभी" },
  "common.search": { en: "Search...", kn: "ಹುಡುಕಿ...", hi: "खोजें..." },
  "common.submit": { en: "Submit", kn: "ಸಲ್ಲಿಸಿ", hi: "सबमिट करें" },
};

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("ss-lang") as Lang | null;
    if (stored === "en" || stored === "kn" || stored === "hi") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("ss-lang", l);
  };

  const t = (key: string) => DICT[key]?.[lang] ?? key;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  kn: "ಕನ್ನಡ",
  hi: "हिन्दी",
};
