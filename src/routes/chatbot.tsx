import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, Mic, MicOff, User, Volume2, Sparkles, GraduationCap, HeartPulse, Sprout, FileBadge, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/site-shell";
import { useLanguage } from "@/lib/language-context";
import { schemes, documents } from "@/lib/mock-data";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Chatbot – Sarkari Sahayak" },
      { name: "description", content: "Chat with Sarkari Sahayak AI to learn about Indian government schemes, documents and services." },
    ],
  }),
  component: ChatbotPage,
});

type Msg = { role: "user" | "bot"; text: string; time: string };

// Simple mock NLP — keyword-based reply in user language
function mockReply(question: string, lang: "en" | "kn" | "hi"): string {
  const q = question.toLowerCase();
  const scheme = schemes.find((s) =>
    Object.values(s.name).some((n) => q.includes(n.toLowerCase().split(" ")[0])) ||
    q.includes(s.category.toLowerCase()) ||
    q.includes(s.id),
  );
  if (scheme) {
    const docs = scheme.documents.join(", ");
    if (lang === "kn") return `${scheme.name.kn}: ${scheme.description.kn}\n\nಅರ್ಹತೆ: ${scheme.eligibility.kn}\nಅಗತ್ಯ ದಾಖಲೆಗಳು: ${docs}\nಪ್ರಕ್ರಿಯೆ: ${scheme.process.kn}`;
    if (lang === "hi") return `${scheme.name.hi}: ${scheme.description.hi}\n\nपात्रता: ${scheme.eligibility.hi}\nआवश्यक दस्तावेज़: ${docs}\nप्रक्रिया: ${scheme.process.hi}`;
    return `${scheme.name.en}: ${scheme.description.en}\n\nEligibility: ${scheme.eligibility.en}\nDocuments: ${docs}\nProcess: ${scheme.process.en}`;
  }
  const doc = documents.find((d) => Object.values(d.name).some((n) => q.includes(n.toLowerCase().split(" ")[0])));
  if (doc) {
    if (lang === "kn") return `${doc.name.kn}\nಉದ್ದೇಶ: ${doc.purpose.kn}\nಅಗತ್ಯತೆಗಳು: ${doc.requirements.join(", ")}\nಪ್ರಕ್ರಿಯೆ: ${doc.process.kn}\nಸಮಯ: ${doc.time}`;
    if (lang === "hi") return `${doc.name.hi}\nउद्देश्य: ${doc.purpose.hi}\nआवश्यकताएँ: ${doc.requirements.join(", ")}\nप्रक्रिया: ${doc.process.hi}\nसमय: ${doc.time}`;
    return `${doc.name.en}\nPurpose: ${doc.purpose.en}\nRequirements: ${doc.requirements.join(", ")}\nProcess: ${doc.process.en}\nTime: ${doc.time}`;
  }
  if (lang === "kn") return "ನಾನು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು, ದಾಖಲೆಗಳು ಮತ್ತು ಸೇವೆಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಬಲ್ಲೆ. ದಯವಿಟ್ಟು ನಿರ್ದಿಷ್ಟ ಯೋಜನೆ (ಉದಾ. ಪಿಎಂ ಕಿಸಾನ್, ಆಯುಷ್ಮಾನ್) ಅಥವಾ ದಾಖಲೆ (ಆಧಾರ್, ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ) ಬಗ್ಗೆ ಕೇಳಿ.";
  if (lang === "hi") return "मैं सरकारी योजनाओं, दस्तावेज़ों और सेवाओं की जानकारी दे सकता हूँ। कृपया किसी विशिष्ट योजना (जैसे पीएम किसान, आयुष्मान) या दस्तावेज़ (आधार, आय प्रमाण पत्र) के बारे में पूछें।";
  return "I can help with government schemes, documents and services. Try asking about PM Kisan, Ayushman Bharat, Aadhaar, Income Certificate, scholarships, pensions and more.";
}

const SUGGESTIONS: Record<string, Record<"en" | "kn" | "hi", string>> = {
  s1: { en: "How can I apply for PM Kisan?", kn: "ಪಿಎಂ ಕಿಸಾನ್‌ಗೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು?", hi: "पीएम किसान के लिए कैसे आवेदन करें?" },
  s2: { en: "Documents for income certificate", kn: "ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರಕ್ಕೆ ದಾಖಲೆಗಳು", hi: "आय प्रमाण पत्र के दस्तावेज़" },
  s3: { en: "Tell me about Ayushman Bharat", kn: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಬಗ್ಗೆ ಹೇಳಿ", hi: "आयुष्मान भारत के बारे में बताइए" },
  s4: { en: "How to get Aadhaar card?", kn: "ಆಧಾರ್ ಕಾರ್ಡ್ ಹೇಗೆ ಪಡೆಯುವುದು?", hi: "आधार कार्ड कैसे प्राप्त करें?" },
};

function ChatbotPage() {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<any>(null);

  useEffect(() => {
    setMessages([{ role: "bot", text: t("chat.greeting"), time: new Date().toLocaleTimeString() }]);
  }, [lang]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text, time: new Date().toLocaleTimeString() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const reply = mockReply(text, lang);
      setMessages((m) => [...m, { role: "bot", text: reply, time: new Date().toLocaleTimeString() }]);
      setThinking(false);
    }, 900);
  };

  const toggleVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Voice input not supported in this browser.");
      return;
    }
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = lang === "kn" ? "kn-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "kn" ? "kn-IN" : lang === "hi" ? "hi-IN" : "en-IN";
    speechSynthesis.speak(u);
  };

  const cats = [
    { icon: GraduationCap, label: "Education", color: "text-blue-600" },
    { icon: HeartPulse, label: "Healthcare", color: "text-rose-600" },
    { icon: Sprout, label: "Agriculture", color: "text-green-600" },
    { icon: Users, label: "Social Welfare", color: "text-purple-600" },
    { icon: FileBadge, label: "Certificates", color: "text-cyan-600" },
  ];

  return (
    <PageShell>
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <Card className="overflow-hidden flex flex-col h-[calc(100vh-200px)] min-h-[560px]">
            <div className="flex items-center justify-between gap-3 p-4 border-b bg-gradient-hero text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-saffron flex items-center justify-center">
                  <Bot className="h-5 w-5 text-saffron-foreground" />
                </div>
                <div>
                  <div className="font-semibold">{t("chat.title")}</div>
                  <div className="text-xs text-primary-foreground/80 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10" onClick={() => setMessages([{ role: "bot", text: t("chat.greeting"), time: new Date().toLocaleTimeString() }])}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1" ref={scrollRef as any}>
              <div className="p-4 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                      {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`max-w-[80%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                      <div className={`rounded-2xl p-3 text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                        {m.text}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground px-1">
                        <span>{m.time}</span>
                        {m.role === "bot" && (
                          <button onClick={() => speak(m.text)} className="hover:text-foreground">
                            <Volume2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {thinking && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm p-3 flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.1s]" />
                      <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-3 space-y-2">
              <div className="flex flex-wrap gap-2">
                {Object.entries(SUGGESTIONS).map(([k, v]) => (
                  <button key={k} onClick={() => send(v[lang])} className="text-xs px-3 py-1 rounded-full border bg-muted/50 hover:bg-muted transition-colors">
                    <Sparkles className="inline h-3 w-3 mr-1 text-saffron" />
                    {v[lang]}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 items-end">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder={t("chat.placeholder")}
                  className="min-h-[44px] max-h-32 resize-none"
                  rows={1}
                />
                <Button variant={listening ? "destructive" : "outline"} size="icon" onClick={toggleVoice} aria-label="Voice input">
                  {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button size="icon" onClick={() => send(input)} disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-3">{t("chat.categories")}</h3>
                <div className="space-y-2">
                  {cats.map((c) => {
                    const Icon = c.icon;
                    return (
                      <Link key={c.label} to="/services" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors">
                        <Icon className={`h-5 w-5 ${c.color}`} />
                        <span className="text-sm font-medium">{c.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-3">Popular Schemes</h3>
                <div className="flex flex-wrap gap-2">
                  {schemes.slice(0, 5).map((s) => (
                    <Badge key={s.id} variant="secondary" className="cursor-pointer" onClick={() => send(s.name[lang])}>
                      {s.name[lang]}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
