import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, GraduationCap, HeartPulse, Sprout, FileBadge, Users, Languages, Clock3, FileText, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/site-shell";
import { useLanguage } from "@/lib/language-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sarkari Sahayak – AI Government Service Assistant" },
      { name: "description", content: "Get information about Indian government schemes, documents and services in English, Kannada and Hindi via AI chat." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useLanguage();

  const features = [
    { icon: Languages, key: "multi" },
    { icon: FileText, key: "scheme" },
    { icon: FileBadge, key: "doc" },
    { icon: Clock3, key: "247" },
    { icon: MessageSquare, key: "apply" },
    { icon: ShieldCheck, key: "friendly" },
  ];

  const cats = [
    { icon: GraduationCap, label: "Education", color: "bg-blue-500/10 text-blue-600" },
    { icon: HeartPulse, label: "Healthcare", color: "bg-rose-500/10 text-rose-600" },
    { icon: Sprout, label: "Agriculture", color: "bg-green-500/10 text-green-600" },
    { icon: Users, label: "Social Welfare", color: "bg-purple-500/10 text-purple-600" },
  ];

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container relative mx-auto px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur mb-6">
              <span className="h-2 w-2 rounded-full bg-saffron animate-pulse" />
              Powered by AI · Available in 3 languages
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">{t("hero.title")}</h1>
            <p className="text-lg lg:text-xl text-primary-foreground/85 mb-8 max-w-xl">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/chatbot">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Bot className="h-5 w-5" /> {t("hero.cta1")}
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                  {t("hero.cta2")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "50+", l: "Schemes" },
                { n: "20+", l: "Documents" },
                { n: "3", l: "Languages" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold">{s.n}</div>
                  <div className="text-xs text-primary-foreground/70 uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 shadow-elev p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
                <div className="h-10 w-10 rounded-full bg-saffron flex items-center justify-center">
                  <Bot className="h-5 w-5 text-saffron-foreground" />
                </div>
                <div>
                  <div className="font-semibold">Sarkari Sahayak AI</div>
                  <div className="text-xs text-primary-foreground/70">Online · Replies instantly</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white/15 rounded-lg rounded-tl-none p-3 text-sm max-w-[85%]">
                  Namaste! How can I help you with government services today?
                </div>
                <div className="bg-saffron text-saffron-foreground rounded-lg rounded-tr-none p-3 text-sm max-w-[85%] ml-auto">
                  How do I apply for PM Kisan?
                </div>
                <div className="bg-white/15 rounded-lg rounded-tl-none p-3 text-sm max-w-[85%]">
                  Visit pmkisan.gov.in and register with your Aadhaar, bank account and land records. I can guide you step-by-step.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">{t("features.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A single trusted platform for citizens to access government information instantly.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.key} className="group hover:shadow-elev transition-shadow border-2 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{t(`features.${f.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`features.${f.key}.desc`)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Explore by Category</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cats.map((c) => {
              const Icon = c.icon;
              return (
                <Link key={c.label} to="/services" className="block">
                  <Card className="hover:shadow-elev hover:-translate-y-1 transition-all">
                    <CardContent className="p-6 text-center">
                      <div className={`h-14 w-14 rounded-full ${c.color} flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="font-medium">{c.label}</div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-hero text-primary-foreground p-10 lg:p-14 text-center shadow-elev">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">Talk to Sarkari Sahayak now</h2>
          <p className="text-primary-foreground/85 mb-6 max-w-xl mx-auto">Ask in any language. Get accurate, simple, instant answers about government services.</p>
          <Link to="/chatbot">
            <Button size="lg" variant="secondary" className="gap-2">
              <Bot className="h-5 w-5" /> {t("hero.cta1")}
            </Button>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
