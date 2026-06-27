import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare, Bookmark, FileSearch, History, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/site-shell";
import { useLanguage } from "@/lib/language-context";
import { schemes } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard – Sarkari Sahayak" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { lang } = useLanguage();
  const user =
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("ss-user") || '{"name":"Citizen"}') : { name: "Citizen" };

  const stats = [
    { icon: MessageSquare, label: "My Queries", value: 12, color: "text-blue-600 bg-blue-500/10" },
    { icon: Bookmark, label: "Saved Schemes", value: 4, color: "text-amber-600 bg-amber-500/10" },
    { icon: FileSearch, label: "Applications", value: 2, color: "text-green-600 bg-green-500/10" },
    { icon: History, label: "Chat Sessions", value: 8, color: "text-purple-600 bg-purple-500/10" },
  ];

  const recent = [
    { q: "How to apply PM Kisan?", t: "2h ago" },
    { q: "Documents for income certificate", t: "Yesterday" },
    { q: "Ayushman Bharat eligibility", t: "3 days ago" },
  ];

  return (
    <PageShell>
      <section className="bg-gradient-hero text-primary-foreground py-10">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-primary-foreground/80">Welcome back</div>
            <h1 className="text-3xl font-bold">{user.name} 👋</h1>
          </div>
          <Link to="/chatbot">
            <Button variant="secondary" className="gap-2"><Bot className="h-4 w-4" /> Open Chatbot</Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label}>
                <CardContent className="p-5">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Saved Schemes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {schemes.slice(0, 4).map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/40">
                  <div>
                    <div className="font-medium text-sm">{s.name[lang]}</div>
                    <Badge variant="secondary" className="text-xs mt-1">{s.category}</Badge>
                  </div>
                  <Link to="/schemes"><Button variant="ghost" size="sm">View</Button></Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Recent Chat History</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recent.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border">
                  <MessageSquare className="h-4 w-4 text-primary mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm">{r.q}</div>
                    <div className="text-xs text-muted-foreground">{r.t}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
