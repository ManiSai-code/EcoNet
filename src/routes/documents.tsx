import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileBadge, Clock, FileCheck, IdCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/site-shell";
import { useLanguage } from "@/lib/language-context";
import { documents } from "@/lib/mock-data";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents Assistance – Sarkari Sahayak" },
      { name: "description", content: "Help with Aadhaar, PAN, Voter ID, birth, income and caste certificates — purpose, requirements and process." },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const { lang, t } = useLanguage();
  const [cat, setCat] = useState<"All" | "Identity" | "Certificate" | "Financial">("All");

  const filtered = documents.filter((d) => cat === "All" || d.category === cat);
  const cats: Array<typeof cat> = ["All", "Identity", "Certificate", "Financial"];

  return (
    <PageShell>
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">{t("nav.documents")}</h1>
          <p className="text-primary-foreground/85 max-w-2xl">Step-by-step guidance for every government document you may need.</p>
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
          {filtered.map((d) => {
            const Icon = d.category === "Identity" ? IdCard : d.category === "Certificate" ? FileBadge : FileCheck;
            return (
              <Card key={d.id} className="hover:shadow-elev transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">{d.category}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{d.name[lang]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-1">{t("common.purpose")}</div>
                    <p>{d.purpose[lang]}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-1">{t("common.documents")}</div>
                    <div className="flex flex-wrap gap-1">
                      {d.requirements.map((r) => (
                        <Badge key={r} variant="outline" className="text-xs">{r}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-1">{t("common.process")}</div>
                    <p>{d.process[lang]}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="font-medium">{t("common.time")}:</span>
                    <span>{d.time}</span>
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
