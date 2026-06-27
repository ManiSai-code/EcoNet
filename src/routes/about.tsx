import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Sparkles, Users, ShieldCheck, Globe2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About – Sarkari Sahayak" },
      { name: "description", content: "Sarkari Sahayak — AI-powered multilingual platform making Indian government services accessible to every citizen." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-saffron" />
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Sarkari Sahayak</h1>
          <p className="text-lg text-primary-foreground/85">
            Sarkari Sahayak helps citizens easily access government information using Artificial Intelligence and multilingual communication.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-6 max-w-5xl">
        <Card>
          <CardContent className="p-6">
            <Target className="h-8 w-8 text-primary mb-3" />
            <h2 className="text-xl font-bold mb-2">Our Mission</h2>
            <p className="text-muted-foreground text-sm">
              Make government services simple, accessible, and equitable — especially for rural citizens and first-time users — by removing language and information barriers.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Eye className="h-8 w-8 text-accent mb-3" />
            <h2 className="text-xl font-bold mb-2">Our Vision</h2>
            <p className="text-muted-foreground text-sm">
              A Digital Bharat where every citizen, regardless of language or location, can access the right scheme, document, or service in seconds.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-8">What we stand for</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Globe2, title: "Multilingual First", desc: "Built natively for English, Kannada and Hindi." },
              { icon: ShieldCheck, title: "Trustworthy", desc: "Verified official information, no misleading data." },
              { icon: Users, title: "Citizen Centric", desc: "Designed with and for citizens of every literacy level." },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <Card key={v.title}>
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
