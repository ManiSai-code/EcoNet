import { createFileRoute } from "@tanstack/react-router";
import { Users, FileText, Database, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageShell } from "@/components/site-shell";
import { schemes, documents } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard – Sarkari Sahayak" }] }),
  component: AdminPage,
});

const LANG_USAGE = [
  { lang: "English", pct: 52, color: "bg-blue-500" },
  { lang: "ಕನ್ನಡ", pct: 31, color: "bg-green-500" },
  { lang: "हिन्दी", pct: 17, color: "bg-amber-500" },
];

const TOP_SCHEMES = [
  { name: "PM Kisan", queries: 1432 },
  { name: "Ayushman Bharat", queries: 1108 },
  { name: "Scholarships", queries: 892 },
  { name: "PMAY", queries: 645 },
  { name: "Ujjwala", queries: 412 },
];

const DAILY = [60, 78, 92, 110, 145, 134, 168];

function AdminPage() {
  const max = Math.max(...DAILY);

  const stats = [
    { icon: Users, label: "Total Users", value: "12,847", color: "text-blue-600 bg-blue-500/10", trend: "+8.2%" },
    { icon: MessageSquare, label: "Chats Today", value: "1,623", color: "text-green-600 bg-green-500/10", trend: "+12%" },
    { icon: FileText, label: "Schemes", value: schemes.length, color: "text-amber-600 bg-amber-500/10", trend: "—" },
    { icon: Database, label: "Documents", value: documents.length, color: "text-purple-600 bg-purple-500/10", trend: "—" },
  ];

  return (
    <PageShell>
      <section className="bg-gradient-hero text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="mb-2">Admin Panel</Badge>
          <h1 className="text-3xl font-bold">Operations Dashboard</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-xs gap-1"><TrendingUp className="h-3 w-3" />{s.trend}</Badge>
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
            <CardHeader><CardTitle className="text-lg">Daily Chatbot Requests</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-40">
                {DAILY.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-accent rounded-t-md transition-all hover:opacity-80"
                      style={{ height: `${(d / max) * 100}%` }}
                      title={`${d} requests`}
                    />
                    <span className="text-[10px] text-muted-foreground">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Language Usage</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {LANG_USAGE.map((l) => (
                <div key={l.lang}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{l.lang}</span>
                    <span className="text-muted-foreground">{l.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${l.color}`} style={{ width: `${l.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-lg">Manage Content</CardTitle></CardHeader>
          <CardContent>
            <Tabs defaultValue="schemes">
              <TabsList>
                <TabsTrigger value="schemes">Schemes</TabsTrigger>
                <TabsTrigger value="docs">Documents</TabsTrigger>
                <TabsTrigger value="top">Top Queries</TabsTrigger>
              </TabsList>
              <TabsContent value="schemes">
                <div className="divide-y">
                  {schemes.map((s) => (
                    <div key={s.id} className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium text-sm">{s.name.en}</div>
                        <div className="text-xs text-muted-foreground">{s.category}</div>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="docs">
                <div className="divide-y">
                  {documents.map((d) => (
                    <div key={d.id} className="flex items-center justify-between py-3">
                      <div>
                        <div className="font-medium text-sm">{d.name.en}</div>
                        <div className="text-xs text-muted-foreground">{d.category} · {d.time}</div>
                      </div>
                      <Badge variant="secondary">Published</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="top">
                <div className="divide-y">
                  {TOP_SCHEMES.map((s) => (
                    <div key={s.name} className="flex items-center justify-between py-3">
                      <span className="font-medium text-sm">{s.name}</span>
                      <Badge>{s.queries.toLocaleString()} queries</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
