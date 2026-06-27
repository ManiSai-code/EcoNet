import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ExternalLink, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/site-shell";
import { useLanguage } from "@/lib/language-context";
import { schemes } from "@/lib/mock-data";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes – Sarkari Sahayak" },
      { name: "description", content: "Browse Indian central and state government schemes with eligibility, documents and application process." },
    ],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const { lang, t } = useLanguage();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const categories = ["All", ...Array.from(new Set(schemes.map((s) => s.category)))];
  const filtered = schemes.filter((s) => {
    const matchCat = cat === "All" || s.category === cat;
    const matchQ = !q || s.name[lang].toLowerCase().includes(q.toLowerCase()) || s.description[lang].toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <PageShell>
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">{t("nav.schemes")}</h1>
          <p className="text-primary-foreground/85 max-w-2xl">Explore central and state government schemes designed to support every citizen.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("common.search")} className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button key={c} variant={cat === c ? "default" : "outline"} size="sm" onClick={() => setCat(c)}>
                {c === "All" ? t("common.all") : c}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <Card key={s.id} className="hover:shadow-elev transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="secondary">{s.category}</Badge>
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                </div>
                <CardTitle className="text-lg leading-tight mt-2">{s.name[lang]}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4">{s.description[lang]}</p>
                <div className="space-y-3 text-sm flex-1">
                  <div>
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-1">{t("common.eligibility")}</div>
                    <p>{s.eligibility[lang]}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-1">{t("common.documents")}</div>
                    <div className="flex flex-wrap gap-1">
                      {s.documents.map((d) => (
                        <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="mt-4">
                  <Button variant="outline" className="w-full gap-2">
                    {t("common.learn")} <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No schemes match your search.</div>
        )}
      </section>
    </PageShell>
  );
}
