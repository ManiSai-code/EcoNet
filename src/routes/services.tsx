import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, HeartPulse, Sprout, Briefcase, Users, FileBadge, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site-shell";
import { useLanguage } from "@/lib/language-context";
import { services } from "@/lib/mock-data";

const ICONS: Record<string, any> = {
  Education: GraduationCap,
  Healthcare: HeartPulse,
  Agriculture: Sprout,
  Employment: Briefcase,
  "Social Welfare": Users,
  Certificate: FileBadge,
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Government Services – Sarkari Sahayak" },
      { name: "description", content: "Directory of government services across education, healthcare, agriculture, employment and welfare." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { lang, t } = useLanguage();
  const cats = ["All", ...Array.from(new Set(services.map((s) => s.category)))];
  const [cat, setCat] = useState("All");
  const filtered = services.filter((s) => cat === "All" || s.category === cat);

  return (
    <PageShell>
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">{t("nav.services")}</h1>
          <p className="text-primary-foreground/85 max-w-2xl">All public services in one place — for every citizen, in every language.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {cats.map((c) => (
            <Button key={c} variant={cat === c ? "default" : "outline"} size="sm" onClick={() => setCat(c)}>
              {c === "All" ? t("common.all") : c}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => {
            const Icon = ICONS[s.category] ?? FileBadge;
            return (
              <Card key={s.id} className="hover:shadow-elev transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">{s.category}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{s.name[lang]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">{s.description[lang]}</p>
                  <div>
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-1">{t("common.steps")}</div>
                    <ol className="space-y-1">
                      {s.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-1">{t("common.documents")}</div>
                    <div className="flex flex-wrap gap-1">
                      {s.documents.map((d) => (
                        <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
